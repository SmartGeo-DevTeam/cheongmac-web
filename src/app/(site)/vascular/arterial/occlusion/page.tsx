import PageHeader from '@/app/_components/common/page-header';
import Breadcrumb from '@/app/_components/common/breadcrumb';
import ArterialOcclusionContent from '@/app/_ui/vascular/arterial/occlusion/disease-content';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import { notFound } from 'next/navigation';

export default function VascularArterialOcclusionPage() {
  if (!isPublishedNavigationPath('/vascular/arterial/occlusion')) notFound();

  return (
    <>
      <Breadcrumb />

      <PageHeader
        title="하지동맥폐색증"
        englishTitle="Lower Extremity Peripheral Artery Disease"
        desc="죽상경화증으로 인해 신체 말단의 동맥이 막히거나 좁아져 혈류가 감소하는 질환"
      />

      <ArterialOcclusionContent />
    </>
  );
}
