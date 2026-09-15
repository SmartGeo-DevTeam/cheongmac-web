import fs from 'node:fs';
import path from 'node:path';

function read(file) {
  if (!fs.existsSync(file)) {
    console.error(`❌ ADMIN_AUDIT_HISTORY_CHECK 파일 누락: ${file}`);
    process.exit(1);
  }
  return fs.readFileSync(file, 'utf8');
}

function requireToken(file, token) {
  const source = read(file);
  if (!source.includes(token)) {
    console.error(
      `❌ ADMIN_AUDIT_HISTORY_CHECK 연결 누락: ${file} -> ${token}`,
    );
    process.exit(1);
  }
}

const homeSections = [
  ['cover-slides', 'slide'],
  ['popups', 'popup'],
  ['specialties', 'specialty'],
  ['middle-banner', 'middle-banner'],
];

for (const [section, itemType] of homeSections) {
  requireToken(
    `src/app/admin/home/${section}/page.tsx`,
    `sectionKey="${section}"`,
  );
  requireToken(
    `src/app/admin/home/${section}/[id]/page.tsx`,
    `sectionKey="${section}"`,
  );
  requireToken('src/_lib/home-admin-sections.ts', `itemType: '${itemType}'`);
  requireToken(
    'src/app/admin/_components/admin-sidebar.tsx',
    `/admin/home/${section}`,
  );
}

const sidebar = read('src/app/admin/_components/admin-sidebar.tsx');
if (sidebar.includes('커버 슬라이드·팝업')) {
  console.error(
    '❌ ADMIN_AUDIT_HISTORY_CHECK 메인 통합 메뉴명이 남아 있습니다.',
  );
  process.exit(1);
}

requireToken(
  'src/app/admin/pages/[pageKey]/page.tsx',
  "redirect('/admin/home/cover-slides')",
);
requireToken(
  'src/app/admin/pages/[pageKey]/resolve/page.tsx',
  'homeAdminItemHref(item.itemType, item.id)',
);

const genericManagedEditor = read(
  'src/app/admin/pages/[pageKey]/[id]/page.tsx',
);
if (
  genericManagedEditor.includes(
    "pageKey === 'home' &&",
  )
) {
  console.error(
    '❌ ADMIN_AUDIT_HISTORY_CHECK generic ManagedPage editor에 도달 불가능한 home 분기가 남아 있습니다.',
  );
  process.exit(1);
}

// 관리자 화면에 raw DB 식별자를 텍스트로 노출하는 대표 패턴을 차단합니다.
const adminRoot = path.join(process.cwd(), 'src/app/admin');
const adminTsxFiles = [];

function collectAdminTsx(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectAdminTsx(full);
    else if (entry.isFile() && full.endsWith('.tsx')) adminTsxFiles.push(full);
  }
}
collectAdminTsx(adminRoot);

const visibleIdPatterns = [
  /관리용\s*ID/i,
  /DB\s*ID/i,
  />\s*ID\s*\{item\.id\}/i,
  /ID\s*\{item\.id\}/i,
];

for (const file of adminTsxFiles) {
  const source = fs.readFileSync(file, 'utf8');
  for (const pattern of visibleIdPatterns) {
    if (pattern.test(source)) {
      console.error(
        `❌ ADMIN_AUDIT_HISTORY_CHECK 관리자 화면에 DB ID 표현이 남아 있습니다: ${path.relative(process.cwd(), file)} -> ${pattern}`,
      );
      process.exit(1);
    }
  }
}

for (const token of [
  'actorId       String?',
  'actorName     String?',
  'sourcePath    String?',
  'operation     String?',
  'beforeData    Json?',
  'afterData     Json?',
  'changedFields String[] @default([])',
  'actor User? @relation("AuditActor"',
]) {
  requireToken('prisma/schema.prisma', token);
}

const migration =
  'prisma/migrations/20260915_000012_audit_history/migration.sql';
for (const token of [
  'fill_admin_audit_log_context',
  'ON DELETE SET NULL',
  '"beforeData" JSONB',
  '"afterData" JSONB',
  '"changedFields" TEXT[]',
]) {
  requireToken(migration, token);
}

for (const token of [
  '변경 이력',
  '변경 위치',
  '변경 방식',
  '변경 상세 보기',
  'sanitizeForDisplay',
]) {
  requireToken('src/app/admin/history/page.tsx', token);
}
requireToken(
  'src/app/admin/_components/admin-sidebar.tsx',
  'href="/admin/history"',
);

requireToken(
  'src/app/community/consultation/_actions.ts',
  'PUBLIC_MEDICAL_CONSULTATION_CREATE',
);
requireToken(
  'src/app/community/customer-voice/_actions.ts',
  'PUBLIC_CUSTOMER_VOICE_CREATE',
);
requireToken('src/app/join/actions.ts', 'MEMBERSHIP_COMPLETE');
requireToken(
  'src/app/_actions/inline-content.ts',
  'INLINE_CONTENT_ASSET_UPLOAD',
);
requireToken(
  'src/app/admin/_actions/managed-pages.ts',
  'MANAGED_PAGE_ASSET_UPLOAD',
);

// 앞으로 src/app에 Prisma business mutation이 추가되면 audit가 없는 파일은
// 최종 CMS 검사에서 실패하도록 해 누락을 방지합니다.
const appRoot = path.join(process.cwd(), 'src/app');
const mutationFiles = [];

function collectMutationFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const relative = path
      .relative(process.cwd(), full)
      .replaceAll('\\', '/');

    if (
      entry.isDirectory() &&
      (relative.startsWith('src/app/api/activity') ||
        relative.startsWith('src/app/api/auth') ||
        relative.startsWith('src/app/auth/complete'))
    ) {
      continue;
    }

    if (entry.isDirectory()) {
      collectMutationFiles(full);
      continue;
    }

    if (!entry.isFile() || !/\.(ts|tsx)$/.test(entry.name)) continue;

    const source = fs.readFileSync(full, 'utf8');
    const mutationPattern =
      /\b(?:prisma|tx)\.[A-Za-z0-9_]+\.(?:create|update|upsert|delete|createMany|updateMany|deleteMany)\s*\(/;

    if (mutationPattern.test(source)) {
      mutationFiles.push({ relative, source });
    }
  }
}
collectMutationFiles(appRoot);

const missingAudit = mutationFiles
  .filter(({ source }) => !source.includes('adminAuditLog'))
  .map(({ relative }) => relative);

if (missingAudit.length) {
  console.error(
    '❌ ADMIN_AUDIT_HISTORY_CHECK DB 변경 코드에 audit 기록이 없습니다:',
  );
  for (const file of missingAudit) console.error(`   - ${file}`);
  process.exit(1);
}

console.log(
  `ADMIN_AUDIT_HISTORY_CHECK_OK — 메인 관리자 4개 페이지 분리 / 관리자 raw DB ID 숨김 / 변경이력 UI·DB 확장 / ${mutationFiles.length}개 business mutation 파일 audit 연결 확인`,
);
