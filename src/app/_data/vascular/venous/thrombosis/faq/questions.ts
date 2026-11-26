import type { FaqItem } from '@/app/_types/common/faq';

/** 예시 질문 원문. 전문의 답변 확정 및 DB 연동 전까지 임시 안내를 표시합니다. */
export const thrombosisFaqQuestions: readonly FaqItem[] = [
  {
    id: 'pulmonary-embolism-risk',
    question: '다리에 생긴 혈전이 왜 사망까지 이를 수 있나요?',
    answer: '전문의 답변 준비 중입니다.',
  },
  {
    id: 'procedure-pain',
    question: '시술은 어떤 방식으로 진행되며 통증은 심하지 않나요?',
    answer: '전문의 답변 준비 중입니다.',
  },
  {
    id: 'diagnostic-sequence',
    question: '병원에 가면 어떤 순서로 진단 검사를 받게 되나요?',
    answer: '전문의 답변 준비 중입니다.',
  },
  {
    id: 'anticoagulation-first',
    question:
      '바로 수술(시술)을 안 하고 항응고제 주사나 약물만 처방해 주는 이유는 무엇인가요?',
    answer: '전문의 답변 준비 중입니다.',
  },
  {
    id: 'persistent-thrombus',
    question: '약을 1년 이상 먹었는데도 혈전이 그대로 남아있다면 어떻게 해야 하나요?',
    answer: '전문의 답변 준비 중입니다.',
  },
];

export const thrombosisFaqHeading = {
  label: 'FAQ · 자주 묻는 질문',
  firstLine: '심부정맥혈전증에 대해',
  secondLine: '자주 묻는 질문입니다',
} as const;

export const thrombosisFaqMedia = {
  thumbnail: '/vascular/venous/thrombosis/faq/thrombosis-video-thumbnail.png',
  avatar: '/vascular/venous/varicose/faq/question-avatar.png',
} as const;
