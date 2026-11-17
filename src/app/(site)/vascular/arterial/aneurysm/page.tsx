import PageHeader from '@/app/_components/common/page-header';
import Breadcrumb from '@/app/_components/common/breadcrumb';
import ArterialAneurysmContent from '@/app/_ui/vascular/arterial/aneurysm/disease-content';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import { notFound } from 'next/navigation';

export default function VascularArterialAneurysmPage() {
  if (!isPublishedNavigationPath('/vascular/arterial/aneurysm')) notFound();

  return (
    <>
      <Breadcrumb />

      <PageHeader title="대동맥류" />

      <ArterialAneurysmContent />
    </>
  );
}
