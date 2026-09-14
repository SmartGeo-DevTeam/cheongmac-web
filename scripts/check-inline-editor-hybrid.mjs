import fs from 'node:fs';

const region = fs.readFileSync(
  'src/app/_components/inline-editor/editable-region.tsx',
  'utf8',
);
const doctor = fs.readFileSync(
  'src/app/about/doctors/[doctorSlug]/_components/doctor-sections.tsx',
  'utf8',
);
const page = fs.readFileSync(
  'src/app/about/doctors/[doctorSlug]/page.tsx',
  'utf8',
);

const requiredRegionTokens = [
  'adminHref?: string',
  "'hybrid'",
  "'admin'",
  '관리자에서 상세 수정',
];

for (const token of requiredRegionTokens) {
  if (!region.includes(token)) {
    console.error(`❌ EditableRegion hybrid 기능 누락: ${token}`);
    process.exit(1);
  }
}

const requiredDoctorTokens = [
  '/admin/content-relations/specialties?doctorId=',
  '/admin/content-relations/schedules?doctorId=',
  '/admin/content-relations/reviews?doctorId=',
  '/admin/content-relations/media?doctorId=',
  '/admin/content-relations/consultations?doctorId=',
  '/admin/content-relations/presentations?doctorId=',
  'reservationLabel',
  'descriptionLine1',
];

for (const token of requiredDoctorTokens) {
  if (!doctor.includes(token)) {
    console.error(`❌ 의료진 상세 hybrid 편집 연결 누락: ${token}`);
    process.exit(1);
  }
}

const slugCount = (page.match(/doctorSlug=\{doctorSlug\}/g) ?? []).length;
if (slugCount < 6) {
  console.error(
    `❌ 의료진 상세 섹션 doctorSlug 전달이 부족합니다: ${slugCount}/6`,
  );
  process.exit(1);
}

console.log(
  'INLINE_EDITOR_HYBRID_CHECK_OK — 의료진 내부 영역 inline/admin/hybrid 연결 확인',
);
