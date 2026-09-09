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

forbidText(
  'src/_lib/navigation.ts',
  'export const NAVIGATION',
  'NavigationMenu DB가 단일 Source of Truth이므로 하드코딩 NAVIGATION fallback을 두지 않습니다.',
);

requireText(
  'src/_lib/navigation.ts',
  "import { cache } from 'react';",
  'Navigation DB 조회는 React cache로 같은 RSC 요청에서 dedupe되어야 합니다.',
);
requireText(
  'src/_lib/navigation.ts',
  'const getNavigationRows = cache(',
  'RootLayout과 PageHeader가 같은 Navigation row 조회를 공유해야 합니다.',
);
requireText(
  'src/_lib/navigation.ts',
  'getNavigationPageContext',
  'PageHeader용 Navigation DB context resolver가 필요합니다.',
);
requireText(
  'src/_lib/navigation-shared.ts',
  'resolveNavigationLevels',
  'Breadcrumb와 서버 PageHeader가 공유하는 navigation resolver가 필요합니다.',
);
requireText(
  'src/_lib/navigation-shared.ts',
  'candidate.length > current.length',
  '상위/첫 하위 메뉴 href가 같아도 더 깊은 하위 메뉴를 선택해야 합니다.',
);

requireText(
  'src/app/_components/ui/breadcrumb.tsx',
  "from '@/_lib/navigation-shared'",
  'Breadcrumb는 Prisma가 포함된 server navigation module이 아니라 client-safe resolver를 사용해야 합니다.',
);
requireText(
  'src/app/_components/ui/navigation-page-header.tsx',
  'getNavigationPageContext',
  'NavigationPageHeader는 DB context에서 title/breadcrumb fallback을 구성해야 합니다.',
);

const navigationHeaderFiles = [
  'src/app/about/doctors/page.tsx',
  'src/app/about/doctors/[doctorSlug]/page.tsx',
  'src/app/about/equipment/page.tsx',
  'src/app/about/tour/page.tsx',
  'src/app/education-research/exchange/page.tsx',
  'src/app/education-research/society/page.tsx',
  'src/app/guide/partner-hospital/page.tsx',
  'src/app/community/cases/_components/treatment-case-page-header.tsx',
  'src/app/community/consultation/_components/consultation-page-header.tsx',
  'src/app/community/customer-voice/_components/customer-voice-page-header.tsx',
  'src/app/community/notice/_components/notice-page-header.tsx',
  'src/app/community/news/page.tsx',
  'src/app/community/news/[id]/page.tsx',
];

for (const file of navigationHeaderFiles) {
  requireText(
    file,
    'NavigationPageHeader',
    'LNB 등록 페이지의 상단 제목/Breadcrumb는 Navigation DB 기반 컴포넌트를 사용해야 합니다.',
  );
  forbidText(
    file,
    'breadcrumbs={[',
    'Navigation DB에 이미 있는 Breadcrumb label을 페이지에 다시 하드코딩하지 않습니다.',
  );
}

forbidText(
  'src/app/about/doctors/page.tsx',
  'title="의료진/진료과"',
  '의료진 목록 PageHeader title은 Navigation DB에서 읽어야 합니다.',
);
forbidText(
  'src/app/about/doctors/[doctorSlug]/page.tsx',
  'title="의료진 상세보기"',
  '의료진 상세 상단 section title도 Navigation DB title을 사용하고 실제 의료진 이름을 H1으로 유지합니다.',
);

requireText(
  'src/app/layout.tsx',
  'getPrimaryNavigation()',
  '최초 요청에서 RootLayout이 Navigation DB를 확보해야 합니다.',
);
requireText(
  'src/app/layout.tsx',
  '<NavigationProvider navigation={primaryNavigation}>',
  '최초 Navigation 데이터를 Header/Breadcrumb client context에 전달해야 합니다.',
);


requireText(
  'src/_lib/navigation.ts',
  "import 'server-only';",
  'Prisma를 사용하는 navigation.ts는 server-only 경계를 명시해야 합니다.',
);

forbidText(
  'src/app/community/notice/[id]/page.tsx',
  "'use client'",
  '공지사항 상세 page.tsx는 서버 NavigationPageHeader를 import하므로 Server Component여야 합니다.',
);

forbidText(
  'src/app/_components/header/header-client.tsx',
  "from '@/_lib/navigation'",
  'Client Component는 Prisma가 포함된 navigation.ts를 import하면 안 됩니다.',
);

forbidText(
  'src/app/_components/ui/breadcrumb.tsx',
  "from '@/_lib/navigation'",
  'Breadcrumb Client Component는 server navigation.ts를 import하면 안 됩니다.',
);

if (errors.length) {
  console.error('\nNavigation database integration check failed:\n');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  console.error('');
  process.exit(1);
}

console.log('Navigation database integration check passed.');
