import fs from 'node:fs';

const requiredFiles = [
  'src/app/_providers/inline-edit-provider.tsx',
  'src/app/_components/inline-editor/editable-region.tsx',
  'src/app/_components/inline-editor/editable-content-block.tsx',
  'src/app/_actions/inline-content.ts',
  'src/_lib/page-content-blocks.ts',
  'src/_lib/inline-content-shared.ts',
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.error(`❌ Inline CMS 필수 파일이 없습니다: ${file}`);
    process.exit(1);
  }
}

const layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
if (!layout.includes('<InlineEditProvider>')) {
  console.error('❌ RootLayout에 InlineEditProvider가 연결되지 않았습니다.');
  process.exit(1);
}

const dock = fs.readFileSync(
  'src/app/_components/account-dock.tsx',
  'utf8',
);
if (
  !dock.includes('account-dock-inline-edit') ||
  !dock.includes('toggleEditMode')
) {
  console.error('❌ AccountDock 화면 편집 토글이 없습니다.');
  process.exit(1);
}

const navHeader = fs.readFileSync(
  'src/app/_components/ui/navigation-page-header.tsx',
  'utf8',
);
if (
  !navHeader.includes('EditableRegion') ||
  !navHeader.includes("'navigation-page-header'")
) {
  console.error(
    '❌ NavigationPageHeader가 Inline CMS에 연결되지 않았습니다.',
  );
  process.exit(1);
}

const prune = fs.readFileSync(
  'scripts/prune-managed-azure-assets.ts',
  'utf8',
);
if (!prune.includes('prisma.pageContentBlock.findMany')) {
  console.error(
    '❌ Azure prune이 PageContentBlock 이미지를 참조하지 않습니다.',
  );
  process.exit(1);
}

console.log(
  'INLINE_CONTENT_EDITOR_CHECK_OK — provider / 권한 UI / 상세페이지 header / Azure prune 연결 확인',
);
