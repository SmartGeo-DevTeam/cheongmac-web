import type { FaqItem } from '@/app/_types/common/faq';

/**
 * 디자인 검토용 예시 질문·답변입니다. 실제 댓글/전문의 답변으로 오인되지 않도록
 * 페이지에 안내를 표시합니다. 향후 DB 연동 시 해당 진료분야 질문만 조회합니다.
 * 의료적인 문구는 게시 전 의료진 검토가 필요합니다.
 */
export const occlusionFaqQuestions: FaqItem[] = [
  {
    id: 'leg-numbness',
    question: '다리가 저린데 허리디스크인가요, 혈관 문제인가요?',
    answer: '다리 저림은 척추·신경 문제와 혈액순환 문제 모두에서 나타날 수 있어 증상만으로 구분하기 어렵습니다. 보행 시 통증, 발의 온도·색 변화 등도 함께 살펴보고 필요한 검사를 통해 원인을 확인하는 것이 좋습니다.',
  },
  {
    id: 'non-surgical-treatment',
    question: '수술 없이 시술로만 치료가 가능한가요?',
    answer: '병변의 위치·길이, 혈관 상태, 동반 질환 등에 따라 카테터 시술이나 수술 등 치료법이 달라집니다. 검사 결과를 토대로 의료진과 치료 방법을 결정해야 합니다.',
  },
  {
    id: 'stroke-risk',
    question: '말초동맥질환이 있으면 뇌경색 위험도 높아진다는 게 사실인가요?',
    answer: '말초동맥질환은 전신 동맥경화와 함께 나타날 수 있어 심뇌혈관 질환 위험요인도 함께 평가하는 것이 중요합니다. 개인별 위험도는 병력과 검사 결과를 종합해 확인해야 합니다.',
  },
  {
    id: 'recurrence',
    question: '치료 후 재발 가능성은 없나요?',
    answer: '치료 후에도 혈관이 다시 좁아지거나 다른 부위에 문제가 생길 수 있습니다. 의료진이 권고한 약물 치료, 위험요인 관리 및 정기적인 추적 관찰이 중요합니다.',
  },
  {
    id: 'diagnostic-tests',
    question: '어떤 검사를 받아야 혈관 상태를 알 수 있죠?',
    answer: '진찰과 발목상완지수(ABI) 검사, 도플러 초음파 등을 이용해 평가할 수 있으며, 필요에 따라 혈관 CT나 혈관조영술을 시행합니다. 적절한 검사는 증상과 상태에 따라 달라집니다.',
  },
];

export const occlusionFaqMedia = {
  thumbnail: '/vascular/arterial/occlusion/faq/video-thumbnail.png',
  avatar: '/vascular/arterial/occlusion/faq/question-avatar.png',
} as const;
