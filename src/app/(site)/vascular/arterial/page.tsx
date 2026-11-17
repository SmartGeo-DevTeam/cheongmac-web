import ArterialOverview from '@/app/_ui/vascular/arterial/overview';
import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import { notFound } from 'next/navigation';

export default function VascularArterialPage() {
  if (!isPublishedNavigationPath('/vascular/arterial')) notFound();

  return (
    <>
      <Breadcrumb />

      <PageHeader title="동맥질환" englishTitle="Artery Disease" />

      <ArterialOverview />
    </>
  );
}
