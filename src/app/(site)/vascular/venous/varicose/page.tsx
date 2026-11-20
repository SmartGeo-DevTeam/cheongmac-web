import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import VaricoseOverview from '@/app/_ui/vascular/venous/varicose/overview';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import { notFound } from 'next/navigation';

export default function VascularVenousVaricosePage() {
  if (!isPublishedNavigationPath('/vascular/venous/varicose')) notFound();

  return (
    <>
      <Breadcrumb />
      <PageHeader title="하지정맥류" />
      <VaricoseOverview />
    </>
  );
}
