import type { VaricoceleInformationItem } from '@/app/_types/vascular/venous/varicocele/information-item';

export const varicoceleCharacteristics: readonly VaricoceleInformationItem[] = [
  {
    id: 'progressive',
    title: '저절로 낫지 않는 진행성 질환',
    image: '/vascular/venous/varicocele/characteristics/progressive.png',
    imageAlt: '정상 정맥과 확장된 고환 정맥 비교',
    description:
      '한번 늘어난 정맥은 저절로 회복되지 않습니다. 초기에는 큰 불편감이 없더라도 역류가 점차 심해지며 증상이 악화되기 쉽습니다.',
  },
  {
    id: 'prevalence',
    title: '누구에게나 생길 수 있는 질환',
    image: '/vascular/venous/varicocele/characteristics/prevalence.png',
    imageAlt: '다양한 연령대의 남성',
    description:
      '특별한 위험 요인 없이 청소년기부터 시작될 수 있으며, 증상이 없어 모른 채 지내다 성인이 되어 뒤늦게 발견되는 경우가 많습니다.',
  },
  {
    id: 'infertility',
    title: '남성 난임의 주요 원인',
    image: '/vascular/venous/varicocele/characteristics/infertility.png',
    imageAlt: '정자 모식도',
    description:
      '남성 난임 환자의 30~40%에서 발견되는 질환으로, 고인 혈액이 고환 온도를 높여 정자 수와 운동성을 떨어뜨립니다.',
  },
];
