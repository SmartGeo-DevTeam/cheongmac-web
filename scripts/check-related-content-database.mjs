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
    `${resource} 콘텐츠 데이터 리소스가 필요합니다.`,
  );
}

for (const groupLabel of [
  '진료 데이터',
  '학술·미디어',
  '환자 소통',
]) {
  requireText(
    'src/_lib/related-content-types.ts',
    `label: '${groupLabel}'`,
    `${groupLabel} 내부 데이터 분류가 필요합니다.`,
  );
}

for (const pageMenuLabel of [
  '의료진/진료과',
  '병원 둘러보기',
  '첨단의료장비',
  '학술교류',
  '학회활동',
  '치료사례',
  '의학상담',
  '공지사항',
  '청맥뉴스',
  '의료협약병원',
]) {
  requireText(
    'src/app/admin/_components/admin-sidebar.tsx',
    pageMenuLabel,
    `${pageMenuLabel} 페이지명 관리자 메뉴가 필요합니다.`,
  );
}

forbidText(
  'src/app/admin/_components/admin-sidebar.tsx',
  '<Database',
  '하위 데이터 메뉴는 일괄 Database 아이콘 대신 용도별 아이콘을 사용해야 합니다.',
);

forbidText(
  'src/app/admin/_components/admin-sidebar.tsx',
  '<SidebarGroupLabel>관계형 콘텐츠 DB</SidebarGroupLabel>',
  '각 데이터베이스는 의료진 하위처럼 보이지 않도록 별도 용도 그룹으로 분류해야 합니다.',
);

forbidText(
  'src/app/admin/content-relations/[resource]/page.tsx',
  '>관계형 콘텐츠 DB<',
  '각 데이터 목록의 상단 분류명은 실제 데이터 그룹명을 사용해야 합니다.',
);

requireText(
  'src/app/admin/content-relations/[resource]/page.tsx',
  'meta.groupLabel',
  '각 데이터 목록에서 진료/학술·미디어/환자소통 그룹명을 표시해야 합니다.',
);

requireText(
  'src/app/admin/content-relations/[resource]/page.tsx',
  '관련 의료진',
  '각 데이터 DB 목록에 관련 의료진 컬럼이 필요합니다.',
);

requireText(
  'src/app/admin/content-relations/[resource]/[id]/page.tsx',
  'name="doctorIds"',
  '미디어를 제외한 데이터 편집 화면에서 여러 의료진을 선택할 수 있어야 합니다.',
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

requireText(
  'src/app/admin/_components/admin-data-table.tsx',
  'name="q"',
  '관리자 Data Table에 검색 입력이 필요합니다.',
);

requireText(
  'src/app/admin/_components/admin-data-table.tsx',
  'totalPages',
  '관리자 Data Table에 페이지네이션이 필요합니다.',
);

requireText(
  'src/app/admin/_components/admin-data-table.tsx',
  'min-w-[1040px]',
  '관리자 Data Table은 좁은 화면에서 내부 버튼이 찌그러지지 않도록 최소 폭과 가로 스크롤을 유지해야 합니다.',
);

requireText(
  'src/app/admin/content-relations/[resource]/page.tsx',
  'whitespace-nowrap',
  '상태/관리 버튼과 칩 텍스트는 좁은 컬럼에서 글자 단위로 줄바꿈되지 않아야 합니다.',
);

requireText(
  'src/app/admin/content-relations/[resource]/page.tsx',
  'getRelatedContentPage',
  '데이터 목록은 서버 검색/페이지네이션 조회를 사용해야 합니다.',
);

requireText(
  'src/_lib/related-content.ts',
  'contains: query',
  '데이터 DB 검색 조건이 필요합니다.',
);

requireText(
  'src/app/admin/content-relations/[resource]/page.tsx',
  '<AdminDataTable',
  '데이터 목록은 공통 AdminDataTable 컴포넌트를 사용해야 합니다.',
);

if (errors.length) {
  console.error('\nRelated content database check failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  console.error('');
  process.exit(1);
}

console.log('Related content database check passed.');
