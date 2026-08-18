export type ConsultationCategory = {
  primary: string;
  secondary: string;
};

export type ConsultationDoctor = {
  name: string;
  department: string;
  specialties: string[];
  imageSrc: string;
};

export type ConsultationItem = {
  id: number;
  category: ConsultationCategory;
  title: string;
  date: string;
  isPrivate: boolean;
  hasLinkIcon?: boolean;
  answered: boolean;
  doctor?: ConsultationDoctor;
  question: string[];
  imageSrc?: string;
  answer?: string[];
  answerDate?: string;
};

export const CONSULTATION_DOCTORS = {
  park: {
    name: '박용범 원장',
    department: '혈관외과',
    specialties: ['하지정맥류', '정계정맥류', '투석혈관'],
    imageSrc: '/assets/doctors/bak-headshot-mobile.png',
  },
  jeon: {
    name: '전진원 원장',
    department: '혈관외과',
    specialties: ['하지정맥류', '동맥질환', '혈전질환'],
    imageSrc: '/assets/doctors/jeon-headshot-mobile.png',
  },
  jang: {
    name: '장지란 원장',
    department: '혈관외과',
    specialties: ['골반정맥류', '자궁근종', '하지정맥류'],
    imageSrc: '/assets/doctors/jang-headshot-mobile.png',
  },
  byun: {
    name: '변승재 원장',
    department: '혈관외과',
    specialties: ['심부정맥혈전증', '하지정맥류', '혈관초음파'],
    imageSrc: '/assets/doctors/byun-headshot-mobile.png',
  },
} satisfies Record<string, ConsultationDoctor>;

const BASE_ITEMS: ConsultationItem[] = [
  {
    id: 1,
    category: { primary: '정맥', secondary: '하지정맥류' },
    title: '오래 서서 일하는데 저녁마다 다리가 무겁습니다',
    date: '2026.10.28',
    isPrivate: true,
    answered: true,
    doctor: CONSULTATION_DOCTORS.park,
    imageSrc: '/assets/community/consultation/leg-question.webp',
    question: [
      '안녕하세요 68세 남자입니다. 5년쯤 일주다리 정강이 밑에 가려워서 손톱는데 가느다란 줄이 터져서 검은반점이 크게 여러군데 있어요. 어떻게 하시면 좋을지 문의 부탁드립니다.',
    ],
    answer: [
      '안녕하세요. 청맥병원 혈관외과 박용범 원장입니다.',
      '말씀해주신 내용만으로 정확한 원인을 단정하기는 어렵지만, 오래 서서 생활한 뒤 다리가 무겁고 피부 색이 변하거나 가려움이 반복된다면 정맥 순환 상태를 함께 확인해보는 것이 좋습니다.',
      '우선은 빠른 진료를 통해 현재 다리의 상태를 정확히 확인하는 것이 중요합니다. 병원으로 전화 주시면 진료에 도움이 될 수 있도록 안내를 드리겠습니다.',
      '다리에 더욱 악화되는 정맥증상이라 혹여 앉고 계시는 병이 악화되실까 염려스럽습니다. 하루 빨리 진료 보시기를 권유드립니다.',
    ],
    answerDate: '2026.10.28',
  },
  {
    id: 2,
    category: { primary: '동맥', secondary: '심부정맥혈전증' },
    title: '한쪽 다리만 붓는데 검사를 받아야 할까요?',
    date: '2026.10.28',
    isPrivate: true,
    answered: true,
    doctor: CONSULTATION_DOCTORS.byun,
    question: ['며칠 전부터 한쪽 다리만 붓고 묵직한 느낌이 있습니다. 혈전 검사가 필요한지 궁금합니다.'],
    answer: [
      '한쪽 다리의 갑작스러운 부종은 여러 원인으로 발생할 수 있습니다. 증상이 지속되거나 통증, 열감, 피부색 변화가 동반된다면 혈관 상태를 확인하기 위한 진료가 권장됩니다.',
    ],
    answerDate: '2026.10.28',
  },
  {
    id: 3,
    category: { primary: '정맥', secondary: '정계정맥류' },
    title: '정계정맥류 수술 비용이 궁금합니다',
    date: '2026.10.28',
    isPrivate: true,
    hasLinkIcon: true,
    answered: true,
    doctor: CONSULTATION_DOCTORS.jeon,
    question: ['정계정맥류 진단을 받았습니다. 치료 방법과 대략적인 비용이 궁금합니다.'],
    answer: ['치료 방법과 비용은 검사 결과와 치료 방식에 따라 달라질 수 있어 진료 후 안내드리는 것이 가장 정확합니다.'],
    answerDate: '2026.10.28',
  },
  {
    id: 4,
    category: { primary: '동맥', secondary: '심부정맥혈전증' },
    title: '자궁근종색전술 치료 가능한가요?',
    date: '2026.10.28',
    isPrivate: false,
    answered: true,
    doctor: CONSULTATION_DOCTORS.jang,
    question: ['자궁근종 때문에 색전술을 알아보고 있습니다. 진료와 치료가 가능한지 궁금합니다.'],
    answer: ['자궁근종의 크기와 위치, 증상 등을 확인한 뒤 색전술 적용 가능 여부를 판단할 수 있습니다.'],
    answerDate: '2026.10.28',
  },
  {
    id: 5,
    category: { primary: '부인과', secondary: '자궁근종' },
    title: '자궁근종색전술 치료 가능한가요?',
    date: '2026.10.28',
    isPrivate: true,
    answered: true,
    doctor: CONSULTATION_DOCTORS.jang,
    question: ['수술 대신 자궁근종색전술을 고려하고 있습니다. 상담을 받고 싶습니다.'],
    answer: ['영상 검사와 현재 증상을 함께 확인하면 적절한 치료 방향을 안내드릴 수 있습니다.'],
    answerDate: '2026.10.28',
  },
  {
    id: 6,
    category: { primary: '기타', secondary: '' },
    title: '하지동맥폐색, 하지정맥류 악화',
    date: '2026.10.28',
    isPrivate: true,
    answered: false,
    question: ['하지동맥과 정맥 관련 증상이 함께 있는 것 같아 어떤 검사를 받아야 할지 문의드립니다.'],
  },
  {
    id: 7,
    category: { primary: '정맥', secondary: '하지정맥류' },
    title: '비용 문의',
    date: '2026.10.28',
    isPrivate: false,
    answered: true,
    doctor: CONSULTATION_DOCTORS.jeon,
    question: ['하지정맥류 검사와 치료 비용이 궁금합니다.'],
    answer: ['검사 범위와 치료 방식에 따라 비용이 달라질 수 있어 진료 후 정확하게 안내드릴 수 있습니다.'],
    answerDate: '2026.10.28',
  },
];

const TOTAL_DUMMY_ITEMS = 35;

export const CONSULTATION_ITEMS: ConsultationItem[] = Array.from(
  { length: TOTAL_DUMMY_ITEMS },
  (_, index) => {
    const source = BASE_ITEMS[index % BASE_ITEMS.length];
    const id = index + 1;

    if (id <= BASE_ITEMS.length) return source;

    return {
      ...source,
      id,
      title: source.title,
      date: source.date,
      question: [...source.question],
      answer: source.answer ? [...source.answer] : undefined,
    };
  },
);

export function getConsultationItemById(id: number) {
  return CONSULTATION_ITEMS.find((item) => item.id === id);
}

export function getConsultationItemSiblings(id: number) {
  const index = CONSULTATION_ITEMS.findIndex((item) => item.id === id);

  if (index < 0) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: CONSULTATION_ITEMS[index - 1],
    next: CONSULTATION_ITEMS[index + 1],
  };
}
