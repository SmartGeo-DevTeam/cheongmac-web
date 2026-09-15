import fs from 'node:fs';

const checks = [
  ['prisma/schema.prisma', 'isHomeVisible  Boolean   @default(false)'],
  ['prisma/schema.prisma', 'beforeImageUrl String?'],
  ['prisma/schema.prisma', 'afterImageUrl  String?'],
  ['prisma/schema.prisma', 'keywords       String[]  @default([])'],
  ['src/_lib/home-reviews.ts', 'getHomeReviews'],
  ['src/app/_components/home/index.tsx', 'getHomeReviews'],
  ['src/app/_components/home/index.tsx', 'reviews={homeReviews}'],
  ['src/app/_components/home/6_reviews.tsx', 'reviews: HomeReview[]'],
  ['src/app/_components/home/6_reviews.tsx', 'href="/admin/content-relations/reviews"'],
  ['src/app/_components/home/6_reviews.tsx', '/admin/content-relations/reviews/${mainReview.id}'],
  ['src/app/admin/_actions/related-content.ts', "isHomeVisible: checkbox(formData, 'isHomeVisible')"],
  ['src/app/admin/_actions/related-content.ts', "revalidatePath('/');"],
  ['src/app/admin/content-relations/[resource]/[id]/page.tsx', 'related-content-home-visible'],
  ['src/_lib/related-content.ts', 'isHomeVisible: row.isHomeVisible'],
  ['src/app/admin/content-relations/[resource]/page.tsx', "item.isHomeVisible"],
  [
    'prisma/migrations/20260915_000010_doctor_review_homepage/migration.sql',
    'ADD COLUMN "isHomeVisible" BOOLEAN NOT NULL DEFAULT false',
  ],
];

for (const [file, token] of checks) {
  if (!fs.existsSync(file)) {
    console.error(`❌ HOME_REVIEWS_CANONICAL_CHECK 필수 파일 누락: ${file}`);
    process.exit(1);
  }

  const source = fs.readFileSync(file, 'utf8');

  if (!source.includes(token)) {
    console.error(
      `❌ HOME_REVIEWS_CANONICAL_CHECK 연결 누락: ${file} -> ${token}`,
    );
    process.exit(1);
  }
}

const homeReviews = fs.readFileSync(
  'src/app/_components/home/6_reviews.tsx',
  'utf8',
);

for (const token of [
  'const mainReview = {',
  'const videoReviews = [',
  'reviewCategory1',
  'reviewsPatientName',
  'videoReview1Title',
]) {
  if (homeReviews.includes(token)) {
    console.error(
      `❌ HOME_REVIEWS_CANONICAL_CHECK 메인 치료후기 하드코딩/중복 필드가 남아 있습니다: ${token}`,
    );
    process.exit(1);
  }
}

const homeCopy = fs.readFileSync(
  'src/_lib/home-page-copy.ts',
  'utf8',
);

for (const token of [
  'reviewCategory1',
  'reviewCategory6',
  'reviewsMainQuote',
  'reviewsPatientName',
  'reviewsPatientAge',
  'reviewsPatientGender',
  'reviewsTreatmentValue',
  'reviewsDoctorName',
  'videoReview1Title',
  'videoReview3Keyword3',
]) {
  if (homeCopy.includes(token)) {
    console.error(
      `❌ HOME_REVIEWS_CANONICAL_CHECK PageContentBlock 중복 데이터가 남아 있습니다: ${token}`,
    );
    process.exit(1);
  }
}

console.log(
  'HOME_REVIEWS_CANONICAL_CHECK_OK — DoctorReview 단일 DB / 메인 노출 체크 / 카테고리·전후사진·키워드 / 사용자 화면 관리자 연결 확인',
);
