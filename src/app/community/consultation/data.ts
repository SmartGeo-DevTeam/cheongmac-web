/**
 * 의학상담 목록의 진료분야와 UI 확인용 데이터입니다.
 * 실제 상담 기록이 아닙니다. DB 연결 시 consultationItems를 서버 조회 결과로 교체하세요.
 * private 게시글의 본문/답변 공개 여부는 반드시 서버에서 검증해야 합니다.
 */
export const consultationCategories = [
  { id: 'all', label: '전체' },
  { id: 'varicose', label: '하지정맥류' },
  { id: 'pelvic-vein', label: '골반정맥류' },
  { id: 'varicocele', label: '정계정맥류' },
  { id: 'fibroids', label: '자궁근종' },
  { id: 'peripheral-artery', label: '하지동맥폐색증' },
  { id: 'dialysis-access', label: '투석혈관' },
  { id: 'diabetic-foot', label: '당뇨발' },
  { id: 'dvt', label: '심부정맥혈전증' },
  { id: 'other', label: '기타' },
] as const;

export type ConsultationCategoryId =
  (typeof consultationCategories)[number]['id'];
export type ConsultationFieldId = Exclude<ConsultationCategoryId, 'all'>;

export type ConsultationDoctor = {
  name: string;
  department: string;
};

export type ConsultationItem = {
  id: number;
  category: ConsultationFieldId;
  primaryCategory: string;
  title: string;
  author?: string;
  date: string;
  isPrivate: boolean;
  hasLinkIcon?: boolean;
  doctor?: ConsultationDoctor;
  question: string;
  imageSrc?: string;
  answer?: string;
};

const doctors = {
  park: { name: '박용범 원장', department: '혈관외과' },
  byun: { name: '변승재 원장', department: '혈관외과' },
  jeon: { name: '전진원 원장', department: '혈관외과' },
  jang: { name: '장지란 원장', department: '혈관외과' },
} satisfies Record<string, ConsultationDoctor>;

// 화면 구성 확인을 위한 가상 예시입니다. 실제 환자 상담, 진단, 답변이 아닙니다.
export const consultationItems: ConsultationItem[] = [
  {
    id: 1,
    category: 'varicose',
    primaryCategory: '정맥',
    title: '오래 서서 일하는데 저녁마다 다리가 무겁습니다',
    date: '2026-10-28',
    author: '강준현',
    isPrivate: true,
    doctor: doctors.park,
    question:
      '장시간 서서 일한 후 다리가 무겁고 붓는 느낌이 있어 상담을 요청합니다.',
    answer:
      '지속적인 불편감이 있다면 진료를 통해 정맥 순환 상태를 확인하는 것이 좋습니다.',
  },
  {
    id: 2,
    category: 'other',
    primaryCategory: '기타',
    title: '하지동맥폐색, 하지정맥류 악화',
    date: '2026-10-28',
    author: '강준현',
    isPrivate: false,
    doctor: doctors.park,
    imageSrc: '/consultation/temp.png',
    question:
      '다리 혈관이 도드라져 보여서 문의드립니다. 증상이 동맥과 정맥 중 어떤 질환과 관련된 것인지 궁금합니다. 필요한 검사가 있다면 안내 부탁드립니다.',
    answer:
      '사진만으로 질환을 확정할 수는 없습니다. 증상과 현재 상태에 대한 문진 및 진찰을 통해 필요한 검사를 결정하는 것이 좋습니다. 불편감이 지속된다면 병원에 내원하여 진료받으시길 권합니다.',
  },
  {
    id: 3,
    category: 'dvt',
    primaryCategory: '동맥',
    title: '한쪽 다리만 붓는데 검사를 받아야 할까요?',
    date: '2026-10-28',
    author: '강준현',
    isPrivate: true,
    doctor: doctors.byun,
    question: '며칠 전부터 한쪽 다리가 부어 검사가 필요한지 궁금합니다.',
    answer:
      '증상이 지속되거나 통증 등이 있다면 진료를 통해 원인을 확인하는 것이 중요합니다.',
  },
  {
    id: 4,
    category: 'varicocele',
    primaryCategory: '정맥',
    title: '정계정맥류 수술 비용이 궁금합니다',
    date: '2026-10-28',
    author: '강준현',
    isPrivate: true,
    hasLinkIcon: true,
    doctor: doctors.jeon,
    question: '정계정맥류 치료 방법과 비용에 관해 문의드립니다.',
    answer:
      '치료 및 비용에 대한 상세 안내는 검사와 진료 후에 확인할 수 있습니다.',
  },
  {
    id: 5,
    category: 'fibroids',
    primaryCategory: '여성질환',
    title: '자궁근종색전술 치료 가능한가요?',
    date: '2026-10-28',
    author: '강준현',
    isPrivate: false,
    doctor: doctors.jang,
    question: '자궁근종 색전술이 가능한지 궁금합니다.',
    answer:
      '크기, 위치 및 증상 등을 진료에서 확인한 후 치료 가능 여부를 안내할 수 있습니다.',
  },
  {
    id: 6,
    category: 'other',
    primaryCategory: '기타',
    title: '하지동맥폐색, 하지정맥류 악화',
    date: '2026-10-28',
    author: '강준현',
    isPrivate: true,
    question: '다리 불편감이 최근 악화되어 문의드립니다.',
  },
  {
    id: 7,
    category: 'varicose',
    primaryCategory: '정맥',
    title: '비용 문의',
    date: '2026-10-28',
    author: '강준현',
    isPrivate: false,
    doctor: doctors.jeon,
    question: '하지정맥류 검사 및 치료 비용이 궁금합니다.',
    answer:
      '검사 범위와 치료 방식에 따라 달라질 수 있어 진료 후 안내 가능합니다.',
  },
  {
    id: 8,
    category: 'pelvic-vein',
    primaryCategory: '정맥',
    title: '골반 통증과 정맥류 검사에 대해 문의드립니다',
    date: '2026-10-25',
    author: '강준현',
    isPrivate: false,
    doctor: doctors.jang,
    question: '골반 통증이 있을 때 어떤 검사를 하는지 궁금합니다.',
    answer: '증상과 진료 결과에 따라 필요한 검사가 달라질 수 있습니다.',
  },
  {
    id: 9,
    category: 'peripheral-artery',
    primaryCategory: '동맥',
    title: '걸을 때 종아리가 아픈데 혈관 검사가 필요할까요?',
    date: '2026-10-23',
    author: '강준현',
    isPrivate: true,
    doctor: doctors.jeon,
    question: '걷는 도중 종아리가 아프다가 쉬면 나아집니다.',
    answer: '증상에 대한 진료와 검사로 원인을 확인하는 것이 중요합니다.',
  },
  {
    id: 10,
    category: 'dialysis-access',
    primaryCategory: '동맥',
    title: '투석혈관 협착 검사는 어떻게 진행되나요?',
    date: '2026-10-20',
    author: '강준현',
    isPrivate: false,
    doctor: doctors.park,
    question: '투석혈관 검사를 받는 과정이 궁금합니다.',
    answer: '현재 상태에 따라 적합한 검사를 안내받을 수 있습니다.',
  },
  {
    id: 11,
    category: 'diabetic-foot',
    primaryCategory: '동맥',
    title: '당뇨발 혈액순환 검사를 받아야 할까요?',
    date: '2026-10-18',
    author: '강준현',
    isPrivate: false,
    doctor: doctors.byun,
    question: '발 저림이 있을 때 어떤 진료를 받아야 할지 궁금합니다.',
    answer: '증상과 기저 질환을 함께 확인한 후 검사 필요성을 판단합니다.',
  },
  {
    id: 12,
    category: 'varicose',
    primaryCategory: '정맥',
    title: '압박스타킹은 언제 착용하는 것이 좋나요?',
    date: '2026-10-15',
    author: '강준현',
    isPrivate: false,
    doctor: doctors.park,
    question: '압박스타킹 착용 방법이 궁금합니다.',
    answer: '개인의 상태에 따라 착용 방법이 다르므로 진료 후 안내받으세요.',
  },
  {
    id: 13,
    category: 'dvt',
    primaryCategory: '정맥',
    title: '다리 부종이 오래 지속되어 걱정입니다',
    date: '2026-10-12',
    author: '강준현',
    isPrivate: true,
    question: '다리 부종이 반복되어 상담받고 싶습니다.',
  },
  {
    id: 14,
    category: 'varicose',
    primaryCategory: '정맥',
    title: '하지정맥류 검사 예약 전에 궁금한 점이 있습니다',
    date: '2026-10-10',
    author: '강준현',
    isPrivate: false,
    doctor: doctors.jeon,
    question: '하지정맥류 검사는 어떤 방식인지 궁금합니다.',
    answer: '진료 시 증상과 혈관 상태에 따라 필요한 검사를 진행합니다.',
  },
  {
    id: 15,
    category: 'fibroids',
    primaryCategory: '여성질환',
    title: '자궁근종 치료 후 일상 복귀까지 얼마나 걸리나요?',
    date: '2026-10-07',
    author: '강준현',
    isPrivate: false,
    doctor: doctors.jang,
    question: '치료 후 회복 기간이 궁금합니다.',
    answer: '치료 방법과 개인 상태에 따라 달라질 수 있어 진료 후 안내드립니다.',
  },
];

export function getConsultationItem(id: number): ConsultationItem | undefined {
  return consultationItems.find((item) => item.id === id);
}
