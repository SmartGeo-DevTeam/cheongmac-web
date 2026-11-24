/** 동맥질환 페이지 의료진 소개 섹션의 콘텐츠. */
export const arterialSpecialistsContent = {
  label: 'Specialists',
  title: {
    intro: '복잡한 동맥질환은',
    emphasis: ['이 분야 베테랑', '원장님께 맡기세요'],
  },
  description:
    '20년 이상 임상경험과 숙련도를 지닌 청맥의 전문의가 당신의 건강한 내일을 책임집니다.',
  // 기존 의료진 데이터의 ID. 추후 DB에서는 doctors.id FK로 교체.
  doctorIds: ['byun-seungjae'],
  links: [
    {
      id: 'clinic-closures',
      title: '휴진 일정 보기',
      href: '/community/notice#community-notice-off',
    },
    {
      id: 'all-doctors',
      title: '의료진 모두 보기',
      href: '/about/doctors',
    },
  ],
} as const;
