import ClinicSymptoms from '@/app/_components/clinic/symptom-carousel/section';
import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import { varicoceleSymptoms } from '@/app/_data/vascular/venous/varicocele/symptoms/items';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import VaricoceleCharacteristics from '@/app/_ui/vascular/venous/varicocele/characteristics/section';
import { notFound } from 'next/navigation';

export default function VascularVenousVaricocelePage() {
  if (!isPublishedNavigationPath('/vascular/venous/varicocele')) notFound();

  return (
    <>
      <Breadcrumb />

      <PageHeader
        title="정계정맥류"
        englishTitle="Varicocele"
        desc="고환 상부 정맥의 판막이 망가져 혈액이 역류하여 혈관이 비정상적으로 늘어나 발생하는 질환"
      />

      {/* 공통 - 증상 */}
      <ClinicSymptoms
        id="vascular-venous-varicocele-symptoms"
        carouselId="vascular-venous-varicocele-symptoms-carousel"
        items={varicoceleSymptoms}
        tabsAriaLabel="정계정맥류 증상 선택"
      />

      {/* 정계정맥류 - 질환 특징 및 치료 권장 대상 */}
      <VaricoceleCharacteristics
        id="vascular-venous-varicocele-characteristics"
        treatmentCandidatesId="vascular-venous-varicocele-treatment-candidates"
      />
    </>
  );
}
