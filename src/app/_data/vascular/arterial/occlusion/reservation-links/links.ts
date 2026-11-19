/** 실제 네이버 주소가 확정되면 href만 교체합니다. 현재 요청대로 '/'를 유지합니다. */
export const occlusionReservationLinks = [
  {
    id: 'naver-reservation',
    title: '네이버 예약하기',
    description: '언제 어디서나 쉽고 빠른 진료 예약',
    href: '/',
    image: '/vascular/arterial/occlusion/reservation-links/naver-reservation.png',
  },
  {
    id: 'naver-talktalk',
    title: '네이버톡톡 문의하기',
    description: '궁금한 점은 채팅으로 바로 문의하세요',
    href: '/',
    image: '/vascular/arterial/occlusion/reservation-links/naver-talktalk.png',
  },
] as const;
