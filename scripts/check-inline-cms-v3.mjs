import fs from 'node:fs';

const checks = [
  ['src/_lib/home-page-copy.ts', 'HOME_PAGE_COPY_CONFIG'],
  ['src/_lib/public-page-copy.ts', "'/': HOME_PAGE_COPY_CONFIG"],
  ['src/_lib/public-page-management.ts', "'/': {"],
  ['src/app/_components/home/index.tsx', "getPublicPageCopyConfig('/')"],
  ['src/app/page.tsx', "dynamic = 'force-dynamic'"],
  ['src/app/_components/inline-editor/editable-page-copy-region.tsx', 'allowReset={false}'],
  ['src/app/_components/home/1_cover.tsx', '메인 팝업 공통 문구'],
  ['src/app/_components/home/2_specialties.tsx', '메인 진료분야 문구'],
  ['src/app/_components/home/3_doctors.tsx', '메인 의료진 문구'],
  ['src/app/_components/home/5_name.tsx', '메인 영문 롤링 문구'],
  ['src/app/_components/home/6_reviews.tsx', '메인 치료후기 문구'],
  ['src/app/_components/home/8_info.tsx', '메인 병원소식 문구'],
  ['src/app/about/tour/_components/hospital-tour-content.tsx', 'group w-full overflow-hidden'],
  ['src/_lib/public-page-copy.ts', 'introAccentText'],
  ['src/app/education-research/exchange/_components/academic-exchange-content.tsx', 'AccentIntroTitle'],
  ['src/app/_components/inline-editor/editable-region.tsx', 'min-h-[96px] max-h-[240px]'],
  ['src/app/community/customer-voice/page.tsx', 'getPageContentBlock'],
  ['src/app/community/customer-voice/_components/customer-voice-overview.tsx', '고객의 소리 접수·처리 안내'],
  ['src/_lib/page-content-blocks.ts', "code?: unknown }).code === 'P1001'"],
];

for (const [file, token] of checks) {
  if (!fs.existsSync(file)) {
    console.error(`❌ 필수 파일 누락: ${file}`);
    process.exit(1);
  }

  const source = fs.readFileSync(file, 'utf8');

  if (!source.includes(token)) {
    console.error(`❌ Inline CMS v3 검사 실패: ${file} -> ${token}`);
    process.exit(1);
  }
}

const editableRegion = fs.readFileSync(
  'src/app/_components/inline-editor/editable-region.tsx',
  'utf8',
);

if (editableRegion.includes("'min-h-64 leading-7'")) {
  console.error('❌ 구형 editor min-h-64 스타일이 남아 있습니다.');
  process.exit(1);
}

const tour = fs.readFileSync(
  'src/app/about/tour/_components/hospital-tour-content.tsx',
  'utf8',
);

if (!tour.includes('className="group w-full overflow-hidden')) {
  console.error('❌ 병원 둘러보기 시설 카드 width 복구가 누락되었습니다.');
  process.exit(1);
}

console.log(
  'INLINE_CMS_V3_CHECK_OK — 메인 문구 / tour width / exchange accent / compact dialog / customer-voice subregions 확인',
);
