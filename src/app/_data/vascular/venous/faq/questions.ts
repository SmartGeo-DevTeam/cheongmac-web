import type { FaqItem } from '@/app/_types/common/faq';

export const venousFaqs: FaqItem[] = [
  {
    id: 'varicose-without-visible-veins',
    question: '다리 혈관이 튀어나오지 않았는데도 하지정맥류일 수 있나요?',
    answer:
      '네. 하지정맥류가 있어도 피부에 혈관이 뚜렷하게 보이지 않을 수 있습니다. 다리가 무겁거나 붓는 증상이 반복된다면 진찰과 혈관 초음파 검사로 원인을 확인할 수 있습니다.',
  },
  {
    id: 'venous-recurrence',
    question: '정맥 질환은 정말 재발이 잘 되나요?',
    answer:
      '치료한 혈관의 상태나 새로운 혈관의 변화에 따라 증상이 다시 나타날 수 있습니다. 재발 가능성은 질환의 종류와 치료 방법, 개인의 혈관 상태에 따라 달라지므로 정기적인 경과 확인이 중요합니다.',
  },
  {
    id: 'pelvic-pain',
    question: '원인을 알 수 없는 만성 골반통이나 생리통도 정맥 문제일 수 있나요?',
    answer:
      '일부 만성 골반통은 골반 정맥의 혈류 이상과 관련될 수 있습니다. 하지만 골반통이나 생리통에는 다양한 원인이 있으므로 증상과 진찰 결과에 따라 적절한 검사를 받는 것이 좋습니다.',
  },
  {
    id: 'sudden-leg-swelling',
    question: '갑자기 한쪽 다리가 심하게 붓고 통증이 있어요. 이유가 뭘까요?',
    answer:
      '갑작스러운 한쪽 다리의 부종과 통증은 심부정맥혈전증을 포함한 여러 원인으로 발생할 수 있어 신속한 진료가 필요합니다. 숨이 차거나 가슴 통증이 함께 나타난다면 즉시 응급 진료를 받으세요.',
  },
  {
    id: 'recovery-time',
    question: '정맥질환 치료 후 일상생활로 복귀하기까지 얼마나 걸리나요?',
    answer:
      '회복 기간은 질환의 종류와 치료 방법, 개인의 상태에 따라 다릅니다. 치료 후 걷기나 운동, 출근 가능 시점은 담당 의료진의 안내에 따라 조절하는 것이 좋습니다.',
  },
];

export const venousFaqMoreLink = {
  href: '/community/consultation',
  title: '더보기',
} as const;
