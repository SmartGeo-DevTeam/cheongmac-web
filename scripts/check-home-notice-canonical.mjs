import fs from 'node:fs';

const checks = [
  [
    'src/app/_components/home/8_info.tsx',
    'getNoticeManagedContent',
  ],
  [
    'src/app/_components/home/8_info.tsx',
    'href="/admin/pages/notice"',
  ],
  [
    'src/app/_components/home/8_info.tsx',
    'pageKey="notice"',
  ],
  [
    'src/app/_components/home/8_info.tsx',
    'sortableNoticeDate(b.date) - sortableNoticeDate(a.date)',
  ],
  [
    'src/app/_components/home/8_info.tsx',
    '/community/notice/${encodeURIComponent(',
  ],
  [
    'src/app/_actions/inline-managed-item.ts',
    "if (pageKey === 'notice')",
  ],
  [
    'src/app/admin/_actions/managed-pages.ts',
    "if (pageKey === 'notice')",
  ],
];

for (const [file, token] of checks) {
  if (!fs.existsSync(file)) {
    console.error(
      `❌ HOME_NOTICE_CANONICAL_CHECK 필수 파일 누락: ${file}`,
    );
    process.exit(1);
  }

  const source = fs.readFileSync(file, 'utf8');

  if (!source.includes(token)) {
    console.error(
      `❌ HOME_NOTICE_CANONICAL_CHECK 연결 누락: ${file} -> ${token}`,
    );
    process.exit(1);
  }
}

const homeInfo = fs.readFileSync(
  'src/app/_components/home/8_info.tsx',
  'utf8',
);

for (const token of [
  'const noticeHrefs',
  'info1Category',
  'info9Description',
  "href={notice.href}",
  'target="_blank"',
]) {
  if (homeInfo.includes(token)) {
    console.error(
      `❌ HOME_NOTICE_CANONICAL_CHECK 메인 병원소식 하드코딩/기존 링크가 남아 있습니다: ${token}`,
    );
    process.exit(1);
  }
}

const homeCopy = fs.readFileSync(
  'src/_lib/home-page-copy.ts',
  'utf8',
);

for (const token of [
  'info1Category',
  'info1Date',
  'info1Title',
  'info1Description',
  'info9Category',
  'info9Description',
  'Array.from({ length: 9 }',
]) {
  if (homeCopy.includes(token)) {
    console.error(
      `❌ HOME_NOTICE_CANONICAL_CHECK PageContentBlock 병원소식 중복 데이터가 남아 있습니다: ${token}`,
    );
    process.exit(1);
  }
}

for (const file of [
  'src/app/_actions/inline-managed-item.ts',
  'src/app/admin/_actions/managed-pages.ts',
]) {
  const source = fs.readFileSync(file, 'utf8');

  const noticeBlock = source.indexOf(
    "if (pageKey === 'notice')",
  );

  if (
    noticeBlock < 0 ||
    !source
      .slice(noticeBlock, noticeBlock + 120)
      .includes("revalidatePath('/');")
  ) {
    console.error(
      `❌ HOME_NOTICE_CANONICAL_CHECK 메인 revalidate 누락: ${file}`,
    );
    process.exit(1);
  }
}

console.log(
  'HOME_NOTICE_CANONICAL_CHECK_OK — 메인 병원소식 notice ManagedPageItem 단일화 / 최신 날짜순 / 전체관리·개별 빠른편집 / 중복 정적 데이터 제거 확인',
);
