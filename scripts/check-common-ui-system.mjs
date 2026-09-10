import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const errors = [];

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function requireText(file, token, message) {
  const source = read(file);
  if (!source.includes(token)) {
    errors.push(`${file}: ${message}`);
  }
}

function forbidText(file, token, message) {
  const source = read(file);
  if (source.includes(token)) {
    errors.push(`${file}: ${message}`);
  }
}

const tabChecks = [
  ['src/app/about/doctors/_components/doctor-department-tabs.tsx', 'id="about-doctors-department-tabs"'],
  ['src/app/about/tour/_components/hospital-tour-content.tsx', 'id="hospital-tour-view-tabs"'],
  ['src/app/about/equipment/_components/medical-equipment-content.tsx', 'id="medical-equipment-category-tabs"'],
  ['src/app/education-research/society/_components/society-activities-content.tsx', 'id="society-year-tabs"'],
  ['src/app/community/cases/_components/treatment-case-list.tsx', 'id="treatment-case-filter-tabs"'],
  ['src/app/community/notice/_components/notice-list.tsx', 'id="notice-filter-tabs"'],
  ['src/app/community/news/_components/news-board.tsx', 'id="news-filter-tabs"'],
  ['src/app/guide/partner-hospital/_components/partner-hospital-content.tsx', 'id="partner-hospital-filter-tabs"'],
];

for (const [file, token] of tabChecks) {
  requireText(file, token, '공통 FilterTabs에 안정적인 DOM id가 필요합니다.');
}

const paginationChecks = [
  ['src/app/education-research/exchange/_components/academic-exchange-content.tsx', 'id="academic-exchange-pagination"'],
  ['src/app/guide/partner-hospital/_components/partner-hospital-content.tsx', 'id="partner-hospital-pagination"'],
  ['src/app/community/notice/_components/notice-list.tsx', 'id="notice-pagination"'],
  ['src/app/community/news/_components/news-board.tsx', 'id="news-pagination"'],
  ['src/app/community/cases/_components/treatment-case-list.tsx', 'id="treatment-case-pagination"'],
  ['src/app/community/consultation/_components/consultation-board.tsx', 'id="consultation-pagination-desktop"'],
  ['src/app/community/consultation/_components/consultation-board.tsx', 'id="consultation-pagination-mobile"'],
  ['src/app/community/consultation/[id]/_components/consultation-detail-pagination.tsx', 'id="consultation-detail-pagination"'],
];

for (const [file, token] of paginationChecks) {
  requireText(file, token, '공통 Pagination에 안정적인 DOM id가 필요합니다.');
}

forbidText(
  'src/app/guide/partner-hospital/_components/partner-hospital-content.tsx',
  'const PAGE_NUMBERS',
  '의료협약병원 개별 pagination 상수가 남아 있습니다.',
);

forbidText(
  'src/app/community/consultation/_components/consultation-board.tsx',
  'function Pagination(',
  '의학상담 개별 Pagination 컴포넌트가 남아 있습니다.',
);

const cardChecks = [
  ['src/app/about/equipment/_components/medical-equipment-content.tsx', 'medical-equipment-card-'],
  ['src/app/education-research/exchange/_components/academic-exchange-content.tsx', 'academic-exchange-card-'],
  ['src/app/community/cases/_components/treatment-case-list.tsx', 'treatment-case-card-'],
  ['src/app/community/notice/_components/notice-list.tsx', 'notice-feature-card-'],
  ['src/app/community/news/_components/news-board.tsx', 'news-card-desktop-'],
  ['src/app/guide/partner-hospital/_components/partner-hospital-content.tsx', 'partner-hospital-card-'],
];

for (const [file, token] of cardChecks) {
  requireText(file, token, '요청된 카드 UI가 ContentCard variant를 사용해야 합니다.');
}

requireText(
  'src/app/layout.tsx',
  '<PageBottomBanners items={pageBottomBanners} />',
  '공통 하단 배너는 RootLayout에서 한 번만 렌더링해야 합니다.',
);

forbidText(
  'src/app/about/doctors/page.tsx',
  '<BottomBanner',
  '특정 페이지에 하단 배너를 직접 삽입하지 않습니다.',
);

requireText(
  'prisma/schema.prisma',
  'model PageBottomBanner',
  '공통 하단 배너 DB 모델이 필요합니다.',
);

requireText(
  'src/app/admin/_components/admin-sidebar.tsx',
  '/admin/common/bottom-banners',
  '관리자 공통 메뉴에 하단 배너 관리 메뉴가 필요합니다.',
);

if (errors.length) {
  console.error('\nCommon UI system check failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  console.error('');
  process.exit(1);
}

console.log('Common UI system check passed.');
