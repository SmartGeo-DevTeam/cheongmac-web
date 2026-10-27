export type CollaborationType = {
  id: string;
  title: string;
  description: string;
  date: string;
  organization: string;
  image: string;
  alt: string;
  isHero: boolean;
};

export const collaborations: CollaborationType[] = [
  {
    id: 'collaboration-001',
    title: '🇯🇵 일본 요코하마 의료진 교류 방문',
    description:
      '하지정맥류, 골반정맥류, 자궁근종 등 치료 술기 교류 Togo Norimatsu · Takaya Murayama',
    date: '2026.07.20',
    organization: '청맥병원',
    image: '/collaboration/collaboration-temp-1.png',
    alt: '일본 요코하마 의료진 학술 교류 현장',
    isHero: true,
  },
  {
    id: 'collaboration-002',
    title: '🇯🇵 일본 의료진 술기 교류 방문',
    description:
      '하지정맥류 및 골반정맥류 치료 술기 교류 및 혈관질환 치료 방향성과 임상 경험 공유',
    date: '2026.04.13',
    organization: '청맥병원',
    image: '/collaboration/collaboration-temp-2.png',
    alt: '일본 의료진 술기 교류 현장',
    isHero: true,
  },
  {
    id: 'collaboration-003',
    title: '혈관질환 최신 치료 지견 공유 세미나',
    description:
      '혈관질환의 진단과 치료 흐름을 주제로 의료진 간 임상 경험과 연구 사례를 공유했습니다.',
    date: '2026.03.18',
    organization: '청맥병원',
    image: '/collaboration/collaboration-temp-3.png',
    alt: '혈관질환 최신 치료 지견 공유 세미나',
    isHero: false,
  },
  {
    id: 'collaboration-004',
    title: '국내외 의료진 혈관중재술 연수',
    description:
      '혈관중재술의 기본 원칙과 다양한 임상 사례를 중심으로 교육 프로그램을 진행했습니다.',
    date: '2026.02.24',
    organization: '청맥병원',
    image: '/collaboration/collaboration-temp-4.png',
    alt: '혈관중재술 연수 및 교육 현장',
    isHero: true,
  },
  {
    id: 'collaboration-005',
    title: '하지정맥류 치료 임상 사례 발표',
    description:
      '다양한 하지정맥류 치료 사례를 바탕으로 진단 과정과 시술 후 관리 방법을 논의했습니다.',
    date: '2025.12.11',
    organization: '청맥병원',
    image: '/collaboration/collaboration-temp-1.png',
    alt: '하지정맥류 치료 임상 사례 발표 현장',
    isHero: false,
  },
  {
    id: 'collaboration-006',
    title: '골반정맥질환 공동 연구 교류',
    description:
      '골반정맥질환 관련 최신 연구 주제와 진단 및 치료 접근법에 대한 의견을 나눴습니다.',
    date: '2025.10.16',
    organization: '청맥병원',
    image: '/collaboration/collaboration-temp-2.png',
    alt: '골반정맥질환 공동 연구 교류 현장',
    isHero: true,
  },
  {
    id: 'collaboration-007',
    title: '영상의학과 혈관 초음파 교육',
    description:
      '혈관 초음파 검사와 영상 판독에 관한 실무 중심의 교육 및 질의응답을 진행했습니다.',
    date: '2025.08.21',
    organization: '청맥병원',
    image: '/collaboration/collaboration-temp-3.png',
    alt: '혈관 초음파 교육 현장',
    isHero: false,
  },
  {
    id: 'collaboration-008',
    title: '혈관질환 다학제 학술 간담회',
    description:
      '혈관외과와 영상의학과 의료진이 협진 사례와 환자 중심의 치료 방향을 공유했습니다.',
    date: '2025.06.12',
    organization: '청맥병원',
    image: '/collaboration/collaboration-temp-4.png',
    alt: '혈관질환 다학제 학술 간담회 현장',
    isHero: false,
  },
  {
    id: 'collaboration-009',
    title: '해외 의료진 임상 경험 교류 프로그램',
    description:
      '해외 의료진과 함께 혈관질환 시술 경험 및 치료 노하우를 공유하는 자리를 마련했습니다.',
    date: '2025.04.09',
    organization: '청맥병원',
    image: '/collaboration/collaboration-temp-1.png',
    alt: '해외 의료진 임상 경험 교류 프로그램 현장',
    isHero: true,
  },
  {
    id: 'collaboration-010',
    title: '정맥질환 임상 연구 결과 발표회',
    description:
      '정맥질환의 진료 사례와 연구 성과를 살펴보고 향후 학술 활동 방향을 논의했습니다.',
    date: '2025.02.14',
    organization: '청맥병원',
    image: '/collaboration/collaboration-temp-2.png',
    alt: '정맥질환 임상 연구 결과 발표회 현장',
    isHero: false,
  },
];
