import type { PulmonaryEmbolismSymptom } from '@/app/_types/vascular/venous/thrombosis/pulmonary-embolism';

export const pulmonaryEmbolismSymptoms: readonly PulmonaryEmbolismSymptom[] = [
  {
    id: 'shortness-of-breath',
    image: '/vascular/venous/thrombosis/pulmonary-embolism/shortness-of-breath.png',
    title: '갑자기 숨이 차고 숨쉬기 힘들어요',
  },
  {
    id: 'chest-pain',
    image: '/vascular/venous/thrombosis/pulmonary-embolism/chest-pain.png',
    title: '숨을 들이쉴거나 기침할 때 가슴이 아파요',
  },
  {
    id: 'dizziness',
    image: '/vascular/venous/thrombosis/pulmonary-embolism/dizziness.png',
    title: '어지럽고 정신을 잃을 것 같아요',
  },
  {
    id: 'rapid-heartbeat',
    image: '/vascular/venous/thrombosis/pulmonary-embolism/rapid-heartbeat.png',
    title: '심장이 평소보다 빠르게 뛰어요',
  },
  {
    id: 'coughing-blood',
    image: '/vascular/venous/thrombosis/pulmonary-embolism/coughing-blood.png',
    title: '기침할 때 피가 섞여 나와요',
  },
];

export const pulmonaryEmbolismMobileImages = [
  {
    id: 'shortness-of-breath',
    src: '/vascular/venous/thrombosis/pulmonary-embolism/mobile-shortness-of-breath.png',
  },
  {
    id: 'rapid-heartbeat',
    src: '/vascular/venous/thrombosis/pulmonary-embolism/mobile-rapid-heartbeat.png',
  },
  {
    id: 'coughing-blood',
    src: '/vascular/venous/thrombosis/pulmonary-embolism/mobile-coughing-blood.png',
  },
] as const;

export const pulmonaryEmbolismChevronImage =
  '/vascular/venous/thrombosis/pulmonary-embolism/triple-chevron-bottom.png';
