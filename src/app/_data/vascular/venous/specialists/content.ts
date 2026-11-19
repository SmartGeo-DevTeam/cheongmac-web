export const venousSpecialistsContent = {
  label: 'Specialists',
  title: { intro: '복잡한 정맥질환은', emphasis: ['이 분야 베테랑', '원장님께 맡기세요'] },
  description: '정맥질환 진료를 담당하는 청맥병원 의료진을 소개합니다.',
  doctorIds: ['bak-yong-beom', 'jeon-jin-won'],
  links: [
    { id: 'clinic-closures', title: '휴진 일정 보기', href: '/community/notice#community-notice-off' },
    { id: 'all-doctors', title: '의료진 모두 보기', href: '/about/doctors' },
  ],
} as const;
