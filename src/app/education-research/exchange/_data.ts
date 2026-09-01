export type AcademicExchangePost = {
  id: string;
  date: string;
  place: string;
  title: string;
  description: string;
  images: string[];
};

export const ACADEMIC_EXCHANGE_HERO_IMAGES = [
  {
    id: 'japan-exchange',
    src: '/assets/images/academic-exchange/japan-exchange.png',
    alt: '일본 의료진과 청맥병원 의료진의 학술교류',
  },
  {
    id: 'vietnam-korea-symposium',
    src: '/assets/images/academic-exchange/vietnam-korea-symposium.png',
    alt: '베트남·한국 혈관질환 국제 심포지엄',
  },
  {
    id: 'international-congress',
    src: '/assets/images/academic-exchange/international-congress.png',
    alt: '국제 정맥학 학술대회 교류 현장',
  },
] as const;

const DEFAULT_GALLERY = [
  '/assets/images/academic-exchange/vietnam-korea-symposium.png',
  '/assets/images/academic-exchange/japan-exchange.png',
  '/assets/images/academic-exchange/international-congress.png',
];

export const ACADEMIC_EXCHANGE_POSTS: AcademicExchangePost[] = [
  {
    id: '1',
    date: '2024.07.25',
    place: '청맥병원',
    title: '🇻🇳 베트남·한국 혈관질환 심포지엄',
    description:
      '국경을 넘어, 혈관치료의 경험을 나누다 (본문 최대 2줄)',
    images: DEFAULT_GALLERY,
  },
  {
    id: '2',
    date: '2024.07.25',
    place: '청맥병원',
    title: '🇻🇳 베트남·한국 혈관질환 심포지엄',
    description:
      '국경을 넘어, 혈관치료의 경험을 나누다 (본문 최대 2줄)',
    images: DEFAULT_GALLERY,
  },
  {
    id: '3',
    date: '2024.07.25',
    place: '청맥병원',
    title: '🇻🇳 베트남·한국 혈관질환 심포지엄',
    description:
      '국경을 넘어, 혈관치료의 경험을 나누다 (본문 최대 2줄)',
    images: DEFAULT_GALLERY,
  },
  {
    id: '4',
    date: '2024.07.25',
    place: '청맥병원',
    title: '🇻🇳 베트남·한국 혈관질환 심포지엄',
    description:
      '국경을 넘어, 혈관치료의 경험을 나누다 (본문 최대 2줄)',
    images: DEFAULT_GALLERY,
  },
  {
    id: '5',
    date: '2024.07.25',
    place: '청맥병원',
    title: '🇻🇳 베트남·한국 혈관질환 심포지엄',
    description:
      '국경을 넘어, 혈관치료의 경험을 나누다 (본문 최대 2줄)',
    images: DEFAULT_GALLERY,
  },
  {
    id: '6',
    date: '2024.07.25',
    place: '청맥병원',
    title: '🇻🇳 베트남·한국 혈관질환 심포지엄',
    description:
      '국경을 넘어, 혈관치료의 경험을 나누다 (본문 최대 2줄)',
    images: DEFAULT_GALLERY,
  },
];

export const ACADEMIC_EXCHANGE_TOTAL_COUNT = 1362;
