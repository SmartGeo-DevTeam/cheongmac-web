import ClinicBanner from '@/app/_components/clinic/banner';
import ClinicBestCasesSection from '@/app/_components/clinic/best-cases/section';
import ClinicDiseases from '@/app/_components/clinic/diseases/section';
import ClinicExpertiseSection from '@/app/_components/clinic/expertise/section';
import ClinicSplitFaq from '@/app/_components/clinic/faq/section';
import ClinicMethodSection from '@/app/_components/clinic/method-carousel/section';
import ClinicSpecialistsSection from '@/app/_components/clinic/specialists/section';
import ClinicSymptomComparison from '@/app/_components/clinic/symptom-comparison/section';
import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import { arterialBestCases } from '@/app/_data/vascular/arterial/best-cases/cases';
import { arterialDiagnosticMethods } from '@/app/_data/vascular/arterial/diagnostics/methods';
import { arterialDiseaseCards } from '@/app/_data/vascular/arterial/diseases/cards';
import { arterialDiseasesContent } from '@/app/_data/vascular/arterial/diseases/content';
import { arterialDiseasePoints } from '@/app/_data/vascular/arterial/diseases/map';
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
import {
  arterialComparisonHeading,
  arterialOcclusionCondition,
  spinalStenosisCondition,
} from '@/app/_data/vascular/symptom-comparison/conditions';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import { getClinicBestCases } from '@/app/_services/clinic/best-cases';
import { getClinicSpecialists } from '@/app/_services/clinic/specialists';
import ArterialDiagnosticItem from '@/app/_ui/vascular/arterial/diagnostics/item';
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
      <ArterialSelfDiagnosis id="vascular-arterial-self-diagnosis" />

      {/* 공통 - 부위별 동맥질환 */}
      <ClinicDiseases
        id="vascular-arterial-diseases"
        content={arterialDiseasesContent}
        map={{
          points: arterialDiseasePoints,
          image: '/vascular/arterial/artery-body.png',
          imageAlt: '전신 동맥 구조 이미지',
          imageWidth: 612,
          imageHeight: 1438,
        }}
        cards={arterialDiseaseCards}
        columns={3}
        isPublishedHref={isPublishedNavigationPath}
      />

      {/* 동맥질환 - 증상이 없다고 안심하면 안 되는 이유 */}
      <ArterialProgression id="vascular-arterial-progression" />

      {/* 공통 - 비슷한 증상, 다른 전혀 질환 */}
      <ClinicSymptomComparison
        id="vascular-arterial-symptom-comparison"
        heading={{
          label: arterialComparisonHeading.label,
          title: (
            <>
              {arterialComparisonHeading.titlePrefix}
              <b>{arterialComparisonHeading.titleEmphasis}</b>
              {arterialComparisonHeading.titleSuffix}
              <br />
              {arterialComparisonHeading.titleSecondLine}
            </>
          ),
          description: arterialComparisonHeading.description,
        }}
        leftCondition={spinalStenosisCondition}
        rightCondition={arterialOcclusionCondition}
      />

      {/* 공통 - 배너: 말초동맥폐쇄증, 더 자세히 알아보고 싶다면 */}
      <ClinicBanner
        id="vascular-arterial-occlusion-banner"
        {...arterialOcclusionBanner}
      />

      {/* 공통 - 동맥질환 진단방법 */}
      <ClinicMethodSection
        id="vascular-arterial-diagnostics"
        heading={{
          mtVariant: 'xl',
          label: '동맥질환 진단방법',
          labelVariant: 'accent',
          title: (
            <>
              간단한 검사만으로도
              <br />
              <b>끔찍한 결과를 막을 수 있습니다</b>
            </>
          ),
          description: <>정확한 진단은 올바른 치료의 첫걸음입니다.</>,
        }}
        itemLabel="진단방법"
        slides={arterialDiagnosticMethods.map((item) => ({
          id: item.id,
          title: item.title,
          content: <ArterialDiagnosticItem item={item} />,
        }))}
      />

      {/* 공통 - 배너: 최대한 빠른 검사 날짜는 언제일까요? */}
      <ClinicBanner
        id="vascular-reservation-banner"
        {...vascularReservationBanner}
      />

      {/* 공통 - BEST 치료사례 */}
      <ClinicBestCasesSection
        id="vascular-arterial-best-cases"
        cases={getClinicBestCases(arterialBestCases)}
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
      <ClinicBanner
        id="vascular-arterial-health-banner"
        {...vascularHealthBanner}
      />

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
