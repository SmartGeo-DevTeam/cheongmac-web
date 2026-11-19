import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import { notFound } from 'next/navigation';
import VenousOverview from '@/app/_ui/vascular/venous/overview';
export default function VascularVenousPage() {
  // 미공개 상태는 기존 navigation.isPublished 정책에 따릅니다.
  if (!isPublishedNavigationPath('/vascular/venous')) notFound();
  return <VenousOverview />;
}
