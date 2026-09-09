import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const errors = [];

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function requireText(file, token, message) {
  const source = read(file);
  if (!source.includes(token)) errors.push(`${file}: ${message}`);
}

function forbidText(file, token, message) {
  const source = read(file);
  if (source.includes(token)) errors.push(`${file}: ${message}`);
}

for (const model of [
  'model Doctor {',
  'model DoctorImage {',
  'model DoctorSpecialty {',
  'model DoctorCareer {',
  'model DoctorSchedule {',
  'model DoctorPresentation {',
  'model DoctorReview {',
  'model DoctorMedia {',
  'model MedicalConsultation {',
]) {
  requireText(
    'prisma/schema.prisma',
    model,
    `${model.replace('model ', '').replace(' {', '')} 관계형 모델이 필요합니다.`,
  );
}

for (const kind of ['COVER', 'PROFILE', 'CUTOUT', 'MOTION']) {
  requireText(
    'src/_lib/doctors.ts',
    `'${kind}'`,
    `의료진 이미지 종류 ${kind}가 필요합니다.`,
  );
}

requireText(
  'src/app/about/doctors/[doctorSlug]/page.tsx',
  '<Suspense',
  '의료진 상세페이지는 각 관계 섹션을 Suspense로 비동기 스트리밍해야 합니다.',
);
requireText(
  'src/app/about/doctors/[doctorSlug]/_components/doctor-skeletons.tsx',
  "from '@/_shadcn/ui/skeleton'",
  '비동기 fallback은 shadcn Skeleton을 사용해야 합니다.',
);
requireText(
  'src/_shadcn/ui/skeleton.tsx',
  'data-slot="skeleton"',
  'shadcn Skeleton 컴포넌트가 필요합니다.',
);

forbidText(
  'src/app/about/doctors/[doctorSlug]/page.tsx',
  'getDoctorBySlug',
  '의료진 상세페이지에서 하드코딩 data.ts를 사용하지 않습니다.',
);
forbidText(
  'src/app/about/doctors/page.tsx',
  "from './data'",
  '의료진 목록에서 하드코딩 data.ts를 사용하지 않습니다.',
);
forbidText(
  'src/app/community/consultation/_components/consultation-board.tsx',
  'CONSULTATION_ITEMS',
  '의학상담 목록에서 하드코딩 데이터를 사용하지 않습니다.',
);
forbidText(
  'src/app/community/consultation/[id]/page.tsx',
  'CONSULTATION_ITEMS',
  '의학상담 상세에서 하드코딩 데이터를 사용하지 않습니다.',
);

requireText(
  'src/app/admin/_components/admin-sidebar.tsx',
  '/admin/doctors',
  '관리자 콘텐츠 영역에 의료진 관리 메뉴가 필요합니다.',
);
requireText(
  'src/app/admin/doctors/[doctorId]/doctor-editor.tsx',
  '전문 진료분야',
  '관리자에서 전문 진료분야를 관리할 수 있어야 합니다.',
);
requireText(
  'src/app/admin/doctors/[doctorId]/doctor-editor.tsx',
  '학력 및 약력',
  '관리자에서 학력 및 약력을 관리할 수 있어야 합니다.',
);
requireText(
  'src/app/admin/doctors/[doctorId]/doctor-editor.tsx',
  '의료진 발표 이력',
  '관리자에서 발표 이력을 관리할 수 있어야 합니다.',
);
requireText(
  'src/app/admin/doctors/[doctorId]/doctor-editor.tsx',
  '환자 후기',
  '관리자에서 환자 후기를 관리할 수 있어야 합니다.',
);
requireText(
  'src/app/admin/doctors/[doctorId]/doctor-editor.tsx',
  '미디어',
  '관리자에서 미디어를 관리할 수 있어야 합니다.',
);
requireText(
  'src/app/admin/doctors/[doctorId]/doctor-editor.tsx',
  '의학상담',
  '관리자에서 의학상담을 관리할 수 있어야 합니다.',
);

requireText(
  'src/app/admin/_actions/doctor.ts',
  'SUPABASE_SERVICE_ROLE_KEY',
  '관리자 의료진 이미지 업로드는 서버 전용 Supabase Storage 키를 사용해야 합니다.',
);
requireText(
  '.env.example',
  'SUPABASE_DOCTOR_MEDIA_BUCKET',
  '의료진 이미지 Storage 환경변수 예시가 필요합니다.',
);

const detail = read(
  'src/app/about/doctors/[doctorSlug]/_components/doctor-sections.tsx',
);
for (const section of [
  'DoctorProfileSection',
  'DoctorScheduleSection',
  'DoctorReviewsSection',
  'DoctorMediaSection',
  'DoctorConsultationsSection',
  'DoctorPresentationsSection',
]) {
  if (!detail.includes(`function ${section}`) && !detail.includes(`function ${section}(`)) {
    errors.push(
      `doctor-sections.tsx: ${section} 비동기 관계 섹션이 필요합니다.`,
    );
  }
}

if (errors.length) {
  console.error('\nDoctor relational database check failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  console.error('');
  process.exit(1);
}

console.log('Doctor relational database check passed.');
