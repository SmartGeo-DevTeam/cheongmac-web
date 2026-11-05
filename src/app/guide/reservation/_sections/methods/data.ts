/**
 * 네이버 예약은 실제 URL이 정해지면 naver.href에 지정하세요.
 * 연결되지 않은 예약 수단은 잘못된 경로로 이동시키지 않고 비활성화합니다.
 */
export const methods = [
  {
    id: 'online',
    title: '온라인 예약',
    description: '홈페이지 예약 접수',
    href: '/guide/reservation/online',
    image: '/guide/home.png',
  },
  {
    id: 'naver',
    title: '네이버 예약',
    description: '네이버 계정으로 간편 예약',
    href: null,
    image: '/guide/naver.png',
  },
  {
    id: 'phone',
    title: '전화 예약',
    description: '대표전화: 051-804-1119',
    href: 'tel:051-804-1119',
    image: '/guide/phone.png',
  },
] satisfies Array<{
  id: string;
  title: string;
  description: string;
  href: string | null;
  image: string;
}>;
