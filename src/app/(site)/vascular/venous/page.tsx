import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import VenousOverview from '@/app/_ui/vascular/venous/overview';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import { notFound } from 'next/navigation';

export default function VascularVenousPage() {
  if (!isPublishedNavigationPath('/vascular/venous')) notFound();

  return (
    <>
      <Breadcrumb />
      <PageHeader title="정맥질환" englishTitle="Venous Disease" />
      <VenousOverview />
    </>
  );
}
