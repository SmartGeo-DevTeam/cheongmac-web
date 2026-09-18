import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

function source(file) {
  if (!fs.existsSync(file)) {
    console.error(`❌ FINAL_CMS_AUDIT 필수 파일 누락: ${file}`);
    process.exit(1);
  }

  return fs.readFileSync(file, 'utf8');
}

function requireToken(file, token) {
  const value = source(file);

  if (!value.includes(token)) {
    console.error(
      `❌ FINAL_CMS_AUDIT 연결 누락: ${file} -> ${token}`,
    );
    process.exit(1);
  }
}

const delegatedChecks = [
  'scripts/check-inline-content-editor.mjs',
  'scripts/check-inline-editor-hybrid.mjs',
  'scripts/check-inline-editor-all-pages.mjs',
  'scripts/check-collection-admin-links-final.mjs',
  'scripts/check-admin-audit-history.mjs',
  'scripts/check-admin-list-history-ui.mjs',
  'scripts/check-about-introduction-page.mjs',
  'scripts/check-membership-session-guard.mjs',
  'scripts/check-inline-cms-v2.mjs',
  'scripts/check-inline-cms-v3.mjs',
  'scripts/check-home-cover-managed.mjs',
  'scripts/check-home-specialties-banners.mjs',
  'scripts/check-home-doctors-canonical.mjs',
  'scripts/check-home-reviews-canonical.mjs',
  'scripts/check-home-notice-canonical.mjs',
];

for (const script of delegatedChecks) {
  if (!fs.existsSync(script)) {
    console.error(`❌ FINAL_CMS_AUDIT 검사 스크립트 누락: ${script}`);
    process.exit(1);
  }

  execFileSync(process.execPath, [script], {
    stdio: 'inherit',
  });
}

// 1. Dialog: 연결 데이터 상세 관리가 직접 수정 필드보다 위에 있어야 합니다.
const editableRegion = source(
  'src/app/_components/inline-editor/editable-region.tsx',
);
const detailedIndex = editableRegion.indexOf(
  '연결 데이터 상세 관리',
);
const directFieldsIndex = editableRegion.indexOf(
  '<div className="space-y-5">',
  detailedIndex,
);

if (
  detailedIndex < 0 ||
  directFieldsIndex < 0 ||
  detailedIndex > directFieldsIndex
) {
  console.error(
    '❌ FINAL_CMS_AUDIT 연결 데이터 상세 관리가 직접 수정 필드 위에 있지 않습니다.',
  );
  process.exit(1);
}

// 2. 학회활동 / 학술교류 전체관리 직접 연결.
requireToken(
  'src/app/education-research/society/_components/society-activities-content.tsx',
  '/admin/pages/society',
);
requireToken(
  'src/app/education-research/exchange/_components/academic-exchange-content.tsx',
  '/admin/pages/exchange',
);

// 3. 메인 데이터 단일화 핵심 연결.
const homeIndex = source(
  'src/app/_components/home/index.tsx',
);
for (const token of [
  'getHomeCoverManagedContent',
  'getHomeSpecialtiesManagedContent',
  'getHomeMiddleBannersManagedContent',
  'getHomeDoctors',
  'getHomeReviews',
]) {
  if (!homeIndex.includes(token)) {
    console.error(
      `❌ FINAL_CMS_AUDIT 메인 canonical loader 누락: ${token}`,
    );
    process.exit(1);
  }
}

requireToken(
  'src/app/_components/home/8_info.tsx',
  'getNoticeManagedContent',
);
requireToken(
  'src/app/_components/common-content-banners/index.tsx',
  'getCommonContentBannersManagedContent',
);

// 4. 공통 콘텐츠 배너 메뉴 순서: LNB -> 공통 콘텐츠 배너 -> 하단 배너.
const sidebar = source(
  'src/app/admin/_components/admin-sidebar.tsx',
);
const navIndex = sidebar.indexOf('/admin/common/navigation');
const contentBannerIndex = sidebar.indexOf(
  '/admin/pages/common-content-banners',
);
const bottomBannerIndex = sidebar.indexOf(
  '/admin/common/bottom-banners',
);

if (
  navIndex < 0 ||
  contentBannerIndex < 0 ||
  bottomBannerIndex < 0 ||
  !(navIndex < contentBannerIndex &&
    contentBannerIndex < bottomBannerIndex)
) {
  console.error(
    '❌ FINAL_CMS_AUDIT 공통 콘텐츠 배너 관리자 메뉴 순서가 올바르지 않습니다.',
  );
  process.exit(1);
}

// 5. PageContentBlock 저장 시 config에 존재하지 않는 구형 key를 다시 저장하지 않도록 제한.
for (const [file, token] of [
  [
    'src/_lib/inline-content-shared.ts',
    'export function pickInlineContentData(',
  ],
  [
    'src/app/_components/inline-editor/editable-page-copy-region.tsx',
    'pickInlineContentData(',
  ],
  [
    'src/app/_components/inline-editor/editable-page-copy-block.tsx',
    'pickInlineContentData(',
  ],
  [
    'src/app/admin/common/page-copy/page.tsx',
    'pickInlineContentData(',
  ],
]) {
  requireToken(file, token);
}

// 6. 코드 기본값에 canonical DB로 이관된 중복 데이터가 다시 생기지 않았는지 검사.
const homeCopy = source('src/_lib/home-page-copy.ts');

const obsoleteHomeCopyTokens = [
  'coverSlide1TitleLead',
  'coverSlide2TitleLead',
  'coverSlide3TitleLead',
  'coverPopup1Title',
  'coverPopup2Title',
  'coverPopup3Title',
  'specialty1Title',
  'specialty8Title',
  'doctorQuote1',
  'doctorQuote6',
  'reviewCategory1',
  'reviewsMainQuote',
  'reviewsPatientName',
  'videoReview1Title',
  'videoReview3Keyword3',
  'info1Category',
  'info9Description',
];

for (const token of obsoleteHomeCopyTokens) {
  if (homeCopy.includes(token)) {
    console.error(
      `❌ FINAL_CMS_AUDIT 메인 PageContentBlock 구형 중복 기본값이 남아 있습니다: ${token}`,
    );
    process.exit(1);
  }
}

// 7. 실제 DB JSON에서도 이전 key를 제거하는 migration이 있어야 합니다.
const cleanupMigration =
  'prisma/migrations/20260915_000011_home_page_copy_legacy_cleanup/migration.sql';

for (const token of [
  'UPDATE "page_content_block"',
  '"data" = "data" - ARRAY[',
  "'coverSlide1TitleLead'",
  "'specialty1Title'",
  "'doctorQuote1'",
  "'reviewsMainQuote'",
  "'info1Category'",
]) {
  requireToken(cleanupMigration, token);
}

console.log(
  'INLINE_CMS_FINAL_AUDIT_OK — 최초 요청 범위의 관리자 연결 / 메인 canonical DB / 공통 배너 / PageContentBlock 중복 데이터 정리 및 재유입 방지 확인',
);
