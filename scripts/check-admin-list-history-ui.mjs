import fs from 'node:fs';

function read(file) {
  if (!fs.existsSync(file)) {
    console.error(
      `❌ ADMIN_LIST_HISTORY_UI_CHECK 파일 누락: ${file}`,
    );
    process.exit(1);
  }

  return fs.readFileSync(file, 'utf8');
}

function requireToken(file, token) {
  const source = read(file);

  if (!source.includes(token)) {
    console.error(
      `❌ ADMIN_LIST_HISTORY_UI_CHECK 연결 누락: ${file} -> ${token}`,
    );
    process.exit(1);
  }
}

// 공통 서버 페이지형 리스트:
// /admin/pages/*, /admin/content-relations/*, /admin/customer-voice 등.
for (const token of [
  'showIndex = true',
  '번호',
  'const rowNumber = (page - 1) * pageSize + rowIndex + 1',
]) {
  requireToken(
    'src/app/admin/_components/admin-data-table.tsx',
    token,
  );
}

// 회원 / 권한 목록은 TanStack client pagination을 사용하므로
// 현재 페이지와 페이지 크기를 이용한 번호를 직접 계산합니다.
for (const token of [
  '번호',
  'const pageRowNumber =',
  'pagination.pageIndex * pagination.pageSize',
]) {
  requireToken(
    'src/app/admin/_components/member-data-table.tsx',
    token,
  );
}

// 메인 관리자 4개 목록.
for (const token of [
  'result.items.map((item, index)',
  '(result.page - 1) * result.pageSize + index + 1',
]) {
  requireToken(
    'src/app/admin/home/_components/home-section-list.tsx',
    token,
  );
}

// 의료진 목록은 현재 단일 페이지 목록이므로 표시 순서 기준 번호.
for (const token of [
  'doctors.map((doctor, index)',
  '{index + 1}',
]) {
  requireToken(
    'src/app/admin/doctors/page.tsx',
    token,
  );
}

// 사이드바: 변경 이력은 독립된 최하단 히스토리 그룹,
// 아직 미사용인 콘텐츠 관리 메뉴는 제거.
const sidebar = read(
  'src/app/admin/_components/admin-sidebar.tsx',
);

if (sidebar.includes('href="/admin/content"')) {
  console.error(
    '❌ ADMIN_LIST_HISTORY_UI_CHECK 사이드바에 미사용 콘텐츠 관리 메뉴가 남아 있습니다.',
  );
  process.exit(1);
}

const dataGroupIndex = sidebar.indexOf(
  '<SidebarGroupLabel>데이터 관리</SidebarGroupLabel>',
);
const historyGroupIndex = sidebar.indexOf(
  '<SidebarGroupLabel>히스토리</SidebarGroupLabel>',
);
const historyHrefIndex = sidebar.indexOf(
  'href="/admin/history"',
);

if (
  dataGroupIndex < 0 ||
  historyGroupIndex < 0 ||
  historyHrefIndex < 0 ||
  !(dataGroupIndex < historyGroupIndex &&
    historyGroupIndex < historyHrefIndex)
) {
  console.error(
    '❌ ADMIN_LIST_HISTORY_UI_CHECK 히스토리 그룹이 사이드바 최하단 데이터 관리 이후에 배치되지 않았습니다.',
  );
  process.exit(1);
}

// 변경 이력은 raw JSON이 아니라 필드별 전/후 diff + 이미지 미리보기.
for (const token of [
  'buildDiffRows',
  'DiffValue',
  '변경 내용 비교',
  '변경 이미지 미리보기',
  "side=\"before\"",
  "side=\"after\"",
  'GitHub diff처럼 비교',
]) {
  requireToken(
    'src/app/admin/history/page.tsx',
    token,
  );
}

const history = read(
  'src/app/admin/history/page.tsx',
);

if (
  history.includes('<pre') ||
  history.includes('JSON.stringify(sanitized, null, 2)')
) {
  console.error(
    '❌ ADMIN_LIST_HISTORY_UI_CHECK 변경 이력에 개발자용 raw JSON 출력이 남아 있습니다.',
  );
  process.exit(1);
}

console.log(
  'ADMIN_LIST_HISTORY_UI_CHECK_OK — 페이지 기반 번호 / 최하단 히스토리 메뉴 / 비개발자용 필드별 diff·이미지 비교 / 콘텐츠 관리 메뉴 제거 확인',
);
