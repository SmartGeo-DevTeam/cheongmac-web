import ClinicBanner from '@/app/_components/clinic/banner';
import BestCasesSection from '@/app/_components/clinic/best-cases/section';
import ClinicExpertiseSection from '@/app/_components/clinic/expertise/section';
import ClinicSplitFaq from '@/app/_components/clinic/faq/section';
import ClinicSpecialistsSection from '@/app/_components/clinic/specialists/section';
import ClinicSymptomComparison from '@/app/_components/clinic/symptom-comparison/section';
import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import { arterialBestCases } from '@/app/_data/vascular/arterial/best-cases/cases';
import { arterialExpertiseItems } from '@/app/_data/vascular/arterial/expertise/items';
import {
  arterialFaqMoreLink,
  arterialFaqs,
} from '@/app/_data/vascular/arterial/faq/questions';
import { arterialOcclusionBanner } from '@/app/_data/vascular/arterial/occlusion-banner/content';
import { arterialSpecialistsContent } from '@/app/_data/vascular/arterial/specialists/content';
import {
  vascularHealthBanner,
  vascularReservationBanner,
} from '@/app/_data/vascular/banner/content';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import { getClinicSpecialists } from '@/app/_services/clinic/specialists';
import ArterialDiagnostics from '@/app/_ui/vascular/arterial/diagnostics/section';
import ArterialDiseases from '@/app/_ui/vascular/arterial/diseases/section';
import ArterialProgression from '@/app/_ui/vascular/arterial/progression/section';
import ArterialSelfDiagnosis from '@/app/_ui/vascular/arterial/self-diagnosis/section';
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

      {/* 공통 - 비슷한 증상, 다른 전혀 질환 */}
      <ClinicSymptomComparison id="vascular-arterial-symptom-comparison" />

      {/* 공통 - 배너: 말초동맥폐쇄증, 더 자세히 알아보고 싶다면 */}
      <ClinicBanner {...arterialOcclusionBanner} />

      {/* 동맥질환 - 동맥질환 진단방법 */}
      <ArterialDiagnostics />

      {/* 공통 - 배너: 최대한 빠른 검사 날짜는 언제일까요? */}
      <ClinicBanner {...vascularReservationBanner} />

      {/* 공통 - BEST 치료사례 */}
      <BestCasesSection
        id="vascular-arterial-best-cases"
        cases={arterialBestCases}
      />

      {/* 공통 - 혈관만 봅니다 그래서 다릅니다 */}
      <ClinicExpertiseSection
        id="vascular-arterial-expertise"
        items={arterialExpertiseItems}
      />

      {/* 공통 - 의료진 */}
      <ClinicSpecialistsSection
        id="vascular-arterial-specialists"
        content={arterialSpecialistsContent}
        doctors={getClinicSpecialists(arterialSpecialistsContent.doctorIds)}
      />

      {/* 공통 - 배너: 청맥병원에서 시작하는 혈관 건강 */}
      <ClinicBanner {...vascularHealthBanner} />

      {/* 공통 - 자주 묻는 질문 */}
      <ClinicSplitFaq
        id="vascular-arterial-faq"
        title={
          <>
            동맥질환
            <br />
            <strong>자주 묻는 질문</strong>
          </>
        }
        questions={arterialFaqs}
        moreLink={arterialFaqMoreLink}
      />
    </>
  );
}
