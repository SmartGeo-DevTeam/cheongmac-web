import fs from 'node:fs';

function read(file) {
  if (!fs.existsSync(file)) {
    console.error(`❌ ABOUT_INTRODUCTION_CHECK 파일 누락: ${file}`);
    process.exit(1);
  }
  return fs.readFileSync(file, 'utf8');
}

function requireToken(file, token) {
  const source = read(file);
  if (!source.includes(token)) {
    console.error(
      `❌ ABOUT_INTRODUCTION_CHECK 연결 누락: ${file} -> ${token}`,
    );
    process.exit(1);
  }
}

const page = 'src/app/about/introduction/page.tsx';
for (const token of [
  "export const dynamic = 'force-dynamic'",
  'NavigationPageHeader',
  'navigationPath="/about/introduction"',
  'getAboutIntroductionManagedContent',
  'getNewsManagedContent',
  'getPageContentBlock',
  "'/about/introduction'",
]) {
  requireToken(page, token);
}

const component =
  'src/app/about/introduction/_components/about-introduction-content.tsx';

for (const token of [
  'EditablePageCopyRegion',
  'CollectionAdminEditButton',
  'ManagedItemEditButton',
  'pageKey="about-introduction"',
  'href="/admin/pages/about-introduction',
  "useState<AboutTab>('intro')",
  "'history'",
  "'contribution'",
  'href={`/community/news/${item.id}`}',
]) {
  requireToken(component, token);
}

if (read(component).includes('NEWS_ITEMS')) {
  console.error(
    '❌ ABOUT_INTRODUCTION_CHECK 사회공헌 최근소식은 NEWS_ITEMS 정적 데이터를 직접 사용하면 안 됩니다.',
  );
  process.exit(1);
}

const config = 'src/_lib/page-management-config.ts';
for (const token of [
  "'about-introduction'",
  "value: 'specialty-card'",
  "value: 'why-point'",
  "value: 'promise'",
  "value: 'quick-link'",
  "value: 'overview-row'",
  "value: 'history-year'",
  "value: 'contribution-activity'",
]) {
  requireToken(config, token);
}

const managed = 'src/_lib/managed-pages.ts';
for (const token of [
  "case 'about-introduction'",
  'getAboutIntroductionManagedContent',
  "publicRows('about-introduction')",
  "action: 'MANAGED_PAGE_SEED'",
]) {
  requireToken(managed, token);
}

const copy = 'src/_lib/public-page-copy.ts';
for (const token of [
  "'/about/introduction'",
  "buildingImage: '/about-introduction/building.webp'",
  "historyHeroImage: '/assets/news/fifty-thousand.webp'",
  "contributionHeroImage: '/about-introduction/contribution-hero.webp'",
]) {
  requireToken(copy, token);
}

requireToken(
  'src/_lib/public-page-management.ts',
  "'/about/introduction'",
);
requireToken(
  'src/_lib/public-page-management.ts',
  "href: '/admin/pages/about-introduction'",
);

const migration =
  'prisma/migrations/20260918_000013_about_introduction_page/migration.sql';
for (const token of [
  "'about-introduction'",
  "'청맥병원 소개'",
  "'/about/introduction'",
  'WHERE "id" = \'about\'',
  "'SYSTEM_NAVIGATION_ABOUT_INTRODUCTION_CHANGE'",
]) {
  requireToken(migration, token);
}

for (const file of [
  'public/about-introduction/building.webp',
  'public/about-introduction/story-collage.webp',
  'public/about-introduction/why-center.webp',
  'public/about-introduction/contribution-hero.webp',
  'public/about-introduction/contribution-01.webp',
  'public/about-introduction/contribution-10.webp',
]) {
  if (!fs.existsSync(file)) {
    console.error(`❌ ABOUT_INTRODUCTION_CHECK seed 이미지 누락: ${file}`);
    process.exit(1);
  }
}

requireToken(
  'src/app/admin/_components/admin-sidebar.tsx',
  '청맥병원 소개',
);
requireToken(
  'src/app/admin/_components/admin-sidebar.tsx',
  'href="/admin/pages/about-introduction"',
);

console.log(
  'ABOUT_INTRODUCTION_CHECK_OK — 청맥병원 소개 반응형 UI / ManagedPageItem DB / canonical 청맥뉴스 재사용 / 섹션별 인라인 편집 / 관리자·LNB 연결 확인',
);
