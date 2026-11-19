/** TODO(신규): 시안 문구가 확정되면 이 데이터만 수정합니다. */
export const occlusionHeadings = {
  introduction: '하지동맥폐색증이란?',
  mechanism: '혈관의 변화',
  comparison: '증상 비교',
  symptoms: '주요 증상',
  diagnostics: '검사 및 진단',
  treatments: '치료 방법',
  cases: '치료 사례',
  management: '치료 후 관리',
  reservationLinks: '네이버 예약·문의',
  careMessage: '병원 메시지',
  faq: '자주 묻는 질문',
} as const;

/** 현재 프로젝트에 실제 존재하는 경로만 연결합니다. */
export const occlusionLinks = {
  reservation: '/guide/reservation',
  doctors: '/about/doctors',
  cases: '/community/cases',
  consultation: '/community/consultation',
} as const;
