import NavigationPageHeader from '@/app/_components/ui/navigation-page-header';
import type { PageHeaderTitleAs } from '@/app/_components/ui/page-header';

export default function NoticePageHeader({
  titleAs = 'h1',
}: {
  titleAs?: PageHeaderTitleAs;
}) {
  return (
    <NavigationPageHeader
      id="notice-page-header"
      navigationPath="/community/notice"
      titleAs={titleAs}
    />
  );
}
