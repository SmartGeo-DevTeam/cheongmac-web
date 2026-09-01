export type NoticeKind = 'notice' | 'holiday';

export type NoticeItem = {
  id: string;
  kind: NoticeKind;
  title: string;
  date: string;
  pinned?: boolean;
  hasLink?: boolean;
};

export type NoticeDetail = NoticeItem & {
  image?: string;
  imageAlt?: string;
  imageMode?: 'poster' | 'wide';
  lead?: string[];
  paragraphs?: string[];
  emphasis?: string;
};

const BASE_NOTICES: NoticeItem[] = [
  {
    id: 'naver-reservation-open',
    kind: 'notice',
    title: '네이버예약 OPEN',
    date: '2026. 10. 28',
    pinned: true,
  },
  {
    id: 'seomyeon-medical-center-move',
    kind: 'notice',
    title: '서면 메디컬센터 확장 이전 안내',
    date: '2026. 10. 28',
    pinned: true,
  },
  {
    id: 'seomyeon-medical-center-move-2',
    kind: 'notice',
    title: '서면 메디컬센터 확장 이전 안내',
    date: '2026. 10. 28',
  },
  {
    id: 'new-year-2026',
    kind: 'notice',
    title: '2026년 새해 인사',
    date: '2026. 10. 28',
    hasLink: true,
  },
  {
    id: 'privacy-policy-revision',
    kind: 'notice',
    title: '개인정보처리방침 개정 공지',
    date: '2026. 10. 28',
    hasLink: true,
  },
  {
    id: 'park-vacation-260926',
    kind: 'holiday',
    title: '혈관외과 박용범 원장 휴진 안내 (26.09.26 ~ 26.09.27)',
    date: '2026. 10. 28',
  },
  {
    id: 'seomyeon-medical-center-move-3',
    kind: 'notice',
    title: '서면 메디컬센터 확장 이전 안내',
    date: '2026. 10. 28',
  },
  {
    id: 'chuseok-closure',
    kind: 'holiday',
    title: '추석 연휴 휴진안내',
    date: '2026. 10. 28',
  },
  {
    id: 'seomyeon-medical-center-move-4',
    kind: 'notice',
    title: '서면 메디컬센터 확장 이전 안내',
    date: '2026. 10. 28',
  },
  {
    id: 'seomyeon-medical-center-move-5',
    kind: 'notice',
    title: '서면 메디컬센터 확장 이전 안내',
    date: '2026. 10. 28',
  },
];

const ARCHIVE_NOTICES: NoticeItem[] = Array.from({ length: 33 }, (_, index) => {
  const number = index + 11;
  const isHoliday = number % 6 === 0;

  return {
    id: `archive-${number}`,
    kind: isHoliday ? 'holiday' : 'notice',
    title: isHoliday
      ? `진료 일정 및 휴진 안내 ${number}`
      : `청맥병원 공지사항 ${number}`,
    date: `2026. ${String(Math.max(1, 10 - Math.floor(index / 5))).padStart(2, '0')}. ${String(
      28 - (index % 20),
    ).padStart(2, '0')}`,
  };
});

export const notices: NoticeItem[] = [...BASE_NOTICES, ...ARCHIVE_NOTICES];

export const noticeDetails: Record<string, NoticeDetail> = {
  'naver-reservation-open': {
    ...BASE_NOTICES[0]!,
    image: '/assets/images/notice/naver-detail.png',
    imageAlt: '청맥병원 네이버 예약 OPEN 안내',
    imageMode: 'wide',
    paragraphs: [
      '청맥병원을 찾아주시는 환자 및 보호자 여러분께 한층 더 편리한 의료 서비스를 제공해 드리고자 네이버 예약 서비스를 정식 오픈하였습니다.',
      '이제 별도의 전화 문의나 번잡한 절차 없이, 언제 어디서나 모바일과 PC를 통해 간편하게 진료 및 상담 예약을 진행하실 수 있습니다. 네이버 검색창에 청맥병원을 검색하신 후, ‘예약’ 버튼을 눌러 원하시는 진료 과목과 일정을 선택해 주시기 바랍니다.',
      '청맥병원은 앞으로도 환자분들의 이용 편의를 최우선으로 생각하며, 보다 쾌적하고 신뢰받는 진료 환경을 조성하기 위해 최선을 다하겠습니다. 많은 이용 부탁드립니다.',
    ],
    emphasis: '네이버예약 서비스 오픈일: 2027년 1월 1일',
  },
  'seomyeon-medical-center-move': {
    ...BASE_NOTICES[1]!,
    image: '/assets/images/notice/move-detail.png',
    imageAlt: '청맥병원 확장 이전 안내',
    imageMode: 'poster',
    lead: ['대한민국 혈관특별시,', '그 중심에는 청맥병원이 있습니다.'],
    paragraphs: [
      '혈관질환 진료와 치료를 넘어 대한민국 혈관 의료의 발전과 올바른 의료문화 형성에 책임을 다하는 청맥병원이 2027년 확장이전 오픈합니다.',
      '부산 최대 규모 혈관 중점 메디컬 센터로서, 20인 전문의의 분과별 협진 시스템으로 규모와 전문성을 대폭 강화하여 더 쾌적한 공간에서 깊이 있는 진료로 보답하겠습니다.',
      '확장이전 오픈일: 2027년 1월 1일\n위치: 부산진구 서전로 4 (서면역 6번 출구 100m 이내)\n진료과목: 혈관외과, 심장혈관흉부외과, 순환기내과, 신장내과, 외과, 비뇨의학과, 산부인과, 가정의학과, 영상의학과, 마취통증의학과',
    ],
  },
};

export function getNoticeDetail(id: string): NoticeDetail {
  const exact = noticeDetails[id];
  if (exact) return exact;

  const item = notices.find((notice) => notice.id === id) ?? notices[0];

  return {
    ...item,
    paragraphs: [
      '청맥병원 공지사항입니다. 자세한 내용은 병원 대표번호 또는 홈페이지 이용 안내를 통해 확인해 주세요.',
      '환자분들의 편리한 병원 이용을 위해 정확하고 신속한 안내를 제공하겠습니다.',
    ],
  };
}

export const doctorLeaves = [
  {
    name: '박용범 원장',
    department: '혈관외과 전문의',
    schedule: '9월 24일(목) ~ 9월 26일(토)',
    image: '/assets/images/notice/doctor-park.png',
  },
  {
    name: '전진원 원장',
    department: '혈관외과 전문의',
    schedule: '8월 26일(수) 오후 휴진',
    image: '/assets/images/notice/doctor-jeon.png',
  },
  {
    name: '장지란 원장',
    department: '혈관외과 전문의',
    schedule: '9월 24일(목) ~ 9월 26일(토)',
    image: '/assets/images/notice/doctor-jang.png',
  },
  {
    name: '변승재 원장',
    department: '혈관외과 전문의',
    schedule: '예정된 휴진 없음',
    image: '/assets/images/notice/doctor-byun.png',
  },
] as const;
