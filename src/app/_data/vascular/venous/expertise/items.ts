import type { ClinicExpertiseItem } from '@/app/_types/clinic/expertise';

/** 사용자 제공 2026-11-20 전문성 콘텐츠 및 이미지 순서. */
export const venousExpertiseItems = [
  {
    id: 'varicose-treatments-50000',
    title: '하지정맥류 치료 50,000례 이상',
    description:
      '2026년 5월 7일, 청맥병원은 하지정맥류 단일 질환 치료 누적 50,000건을 달성했습니다. 이 숫자는 단순한 기록이 아닙니다. 한 건 한 건의 치료마다 서로 다른 혈관 상태와 복잡한 케이스를 직접 마주하며 쌓아온 임상 경험이자, 다음 환자를 더 정확하게 진단하고 치료하기 위한 청맥병원의 실전 전문성입니다.',
    image: '/vascular/venous/expertise/varicose-treatments-50000.png',
  },
  {
    id: 'clinical-expertise',
    title: '혈관을 가장 깊이 공부한 의료진',
    description:
      '깊이 있는 학문적 배경과 풍부한 임상 경험을 바탕으로, 복잡하고 까다로운 혈관 질환도 정확하게 진단하고 치료합니다.',
    image: '/vascular/venous/expertise/vascular-consultation.png',
  },
  {
    id: 'research-award',
    title: '학계가 인정한 연구 성과',
    description:
      '청맥병원 의료진은 치료실 안에만 머물지 않습니다. 국내외 학술대회 발표, 연구, 논문 등 학술 활동을 꾸준히 이어오며 혈관 의학의 최신 지견을 임상에 적극 반영하고 있습니다. 환자에게 더 나은 치료를 제공하기 위한 노력은 지금도 계속됩니다.',
    image: '/vascular/venous/expertise/vascular-research-award.png',
  },
] satisfies ClinicExpertiseItem[];
