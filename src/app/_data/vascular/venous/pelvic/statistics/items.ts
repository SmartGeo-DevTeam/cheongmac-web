import type { PelvicStatistic } from '@/app/_types/vascular/venous/pelvic/statistics';

export const pelvicStatisticsItems: PelvicStatistic[] = [
  {
    id: 'chronic-pelvic-pain',
    value: '30~40%',
    description: '만성 골반통 여성 중 골반정맥류 추정 비율',
    image: '/vascular/venous/pelvic/statistics/chronic-pelvic-pain.png',
  },
  {
    id: 'pregnancy-blood-volume',
    value: '약 60%',
    description: '임신 중 늘어나는 골반 내 정맥의 혈액량',
    image: '/vascular/venous/pelvic/statistics/pregnancy-blood-volume.png',
  },
  {
    id: 'age-distribution',
    value: '20~45세',
    description: '골반정맥류가 가장 많이 나타나는 연령대',
    image: '/vascular/venous/pelvic/statistics/age-distribution.png',
  },
];
