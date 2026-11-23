import type { FaqItem } from '@/app/_types/common/faq';

/** 첨부 시안의 화면 문구. 전문의 답변은 아직 제공되지 않아 임시 안내만 표시합니다. */
export const varicoseFaqQuestions: readonly FaqItem[] = [
  {
    id: 'itching-vs-skin-condition',
    question: '일반 피부병과 하지정맥류로 인한 가려움은 어떻게 구분하나요?',
    answer: '전문의 답변 준비 중입니다.',
  },
  {
    id: 'without-visible-veins',
    question: '겉으로 혈관이 튀어나오지 않았는데도 하지정맥류일 수 있나요?',
    answer: '전문의 답변 준비 중입니다.',
  },
  {
    id: 'nighttime-itching',
    question: '왜 낮보다 밤에 자려고 할 때 다리가 더 가려운가요?',
    answer: '전문의 답변 준비 중입니다.',
  },
  {
    id: 'symptoms-after-treatment',
    question: '하지정맥류 치료를 받은 후에도 증상이 남을 수 있나요?',
    answer: '전문의 답변 준비 중입니다.',
  },
  {
    id: 'hospital-and-postoperative-exercise',
    question: '하지정맥류가 의심될 때 어떤 병원에 가야 하며, 수술 후 운동은 어떻게 해야 하나요?',
    answer: '전문의 답변 준비 중입니다.',
  },
];

export const varicoseFaqHeading = {
  label: '실제 댓글 BEST 5',
  firstLine: '가장 많이 남겨주신 질문들에',
  secondLine: '혈관 전문의가 직접 답합니다',
} as const;

export const varicoseFaqMedia = {
  thumbnail: '/vascular/venous/varicose/faq/itching-video-thumbnail.png',
  avatar: '/vascular/venous/varicose/faq/question-avatar.png',
} as const;
