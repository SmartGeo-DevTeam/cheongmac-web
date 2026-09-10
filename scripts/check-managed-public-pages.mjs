import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const errors = [];

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function requireText(file, token, message) {
  if (!read(file).includes(token)) {
    errors.push(`${file}: ${message}`);
  }
}

function forbidText(file, token, message) {
  if (read(file).includes(token)) {
    errors.push(`${file}: ${message}`);
  }
}

requireText(
  'next.config.ts',
  "bodySizeLimit: '12mb'",
  '기존 의료진 10MB 업로드와 사용자 폼 첨부파일을 위해 Server Action body limit가 필요합니다.',
);

requireText(
  '.env.example',
  'SUPABASE_FORM_ATTACHMENTS_BUCKET=form-attachments',
  '비공개 사용자 폼 첨부파일 버킷 예시가 필요합니다.',
);

for (const model of [
  'model ManagedPageItem {',
  'model ManagedPageSeed {',
  'model CustomerVoiceSubmission {',
]) {
  requireText(
    'prisma/schema.prisma',
    model,
    `${model.replace('model ', '').replace(' {', '')} 모델이 필요합니다.`,
  );
}

for (const field of [
  'patientName',
  'phoneConsultRequested',
  'postPasswordHash',
  'attachmentUrl',
]) {
  requireText(
    'prisma/schema.prisma',
    field,
    `MedicalConsultation에 ${field} 저장 필드가 필요합니다.`,
  );
}

const pages = [
  ['src/app/about/tour/page.tsx', 'getHospitalTourManagedContent'],
  ['src/app/about/equipment/page.tsx', 'getMedicalEquipmentManagedContent'],
  ['src/app/education-research/exchange/page.tsx', 'getAcademicExchangeManagedContent'],
  ['src/app/education-research/society/page.tsx', 'getSocietyManagedContent'],
  ['src/app/community/cases/page.tsx', 'getTreatmentCasesManagedContent'],
  ['src/app/community/notice/page.tsx', 'getNoticeManagedContent'],
  ['src/app/community/news/page.tsx', 'getNewsManagedContent'],
  ['src/app/guide/partner-hospital/page.tsx', 'getPartnerHospitalManagedContent'],
];

for (const [file, loader] of pages) {
  requireText(file, loader, `${loader} DB loader를 사용해야 합니다.`);
  requireText(
    file,
    "export const dynamic = 'force-dynamic';",
    'DB 기반 페이지는 force-dynamic이어야 build 전 migration과 충돌하지 않습니다.',
  );
}

for (const [file, token] of [
  ['src/app/about/tour/_components/hospital-tour-content.tsx', 'FACILITY_ITEMS'],
  ['src/app/about/tour/_components/hospital-tour-content.tsx', 'FLOOR_GUIDES'],
  ['src/app/about/equipment/_components/medical-equipment-content.tsx', 'MEDICAL_EQUIPMENT'],
  ['src/app/education-research/exchange/_components/academic-exchange-content.tsx', 'ACADEMIC_EXCHANGE_POSTS'],
  ['src/app/education-research/exchange/_components/academic-exchange-content.tsx', 'ACADEMIC_EXCHANGE_HERO_IMAGES'],
  ['src/app/education-research/society/_components/society-activities-content.tsx', 'SOCIETY_ACTIVITIES'],
  ['src/app/education-research/society/_components/society-activities-content.tsx', 'SOCIETY_FEATURED'],
  ['src/app/community/cases/_components/treatment-case-list.tsx', 'TREATMENT_CASES'],
  ['src/app/community/notice/_components/notice-list.tsx', 'notices,'],
  ['src/app/community/news/_components/news-board.tsx', 'NEWS_ITEMS'],
  ['src/app/guide/partner-hospital/_components/partner-hospital-content.tsx', 'PARTNER_HOSPITALS'],
]) {
  forbidText(
    file,
    token,
    `사용자 페이지 컴포넌트에서 ${token} 하드코딩 목록을 직접 사용하면 안 됩니다.`,
  );
}

requireText(
  'src/app/community/consultation/[id]/_components/consultation-detail-pagination.tsx',
  "'use client'",
  '의학상담 상세 Pagination URL 함수는 Client Component 안에 있어야 합니다.',
);

forbidText(
  'src/app/community/consultation/[id]/page.tsx',
  'getPageHref={hrefForPage}',
  'Server Component에서 Pagination Client Component로 함수를 전달하면 안 됩니다.',
);

forbidText(
  'src/app/community/consultation/[id]/page.tsx',
  'function MobileListPagination',
  '의학상담 상세 서버 파일에 Pagination 함수 생성 컴포넌트가 남아 있으면 안 됩니다.',
);

forbidText(
  'src/app/community/consultation/_components/consultation-board.tsx',
  'DISPLAY_TOTAL_COUNT',
  '의학상담 전체 건수는 더미 상수가 아니라 실제 DB 목록 기준이어야 합니다.',
);

requireText(
  'src/app/community/consultation/write/_components/consultation-form.tsx',
  'submitMedicalConsultation',
  '의학상담 작성 폼은 실제 DB 저장 action을 사용해야 합니다.',
);

requireText(
  'src/app/community/customer-voice/write/_components/customer-voice-form.tsx',
  'submitCustomerVoice',
  '고객의 소리 작성 폼은 실제 DB 저장 action을 사용해야 합니다.',
);

requireText(
  'src/app/admin/customer-voice/page.tsx',
  'customerVoiceSubmission',
  '고객의 소리 관리자 목록이 필요합니다.',
);

for (const menu of [
  '의료진/진료과',
  '병원 둘러보기',
  '첨단의료장비',
  '학술교류',
  '학회활동',
  '치료사례',
  '의학상담',
  '고객의 소리',
  '공지사항',
  '청맥뉴스',
  '의료협약병원',
]) {
  requireText(
    'src/app/admin/_components/admin-sidebar.tsx',
    menu,
    `관리자 사이드바에 ${menu} 페이지명이 필요합니다.`,
  );
}

forbidText(
  'src/app/admin/_components/admin-sidebar.tsx',
  '<Database',
  '데이터 관리 메뉴에 Database 아이콘을 일괄 사용하지 않습니다.',
);

for (const icon of [
  '<Activity',
  '<CalendarClock',
  '<BookOpen',
  '<MessageCircle',
  '<Clapperboard',
]) {
  requireText(
    'src/app/admin/_components/admin-sidebar.tsx',
    icon,
    `${icon.replace('<', '')} 용도별 아이콘이 필요합니다.`,
  );
}

requireText(
  'src/_lib/managed-pages.ts',
  'managedPageSeed',
  '하드코딩 초기 콘텐츠는 DB에 한 번만 bootstrap되어야 합니다.',
);

if (errors.length) {
  console.error('\nManaged public pages check failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  console.error('');
  process.exit(1);
}

console.log('Managed public pages check passed.');
