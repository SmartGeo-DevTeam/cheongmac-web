import ClinicSymptoms from '@/app/_components/clinic/symptom-carousel/section';
import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import { pelvicSymptoms } from '@/app/_data/vascular/venous/pelvic/symptoms/items';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import { notFound } from 'next/navigation';

export default function VascularVenousPelvicPage() {
  if (!isPublishedNavigationPath('/vascular/venous/pelvic')) notFound();

  return (
    <>
      <Breadcrumb />

      <PageHeader
        title="골반정맥류"
        englishTitle="Pelvic Congestion Syndrome / Pelvic Varices"
        desc="여성에게 흔히 나타나는 만성 골반통의 원인 중 하나로, 골반 내 정맥 혈류가 원활하지 못해 울혈이 생기는 질환"
      />

      {/* 공통 - 증상 */}
      <ClinicSymptoms
        id="vascular-venous-pelvic-symptoms"
        carouselId="vascular-venous-pelvic-symptoms-carousel"
        items={pelvicSymptoms}
        tabsAriaLabel="골반정맥류 증상 선택"
      />
    </>
  );
}
