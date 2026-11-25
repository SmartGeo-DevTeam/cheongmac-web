import type { FaqItem } from '@/app/_types/common/faq';

/** 제공된 질문 원문. 전문의 답변 확정 및 DB 연동 전까지 임시 안내를 표시합니다. */
export const varicoceleFaqQuestions: readonly FaqItem[] = [
  {
    id: 'natural-improvement',
    question: '정계정맥류는 자연적으로 좋아지진 않나요?',
    answer: '전문의 답변 준비 중입니다.',
  },
  {
    id: 'asymptomatic-treatment',
    question: '증상이 없는데 꼭 치료해야 하나요?',
    answer: '전문의 답변 준비 중입니다.',
  },
  {
    id: 'fertility',
    question: '정계정맥류를 치료하면 임신 가능성이 높아지나요?',
    answer: '전문의 답변 준비 중입니다.',
  },
  {
    id: 'adolescent-treatment',
    question: '청소년도 치료받을 수 있나요?',
    answer: '전문의 답변 준비 중입니다.',
  },
  {
    id: 'left-sided-varicocele',
    question: '왜 왼쪽에 주로 발생하나요?',
    answer: '전문의 답변 준비 중입니다.',
  },
];

// TODO: 실제 댓글 여부 및 제목 문구 확정 후 교체합니다.
export const varicoceleFaqHeading = {
  label: '실제 댓글 BEST 5',
  firstLine: '가장 많이 남겨주신 질문들에',
  secondLine: '혈관 전문의가 직접 답합니다',
} as const;

export const varicoceleFaqMedia = {
  thumbnail: '/vascular/venous/varicocele/faq/varicocele-video-thumbnail.png',
  avatar: '/vascular/venous/varicose/faq/question-avatar.png',
} as const;
