export type NavigationItem = {
  id: string;
  href: string;
  title: string;
  children?: NavigationItem[];
};

export const NAVIGATION: NavigationItem[] = [
  {
    id: 'about',
    href: '/about/doctors',
    title: '병원 소개',
    children: [
      {
        id: 'about-doctors',
        href: '/about/doctors',
        title: '의료진/진료과',
      },
    ],
  },
  {
    id: 'community',
    href: '/community/notice',
    title: '소통공간',
    children: [
      {
        id: 'community-notice',
        href: '/community/notice',
        title: '공지사항',
      },
      {
        id: 'community-news',
        href: '/community/news',
        title: '청맥뉴스',
      },
      {
        id: 'community-consultation',
        href: '/community/consultation',
        title: '의학상담',
      },
      {
        id: 'community-customer-voice',
        href: '/community/customer-voice',
        title: '고객의 소리',
      },
    ],
  },
];

export function getPrimaryNavigation(): NavigationItem[] {
  return NAVIGATION;
}
