import fs from 'node:fs';

function read(file) {
  if (!fs.existsSync(file)) {
    console.error(`❌ ABOUT_STORIES_COLLAGE_CHECK 파일 누락: ${file}`);
    process.exit(1);
  }
  return fs.readFileSync(file, 'utf8');
}

function requireToken(file, token) {
  const source = read(file);
  if (!source.includes(token)) {
    console.error(
      `❌ ABOUT_STORIES_COLLAGE_CHECK 연결 누락: ${file} -> ${token}`,
    );
    process.exit(1);
  }
}

const collage =
  'src/app/about/introduction/_components/stories-collage.tsx';

for (const token of [
  'data-about-stories-collage',
  'min-h-[775px]',
  'xl:min-h-[1024px]',
  'data-about-stories-mobile',
  'max-w-[351px]',
  'grid-cols-2',
  'md:hidden',
  'data-about-stories-desktop',
  'hidden w-fit',
  'grid-cols-[212px_212px_212px]',
  'md:grid',
  'pt-[74px]',
  'pt-[43px]',
  'copy.storiesImageTeam',
  'copy.storiesImageSurgeon',
  'copy.storiesImageCalligraphy',
  'copy.storiesImageBandage',
  'copy.storiesImageConsultation',
  'copy.storiesImageFlowers',
  'copy.storiesImageProcedure',
]) {
  requireToken(collage, token);
}

const page =
  'src/app/about/introduction/_components/about-introduction-content.tsx';

for (const token of [
  "import StoriesCollage from './stories-collage';",
  '<StoriesCollage copy={copy} />',
  "'storiesImageTeam'",
  "'storiesImageProcedure'",
]) {
  requireToken(page, token);
}

if (read(page).includes('copy.storiesImage}')) {
  console.error(
    '❌ ABOUT_STORIES_COLLAGE_CHECK 기존 단일 storiesImage 렌더가 남아 있습니다.',
  );
  process.exit(1);
}

const copy = 'src/_lib/public-page-copy.ts';

for (const token of [
  "storiesEyebrow: '청맥이 만난 사람들'",
  "key: 'storiesImageTeam'",
  "key: 'storiesImageSurgeon'",
  "key: 'storiesImageCalligraphy'",
  "key: 'storiesImageBandage'",
  "key: 'storiesImageConsultation'",
  "key: 'storiesImageFlowers'",
  "key: 'storiesImageProcedure'",
  '55a5d3671fef87cf3927ee98c78fb1af0b705e6314d4bb048cfabf994c2182a3.png',
  '5c880f14fc98ed6ee2554269c153b05d0002bd03a9c75d2767cce1bbe9cd1b8c.png',
  '7cbb26806a52d38730c3bfc7b5f652d0f8f872f634f4b87873199c9e4b5605ff.png',
  'd0f069fff9bc8d50ad4b988445c04b6205ba01d959974c8581119ca8f9f4f54c.png',
  'c6586bad8650b139c50cb9ef55ccfaa510cf5ab49ffba2ee6d6753359cd767ab.png',
  '5da1ffa4eaa8810f16b7bd4cfcdbff9d4a2c0a54a40531f6c8069c7b770a52b9.png',
  'aa3fd7e7842028755873195103560b9cf1dc134f9daaf8283061d4b54385fa72.png',
]) {
  requireToken(copy, token);
}

if (
  read(copy).includes(
    "{ key: 'storiesImage', label: '청맥 이야기 콜라주 이미지'",
  )
) {
  console.error(
    '❌ ABOUT_STORIES_COLLAGE_CHECK 기존 단일 storiesImage 편집 필드가 남아 있습니다.',
  );
  process.exit(1);
}

console.log(
  'ABOUT_STORIES_COLLAGE_CHECK_OK — 모바일 5장 / 데스크탑 7장 비대칭 콜라주 / 전달 이미지 원본 비율 / Azure canonical 7종 / PageContentBlock 개별 이미지 편집 연결 확인',
);
