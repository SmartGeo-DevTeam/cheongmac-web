export type NavigationItem = {
  id: string;
  href: string;
  title: string;
  children?: NavigationItem[];
};
