import fs from 'node:fs';

function read(file) {
  if (!fs.existsSync(file)) {
    console.error(`❌ ABOUT_SPECIALTY_SWIPER_CHECK 파일 누락: ${file}`);
    process.exit(1);
  }
  return fs.readFileSync(file, 'utf8');
}

function requireToken(file, token) {
  const source = read(file);
  if (!source.includes(token)) {
    console.error(
      `❌ ABOUT_SPECIALTY_SWIPER_CHECK 연결 누락: ${file} -> ${token}`,
    );
    process.exit(1);
  }
}

const component =
  'src/app/about/introduction/_components/specialty-principles-swiper.tsx';

for (const token of [
  "from 'swiper/react'",
  "import 'swiper/css'",
  'slidesPerView={1}',
  'centeredSlides',
  'slidesPerView: 3.6',
  'slideToLoop(index)',
  'data-specialty-card',
  "data-active={active ? 'true' : 'false'}",
  'data-specialty-pagination',
  "String(index + 1).padStart(2, '0')",
]) {
  requireToken(component, token);
}

const pageComponent =
  'src/app/about/introduction/_components/about-introduction-content.tsx';

for (const token of [
  "import SpecialtyPrinciplesSwiper from './specialty-principles-swiper';",
  '<SpecialtyPrinciplesSwiper items={specialtyCards} />',
  'data-specialty-principles-section',
  'radial-gradient',
]) {
  requireToken(pageComponent, token);
}

if (
  read(pageComponent).includes(
    'grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-7',
  )
) {
  console.error(
    '❌ ABOUT_SPECIALTY_SWIPER_CHECK 기존 7열 grid가 남아 있습니다.',
  );
  process.exit(1);
}

const data = 'src/app/about/introduction/_data.ts';
for (const token of [
  "title: '환자 중심'",
  "title: '정확한 진단'",
  "title: '근본 원인 치료'",
  "title: '정직한 진료'",
  "title: '안전 우선 원칙'",
  "title: '검증된 전문성'",
  "title: '평생 책임 관리'",
]) {
  requireToken(data, token);
}

const copy = 'src/_lib/public-page-copy.ts';
for (const token of [
  "specialtiesEyebrow: '청맥이 지켜온 원칙'",
  "specialtiesTitle: '정직한 진료로, 필요한 치료만'",
  '다음 7가지 원칙을 고집합니다.',
]) {
  requireToken(copy, token);
}

console.log(
  'ABOUT_SPECIALTY_SWIPER_CHECK_OK — 진료원칙 DB 카드 Swiper / 모바일 1개 centered / 데스크탑 3.6개 / active 중앙 / 커스텀 pagination / 콘텐츠 편집 연결 확인',
);
