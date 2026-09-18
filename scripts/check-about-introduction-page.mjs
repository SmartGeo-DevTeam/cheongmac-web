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
  'const INTRO_SPLASH_SECONDS = 2;',
  'INTRO_SPLASH_DURATION_MS',
  'INTRO_SPLASH_FADE_MS',
  'function IntroSplash({',
  'fixed inset-0 z-[200]',
  "setSplashPhase('fading')",
  "setSplashPhase('hidden')",
  'document.documentElement.style.overflow',
  'useInlineEditMode',
  '2초 인트로 다시 보기',
  'data-about-building-feature',
  'max-w-[1280px]',
  'xl:grid-cols-[minmax(0,737px)_minmax(0,543px)]',
  'xl:h-[868px]',
  'aspect-[737/868]',
  'xl:min-h-[868px]',
  'data-about-building-story',
  'buildingDescriptionPrimary',
  'buildingDescriptionSecondary',
  'buildingDescriptionClosingLead',
  'buildingPhilosophyLead',
  'buildingPhilosophyAccent',
  'buildingPhilosophySuffix',
  'buildingDescriptionClosing',
  'data-about-philosophy-accent',
  'notoSerifKR.className',
  'text-[#007A67]',
  'xl:text-[29px]',
]) {
  requireToken(component, token);
}


const introComponentSource = read(component);
const introTabStart = introComponentSource.indexOf('function IntroTab({');
const specialtyStart = introComponentSource.indexOf(
  'label="혈관 전문진료 영역"',
);
const introTabLead = introComponentSource.slice(
  introTabStart,
  specialtyStart,
);

if (
  introTabLead.includes(
    '<SectionEyebrow>{copy.introEyebrow}</SectionEyebrow>',
  ) ||
  introTabLead.includes('{copy.introTitle1}')
) {
  console.error(
    '❌ ABOUT_INTRODUCTION_CHECK 인트로 타이틀이 본문에 중복으로 쌓여 있습니다. full viewport splash에만 표시되어야 합니다.',
  );
  process.exit(1);
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
  "buildingImage: 'https://cheongmacmedia.blob.core.windows.net/assets/managed/inline/page-copy/about-introduction/buildingImage/27ccc246716079d6df11c8e8f571ca3da57cec693fa08230e29a51ebe0af0afa.png'",
  "historyHeroImage: '/assets/news/fifty-thousand.webp'",
  "contributionHeroImage: '/about-introduction/contribution-hero.webp'",
]) {
  requireToken(copy, token);
}


const aboutCopySource = read(copy);
if (
  aboutCopySource.includes(
    "{ key: 'buildingDescription', label: '병원소개 본문'",
  )
) {
  console.error(
    '❌ ABOUT_INTRODUCTION_CHECK 기존 단일 buildingDescription 필드가 남아 있습니다.',
  );
  process.exit(1);
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
  'ABOUT_INTRODUCTION_CHECK_OK — 청맥병원 소개 2초 full viewport 인트로·fade / 1280×868 대형 건물 비주얼 / 시안 본문·이인위본 강조 스타일 / Azure canonical 이미지 / 반응형 UI / ManagedPageItem DB / canonical 청맥뉴스 재사용 / 섹션별 인라인 편집 / 관리자·LNB 연결 확인',
);
