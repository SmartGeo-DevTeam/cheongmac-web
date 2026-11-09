import type { PartnerItem } from '../../_components/types';

export const partnerTabs = [
  { id: 'all', label: '전체' },
  { id: 'medical', label: '진료협약' },
  { id: 'support', label: '제휴/지원' },
] as const;

// TODO: 전화번호 및 협약 내용은 실제 운영 데이터로 확인 후 교체
export const partnerItems: PartnerItem[] = [
  {
    id: 'pnuh',
    name: '부산대학교병원',
    category: 'medical',
    imageSrc: '/partner/thumbnail/pnuh.png',
    description: '협약기관 상세 설명을 등록해 주세요.',
    phone: '051-240-7000',
    keywords: ['진료협력', '의료전달체계'],
  },
  {
    id: 'damc',
    name: '동아대학교병원',
    category: 'medical',
    imageSrc: '/partner/thumbnail/damc.png',
    description: '협약기관 상세 설명을 등록해 주세요.',
    phone: '051-240-7000',
    keywords: ['진료협력', '의료전달체계'],
  },
  {
    id: 'paik',
    name: '인제대학교부산백병원',
    category: 'medical',
    imageSrc: '/partner/thumbnail/paik.png',
    description: '협약기관 상세 설명을 등록해 주세요.',
    phone: '051-240-7000',
    keywords: ['진료협력', '의료전달체계'],
  },
  {
    id: 'kit',
    name: '경남정보대학교',
    category: 'support',
    imageSrc: '/partner/thumbnail/kit.png',
    description: '협약기관 상세 설명을 등록해 주세요.',
    phone: '051-324-5555',
    keywords: ['산학협력', '의료 인재 양성'],
  },
  {
    id: 'onekgebal',
    name: '(사)남북하나개발원',
    category: 'support',
    imageSrc: '/partner/thumbnail/onekgebal.png',
    description: '협약기관 상세 설명을 등록해 주세요.',
    phone: '02-676-2848',
    keywords: ['제휴/지원'],
  },
];
