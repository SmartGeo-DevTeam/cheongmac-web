import fs from 'node:fs';

const checks = [
  ['src/app/_actions/inline-managed-item.ts', 'saveInlineManagedItem'],
  ['src/app/_components/inline-editor/managed-item-edit-button.tsx', '빠른 수정'],
  ['src/app/_components/inline-editor/managed-item-edit-button.tsx', '전체 관리'],
  ['src/app/_components/inline-editor/managed-item-edit-button.tsx', '관리자에서 상세 수정'],
  ['src/app/_components/inline-editor/editable-page-copy-block.tsx', 'getPublicPageManagement'],
  ['src/app/_components/inline-editor/editable-page-copy-block.tsx', 'secondaryAdminHref'],
  ['src/app/_components/inline-editor/editable-region.tsx', 'secondaryAdminHref?: string'],
  ['src/_lib/public-page-management.ts', "'/education-research/exchange'"],
  ['src/_lib/public-page-management.ts', "'/education-research/society'"],
  ['src/_lib/public-page-management.ts', "'/guide/partner-hospital'"],
  ['src/_lib/public-page-management.ts', "'/community/cases'"],
  ['src/app/community/cases/page.tsx', 'EditablePageCopyBlock path="/community/cases"'],
  ['src/app/community/cases/_components/treatment-case-list.tsx', 'pageKey="cases"'],
  ['src/app/admin/common/page-copy/page.tsx', '페이지 정적 문구·링크 관리'],
  ['src/app/admin/common/page-copy/page-copy-admin-client.tsx', 'saveInlineContentBlock'],
  ['src/app/admin/_components/admin-sidebar.tsx', '페이지 정적 문구·링크'],
  ['src/app/_components/more-socials/index.tsx', 'socialYoutubeHref'],
  ['src/app/community/news/page.tsx', '<MoreSocials copy={copy} />'],
  ['src/app/community/customer-voice/_components/customer-voice-overview.tsx', 'copy.step1Label'],
  ['src/app/community/customer-voice/_components/customer-voice-overview.tsx', 'copy.testimonialPrevLabel'],
];

for (const [file, token] of checks) {
  if (!fs.existsSync(file)) {
    console.error(`❌ 필수 파일 누락: ${file}`);
    process.exit(1);
  }

  const source = fs.readFileSync(file, 'utf8');
  if (!source.includes(token)) {
    console.error(`❌ Inline CMS v2 연결 검사 실패: ${file} -> ${token}`);
    process.exit(1);
  }
}

const copy = fs.readFileSync('src/_lib/public-page-copy.ts', 'utf8');

for (const token of [
  "'/community/cases'",
  'socialHeading',
  'socialYoutubeHref',
  'socialYoutubeIcon',
  'socialBlogHref',
  'socialInstagramHref',
  'testimonialPrevLabel',
  'testimonialNextLabel',
  'step1Label',
  'doctorListHeading',
]) {
  if (!copy.includes(token)) {
    console.error(`❌ PageContentBlock 정적 문구 설정 누락: ${token}`);
    process.exit(1);
  }
}

const management = fs.readFileSync(
  'src/_lib/public-page-management.ts',
  'utf8',
);

for (const path of [
  '/about/doctors',
  '/about/tour',
  '/about/equipment',
  '/education-research/society',
  '/education-research/exchange',
  '/community/cases',
  '/community/consultation',
  '/community/customer-voice',
  '/community/notice',
  '/community/news',
  '/guide/partner-hospital',
]) {
  if (!management.includes(`'${path}'`)) {
    console.error(`❌ 전체 관리 경로 누락: ${path}`);
    process.exit(1);
  }
}

const doctorSections = fs.readFileSync(
  'src/app/about/doctors/[doctorSlug]/_components/doctor-sections.tsx',
  'utf8',
);

for (const token of [
  '#admin-doctor-images',
  '#admin-doctor-basic',
  '#admin-doctor-careers',
  '#admin-related-content-list',
]) {
  if (!doctorSections.includes(token)) {
    console.error(`❌ 의료진 관리자 정확한 포커스 링크 누락: ${token}`);
    process.exit(1);
  }
}

console.log(
  'INLINE_CMS_V2_CHECK_OK — 빠른 아이템 Dialog / 전체 관리 경로 / 치료사례 / 정적 PageContentBlock / 소셜 링크 관리 연결 확인',
);
