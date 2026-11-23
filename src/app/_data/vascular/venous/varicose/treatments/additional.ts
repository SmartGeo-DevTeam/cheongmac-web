import type { AdditionalTreatmentsContent } from '@/app/_types/vascular/treatment-method';

/** 하지정맥류 치료법 아래에만 노출하는 선택적 보조 치료 카드. */
export const varicoseAdditionalTreatments: AdditionalTreatmentsContent = {
  items: [
    {
      id: 'compression-stockings',
      title: '압박스타킹',
      image: {
        src: '/vascular/venous/varicose/treatments/compression-stockings-icon.png',
        alt: '',
      },
    },
    {
      id: 'medication',
      title: '약물치료',
      image: {
        src: '/vascular/venous/varicose/treatments/medication-icon.png',
        alt: '',
      },
    },
    {
      id: 'recurrence',
      title: '재발치료',
      image: {
        src: '/vascular/venous/varicose/treatments/recurrence-icon.png',
        alt: '',
      },
    },
  ],
  description:
    '정밀 진단을 바탕으로 혈관외과 전문 의료진이 적합한 시기와 방법을 결정하여 치료를 진행합니다.',
};
