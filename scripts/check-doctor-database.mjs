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

for (const model of [
  'model Doctor {',
  'model DoctorImage {',
  'model DoctorCareer {',
  'model DoctorSpecialty {',
  'model DoctorSpecialtyDoctor {',
  'model DoctorSchedule {',
  'model DoctorScheduleDoctor {',
  'model DoctorPresentation {',
  'model DoctorPresentationDoctor {',
  'model DoctorReview {',
  'model DoctorReviewDoctor {',
  'model DoctorMedia {',
  'model DoctorMediaDoctor {',
  'model MedicalConsultation {',
  'model MedicalConsultationDoctor {',
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
  '의료진 상세페이지 관계 섹션은 Suspense로 스트리밍해야 합니다.',
);

requireText(
  'src/app/about/doctors/[doctorSlug]/_components/doctor-skeletons.tsx',
  "from '@/_shadcn/ui/skeleton'",
  '의료진 상세 fallback은 shadcn Skeleton을 사용해야 합니다.',
);

requireText(
  'src/app/admin/doctors/[doctorId]/doctor-editor.tsx',
  '관계형 콘텐츠',
  '의료진 관리 화면에서 별도 콘텐츠 DB 관계를 안내해야 합니다.',
);

for (const path of [
  '/admin/content-relations/specialties',
  '/admin/content-relations/schedules',
  '/admin/content-relations/presentations',
  '/admin/content-relations/reviews',
  '/admin/content-relations/media',
  '/admin/content-relations/consultations',
]) {
  requireText(
    'src/app/admin/_components/admin-sidebar.tsx',
    path,
    `${path} 관리자 메뉴가 필요합니다.`,
  );
}

forbidText(
  'src/app/admin/_actions/doctor.ts',
  'doctorSpecialty.deleteMany',
  '진료분야는 의료진 저장 시 삭제/재생성하지 않고 별도 DB에서 관리해야 합니다.',
);

forbidText(
  'src/app/admin/_actions/doctor.ts',
  'doctorPresentation.deleteMany',
  '발표 이력은 별도 DB에서 관리해야 합니다.',
);

forbidText(
  'src/app/admin/_actions/doctor.ts',
  'doctorReview.deleteMany',
  '환자 후기는 별도 DB에서 관리해야 합니다.',
);

forbidText(
  'src/app/admin/_actions/doctor.ts',
  'doctorMedia.deleteMany',
  '미디어는 별도 DB에서 관리해야 합니다.',
);

forbidText(
  'src/app/admin/_actions/doctor.ts',
  'medicalConsultation.deleteMany',
  '의학상담은 별도 DB에서 관리해야 합니다.',
);

forbidText(
  'src/app/admin/_actions/doctor.ts',
  'doctorSchedule.deleteMany',
  '진료시간표는 별도 DB에서 관리해야 합니다.',
);

if (errors.length) {
  console.error('\nDoctor database check failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  console.error('');
  process.exit(1);
}

console.log('Doctor database check passed.');
