export type NoticeCategory = 'notice' | 'holiday';

export type NoticeAttachment = {
  name: string;
  /** public 경로 또는 실제 다운로드 URL을 입력하면 상세 페이지에서 링크로 동작합니다. */
  href?: string;
};

export type NoticeDetailImageAspect = 'tall' | 'portrait' | 'square' | 'landscape';

export type NoticeItem = {
  id: number;
  category: NoticeCategory;
  title: string;
  date: string;
  isFeatured?: boolean;
  hasLinkIcon?: boolean;
  detailImageSrc?: string;
  detailImageAspect?: NoticeDetailImageAspect;
  body?: string[];
  closingText?: string;
  attachments?: NoticeAttachment[];
};

const BASE_NOTICE_ITEMS: NoticeItem[] = [
  {
    id: 1,
    category: 'notice',
    title: '네이버예약 OPEN',
    date: '2026.10.28',
    isFeatured: true,
    detailImageSrc: '/assets/images/home-notice-1.png',
    detailImageAspect: 'portrait',
    body: [
      '청맥병원을 찾아주시는 환자 및 보호자 여러분께 한층 더 편리한 의료 서비스를 제공해 드리고자 네이버 예약 서비스를 정식 오픈하였습니다.',
      '이제 별도의 전화 문의나 번잡한 절차 없이, 언제 어디서나 모바일과 PC를 통해 간편하게 진료 및 상담 예약을 진행하실 수 있습니다. 네이버 검색창에 ‘청맥병원’을 검색하신 후, ‘예약’ 버튼을 눌러 원하시는 진료 과목과 일정을 선택해 주시기 바랍니다.',
      '청맥병원은 앞으로도 환자분들의 이용 편의를 최우선으로 생각하며, 보다 쾌적하고 신뢰받는 진료 환경을 조성하기 위해 최선을 다하겠습니다. 많은 이용 부탁드립니다.',
    ],
    closingText: '네이버예약 서비스 오픈일: 2027년 1월 1일',
    attachments: [
      { name: '첨부파일명.xls' },
      { name: '첨부파일명.pdf' },
    ],
  },
  {
    id: 2,
    category: 'notice',
    title: '서면 메디컬센터 확장 이전 안내',
    date: '2026.01.01',
    isFeatured: true,
    detailImageSrc: '/assets/news/expansion.webp',
    detailImageAspect: 'tall',
    body: [
      '혈관질환 진료와 치료를 넘어 대한민국 혈관 의료의 발전과 올바른 의료문화 형성에 책임을 다하는 청맥병원이 2027년 확장이전 오픈합니다.',
      '부산 최대 규모 혈관 중점 메디컬 센터로서, 20인 전문의의 분과별 협진 시스템으로 규모와 전문성을 대폭 강화하여 더 쾌적한 공간에서 깊이 있는 진료로 보답하겠습니다.',
      '확장이전 오픈일: 2027년 1월 1일\n위치: 부산진구 서전로 4 (서면역 6번 출구 100m 이내)\n진료과목: 혈관외과, 심장혈관흉부외과, 순환기내과, 신장내과, 외과, 비뇨의학과, 산부인과, 가정의학과, 영상의학과, 마취통증의학과',
    ],
    attachments: [
      { name: '첨부파일명.xls' },
      { name: '첨부파일명.pdf' },
    ],
  },
  {
    id: 3,
    category: 'notice',
    title: '서면 메디컬센터 확장 이전 안내',
    date: '2026.10.28',
    detailImageSrc: '/assets/news/expansion.webp',
    detailImageAspect: 'tall',
  },
  {
    id: 4,
    category: 'notice',
    title: '2026년 새해 인사',
    date: '2026.01.01',
    hasLinkIcon: true,
    detailImageSrc: '/assets/news/new-year.webp',
    detailImageAspect: 'square',
  },
  {
    id: 5,
    category: 'notice',
    title: '개인정보처리방침 개정 공지',
    date: '2026.01.01',
    hasLinkIcon: true,
  },
  {
    id: 6,
    category: 'holiday',
    title: '혈관외과 박용범 원장 휴진 안내 (26.09.26 ~ 26.09.27)',
    date: '2026.09.20',
    detailImageSrc: '/assets/doctors/bak-headshot-mobile.png',
    detailImageAspect: 'square',
  },
  {
    id: 7,
    category: 'notice',
    title: '서면 메디컬센터 확장 이전 안내',
    date: '2026.08.28',
    detailImageSrc: '/assets/news/expansion.webp',
    detailImageAspect: 'tall',
  },
  {
    id: 8,
    category: 'holiday',
    title: '추석 연휴 휴진안내',
    date: '2026.08.20',
    detailImageSrc: '/assets/news/holiday.webp',
    detailImageAspect: 'square',
  },
  {
    id: 9,
    category: 'notice',
    title: '서면 메디컬센터 확장 이전 안내',
    date: '2026.08.18',
    detailImageSrc: '/assets/news/expansion.webp',
    detailImageAspect: 'tall',
  },
  {
    id: 10,
    category: 'notice',
    title: '진료시간 변경 안내',
    date: '2026.08.10',
  },
  {
    id: 11,
    category: 'holiday',
    title: '광복절·대체공휴일 휴진 안내',
    date: '2026.08.05',
    detailImageSrc: '/assets/news/holiday.webp',
    detailImageAspect: 'square',
  },
  {
    id: 12,
    category: 'notice',
    title: '청맥병원 홈페이지 이용 안내',
    date: '2026.07.30',
  },
  {
    id: 13,
    category: 'holiday',
    title: '의료진 휴진 일정 안내',
    date: '2026.07.22',
    detailImageSrc: '/assets/news/holiday.webp',
    detailImageAspect: 'square',
  },
  {
    id: 14,
    category: 'notice',
    title: '네이버 예약 서비스 이용 안내',
    date: '2026.07.15',
    detailImageSrc: '/assets/images/home-notice-1.png',
    detailImageAspect: 'portrait',
  },
  {
    id: 15,
    category: 'notice',
    title: '내원 전 확인사항 안내',
    date: '2026.07.08',
  },
];

/**
 * 실제 CMS/API 연동 전 디자인과 페이지네이션을 확인하기 위한 하드 DB입니다.
 * 총 43건이 노출되도록 기본 데이터를 반복해 구성합니다.
 */
export const NOTICE_ITEMS: NoticeItem[] = Array.from({ length: 43 }, (_, index) => {
  const base = BASE_NOTICE_ITEMS[index % BASE_NOTICE_ITEMS.length];

  return {
    ...base,
    id: index + 1,
    isFeatured: index < 2 ? true : false,
  };
});

export function getNoticeItemById(id: number): NoticeItem | undefined {
  return NOTICE_ITEMS.find((item) => item.id === id);
}

export function getNoticeItemSiblings(id: number): {
  previous?: NoticeItem;
  next?: NoticeItem;
} {
  const currentIndex = NOTICE_ITEMS.findIndex((item) => item.id === id);

  if (currentIndex < 0) return {};

  return {
    previous: currentIndex > 0 ? NOTICE_ITEMS[currentIndex - 1] : undefined,
    next:
      currentIndex < NOTICE_ITEMS.length - 1
        ? NOTICE_ITEMS[currentIndex + 1]
        : undefined,
  };
}

export function getNoticeBody(item: NoticeItem): string[] {
  if (item.body?.length) return item.body;

  if (item.category === 'holiday') {
    return [
      `${item.title}와 관련하여 청맥병원 진료 일정을 안내드립니다.`,
      '내원 예정인 환자 및 보호자분께서는 휴진 일정을 미리 확인하시어 진료 이용에 불편이 없으시길 바랍니다.',
      '진료 일정은 병원 사정에 따라 변경될 수 있으며, 자세한 내용은 대표전화 또는 병원 안내를 통해 확인해 주세요.',
      '감사합니다.',
    ];
  }

  return [
    `${item.title}와 관련한 청맥병원의 주요 안내사항을 전해드립니다.`,
    '환자 및 보호자분들이 병원을 보다 편리하게 이용하실 수 있도록 필요한 내용을 정확하고 신속하게 안내해 드리겠습니다.',
    '앞으로도 청맥병원은 더 나은 진료 환경과 의료 서비스를 제공하기 위해 최선을 다하겠습니다.',
    '감사합니다.',
  ];
}
