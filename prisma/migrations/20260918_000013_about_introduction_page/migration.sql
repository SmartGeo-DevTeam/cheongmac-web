-- 청맥병원 소개 페이지를 병원 소개 LNB의 첫 번째 메뉴로 추가합니다.
UPDATE "navigation_menu"
SET
  "href" = '/about/introduction',
  "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'about';

UPDATE "navigation_menu"
SET
  "sortOrder" = "sortOrder" + 1,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE "parentId" = 'about';

INSERT INTO "navigation_menu"
  (
    "id",
    "parentId",
    "title",
    "href",
    "sortOrder",
    "isVisible",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    'about-introduction',
    'about',
    '청맥병원 소개',
    '/about/introduction',
    0,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  )
ON CONFLICT ("id") DO UPDATE
SET
  "parentId" = EXCLUDED."parentId",
  "title" = EXCLUDED."title",
  "href" = EXCLUDED."href",
  "sortOrder" = EXCLUDED."sortOrder",
  "isVisible" = EXCLUDED."isVisible",
  "updatedAt" = CURRENT_TIMESTAMP;


INSERT INTO "admin_audit_log"
  (
    "id",
    "actorId",
    "actorName",
    "action",
    "targetType",
    "targetId",
    "source",
    "sourcePath",
    "operation",
    "beforeData",
    "afterData",
    "changedFields",
    "metadata",
    "createdAt"
  )
VALUES
  (
    'migration-about-introduction-navigation',
    NULL,
    'SYSTEM',
    'SYSTEM_NAVIGATION_ABOUT_INTRODUCTION_CHANGE',
    'NavigationMenu',
    'about-introduction',
    'SYSTEM',
    '/admin/common/navigation',
    'CHANGE',
    jsonb_build_object(
      'parentHref', '/about/doctors',
      'childExists', false
    ),
    jsonb_build_object(
      'parentHref', '/about/introduction',
      'childTitle', '청맥병원 소개',
      'childHref', '/about/introduction',
      'sortOrder', 0
    ),
    ARRAY['href', 'children', 'sortOrder']::TEXT[],
    jsonb_build_object(
      'migration', '20260918_000013_about_introduction_page'
    ),
    CURRENT_TIMESTAMP
  )
ON CONFLICT ("id") DO NOTHING;
