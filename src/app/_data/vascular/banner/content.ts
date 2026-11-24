export const vascularReservationBanner = {
  href: '/guide/reservation',
  heading: '최대한 빠른',
  subheading: '검사 날짜는 언제일까요?',
  ctaLabel: '자세히보기',
  variant: 'mint',
  image: {
    src: '/vascular/banner/clock.png',
    alt: '검사 예약 안내 시계',
    desktopOnly: true,
  },
} as const;

export const vascularHealthBanner = {
  href: '/guide/reservation',
  heading: '청맥병원에서 시작하는',
  subheading: '혈관 건강',
  ctaLabel: '진료예약 바로가기',
  variant: 'pink',
  image: {
    src: '/vascular/banner/health-checkup.png',
    alt: '심장과 건강 체크리스트를 형상화한 일러스트',
  },
} as const;
