import type { SymptomCarouselItem } from '@/app/_types/vascular/symptom-carousel';

export const varicoceleSymptoms: SymptomCarouselItem[] = [
  {
    id: 'testicular-pain',
    label: '고환 통증',
    image: '/vascular/venous/varicocele/symptoms/testicular-pain.png',
    imageAlt: '고환 통증을 설명하는 이미지',
    symptoms: [
      '고환·사타구니 쪽이 막연하게 불편해요',
      '오래 서 있으면 고환이 아프고 운동 후 더 심해져요',
      '고환 주변이 화끈하고 열감이 느껴져요',
    ],
    caution: {
      lead: '정계정맥류는 무증상인 경우도 많지만, ',
      emphasis: '난임에 영향을 줄 수 있어 미리 점검이 필요합니다.',
      tail: '',
    },
  },
  {
    id: 'scrotal-discomfort',
    label: '음낭 불편감',
    image: '/vascular/venous/varicocele/symptoms/scrotal-discomfort.png',
    imageAlt: '음낭 불편감을 설명하는 이미지',
    symptoms: [
      '음낭이 묵직하고 불편한 느낌이 들어요',
      '한쪽 음낭이 유독 늘어진 것 같아요',
      '오래 서 있으면 아래로 처지는 느낌이 들어요',
    ],
    caution: {
      lead: '음낭의 묵직함이 오래 서 있을수록 심해진다면 ',
      emphasis: '정계정맥류를 의심해볼 수 있습니다.',
      tail: '',
    },
  },
  {
    id: 'bulging-veins',
    label: '혈관 돌출',
    image: '/vascular/venous/varicocele/symptoms/bulging-veins.png',
    imageAlt: '정계정맥류의 혈관 돌출을 설명하는 이미지',
    symptoms: [
      '음낭 피부로 혈관이 비쳐 보여요',
      '음낭 속에 꼬불꼬불한 덩어리가 만져져요',
      '양쪽 고환 크기가 달라 보여요',
    ],
    caution: {
      lead: '혈관이 만져지거나 고환 크기 차이가 느껴진다면 ',
      emphasis: '진행된 상태일 수 있어 정밀 검사가 필요합니다.',
      tail: '',
    },
  },
];
