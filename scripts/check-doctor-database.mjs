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
  '연결 데이터',
  '의료진 관리 화면에서 의료진과 연결된 별도 데이터베이스로 이동할 수 있어야 합니다.',
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

requireText(
  'src/app/admin/doctors/[doctorId]/doctor-editor.tsx',
  'Array.from({ length: 4 }',
  '의료진 DB에서 미디어를 최대 4개까지 선택할 수 있어야 합니다.',
);

requireText(
  'src/app/admin/doctors/[doctorId]/doctor-editor.tsx',
  'doctorMediaSelection',
  '의료진별 미디어 선택 필드가 필요합니다.',
);

requireText(
  'src/app/admin/_actions/doctor.ts',
  'doctorMediaDoctor.createMany',
  '의료진 저장 시 선택 미디어 관계를 저장해야 합니다.',
);

requireText(
  'src/_lib/doctors.ts',
  'take: 4',
  '사용자 의료진 상세 미디어는 최대 4개만 조회해야 합니다.',
);

requireText(
  'src/app/about/doctors/_components/doctor-list-client.tsx',
  'card-link',
  '의료진 카드 전체 클릭 시 상세페이지로 이동하는 overlay link가 필요합니다.',
);

forbidText(
  'src/app/admin/_actions/related-content.ts',
  'doctorMediaDoctor.deleteMany',
  '미디어 DB 편집 화면에서 의료진별 미디어 선택 관계를 덮어쓰지 않습니다.',
);

if (errors.length) {
  console.error('\nDoctor database check failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  console.error('');
  process.exit(1);
}

console.log('Doctor database check passed.');
