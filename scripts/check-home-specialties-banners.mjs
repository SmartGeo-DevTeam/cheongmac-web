import fs from 'node:fs';

const checks = [
  ['src/_lib/page-management-config.ts', "'common-content-banners'"],
  ['src/_lib/page-management-config.ts', "value: 'specialty'"],
  ['src/_lib/page-management-config.ts', "value: 'middle-banner'"],
  ['src/_lib/page-management-config.ts', "value: 'content-banner'"],
  ['src/_lib/managed-pages.ts', "case 'common-content-banners':"],
  ['src/_lib/managed-pages.ts', "state?.version === 1"],
  ['src/_lib/managed-pages.ts', "getHomeSpecialtiesManagedContent"],
  ['src/_lib/managed-pages.ts', "getHomeMiddleBannersManagedContent"],
  ['src/_lib/managed-pages.ts', "getCommonContentBannersManagedContent"],
  ['src/app/_components/home/2_specialties.tsx', 'pageKey="home"'],
  [
    'src/app/_components/home/2_specialties.tsx',
    'href="/admin/home/specialties"',
  ],
  ['src/app/_components/home/4_banners.tsx', 'pageKey="home"'],
  [
    'src/app/_components/home/4_banners.tsx',
    'href="/admin/home/middle-banner"',
  ],
  [
    'src/app/_components/common-content-banners/index.tsx',
    'getCommonContentBannersManagedContent',
  ],
  [
    'src/app/_components/home/7_notice.tsx',
    'CommonContentBanners',
  ],
  [
    'src/app/admin/_components/admin-sidebar.tsx',
    '공통 콘텐츠 배너',
  ],
  [
    'src/app/admin/_actions/managed-pages.ts',
    '메인 중간 배너는 1개만 활성화할 수 있습니다.',
  ],
  [
    'src/app/_actions/inline-managed-item.ts',
    '메인 중간 배너는 1개만 활성화할 수 있습니다.',
  ],
];

for (const [file, token] of checks) {
  if (!fs.existsSync(file)) {
    console.error(`❌ PHASE3_CHECK 필수 파일 누락: ${file}`);
    process.exit(1);
  }

  const source = fs.readFileSync(file, 'utf8');

  if (!source.includes(token)) {
    console.error(`❌ PHASE3_CHECK 연결 누락: ${file} -> ${token}`);
    process.exit(1);
  }
}

const homeCopy = fs.readFileSync('src/_lib/home-page-copy.ts', 'utf8');

for (let index = 1; index <= 8; index += 1) {
  const staleEditorField = `text(\`specialty${index}Title\``;
  const staleKey = `'specialty${index}Title',`;

  if (homeCopy.includes(staleEditorField)) {
    console.error(
      `❌ PHASE3_CHECK 진료분야 정적 편집 필드가 남아 있습니다: specialty${index}Title`,
    );
    process.exit(1);
  }

  const fieldKeySection = homeCopy.slice(
    homeCopy.indexOf('export const HOME_COPY_FIELD_KEYS'),
  );
  if (fieldKeySection.includes(staleKey)) {
    console.error(
      `❌ PHASE3_CHECK 진료분야 정적 fieldKeys가 남아 있습니다: specialty${index}Title`,
    );
    process.exit(1);
  }
}

const sidebar = fs.readFileSync(
  'src/app/admin/_components/admin-sidebar.tsx',
  'utf8',
);
const navIndex = sidebar.indexOf('LNB 메뉴 관리');
const commonIndex = sidebar.indexOf('공통 콘텐츠 배너');
const bottomIndex = sidebar.indexOf('공통 페이지 하단 배너');

if (
  navIndex < 0 ||
  commonIndex < 0 ||
  bottomIndex < 0 ||
  !(navIndex < commonIndex && commonIndex < bottomIndex)
) {
  console.error(
    '❌ PHASE3_CHECK 공통 콘텐츠 배너 메뉴가 LNB와 하단 배너 사이에 있지 않습니다.',
  );
  process.exit(1);
}

console.log(
  'PHASE3_HOME_SPECIALTIES_BANNERS_CHECK_OK — 진료분야 카드/중간 배너 ManagedPageItem, 재사용 공통 콘텐츠 배너, 관리자 메뉴 순서 연결 확인',
);
