import type { VaricoceleInformationItem } from '@/app/_types/vascular/venous/varicocele/information-item';

export const varicoceleTreatmentCandidates: readonly VaricoceleInformationItem[] = [
  {
    id: 'sperm-abnormality',
    title: '정자 이상 소견을 들었을 때',
    image:
      '/vascular/venous/varicocele/treatment-candidates/sperm-abnormality.png',
    imageAlt: '임신 테스트기를 든 부부',
    description:
      '정계정맥류 치료 후 정자 수와 운동성이 개선될 수 있어, 임신을 준비 중이라면 치료를 우선적으로 고려합니다.',
  },
  {
    id: 'persistent-pain',
    title: '지속된 통증이 일상에 지장을 줄 때',
    image:
      '/vascular/venous/varicocele/treatment-candidates/persistent-pain.png',
    imageAlt: '아랫배를 감싸 쥔 남성',
    description:
      '역류를 차단해 정맥 내 울혈을 해소하면 통증과 불편감의 완화를 기대할 수 있습니다.',
  },
  {
    id: 'visible-veins',
    title: '늘어난 혈관이 눈에 띄게 보일 때',
    image: '/vascular/venous/varicocele/treatment-candidates/visible-veins.png',
    imageAlt: '정계정맥류의 혈관 돌출 모식도',
    description:
      '힘을 주지 않아도 늘어난 혈관이 만져지거나 보인다면 진행된 단계로, 그대로 두면 더 심해질 수 있습니다.',
  },
  {
    id: 'testicular-asymmetry',
    title: '양쪽 고환 크기 차이가 뚜렷할 때',
    image:
      '/vascular/venous/varicocele/treatment-candidates/testicular-asymmetry.png',
    imageAlt: '크기가 다른 두 알을 이용한 고환 크기 차이 비유 이미지',
    description:
      '고환 크기 차이는 고환 기능 저하를 시사할 수 있어, 위축이 진행되기 전 치료를 권장합니다.',
  },
];
