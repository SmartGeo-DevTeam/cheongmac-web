export type NavigationItem = {
  id: string;
  href: string;
  title: string;
  children?: NavigationItem[];
};

export const NAVIGATION: NavigationItem[] = [
  {
    id: "about-doctors",
    href: "/about/doctors",
    title: "의료진/진료과",
  },
];

export function getPrimaryNavigation(): NavigationItem[] {
  return NAVIGATION;
}
