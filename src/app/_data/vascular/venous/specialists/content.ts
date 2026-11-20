/**
 * 정맥질환 전문 의료진 콘텐츠. doctorIds 순서대로 노출됩니다.
 * 기존 의료진 목록의 id만 참조하므로 향후 의료진 추가 시 id를 추가하면 됩니다.
 */
export const venousSpecialistsContent = {
  label: 'Specialists',
  title: {
    intro: '복잡한 정맥질환은',
    emphasis: ['이 분야 베테랑', '원장님께 맡기세요'],
  },
  description:
    '20년 이상 임상경험과 숙련도를 지닌 청맥의 전문의가 당신의 건강한 내일을 책임집니다.',
  doctorIds: ['bak-yong-beom', 'jeon-jin-won'],
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
