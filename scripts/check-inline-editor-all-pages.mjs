import fs from 'node:fs';

const checks = [
  ['src/app/about/doctors/page.tsx', 'EditablePageCopyBlock path="/about/doctors"'],
  ['src/app/about/tour/page.tsx', 'EditablePageCopyBlock path="/about/tour"'],
  ['src/app/about/equipment/page.tsx', 'EditablePageCopyBlock path="/about/equipment"'],
  ['src/app/education-research/society/page.tsx', 'EditablePageCopyBlock path="/education-research/society"'],
  ['src/app/education-research/exchange/page.tsx', 'EditablePageCopyBlock path="/education-research/exchange"'],
  ['src/app/community/consultation/page.tsx', 'EditablePageCopyBlock path="/community/consultation"'],
  ['src/app/community/customer-voice/page.tsx', 'EditablePageCopyBlock path="/community/customer-voice"'],
  ['src/app/community/notice/page.tsx', 'EditablePageCopyBlock path="/community/notice"'],
  ['src/app/community/news/page.tsx', 'EditablePageCopyBlock path="/community/news"'],
  ['src/app/guide/partner-hospital/page.tsx', 'EditablePageCopyBlock path="/guide/partner-hospital"'],
  ['src/app/about/doctors/_components/doctor-list-client.tsx', 'AdminEditButton'],
  ['src/app/about/tour/_components/hospital-tour-content.tsx', 'itemKey={`facility:${item.id}`}'],
  ['src/app/about/equipment/_components/medical-equipment-content.tsx', 'pageKey="equipment"'],
  ['src/app/education-research/society/_components/society-activities-content.tsx', 'itemKey={`activity:${activity.id}`}'],
  ['src/app/education-research/exchange/_components/academic-exchange-content.tsx', 'itemKey={`post:${post.id}`}'],
  ['src/app/community/consultation/_components/consultation-board.tsx', '/admin/content-relations/consultations/${item.id}#admin-related-content-editor'],
  ['src/app/community/notice/_components/notice-list.tsx', 'pageKey="notice"'],
  ['src/app/community/news/_components/news-board.tsx', 'pageKey="news"'],
  ['src/app/guide/partner-hospital/_components/partner-hospital-content.tsx', 'itemKey={`hospital:${id}`}'],
  ['src/app/admin/layout.tsx', '<AdminHashFocus />'],
  ['src/app/admin/pages/[pageKey]/[id]/page.tsx', 'id="managed-item-content"'],
  ['src/app/admin/content-relations/[resource]/[id]/page.tsx', 'id="admin-related-content-editor"'],
  ['src/app/admin/content-relations/[resource]/page.tsx', 'id="admin-related-content-list"'],
  ['src/app/admin/doctors/[doctorId]/doctor-editor.tsx', 'id="admin-doctor-basic"'],
  ['src/app/admin/doctors/[doctorId]/doctor-editor.tsx', 'id="admin-doctor-images"'],
  ['src/app/admin/doctors/[doctorId]/doctor-editor.tsx', 'id="admin-doctor-careers"'],
  ['src/app/_components/inline-editor/editable-region.tsx', '연결 데이터 상세 관리'],
  ['src/app/admin/pages/[pageKey]/resolve/page.tsx', 'pageKey_itemKey'],
];

for (const [file, token] of checks) {
  if (!fs.existsSync(file)) {
    console.error(`❌ 필수 파일 누락: ${file}`);
    process.exit(1);
  }
  const source = fs.readFileSync(file, 'utf8');
  if (!source.includes(token)) {
    console.error(`❌ 연결 검사 실패: ${file} -> ${token}`);
    process.exit(1);
  }
}

const publicCopy = fs.readFileSync('src/_lib/public-page-copy.ts', 'utf8');
for (const path of [
  '/about/doctors', '/about/tour', '/about/equipment',
  '/education-research/society', '/education-research/exchange',
  '/community/consultation', '/community/customer-voice',
  '/community/notice', '/community/news', '/guide/partner-hospital',
]) {
  if (!publicCopy.includes(`'${path}'`)) {
    console.error(`❌ 페이지 고정문구 설정 누락: ${path}`);
    process.exit(1);
  }
}


const editableRegion = fs.readFileSync(
  'src/app/_components/inline-editor/editable-region.tsx',
  'utf8',
);
const fieldIndex = editableRegion.indexOf('orderedFields.map');
const adminIndex = editableRegion.indexOf('연결 데이터 상세 관리');
if (fieldIndex === -1 || adminIndex === -1 || fieldIndex > adminIndex) {
  console.error('❌ Hybrid Dialog 순서가 잘못되었습니다: 고정 텍스트/이미지 필드가 관리자 상세관리보다 먼저 와야 합니다.');
  process.exit(1);
}

const adminFocus = fs.readFileSync(
  'src/app/admin/_components/admin-hash-focus.tsx',
  'utf8',
);
for (const token of ['scrollIntoView', "outline-[#FD7740]", 'ring-[#FD7740]/15']) {
  if (!adminFocus.includes(token)) {
    console.error(`❌ 관리자 포커스 시각화 누락: ${token}`);
    process.exit(1);
  }
}

const noticeSource = fs.readFileSync(
  'src/app/community/notice/_components/notice-list.tsx',
  'utf8',
);
for (const token of [
  'function CalendarCard({ copy }',
  'function MobileHangingCard({ copy, second = false }',
  '<CalendarCard copy={copy} />',
  '<MobileHangingCard copy={copy} />',
]) {
  if (!noticeSource.includes(token)) {
    console.error(`❌ NOTICE_COPY_SCOPE_CHECK 누락: ${token}`);
    process.exit(1);
  }
}

console.log('INLINE_EDITOR_ALL_PAGES_CHECK_OK — 10개 공개 페이지 / 관계형 아이템 / 관리자 hash focus 연결 확인');
