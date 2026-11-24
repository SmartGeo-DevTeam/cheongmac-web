import type { SymptomCarouselItem } from '@/app/_types/vascular/symptom-carousel';

export const pelvicSymptoms: SymptomCarouselItem[] = [
  {
    id: 'chronic-pain',
    label: '만성통증',
    image: '/vascular/venous/pelvic/symptoms/chronic-pain.png',
    imageAlt: '아랫배를 손으로 잡고 통증을 느끼는 모습',
    symptoms: [
      '아랫배·골반 통증이 6개월 넘게 지속됐어요',
      '오래 서 있거나 앉아 있으면 더 아파요',
      '밑이 빠지는 느낌이 들어요',
      '아침보다 저녁으로 갈수록 통증이 심해져요',
    ],
    caution: {
      lead: '통증이 계속되는데도 정확한 원인을 찾기 어렵다면 ',
      emphasis: '골반정맥류를 의심해볼 수 있습니다.',
      tail: '',
    },
  },
  {
    id: 'menstrual-pain',
    label: '생리통',
    image: '/vascular/venous/pelvic/symptoms/menstrual-pain.png',
    imageAlt: '아랫배를 잡고 있는 여성과 자궁의 위치를 나타낸 이미지',
    symptoms: [
      '생리 전후로 골반 통증이 유독 심해져요',
      '질염이 자주 재발해요',
      '관계 중/관계 후에 아랫배가 묵직하게 아파요',
      '출산 후부터 증상이 시작됐거나 더 심해졌어요',
    ],
    caution: {
      lead: '생리통이 예전보다 심해졌거나 생리 기간이 아닐 때도 아프다면 ',
      emphasis: '단순 생리통이 아닐 수 있습니다.',
      tail: '',
    },
  },
  {
    id: 'urinary-frequency-constipation',
    label: '빈뇨·변비',
    image:
      '/vascular/venous/pelvic/symptoms/urinary-frequency-constipation.png',
    imageAlt: '두 손으로 골반 앞쪽을 감싸고 있는 모습',
    symptoms: [
      '소변이 자주 마렵고, 보고 나서도 시원하지 않아요',
      '방광염이 자꾸 재발해요',
      '변비가 오래가고 아랫배가 늘 더부룩해요',
    ],
    caution: {
      lead: '배뇨·배변 불편이 골반 통증과 함께 반복된다면 ',
      emphasis: '골반 정맥 상태도 확인해볼 필요가 있습니다.',
      tail: '',
    },
  },
  {
    id: 'bulging-veins-leg-swelling',
    label: '혈관 돌출·다리 부종',
    image: '/vascular/venous/pelvic/symptoms/bulging-veins-leg-swelling.png',
    imageAlt: '앉아서 종아리를 손으로 잡고 있는 모습',
    symptoms: [
      '외음부·사타구니에 혈관이 불거져 보여요',
      '엉덩이·허벅지 뒤쪽에 구불구불한 핏줄이 보여요',
      '다리가 무겁고 저녁이면 퉁퉁 부어요',
      '종아리에 쥐가 자주 나서 하지정맥류 같아요',
    ],
    caution: {
      lead: '다리의 증상이 골반 통증과 함께 나타난다면 ',
      emphasis: '진짜 원인은 다리가 아니라 골반에 있을 수 있습니다.',
      tail: '',
    },
  },
];
