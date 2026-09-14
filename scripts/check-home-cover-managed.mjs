import fs from 'node:fs';

const checks = [
  [
    'src/_lib/page-management-config.ts',
    "'home'",
  ],
  [
    'src/_lib/page-management-config.ts',
    "value: 'slide'",
  ],
  [
    'src/_lib/page-management-config.ts',
    "value: 'popup'",
  ],
  [
    'src/_lib/managed-pages.ts',
    "case 'home':",
  ],
  [
    'src/_lib/managed-pages.ts',
    'getHomeCoverManagedContent',
  ],
  [
    'src/app/_components/home/index.tsx',
    'getHomeCoverManagedContent',
  ],
  [
    'src/app/_components/home/1_cover.tsx',
    'pageKey="home"',
  ],
  [
    'src/app/_components/home/1_cover.tsx',
    'href="/admin/pages/home"',
  ],
  [
    'src/app/admin/_actions/managed-pages.ts',
    '메인 팝업은 최대 3개까지만 동시에 노출할 수 있습니다.',
  ],
  [
    'src/app/admin/_actions/managed-pages.ts',
    '먼저 비활성화한 뒤 삭제할 수 있습니다.',
  ],
  [
    'src/app/_actions/inline-managed-item.ts',
    '메인 팝업은 최대 3개까지만 동시에 노출할 수 있습니다.',
  ],
  [
    'src/app/admin/_components/admin-sidebar.tsx',
    '메인페이지',
  ],
];

for (const [file, token] of checks) {
  if (!fs.existsSync(file)) {
    console.error(`❌ HOME_COVER_MANAGED_CHECK 필수 파일 누락: ${file}`);
    process.exit(1);
  }

  const source = fs.readFileSync(file, 'utf8');

  if (!source.includes(token)) {
    console.error(
      `❌ HOME_COVER_MANAGED_CHECK 연결 누락: ${file} -> ${token}`,
    );
    process.exit(1);
  }
}

const homeCopy = fs.readFileSync(
  'src/_lib/home-page-copy.ts',
  'utf8',
);

for (const staleField of [
  "text('coverSlide1TitleLead'",
  "text('coverSlide2TitleLead'",
  "text('coverSlide3TitleLead'",
  "text('coverPopup1Title'",
  "text('coverPopup2Title'",
  "text('coverPopup3Title'",
]) {
  if (homeCopy.includes(staleField)) {
    console.error(
      `❌ HOME_COVER_MANAGED_CHECK 정적 커버 필드가 남아 있습니다: ${staleField}`,
    );
    process.exit(1);
  }
}

for (const commonField of [
  'coverPopupCountdownSuffix',
  'coverPopupCloseNow',
  'coverPopupHideToday',
]) {
  if (!homeCopy.includes(commonField)) {
    console.error(
      `❌ HOME_COVER_MANAGED_CHECK 팝업 공통 문구 누락: ${commonField}`,
    );
    process.exit(1);
  }
}

console.log(
  'HOME_COVER_MANAGED_CHECK_OK — 메인 슬라이드/팝업 ManagedPageItem, 최대 3개 팝업, 비활성화 후 삭제, 인라인 수정 연결 확인',
);
