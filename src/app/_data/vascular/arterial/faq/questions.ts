import type { FaqItem } from '@/app/_types/common/faq';

/** 질문은 시안 기준, 답변은 의료진 검토 후 교체할 임시 문구입니다. */
export const arterialFaqs: FaqItem[] = [
  {
    id: 'atherosclerosis-risk',
    question: '동맥경화가 다리에 생기면 심장이나 뇌혈관도 위험한가요?',
    answer: '의료진의 답변을 준비 중입니다.',
  },
  {
    id: 'medication-only',
    question: '수술 없이 약만으로도 치료가 가능할까요?',
    answer: '의료진의 답변을 준비 중입니다.',
  },
  {
    id: 'diabetic-foot',
    question: '당뇨발의 상처가 괴사까지 진행돼서 절단해야 한다는데, 방법이 없을까요?',
    answer: '의료진의 답변을 준비 중입니다.',
  },
  {
    id: 'stent-restenosis',
    question: '스텐트를 넣으면 평생 유지되나요? 재협착이 생기기도 하나요?',
    answer: '의료진의 답변을 준비 중입니다.',
  },
  {
    id: 'insurance',
    question: '동맥질환 치료는 건강보험이 적용되나요?',
    answer: '의료진의 답변을 준비 중입니다.',
  },
];

/** 전용 FAQ 목록 페이지가 없어 현재는 실제 운영 중인 의학상담으로 연결합니다. */
export const arterialFaqMoreLink = {
  href: '/community/consultation',
  title: '더보기',
} as const;
