import PageHeader from '@/app/_components/common/page-header';
import Breadcrumb from '@/app/_components/common/breadcrumb';
import ArterialFootContent from '@/app/_ui/vascular/arterial/foot/disease-content';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import { notFound } from 'next/navigation';

export default function VascularArterialFootPage() {
  if (!isPublishedNavigationPath('/vascular/arterial/foot')) notFound();

  return (
    <>
      <Breadcrumb />

      <PageHeader title="당뇨발" />

      <ArterialFootContent />
    </>
  );
}
