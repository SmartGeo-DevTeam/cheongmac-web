import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const ROOT = process.cwd();

const MANAGED_PREFIXES = [
  'src/app/_components/ui/',
  'src/app/_components/home/',
  'src/app/_components/legal-page/',
  'src/app/_components/main-section-header/',
  'src/app/about/',
  'src/app/community/',
  'src/app/education-research/',
  'src/app/guide/',
  'src/app/email-collection-refusal/',
  'src/app/non-covered-fees/',
  'src/app/patient-rights/',
  'src/app/privacy-policy/',
  'src/app/terms/',
];

const EXTRA_FILES = new Set([
  'src/app/_components/ui/page-header.tsx',
]);

const RAW_TAGS = new Set([
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'strong',
  'b',
  'bold',
]);

function normalize(file) {
  return file.split(path.sep).join('/');
}

function isManagedFile(file) {
  const rel = normalize(path.relative(ROOT, file));
  if (rel === 'src/app/_components/ui/typography.tsx') return false;
  return (
    EXTRA_FILES.has(rel) ||
    MANAGED_PREFIXES.some((prefix) => rel.startsWith(prefix))
  );
}

function walk(dir, output = []) {
  if (!fs.existsSync(dir)) return output;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        entry.name === 'node_modules' ||
        entry.name === '.next' ||
        entry.name === 'admin' ||
        entry.name === 'api'
      ) {
        continue;
      }
      walk(target, output);
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      output.push(target);
    }
  }
  return output;
}

const failures = [];

for (const file of walk(path.join(ROOT, 'src', 'app'))) {
  if (!isManagedFile(file)) continue;

  const source = fs.readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  function visit(node) {
    if (
      ts.isJsxOpeningElement(node) ||
      ts.isJsxSelfClosingElement(node) ||
      ts.isJsxClosingElement(node)
    ) {
      if (ts.isIdentifier(node.tagName)) {
        const tag = node.tagName.text.toLowerCase();
        if (RAW_TAGS.has(tag)) {
          const pos = sf.getLineAndCharacterOfPosition(
            node.tagName.getStart(sf),
          );
          failures.push(
            `${normalize(path.relative(ROOT, file))}:${pos.line + 1}:${pos.character + 1} <${tag}>`,
          );
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sf);
}

if (failures.length) {
  console.error(
    '❌ 본문 관리 영역에 raw typography tag가 남아 있습니다.',
  );
  for (const failure of failures) {
    console.error(`   ${failure}`);
  }
  process.exit(1);
}

console.log(
  'TYPOGRAPHY_COMPONENT_CHECK_OK — 관리 대상 본문 태그가 모두 공통 컴포넌트를 사용합니다.',
);
