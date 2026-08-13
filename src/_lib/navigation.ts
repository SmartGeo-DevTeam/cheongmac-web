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
    href: '/community/news',
    title: '소통공간',
    children: [
      {
        id: 'community-news',
        href: '/community/news',
        title: '청맥뉴스',
      },
    ],
  },
];

export function getPrimaryNavigation(): NavigationItem[] {
  return NAVIGATION;
}
