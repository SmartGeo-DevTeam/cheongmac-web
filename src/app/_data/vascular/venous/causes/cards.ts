import type { VenousCauseCard } from '@/app/_types/vascular/venous/causes';

/** 기존 JSX에 있던 두 카드를 문구 및 배지 표시 상태 그대로 분리한 데이터. */
export const venousCauseCards = [
  {
    id: 'normal-vein',
    title: '정상 정맥',
    description: '온몸을 돈 혈액을 판막과 근육의 도움으로 심장 쪽으로 막힘 없이 순환시킵니다.',
    image: '/vascular/venous/causes/normal-vein.png',
    details: [
      {
        label: '혈액 흐름',
        value: '심장 방향으로 흐름',
        badge: { label: '울혈', hidden: true },
      },
      {
        label: '혈액 상태 요약',
        value: '원활한 순환',
        badge: { label: '울혈', hidden: true },
      },
    ],
  },
  {
    id: 'impaired-venous-circulation',
    title: '정맥 순환장애',
    description: '심장으로 돌아가야 할 혈액이 원활하게 이동하지 못하고 정체됩니다.',
    image: '/vascular/venous/causes/impaired-venous-circulation.png',
    details: [
      {
        label: '혈액 흐름',
        value: '혈액이 거꾸로 흐름',
        badge: { label: '역류' },
      },
      {
        label: '혈액 상태',
        value: '혈액이 한곳에 정체됨',
        badge: { label: '울혈' },
      },
    ],
  },
] satisfies readonly VenousCauseCard[];
