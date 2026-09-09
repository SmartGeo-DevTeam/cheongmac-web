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

const joinModels = [
  'DoctorSpecialtyDoctor',
  'DoctorScheduleDoctor',
  'DoctorPresentationDoctor',
  'DoctorReviewDoctor',
  'DoctorMediaDoctor',
  'MedicalConsultationDoctor',
];

for (const model of joinModels) {
  requireText(
    'prisma/schema.prisma',
    `model ${model} {`,
    `${model} 다대다 관계 모델이 필요합니다.`,
  );
}

for (const resource of [
  'specialties',
  'schedules',
  'presentations',
  'reviews',
  'media',
  'consultations',
]) {
  requireText(
    'src/_lib/related-content-types.ts',
    `'${resource}'`,
    `${resource} 관계형 콘텐츠 리소스가 필요합니다.`,
  );
}

requireText(
  'src/app/admin/content-relations/[resource]/page.tsx',
  '관련 의료진',
  '각 콘텐츠 DB 목록에 관련 의료진 컬럼이 필요합니다.',
);

requireText(
  'src/app/admin/content-relations/[resource]/[id]/page.tsx',
  'name="doctorIds"',
  '각 콘텐츠 편집 화면에서 여러 의료진을 선택할 수 있어야 합니다.',
);

requireText(
  'src/app/admin/_actions/related-content.ts',
  'createMany',
  '콘텐츠와 관련 의료진 관계를 저장해야 합니다.',
);

requireText(
  'prisma/migrations/20260909_000005_related_content_many_to_many/migration.sql',
  'doctor_specialty_legacy',
  '기존 의료진 종속 데이터를 보존하며 새 구조로 이전해야 합니다.',
);

requireText(
  'prisma/migrations/20260909_000005_related_content_many_to_many/migration.sql',
  'medical_consultation_doctor',
  '기존 의학상담-의료진 관계를 join table로 이전해야 합니다.',
);

if (errors.length) {
  console.error('\nRelated content database check failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  console.error('');
  process.exit(1);
}

console.log('Related content database check passed.');
