import ClinicBanner from '@/app/_components/clinic/banner';
import { arterialOcclusionBanner } from '@/app/_data/vascular/arterial/occlusion-banner/content';
import {
  vascularHealthBanner,
  vascularReservationBanner,
} from '@/app/_data/vascular/banner/content';
import ArterialBestCases from '@/app/_ui/vascular/arterial/best-cases/section';
import ArterialDiagnostics from '@/app/_ui/vascular/arterial/diagnostics/section';
import ArterialDiseases from '@/app/_ui/vascular/arterial/diseases/section';
import ArterialExpertise from '@/app/_ui/vascular/arterial/expertise/section';
import ArterialFaq from '@/app/_ui/vascular/arterial/faq/section';
import ArterialProgression from '@/app/_ui/vascular/arterial/progression/section';
import ArterialSelfDiagnosis from '@/app/_ui/vascular/arterial/self-diagnosis/section';
import ArterialSpecialists from '@/app/_ui/vascular/arterial/specialists/section';
import ArterialSymptomComparison from '@/app/_ui/vascular/arterial/symptom-comparison/section';
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

      {/* 동맥질환 - 자가진단 테스트 */}
      <ArterialSelfDiagnosis />

      {/* 동맥질환 - 부위별 동맥질환 */}
      <ArterialDiseases />

      {/* 동맥질환 - 증상이 없다고 안심하면 안 되는 이유 */}
      <ArterialProgression />

      {/* 동맥질환 - 비슷한 증상, 다른 전혀 질환 */}
      <ArterialSymptomComparison />

      {/* 공통배너 - 말초동맥폐쇄증, 더 자세히 알아보고 싶다면 */}
      <ClinicBanner {...arterialOcclusionBanner} />

      {/* 동맥질환 - 동맥질환 진단방법 */}
      <ArterialDiagnostics />

      {/* 공통배너 - 최대한 빠른 검사 날짜는 언제일까요? */}
      <ClinicBanner {...vascularReservationBanner} />

      {/* 동맥질환 - BEST 치료사례 */}
      <ArterialBestCases />

      {/* 동맥질환 - 혈관만 봅니다 그래서 다릅니다 */}
      <ArterialExpertise />

      {/* 동맥질환 - 의료진 */}
      <ArterialSpecialists />

      {/* 공통배너 - 청맥병원에서 시작하는 혈관 건강 */}
      <ClinicBanner {...vascularHealthBanner} />

      {/* 동맥질환 - 자주 묻는 질문 */}
      <ArterialFaq />
    </>
  );
}
