BEGIN;

-- 의료진별 종속 레코드를 "콘텐츠 DB + 관련 의료진" 다대다 구조로 전환합니다.
-- 기존 데이터는 새 콘텐츠 테이블과 관계 테이블로 먼저 복사한 뒤 legacy table을 제거합니다.

ALTER TABLE "doctor_specialty" RENAME TO "doctor_specialty_legacy";
ALTER TABLE "doctor_schedule" RENAME TO "doctor_schedule_legacy";
ALTER TABLE "doctor_presentation" RENAME TO "doctor_presentation_legacy";
ALTER TABLE "doctor_review" RENAME TO "doctor_review_legacy";
ALTER TABLE "doctor_media" RENAME TO "doctor_media_legacy";

-- 기존 PK constraint/index 이름을 비워 새 canonical table이 같은 이름을 사용할 수 있게 합니다.
ALTER TABLE "doctor_specialty_legacy"
  RENAME CONSTRAINT "doctor_specialty_pkey" TO "doctor_specialty_legacy_pkey";
ALTER TABLE "doctor_schedule_legacy"
  RENAME CONSTRAINT "doctor_schedule_pkey" TO "doctor_schedule_legacy_pkey";
ALTER TABLE "doctor_presentation_legacy"
  RENAME CONSTRAINT "doctor_presentation_pkey" TO "doctor_presentation_legacy_pkey";
ALTER TABLE "doctor_review_legacy"
  RENAME CONSTRAINT "doctor_review_pkey" TO "doctor_review_legacy_pkey";
ALTER TABLE "doctor_media_legacy"
  RENAME CONSTRAINT "doctor_media_pkey" TO "doctor_media_legacy_pkey";

CREATE TABLE "doctor_specialty" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "doctor_specialty_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "doctor_specialty_name_key" ON "doctor_specialty"("name");
CREATE INDEX "doctor_specialty_sortOrder_idx" ON "doctor_specialty"("sortOrder");
CREATE INDEX "doctor_specialty_isVisible_sortOrder_idx" ON "doctor_specialty"("isVisible", "sortOrder");

CREATE TABLE "doctor_specialty_doctor" (
  "specialtyId" TEXT NOT NULL,
  "doctorId" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "doctor_specialty_doctor_pkey" PRIMARY KEY ("specialtyId", "doctorId"),
  CONSTRAINT "doctor_specialty_doctor_specialtyId_fkey"
    FOREIGN KEY ("specialtyId") REFERENCES "doctor_specialty"("id")
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "doctor_specialty_doctor_doctorId_fkey"
    FOREIGN KEY ("doctorId") REFERENCES "doctor"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "doctor_specialty_doctor_doctorId_sortOrder_idx"
  ON "doctor_specialty_doctor"("doctorId", "sortOrder");

INSERT INTO "doctor_specialty"
  ("id","name","description","sortOrder","isVisible","createdAt","updatedAt")
SELECT
  'specialty-' || substr(md5(lower(trim("name"))), 1, 24),
  min(trim("name")),
  max("description"),
  min("sortOrder"),
  bool_or("isVisible"),
  min("createdAt"),
  max("updatedAt")
FROM "doctor_specialty_legacy"
WHERE trim("name") <> ''
GROUP BY lower(trim("name"));

INSERT INTO "doctor_specialty_doctor"
  ("specialtyId","doctorId","sortOrder","createdAt")
SELECT DISTINCT ON (
  'specialty-' || substr(md5(lower(trim(s."name"))), 1, 24),
  s."doctorId"
)
  'specialty-' || substr(md5(lower(trim(s."name"))), 1, 24),
  s."doctorId",
  s."sortOrder",
  s."createdAt"
FROM "doctor_specialty_legacy" s
WHERE trim(s."name") <> ''
ORDER BY
  'specialty-' || substr(md5(lower(trim(s."name"))), 1, 24),
  s."doctorId",
  s."sortOrder";

CREATE TABLE "doctor_schedule" (
  "id" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "mon" TEXT NOT NULL,
  "tue" TEXT NOT NULL,
  "wed" TEXT NOT NULL,
  "thu" TEXT NOT NULL,
  "fri" TEXT NOT NULL,
  "sat" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "doctor_schedule_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "doctor_schedule_sortOrder_idx" ON "doctor_schedule"("sortOrder");
CREATE INDEX "doctor_schedule_isVisible_sortOrder_idx" ON "doctor_schedule"("isVisible", "sortOrder");

CREATE TABLE "doctor_schedule_doctor" (
  "scheduleId" TEXT NOT NULL,
  "doctorId" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "doctor_schedule_doctor_pkey" PRIMARY KEY ("scheduleId", "doctorId"),
  CONSTRAINT "doctor_schedule_doctor_scheduleId_fkey"
    FOREIGN KEY ("scheduleId") REFERENCES "doctor_schedule"("id")
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "doctor_schedule_doctor_doctorId_fkey"
    FOREIGN KEY ("doctorId") REFERENCES "doctor"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "doctor_schedule_doctor_doctorId_sortOrder_idx"
  ON "doctor_schedule_doctor"("doctorId", "sortOrder");

INSERT INTO "doctor_schedule"
  ("id","label","mon","tue","wed","thu","fri","sat","sortOrder","isVisible","createdAt","updatedAt")
SELECT
  'schedule-' || substr(
    md5(concat_ws('|',"label","mon","tue","wed","thu","fri","sat")),
    1,
    24
  ),
  "label","mon","tue","wed","thu","fri","sat",
  min("sortOrder"),
  true,
  min("createdAt"),
  max("updatedAt")
FROM "doctor_schedule_legacy"
GROUP BY "label","mon","tue","wed","thu","fri","sat";

INSERT INTO "doctor_schedule_doctor"
  ("scheduleId","doctorId","sortOrder","createdAt")
SELECT DISTINCT ON (
  'schedule-' || substr(
    md5(concat_ws('|',s."label",s."mon",s."tue",s."wed",s."thu",s."fri",s."sat")),
    1,
    24
  ),
  s."doctorId"
)
  'schedule-' || substr(
    md5(concat_ws('|',s."label",s."mon",s."tue",s."wed",s."thu",s."fri",s."sat")),
    1,
    24
  ),
  s."doctorId",
  s."sortOrder",
  s."createdAt"
FROM "doctor_schedule_legacy" s
ORDER BY
  'schedule-' || substr(
    md5(concat_ws('|',s."label",s."mon",s."tue",s."wed",s."thu",s."fri",s."sat")),
    1,
    24
  ),
  s."doctorId",
  s."sortOrder";

CREATE TABLE "doctor_presentation" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "organization" TEXT,
  "description" TEXT,
  "imageUrl" TEXT,
  "linkUrl" TEXT,
  "presentedAt" TIMESTAMP(3),
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "doctor_presentation_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "doctor_presentation_sortOrder_idx" ON "doctor_presentation"("sortOrder");
CREATE INDEX "doctor_presentation_isVisible_sortOrder_idx" ON "doctor_presentation"("isVisible", "sortOrder");

CREATE TABLE "doctor_presentation_doctor" (
  "presentationId" TEXT NOT NULL,
  "doctorId" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "doctor_presentation_doctor_pkey" PRIMARY KEY ("presentationId", "doctorId"),
  CONSTRAINT "doctor_presentation_doctor_presentationId_fkey"
    FOREIGN KEY ("presentationId") REFERENCES "doctor_presentation"("id")
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "doctor_presentation_doctor_doctorId_fkey"
    FOREIGN KEY ("doctorId") REFERENCES "doctor"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "doctor_presentation_doctor_doctorId_sortOrder_idx"
  ON "doctor_presentation_doctor"("doctorId", "sortOrder");

INSERT INTO "doctor_presentation"
  ("id","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
SELECT
  "id","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt"
FROM "doctor_presentation_legacy";

INSERT INTO "doctor_presentation_doctor"
  ("presentationId","doctorId","sortOrder","createdAt")
SELECT "id","doctorId","sortOrder","createdAt"
FROM "doctor_presentation_legacy";

CREATE TABLE "doctor_review" (
  "id" TEXT NOT NULL,
  "patientName" TEXT NOT NULL,
  "age" INTEGER,
  "gender" TEXT,
  "treatment" TEXT,
  "content" TEXT,
  "imageUrl" TEXT,
  "reviewedAt" TIMESTAMP(3),
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "doctor_review_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "doctor_review_sortOrder_idx" ON "doctor_review"("sortOrder");
CREATE INDEX "doctor_review_isVisible_sortOrder_idx" ON "doctor_review"("isVisible", "sortOrder");

CREATE TABLE "doctor_review_doctor" (
  "reviewId" TEXT NOT NULL,
  "doctorId" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "doctor_review_doctor_pkey" PRIMARY KEY ("reviewId", "doctorId"),
  CONSTRAINT "doctor_review_doctor_reviewId_fkey"
    FOREIGN KEY ("reviewId") REFERENCES "doctor_review"("id")
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "doctor_review_doctor_doctorId_fkey"
    FOREIGN KEY ("doctorId") REFERENCES "doctor"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "doctor_review_doctor_doctorId_sortOrder_idx"
  ON "doctor_review_doctor"("doctorId", "sortOrder");

INSERT INTO "doctor_review"
  ("id","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
SELECT
  "id","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt"
FROM "doctor_review_legacy";

INSERT INTO "doctor_review_doctor"
  ("reviewId","doctorId","sortOrder","createdAt")
SELECT "id","doctorId","sortOrder","createdAt"
FROM "doctor_review_legacy";

CREATE TABLE "doctor_media" (
  "id" TEXT NOT NULL,
  "kind" TEXT NOT NULL DEFAULT 'VIDEO',
  "title" TEXT NOT NULL,
  "source" TEXT,
  "thumbnailUrl" TEXT,
  "linkUrl" TEXT NOT NULL,
  "publishedAt" TIMESTAMP(3),
  "isFeatured" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "doctor_media_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "doctor_media_sortOrder_idx" ON "doctor_media"("sortOrder");
CREATE INDEX "doctor_media_isVisible_sortOrder_idx" ON "doctor_media"("isVisible", "sortOrder");

CREATE TABLE "doctor_media_doctor" (
  "mediaId" TEXT NOT NULL,
  "doctorId" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "doctor_media_doctor_pkey" PRIMARY KEY ("mediaId", "doctorId"),
  CONSTRAINT "doctor_media_doctor_mediaId_fkey"
    FOREIGN KEY ("mediaId") REFERENCES "doctor_media"("id")
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "doctor_media_doctor_doctorId_fkey"
    FOREIGN KEY ("doctorId") REFERENCES "doctor"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "doctor_media_doctor_doctorId_sortOrder_idx"
  ON "doctor_media_doctor"("doctorId", "sortOrder");

INSERT INTO "doctor_media"
  ("id","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
SELECT
  "id","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt"
FROM "doctor_media_legacy";

INSERT INTO "doctor_media_doctor"
  ("mediaId","doctorId","sortOrder","createdAt")
SELECT "id","doctorId","sortOrder","createdAt"
FROM "doctor_media_legacy";

CREATE TABLE "medical_consultation_doctor" (
  "consultationId" INTEGER NOT NULL,
  "doctorId" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "medical_consultation_doctor_pkey" PRIMARY KEY ("consultationId", "doctorId"),
  CONSTRAINT "medical_consultation_doctor_consultationId_fkey"
    FOREIGN KEY ("consultationId") REFERENCES "medical_consultation"("id")
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "medical_consultation_doctor_doctorId_fkey"
    FOREIGN KEY ("doctorId") REFERENCES "doctor"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "medical_consultation_doctor_doctorId_sortOrder_idx"
  ON "medical_consultation_doctor"("doctorId", "sortOrder");

INSERT INTO "medical_consultation_doctor"
  ("consultationId","doctorId","sortOrder","createdAt")
SELECT "id","doctorId","sortOrder","createdAt"
FROM "medical_consultation"
WHERE "doctorId" IS NOT NULL;

DROP INDEX IF EXISTS "medical_consultation_doctorId_publishedAt_idx";
ALTER TABLE "medical_consultation"
  DROP CONSTRAINT IF EXISTS "medical_consultation_doctorId_fkey";
ALTER TABLE "medical_consultation"
  DROP COLUMN "doctorId";
CREATE INDEX "medical_consultation_sortOrder_idx"
  ON "medical_consultation"("sortOrder");

DROP TABLE "doctor_specialty_legacy";
DROP TABLE "doctor_schedule_legacy";
DROP TABLE "doctor_presentation_legacy";
DROP TABLE "doctor_review_legacy";
DROP TABLE "doctor_media_legacy";

COMMIT;
