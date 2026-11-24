import type { FaqItem } from '@/app/_types/common/faq';

/** 제공된 질문 원문입니다. 전문의 답변 확정 및 DB 연동 전까지 임시 안내만 표시합니다. */
export const pelvicFaqQuestions: readonly FaqItem[] = [
  {
    id: 'ultrasound-diagnosis',
    question: '초음파검사만으로 골반정맥류 진단이 가능한가요?',
    answer: '전문의 답변 준비 중입니다.',
  },
  {
    id: 'medication-effect',
    question: '골반정맥류 진단을 받고 약을 처방받아 복용 중인데, 효과가 있을까요?',
    answer: '전문의 답변 준비 중입니다.',
  },
  {
    id: 'male-pelvic-varices',
    question: '남성도 골반정맥류에 걸리나요?',
    answer: '전문의 답변 준비 중입니다.',
  },
  {
    id: 'diverse-symptoms',
    question:
      '골반 통증, 항문 불편감, 설사와 변비가 동반된 증상도 골반정맥류일까요? 왜이렇게 증상이 다양하죠?',
    answer: '전문의 답변 준비 중입니다.',
  },
  {
    id: 'coil-embolization-side-effects',
    question: '코일로 막는 시술은 부작용이 없을까요?',
    answer: '전문의 답변 준비 중입니다.',
  },
];

export const pelvicFaqHeading = {
  label: '실제 댓글 BEST 5',
  firstLine: '가장 많이 남겨주신 질문들에',
  secondLine: '혈관 전문의가 직접 답합니다',
} as const;

export const pelvicFaqMedia = {
  thumbnail: '/vascular/venous/pelvic/faq/pelvic-varices-video-thumbnail.png',
  // 기존 진료 FAQ에서 사용 중인 동일한 질문 프로필 이미지 재사용.
  avatar: '/vascular/venous/varicose/faq/question-avatar.png',
} as const;
