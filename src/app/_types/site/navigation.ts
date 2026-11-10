export type NavigationItem = {
  id: string;
  href: string;
  title: string;
  /** 해당 메뉴 자체의 콘텐츠 페이지 공개 여부. 자식 메뉴의 노출은 별도로 자동 계산됩니다. */
  isPublished?: boolean;
  children?: NavigationItem[];
};
