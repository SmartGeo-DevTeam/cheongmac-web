export type HomeCoverSlide = {
  itemKey: string;
  id: string;
  titleLead: string;
  titleStrong: string;
  description1: string;
  description2: string;
  buttonLabel: string;
  actionType: 'macgpt' | 'link';
  href: string;
  openInNewTab: boolean;
  mobileImage: string;
  desktopImage: string;
  alt: string;
};

export type HomeCoverPopup = {
  itemKey: string;
  id: string;
  title: string;
  lines: string[];
  backgroundColor: string;
  icon: string;
  href: string;
  openInNewTab: boolean;
  desktopOrder: number;
  mobileOrder: number;
};

function stringValue(
  value: Record<string, unknown>,
  key: string,
  fallback: string,
) {
  const candidate = value[key];
  return typeof candidate === 'string' && candidate.trim()
    ? candidate
    : fallback;
}

export const DEFAULT_HOME_COVER_SLIDES: HomeCoverSlide[] = [
  {
    itemKey: 'slide:1',
    id: 'slide-1',
    titleLead: '혈관의 모든 정답,',
    titleStrong: '청맥에 있습니다',
    description1: '더 스마트해진 혈관 특화 의료 혁신의 시작.',
    description2: '증상부터 치료까지 AI가 빠르고 정확한 길을 안내합니다.',
    buttonLabel: '맥GPT에게 물어보기→',
    actionType: 'macgpt',
    href: '/',
    openInNewTab: false,
    mobileImage: '/assets/images/home-cover-mobile-1.png',
    desktopImage: '/assets/images/home-cover-desktop-1.png',
    alt: '청맥병원 메인 커버',
  },
  {
    itemKey: 'slide:2',
    id: 'slide-2',
    titleLead: '혈관을 잘 아는 의사,',
    titleStrong: '청맥에 있습니다',
    description1: '오직 혈관질환에 집중한 전문의 협진으로',
    description2: '깊이 있는 진료, 정밀한 치료를 약속드립니다.',
    buttonLabel: '맞춤 의료진 찾기→',
    actionType: 'link',
    href: '/',
    openInNewTab: true,
    mobileImage: '/assets/images/home-cover-mobile-1.png',
    desktopImage: '/assets/images/home-cover-desktop-2.png',
    alt: '청맥병원 의료진 메인 커버',
  },
  {
    itemKey: 'slide:3',
    id: 'slide-3',
    titleLead: '대한정맥학회도',
    titleStrong: '인정한 청맥의 전문성',
    description1: '2026 대한정맥학회 학술연구비 지원 대상 선정!',
    description2: '차별화된 전문성으로 혈관 진료의 발전을 선도합니다.',
    buttonLabel: '자세히 보기→',
    actionType: 'link',
    href: '/',
    openInNewTab: true,
    mobileImage: '/assets/images/home-cover-mobile-1.png',
    desktopImage: '/assets/images/home-cover-desktop-3.png',
    alt: '청맥병원 전문성 메인 커버',
  },
];

export const DEFAULT_HOME_COVER_POPUPS: HomeCoverPopup[] = [
  {
    itemKey: 'popup:1',
    id: 'may-clinic',
    title: '5월 진료 안내',
    lines: [
      '5월 1일 (금) 노동절 정상진료',
      '5월 25일 (월) 대체공휴일 휴진',
    ],
    backgroundColor: '#3270C3',
    icon: '➕',
    href: '/',
    openInNewTab: true,
    desktopOrder: 1,
    mobileOrder: 1,
  },
  {
    itemKey: 'popup:2',
    id: 'same-day-green',
    title: '당일 진료 접수 안내',
    lines: [
      '오전 11시까지 / 오후 4시까지',
      '접수하시면 당일 진료가 가능합니다.',
    ],
    backgroundColor: '#767E93',
    icon: '🗓️',
    href: '/',
    openInNewTab: true,
    desktopOrder: 2,
    mobileOrder: 3,
  },
  {
    itemKey: 'popup:3',
    id: 'same-day-blue',
    title: '당일 진료 접수 안내',
    lines: [
      '오전 11시까지 / 오후 4시까지',
      '접수하시면 당일 진료가 가능합니다.',
    ],
    backgroundColor: '#4F8D76',
    icon: '🗓️',
    href: '/',
    openInNewTab: true,
    desktopOrder: 3,
    mobileOrder: 2,
  },
];

export function buildHomeCoverContentFromLegacy(
  copy: Record<string, unknown> = {},
): {
  slides: HomeCoverSlide[];
  popups: HomeCoverPopup[];
} {
  const slides = DEFAULT_HOME_COVER_SLIDES.map((slide, index) => {
    const number = index + 1;
    return {
      ...slide,
      titleLead: stringValue(
        copy,
        `coverSlide${number}TitleLead`,
        slide.titleLead,
      ),
      titleStrong: stringValue(
        copy,
        `coverSlide${number}TitleStrong`,
        slide.titleStrong,
      ),
      description1: stringValue(
        copy,
        `coverSlide${number}Description1`,
        slide.description1,
      ),
      description2: stringValue(
        copy,
        `coverSlide${number}Description2`,
        slide.description2,
      ),
      buttonLabel: stringValue(
        copy,
        `coverSlide${number}Button`,
        slide.buttonLabel,
      ),
    };
  });

  const popups = DEFAULT_HOME_COVER_POPUPS.map((popup, index) => {
    const number = index + 1;
    return {
      ...popup,
      title: stringValue(
        copy,
        `coverPopup${number}Title`,
        popup.title,
      ),
      lines: [
        stringValue(
          copy,
          `coverPopup${number}Line1`,
          popup.lines[0] ?? '',
        ),
        stringValue(
          copy,
          `coverPopup${number}Line2`,
          popup.lines[1] ?? '',
        ),
      ].filter(Boolean),
    };
  });

  return { slides, popups };
}
