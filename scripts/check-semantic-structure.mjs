import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function walk(directory) {
  const absolute = path.join(ROOT, directory);
  const entries = fs.readdirSync(absolute, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const relative = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      results.push(...walk(relative));
      continue;
    }

    results.push(relative);
  }

  return results;
}

const errors = [];

function requireText(file, token, message) {
  const source = read(file);
  if (!source.includes(token)) errors.push(`${file}: ${message}`);
}

function forbidText(file, token, message) {
  const source = read(file);
  if (source.includes(token)) errors.push(`${file}: ${message}`);
}

function count(source, pattern) {
  return source.match(pattern)?.length ?? 0;
}

const homeCover = read('src/app/_components/home/1_cover.tsx');
const homeH1Count = count(homeCover, /<h1\b/g);
if (homeH1Count !== 1) {
  errors.push(
    `src/app/_components/home/1_cover.tsx: 메인 페이지 H1은 정확히 1개여야 합니다. 현재 ${homeH1Count}개`,
  );
}

requireText(
  'src/app/_components/main-section-header/index.tsx',
  '<h2',
  'MainSectionHeader의 section title은 H2여야 합니다.',
);
forbidText(
  'src/app/_components/main-section-header/index.tsx',
  '<h1',
  'MainSectionHeader에서 H1을 사용하면 메인 페이지 H1이 중복됩니다.',
);

requireText(
  'src/app/_components/ui/page-header.tsx',
  "titleAs = 'h1'",
  'PageHeader 기본 제목은 H1이어야 합니다.',
);
requireText(
  'src/app/_components/ui/page-header.tsx',
  'id={`${componentId}-content-gap`}',
  'PageHeader 공통 content gap이 필요합니다.',
);
requireText(
  'src/app/_components/ui/page-header.tsx',
  'className="h-12 xl:h-20"',
  'PageHeader 이후 콘텐츠 여백은 mobile 48px / desktop 80px 기준이어야 합니다.',
);

const publicPages = walk('src/app')
  .filter((file) => file.endsWith('/page.tsx') || file === 'src/app/page.tsx')
  .filter(
    (file) =>
      !file.startsWith('src/app/admin/') &&
      !file.startsWith('src/app/auth/') &&
      !file.startsWith('src/app/signin/') &&
      !file.startsWith('src/app/join/'),
  );

for (const file of publicPages) {
  const source = read(file);

  if (/<main\b/.test(source)) {
    errors.push(
      `${file}: RootLayout이 이미 유일한 <main> landmark를 제공하므로 page.tsx에 중복 <main>을 만들지 마세요.`,
    );
  }
}

const detailRules = [
  {
    page: 'src/app/about/doctors/[doctorSlug]/page.tsx',
    component: 'src/app/about/doctors/[doctorSlug]/page.tsx',
  },
  {
    page: 'src/app/community/news/[id]/page.tsx',
    component: 'src/app/community/news/[id]/page.tsx',
  },
  {
    page: 'src/app/community/consultation/[id]/page.tsx',
    component: 'src/app/community/consultation/[id]/page.tsx',
  },
  {
    page: 'src/app/community/cases/[id]/page.tsx',
    component: 'src/app/community/cases/_components/treatment-case-detail.tsx',
  },
  {
    page: 'src/app/community/notice/[id]/page.tsx',
    component: 'src/app/community/notice/_components/notice-detail.tsx',
  },
];

for (const rule of detailRules) {
  requireText(
    rule.page,
    'titleAs="div"',
    '상세 페이지의 공통 PageHeader는 visual label로 렌더링하고 실제 콘텐츠 제목을 H1으로 사용해야 합니다.',
  );
  requireText(
    rule.component,
    '<h1',
    '상세 콘텐츠의 실제 제목 H1이 필요합니다.',
  );
}

const hierarchyRules = [
  ['src/app/about/doctors/page.tsx', 'doctor-list-heading'],
  [
    'src/app/about/equipment/_components/medical-equipment-content.tsx',
    'medical-equipment-list-heading',
  ],
  ['src/app/community/news/_components/news-board.tsx', 'news-list-heading'],
  [
    'src/app/community/consultation/_components/consultation-board.tsx',
    'consultation-list-heading',
  ],
  [
    'src/app/community/cases/_components/treatment-case-list.tsx',
    'treatment-case-list-heading',
  ],
];

for (const [file, id] of hierarchyRules) {
  requireText(
    file,
    id,
    `목록 카드의 H3 상위에 의미 있는 H2(${id})가 필요합니다.`,
  );
}

forbidText(
  'src/app/_components/home/8_info.tsx',
  '<h4',
  '공지 카테고리는 heading이 아니므로 H4를 사용하지 않습니다.',
);

requireText(
  'src/app/community/consultation/[id]/page.tsx',
  'consultation-answer-heading',
  '질문/답변 구조를 명확히 하기 위한 답변 H2가 필요합니다.',
);

if (errors.length) {
  console.error('\nSemantic structure check failed:\n');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  console.error('');
  process.exit(1);
}

console.log('Semantic structure check passed.');
