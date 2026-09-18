export type AboutIntroductionSpecialtyCard = {
  itemKey: string;
  title: string;
  description: string;
  image: string;
};

export type AboutIntroductionWhyPoint = {
  itemKey: string;
  title: string;
  description: string;
  side: 'left' | 'right';
};

export type AboutIntroductionPromise = {
  itemKey: string;
  numberLabel: string;
  title: string;
  description: string;
};

export type AboutIntroductionQuickLink = {
  itemKey: string;
  label: string;
  href: string;
};

export type AboutIntroductionOverviewRow = {
  itemKey: string;
  label: string;
  value: string;
};

export type AboutIntroductionHistoryPeriod =
  | 'growth'
  | 'root'
  | 'future';

export type AboutIntroductionHistoryYear = {
  itemKey: string;
  period: AboutIntroductionHistoryPeriod;
  year: number;
  title?: string;
  details: string[];
};

export type AboutIntroductionContributionActivity = {
  itemKey: string;
  title: string;
  description?: string;
  image: string;
};

export const ABOUT_INTRO_SPECIALTY_CARDS: AboutIntroductionSpecialtyCard[] = [
  {
    itemKey: 'specialty:patient-centered',
    title: '환자 중심',
    description:
      '질환만을 보지 않고, 환자의 건강과 삶의 질을 함께 살펴 꼭 맞는 치료 방향을 제시합니다.',
    image: '/assets/images/hospital-tour/consulting-room.jpg',
  },
  {
    itemKey: 'specialty-vein',
    title: '정확한 진단',
    description:
      '20년 이상 임상 경험과 체계적인 진단 시스템을 바탕으로 질환의 원인과 상태를 정확하게 짚어냅니다.',
    image: '/assets/images/medical-equipment/logiq-p9-pro.png',
  },
  {
    itemKey: 'specialty:root-cause',
    title: '근본 원인 치료',
    description:
      '당장의 증상 완화에 머물지 않고, 재발과 합병증까지 막는 근본적인 원인 해결에 집중합니다.',
    image: '/assets/images/medical-equipment/ct.png',
  },
  {
    itemKey: 'specialty:diagnosis',
    title: '정직한 진료',
    description:
      '과잉 진료 없이 공인된 학회 가이드라인에 따라 내 가족에게 권할 꼭 필요한 치료만 실천합니다.',
    image: '/assets/images/hospital-tour/hybrid-or.jpg',
  },
  {
    itemKey: 'specialty:safety',
    title: '안전 우선 원칙',
    description:
      '외과·영상의학·마취과 전문의의 유기적인 다학제 협진으로 가장 안전한 치료 환경을 구축합니다.',
    image: '/assets/images/hospital-tour/hyperbaric.jpg',
  },
  {
    itemKey: 'specialty:expertise',
    title: '검증된 전문성',
    description:
      '풍부한 임상 경험과 끊임없는 최신 의학 연구를 토대로 환자 맞춤형 치료를 선보입니다.',
    image: '/assets/doctors/byun-headshot-mobile.png',
  },
  {
    itemKey: 'specialty:lifetime',
    title: '평생 책임 관리',
    description:
      '치료에서 끝내지 않고, 건강한 일상을 온전히 되찾을 때까지 곁에서 지속 관리합니다.',
    image: '/assets/images/hospital-tour/waiting-room.jpg',
  },
];

export const ABOUT_INTRO_WHY_POINTS: AboutIntroductionWhyPoint[] = [
  {
    itemKey: 'why:vascular-specialty',
    title: '혈관질환에 집중한 진료',
    description: '혈관질환 전 영역을 한 곳에서 살피는 진료 체계를 구축해 왔습니다.',
    side: 'left',
  },
  {
    itemKey: 'why:experience',
    title: '축적된 치료 경험',
    description: '풍부한 진료와 수술·시술 경험을 바탕으로 치료 기준을 세웁니다.',
    side: 'right',
  },
  {
    itemKey: 'why:diagnostic-system',
    title: '정밀한 진단 시스템',
    description: '혈관 초음파와 영상검사를 통해 원인을 확인하고 치료 방향을 정합니다.',
    side: 'left',
  },
  {
    itemKey: 'why:team',
    title: '전문 의료진 협진',
    description: '혈관외과·영상의학과·마취통증의학과 의료진이 함께 환자를 살핍니다.',
    side: 'right',
  },
  {
    itemKey: 'why:research',
    title: '학술과 연구를 진료로',
    description: '국내외 학술활동과 연구 성과를 실제 진료의 기준으로 연결합니다.',
    side: 'left',
  },
  {
    itemKey: 'why:continuity',
    title: '치료 이후까지 이어지는 관리',
    description: '검사와 치료뿐 아니라 회복과 이후의 혈관 건강까지 함께합니다.',
    side: 'right',
  },
];

export const ABOUT_INTRO_PROMISES: AboutIntroductionPromise[] = [
  {
    itemKey: 'promise:one',
    numberLabel: '하나.',
    title: '환자의 이야기를 먼저 듣겠습니다.',
    description:
      '증상만 보는 진료가 아니라 환자의 생활과 걱정까지 충분히 듣고 치료 방향을 설명하겠습니다.',
  },
  {
    itemKey: 'promise:two',
    numberLabel: '둘.',
    title: '필요한 치료를 정직하게 제안하겠습니다.',
    description:
      '검사 결과와 의학적 기준에 따라 환자에게 필요한 치료를 알기 쉽게 안내하겠습니다.',
  },
  {
    itemKey: 'promise:three',
    numberLabel: '셋.',
    title: '치료 이후의 삶까지 함께하겠습니다.',
    description:
      '치료 후 회복과 생활관리까지 이어지는 혈관 건강의 동반자가 되겠습니다.',
  },
];

export const ABOUT_INTRO_QUICK_LINKS: AboutIntroductionQuickLink[] = [
  {
    itemKey: 'quick-link:doctors',
    label: '의료진 소개',
    href: '/about/doctors',
  },
  {
    itemKey: 'quick-link:tour',
    label: '병원 둘러보기',
    href: '/about/tour',
  },
];

export const ABOUT_INTRO_OVERVIEW_ROWS: AboutIntroductionOverviewRow[] = [
  { itemKey: 'overview:name', label: '병원명', value: '청맥병원' },
  { itemKey: 'overview:opened', label: '개원', value: '2010년' },
  { itemKey: 'overview:director', label: '대표원장', value: '박용범' },
  {
    itemKey: 'overview:departments',
    label: '진료분야',
    value: '혈관외과 · 영상의학과 · 마취통증의학과',
  },
  {
    itemKey: 'overview:address',
    label: '주소',
    value: '부산광역시 부산진구 중앙대로 716-1',
  },
  {
    itemKey: 'overview:phone',
    label: '대표전화',
    value: '051-804-1119',
  },
];

export const ABOUT_INTRO_HISTORY_YEARS: AboutIntroductionHistoryYear[] = [
  {
    itemKey: 'history:growth:2026',
    period: 'growth',
    year: 2026,
    title: '성장의 가지',
    details: [
      '하지정맥류 수술 50,000례 달성',
      '하지동맥 수술 500례 달성',
      '대한정맥학회 학술연구비 지원 선정',
      '대한혈관외과학회 혈액투석길 연구회 우수구연상 수상',
      '대한투석혈관학회 학술대회 우수구연상 수상',
      '정맥 및 림프장애 매뉴얼북 공동번역 참여',
    ],
  },
  {
    itemKey: 'history:growth:2025',
    period: 'growth',
    year: 2025,
    details: [
      '청맥병원 진료 환자 5만 명 돌파',
      '투석혈관 수술 1,000례 달성',
      '골반정맥류 색전술 1,000례 달성',
      '정계정맥류 색전술 200례 달성',
      '대한혈관외과학회 후학 양성 공로상 수상',
      '탄자니아 무힘빌리 국립병원 의료봉사',
      '청년성장프로젝트 청춘맥락 후원',
      '제5회·6회 투석혈관 및 혈관질환 세미나 개최',
    ],
  },
  {
    itemKey: 'history:root:2017',
    period: 'root',
    year: 2017,
    title: '시작의 뿌리',
    details: [
      '보건복지부 외국인환자 유치기관 지정',
      '카자흐스탄 의료기술 전파 및 현지 의료기술 교육',
    ],
  },
  {
    itemKey: 'history:root:2016',
    period: 'root',
    year: 2016,
    details: [
      '하지정맥류 혈관내 소작술 레이저 및 고주파 치료 도입',
    ],
  },
  {
    itemKey: 'history:root:2015',
    period: 'root',
    year: 2015,
    details: [
      '대한민국나눔국민대상 보건복지부장관 표창 수상',
      '전문의 3인 진료 시스템 구축',
    ],
  },
  {
    itemKey: 'history:root:2014',
    period: 'root',
    year: 2014,
    details: ['하지정맥류 수술 10,000례 달성'],
  },
  {
    itemKey: 'history:root:2010',
    period: 'root',
    year: 2010,
    details: ['청맥외과 개원'],
  },
];

export const ABOUT_INTRO_CONTRIBUTION_ACTIVITIES: AboutIntroductionContributionActivity[] = [
  {
    itemKey: 'contribution:01',
    title: '지역 취약계층 정기 후원',
    image: '/about-introduction/contribution-01.webp',
  },
  {
    itemKey: 'contribution:02',
    title: '해외 의료봉사',
    image: '/about-introduction/contribution-02.webp',
  },
  {
    itemKey: 'contribution:03',
    title: '지역청년 성장지원 프로그램 후원',
    image: '/about-introduction/contribution-03.webp',
  },
  {
    itemKey: 'contribution:04',
    title: '전직원 참여 지역사회 정기후원 기부',
    image: '/about-introduction/contribution-04.webp',
  },
  {
    itemKey: 'contribution:05',
    title: '해안환경 정화활동 캠페인',
    image: '/about-introduction/contribution-05.webp',
  },
  {
    itemKey: 'contribution:06',
    title: '사랑의열매 기부',
    image: '/about-introduction/contribution-06.webp',
  },
  {
    itemKey: 'contribution:07',
    title: '연탄봉사활동',
    image: '/about-introduction/contribution-07.webp',
  },
  {
    itemKey: 'contribution:08',
    title: '부산 지역 나눔·복지 활동',
    image: '/about-introduction/contribution-08.webp',
  },
  {
    itemKey: 'contribution:09',
    title: '아동 복지시설 지원활동',
    image: '/about-introduction/contribution-09.webp',
  },
  {
    itemKey: 'contribution:10',
    title: '농촌 이주민 무료진료사업',
    image: '/about-introduction/contribution-10.webp',
  },
];
