-- AdminAuditLog를 영구 데이터 변경 이력으로 확장합니다.
ALTER TABLE "admin_audit_log"
DROP CONSTRAINT "admin_audit_log_actorId_fkey";

ALTER TABLE "admin_audit_log"
ALTER COLUMN "actorId" DROP NOT NULL;

ALTER TABLE "admin_audit_log"
ADD COLUMN "actorName" TEXT,
ADD COLUMN "actorEmail" TEXT,
ADD COLUMN "actorRole" TEXT,
ADD COLUMN "source" TEXT,
ADD COLUMN "sourcePath" TEXT,
ADD COLUMN "operation" TEXT,
ADD COLUMN "beforeData" JSONB,
ADD COLUMN "afterData" JSONB,
ADD COLUMN "changedFields" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

ALTER TABLE "admin_audit_log"
ADD CONSTRAINT "admin_audit_log_actorId_fkey"
FOREIGN KEY ("actorId") REFERENCES "user"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX "admin_audit_log_createdAt_idx"
ON "admin_audit_log"("createdAt");

CREATE INDEX "admin_audit_log_source_createdAt_idx"
ON "admin_audit_log"("source", "createdAt");

UPDATE "admin_audit_log" AS audit
SET
  "actorName" = usr."name",
  "actorEmail" = usr."email",
  "actorRole" = usr."role"
FROM "user" AS usr
WHERE audit."actorId" = usr."id";

UPDATE "admin_audit_log"
SET
  "source" = CASE
    WHEN LEFT("action", 7) = 'INLINE_' THEN 'INLINE_EDITOR'
    WHEN LEFT("action", 7) = 'PUBLIC_' THEN 'PUBLIC_FORM'
    WHEN "action" = 'MEMBERSHIP_COMPLETE' THEN 'PUBLIC_FORM'
    ELSE 'ADMIN_PAGE'
  END,
  "operation" = CASE
    WHEN RIGHT("action", 7) = '_CREATE' THEN 'CREATE'
    WHEN RIGHT("action", 7) = '_UPDATE' THEN 'UPDATE'
    WHEN RIGHT("action", 7) = '_DELETE' THEN 'DELETE'
    WHEN RIGHT("action", 8) = '_REORDER' THEN 'REORDER'
    WHEN RIGHT("action", 6) = '_RESET' THEN 'RESET'
    WHEN RIGHT("action", 7) = '_UPLOAD' THEN 'UPLOAD'
    WHEN "action" = 'MEMBERSHIP_COMPLETE' THEN 'UPDATE'
    ELSE 'CHANGE'
  END,
  "sourcePath" = COALESCE(
    "sourcePath",
    CASE
      WHEN "metadata" ? 'sourcePath' THEN "metadata" ->> 'sourcePath'
      WHEN "metadata" ? 'publicPath' THEN "metadata" ->> 'publicPath'
      ELSE NULL
    END
  ),
  "beforeData" = COALESCE(
    "beforeData",
    CASE
      WHEN "metadata" ? 'before' THEN "metadata" -> 'before'
      ELSE NULL
    END
  ),
  "afterData" = COALESCE(
    "afterData",
    CASE
      WHEN "metadata" ? 'after' THEN "metadata" -> 'after'
      ELSE NULL
    END
  );

CREATE OR REPLACE FUNCTION fill_admin_audit_log_context()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  actor_record RECORD;
BEGIN
  IF NEW."actorId" IS NOT NULL THEN
    SELECT "name", "email", "role"
      INTO actor_record
    FROM "user"
    WHERE "id" = NEW."actorId";

    IF FOUND THEN
      NEW."actorName" := COALESCE(NEW."actorName", actor_record."name");
      NEW."actorEmail" := COALESCE(NEW."actorEmail", actor_record."email");
      NEW."actorRole" := COALESCE(NEW."actorRole", actor_record."role");
    END IF;
  END IF;

  IF NEW."source" IS NULL OR NEW."source" = '' THEN
    NEW."source" := CASE
      WHEN LEFT(NEW."action", 7) = 'INLINE_' THEN 'INLINE_EDITOR'
      WHEN LEFT(NEW."action", 7) = 'PUBLIC_' THEN 'PUBLIC_FORM'
      WHEN NEW."action" = 'MEMBERSHIP_COMPLETE' THEN 'PUBLIC_FORM'
      ELSE 'ADMIN_PAGE'
    END;
  END IF;

  IF NEW."operation" IS NULL OR NEW."operation" = '' THEN
    NEW."operation" := CASE
      WHEN RIGHT(NEW."action", 7) = '_CREATE' THEN 'CREATE'
      WHEN RIGHT(NEW."action", 7) = '_UPDATE' THEN 'UPDATE'
      WHEN RIGHT(NEW."action", 7) = '_DELETE' THEN 'DELETE'
      WHEN RIGHT(NEW."action", 8) = '_REORDER' THEN 'REORDER'
      WHEN RIGHT(NEW."action", 6) = '_RESET' THEN 'RESET'
      WHEN RIGHT(NEW."action", 7) = '_UPLOAD' THEN 'UPLOAD'
      WHEN NEW."action" = 'MEMBERSHIP_COMPLETE' THEN 'UPDATE'
      ELSE 'CHANGE'
    END;
  END IF;

  IF NEW."sourcePath" IS NULL AND NEW."metadata" IS NOT NULL THEN
    IF NEW."metadata" ? 'sourcePath' THEN
      NEW."sourcePath" := NEW."metadata" ->> 'sourcePath';
    ELSIF NEW."metadata" ? 'publicPath' THEN
      NEW."sourcePath" := NEW."metadata" ->> 'publicPath';
    END IF;
  END IF;

  IF NEW."beforeData" IS NULL
    AND NEW."metadata" IS NOT NULL
    AND NEW."metadata" ? 'before' THEN
    NEW."beforeData" := NEW."metadata" -> 'before';
  END IF;

  IF NEW."afterData" IS NULL
    AND NEW."metadata" IS NOT NULL
    AND NEW."metadata" ? 'after' THEN
    NEW."afterData" := NEW."metadata" -> 'after';
  END IF;

  IF COALESCE(cardinality(NEW."changedFields"), 0) = 0
    AND jsonb_typeof(NEW."beforeData") = 'object'
    AND jsonb_typeof(NEW."afterData") = 'object' THEN
    SELECT COALESCE(
      array_agg(keys.key ORDER BY keys.key),
      ARRAY[]::TEXT[]
    )
    INTO NEW."changedFields"
    FROM (
      SELECT jsonb_object_keys(NEW."beforeData") AS key
      UNION
      SELECT jsonb_object_keys(NEW."afterData") AS key
    ) AS keys
    WHERE NEW."beforeData" -> keys.key
      IS DISTINCT FROM NEW."afterData" -> keys.key;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS "admin_audit_log_context_trigger"
ON "admin_audit_log";

CREATE TRIGGER "admin_audit_log_context_trigger"
BEFORE INSERT ON "admin_audit_log"
FOR EACH ROW
EXECUTE FUNCTION fill_admin_audit_log_context();
