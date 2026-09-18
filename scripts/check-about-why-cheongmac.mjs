import fs from 'node:fs';

function read(file) {
  if (!fs.existsSync(file)) {
    console.error(`❌ ABOUT_WHY_CHEONGMAC_CHECK 파일 누락: ${file}`);
    process.exit(1);
  }
  return fs.readFileSync(file, 'utf8');
}

function requireToken(file, token) {
  const source = read(file);
  if (!source.includes(token)) {
    console.error(
      `❌ ABOUT_WHY_CHEONGMAC_CHECK 연결 누락: ${file} -> ${token}`,
    );
    process.exit(1);
  }
}

const component =
  'src/app/about/introduction/_components/why-cheongmac-section.tsx';

for (const token of [
  'data-why-cheongmac-section',
  'data-why-cheongmac-desktop',
  'grid-cols-[minmax(0,1fr)_400px_minmax(0,1fr)]',
  'data-why-cheongmac-mobile',
  'data-why-rotating-ring',
  'animate-spin',
  "animationDuration: '14s'",
  'conic-gradient',
  'copy.whyCenterImage',
  'copy.whyCenterAlt',
  'left.map((item)',
  'right.map((item)',
  'whyPoints.map((item)',
  'data-why-point-card',
  'ManagedItemEditButton',
  'CollectionAdminEditButton',
]) {
  requireToken(component, token);
}

const page =
  'src/app/about/introduction/_components/about-introduction-content.tsx';

for (const token of [
  "import WhyCheongmacSection from './why-cheongmac-section';",
  '<WhyCheongmacSection',
  'copy={copy}',
  'whyPoints={whyPoints}',
]) {
  requireToken(page, token);
}

if (read(page).includes('const leftWhy = whyPoints.filter')) {
  console.error(
    '❌ ABOUT_WHY_CHEONGMAC_CHECK 기존 WHY 청맥 좌우 레이아웃 로직이 부모 컴포넌트에 남아 있습니다.',
  );
  process.exit(1);
}

const copy = 'src/_lib/public-page-copy.ts';

for (const token of [
  "whyEyebrow: '믿음을 증명하는 실력'",
  "whyTitle: 'WHY 청맥'",
  '깊이 있는 전문성과 체계적인 의료 시스템부터',
  "https://cheongmacmedia.blob.core.windows.net/assets/managed/inline/page-copy/about-introduction/whyCenterImage/3f33798b4d795bf98a2c9e1a19ced75297240077861f6de8ac9927fb3175b310.png",
  "whyCenterAlt: '청맥병원 건물 전경'",
  "3f33798b4d795bf98a2c9e1a19ced75297240077861f6de8ac9927fb3175b310.png",
]) {
  requireToken(copy, token);
}

console.log(
  'ABOUT_WHY_CHEONGMAC_CHECK_OK — 데스크탑 3-센터-3 / 모바일 중앙 이미지+6개 세로 카드 / 주황 원형 14초 회전 / Azure 센터 이미지 / PageContentBlock·ManagedPageItem 편집 연결 확인',
);
