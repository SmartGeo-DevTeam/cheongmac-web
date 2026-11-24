import type { PelvicRelatedDisease } from '@/app/_types/vascular/venous/pelvic/related';

export const pelvicRelatedDiseases: readonly PelvicRelatedDisease[] = [
  {
    id: 'varicose',
    question: '치료 후에도\n다리가 계속 무겁다면?',
    category: '동반 질환 · 유사 증상',
    title: '하지정맥류',
    description:
      '다리와 골반의 정맥은 하나로 이어져 있기 때문에 골반에서 역류한 혈액이 다리 정맥류의 원인이 되기도 하고, 두 질환이 함께 동반되는 경우도 많습니다.',
    href: '/vascular/venous/varicose',
  },
  {
    id: 'maythurner',
    question: '유독 왼쪽 다리만 퉁퉁 붓고\n불편하다면',
    category: '원인 질환',
    title: '메이터너증후군',
    description:
      '왼쪽 장골정맥이 우측 장골동맥에 눌리면서 왼쪽 다리의 혈액순환이 원활하지 않게 되고, 심한 경우 심부정맥혈전증 원인이 되기도 합니다.',
    href: '/vascular/special/maythurner',
  },
  {
    id: 'nutcracker',
    question: '왼쪽 옆구리가 아프고\n혈뇨·단백뇨가 있다면',
    category: '원인 질환 · 동반 질환',
    title: '호두까기증후군',
    description:
      '왼쪽 신장 정맥이 대동맥과 상장간막동맥 사이에서 눌리면서 혈액이 원활하게 흐르지 못하면서 발생하는 질환입니다.',
    href: '/vascular/special/nutcracker',
  },
  {
    id: 'gynecologic',
    question: '생리 기간 통증이 유독 심하고\n생리량이 많아졌다면',
    category: '동반 질환 · 유사 증상',
    title: '자궁·난소 질환',
    description:
      '자궁내막증·자궁근종도 골반통, 생리통, 성교통을 일으켜 골반정맥류와 구별이 어렵습니다. 두 질환이 함께 있는 경우도 있습니다.',
    href: '/',
  },
];
