import fs from 'node:fs';

const checks = [
  ['prisma/schema.prisma', 'homeQuote       String?  @db.Text'],
  ['src/_lib/doctors.ts', 'getHomeDoctors'],
  ['src/_lib/doctors.ts', 'DEFAULT_HOME_DOCTORS'],
  ['src/app/_components/home/index.tsx', 'getHomeDoctors'],
  ['src/app/_components/home/index.tsx', 'doctors={homeDoctors}'],
  ['src/app/_components/home/3_doctors.tsx', 'doctors: HomeDoctor[]'],
  ['src/app/_components/home/3_doctors.tsx', 'href="/admin/doctors"'],
  ['src/app/_components/home/3_doctors.tsx', '#admin-doctor-basic'],
  ['src/app/admin/_actions/doctor.ts', 'homeQuote: string;'],
  [
    'src/app/admin/_actions/doctor.ts',
    'homeQuote: optional(input.homeQuote, 10000)',
  ],
  [
    'src/app/admin/doctors/[doctorId]/doctor-editor.tsx',
    'admin-doctor-home-quote',
  ],
  [
    'src/app/admin/doctors/[doctorId]/page.tsx',
    "homeQuote: doctor.homeQuote ?? ''",
  ],
  [
    'prisma/migrations/20260915_000009_doctor_home_quote/migration.sql',
    'ADD COLUMN "homeQuote" TEXT',
  ],
];

for (const [file, token] of checks) {
  if (!fs.existsSync(file)) {
    console.error(`❌ HOME_DOCTORS_CANONICAL_CHECK 필수 파일 누락: ${file}`);
    process.exit(1);
  }

  const source = fs.readFileSync(file, 'utf8');

  if (!source.includes(token)) {
    console.error(
      `❌ HOME_DOCTORS_CANONICAL_CHECK 연결 누락: ${file} -> ${token}`,
    );
    process.exit(1);
  }
}

const homeDoctors = fs.readFileSync(
  'src/app/_components/home/3_doctors.tsx',
  'utf8',
);

if (
  homeDoctors.includes('const doctors: Doctor[]') ||
  homeDoctors.includes("doctorQuote1") ||
  homeDoctors.includes("doctorQuote2")
) {
  console.error(
    '❌ HOME_DOCTORS_CANONICAL_CHECK 메인 의료진 하드코딩/중복 인용문이 남아 있습니다.',
  );
  process.exit(1);
}

const homeCopy = fs.readFileSync(
  'src/_lib/home-page-copy.ts',
  'utf8',
);

for (let index = 1; index <= 6; index += 1) {
  if (homeCopy.includes(`doctorQuote${index}`)) {
    console.error(
      `❌ HOME_DOCTORS_CANONICAL_CHECK PageContentBlock 중복 필드가 남아 있습니다: doctorQuote${index}`,
    );
    process.exit(1);
  }
}

const doctorAction = fs.readFileSync(
  'src/app/admin/_actions/doctor.ts',
  'utf8',
);

if (!doctorAction.includes("revalidatePath('/');")) {
  console.error(
    '❌ HOME_DOCTORS_CANONICAL_CHECK 의료진 저장 후 메인페이지 revalidate 연결이 없습니다.',
  );
  process.exit(1);
}

console.log(
  'HOME_DOCTORS_CANONICAL_CHECK_OK — 메인 의료진 Doctor DB 단일화 / homeQuote / 관리자 편집 / 정적 중복 제거 확인',
);
