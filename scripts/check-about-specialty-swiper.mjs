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
  'initialSlide={0}',
  'loop={false}',
  'slidesPerView: 3.6',
  'swiper.slideTo(index)',
  'aspect-[243/311]',
  'absolute inset-0 h-full w-full object-cover',
  'data-specialty-card',
  "data-active={active ? 'true' : 'false'}",
  'data-specialty-pagination',
  "String(index + 1).padStart(2, '0')",
]) {
  requireToken(component, token);
}

if (read(component).includes('slideToLoop(')) {
  console.error(
    '❌ ABOUT_SPECIALTY_SWIPER_CHECK 첫 번째 카드 왼쪽에 loop 복제 카드가 생길 수 있습니다.',
  );
  process.exit(1);
}

const data = 'src/app/about/introduction/_data.ts';
const requiredUrls = [
  'b5d8884b637d830ad2a4187eb9f674cffc8384ad6db8042851ab20d735708fd2.png',
  '7cec316b1938ee7108f614b8e0eea59ed263ce4e993e6bb5244d89e2c9d69df2.png',
  '6b8e908053dfc2c9d02332ffaf79dc9d22c2d22b07cc09daf728fe86a5583751.png',
  'd3c823553b31b94c858f0d204824092b926a49457ea074d13b7d91bf514eaca8.png',
  '5e574ae820e2dc07042fec3d49219d8b1ba4259d8397362d74e5fd3de5491f97.png',
  'f78bfc62053174407e245cdd07abcf85c21a1d80d2d4536e256b9758b0b04116.png',
  '3dfdf6ebb7bf3bd2100b4ff5c2c10769b4b8e599440ee4d228ae2f4a786a6b58.png',
];

for (const token of requiredUrls) {
  requireToken(data, token);
}

console.log(
  'ABOUT_SPECIALTY_SWIPER_CHECK_OK — 첫 카드 이전 loop 제거 / 모바일 1개 centered / 데스크탑 3.6개 / 243×311 첨부 배경 7종 / Azure canonical 이미지 / 콘텐츠 편집 연결 확인',
);
