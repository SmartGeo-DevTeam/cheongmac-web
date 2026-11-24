import ClinicBanner from '@/app/_components/clinic/banner';
import ClinicCases from '@/app/_components/clinic/cases/section';
import ClinicMediaFaq from '@/app/_components/clinic/media-faq/section';
import ClinicReservationLinks from '@/app/_components/clinic/reservation-links/section';
import ClinicStrengths from '@/app/_components/clinic/strengths/section';
import ClinicSymptomComparison from '@/app/_components/clinic/symptom-comparison/section';
import ClinicTreatments from '@/app/_components/clinic/treatments/section';
import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import { caseCategories } from '@/app/_data/community/cases/cases';
import { occlusionCasePreviews } from '@/app/_data/vascular/arterial/occlusion/cases/featured';
import {
  occlusionFaqMedia,
  occlusionFaqQuestions,
} from '@/app/_data/vascular/arterial/occlusion/faq/questions';
import { occlusionStrengthsHeadingLines } from '@/app/_data/vascular/arterial/occlusion/strengths/content';
import { occlusionTreatmentMethods } from '@/app/_data/vascular/arterial/occlusion/treatments/methods';
import { vascularReservationBanner } from '@/app/_data/vascular/banner/content';
import { vascularReservationLinks } from '@/app/_data/vascular/reservation-links/links';
import { vascularStrengthItems } from '@/app/_data/vascular/strengths/items';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import OcclusionDiagnostics from '@/app/_ui/vascular/arterial/occlusion/diagnostics/section';
import OcclusionIntroduction from '@/app/_ui/vascular/arterial/occlusion/introduction/section';
import OcclusionMechanism from '@/app/_ui/vascular/arterial/occlusion/mechanism/section';
import { notFound } from 'next/navigation';

const categoryLabel =
  caseCategories.find((category) => category.id === 'peripheral-artery')
    ?.label ?? '하지동맥폐색증';

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

      {/* 하지동맥폐색증 - 증상 */}
      <OcclusionIntroduction />

      {/* 하지동맥폐색증 - 생명을 위협하는 하지동맥폐색증 */}
      <OcclusionMechanism />

      {/* 하지동맥폐색증 - 비슷한 증상, 다른 전혀 질환 (척추디스크) */}
      <ClinicSymptomComparison id="vascular-arterial-occlusion-comparison" />

      {/* 하지동맥폐색증 - 진단 방법 */}
      <OcclusionDiagnostics />

      {/* 공통배너 - 최대한 빠른 검사 날짜는 언제일까요? */}
      <ClinicBanner
        {...vascularReservationBanner}
        isPaddingHorizontalInMobile={false}
      />

      {/* 하지동맥폐색증 - 치료사례 */}
      <ClinicCases
        id="vascular-arterial-occlusion-cases"
        items={occlusionCasePreviews}
        categoryLabel={categoryLabel}
        title={
          <>
            무거웠던 일상에서
            <br className="xl:hidden" />
            <span className="hidden xl:inline"> </span>
            가벼운 걸음으로,
            <br />
            <b>실제 치료 결과로 증명합니다</b>
          </>
        }
        description={<>※ 치료 경과는 개인에 따라서 달라질 수 있습니다.</>}
        moreHref="/community/cases?tab=before-after&category=peripheral-artery"
      />

      {/* 하지동맥폐색증 - 치료법 */}
      <ClinicTreatments
        id="vascular-arterial-occlusion-treatments"
        ariaLabel="하지동맥폐색증 치료 방법"
        title={<>환자 개인의 상태에 맞는<br /><b>단계별 치료를 시행합니다</b></>}
        methods={occlusionTreatmentMethods}
      />

      {/* 공통 - 네이버/톡톡 예약 */}
      <ClinicReservationLinks
        id="vascular-arterial-occlusion-reservation-links"
        links={vascularReservationLinks}
      />

      {/* 하지동맥폐색증 - 어디서, 누구에게 받느냐가 치료의 결과를 바꿉니다 */}
      <ClinicStrengths
        id="vascular-arterial-occlusion-strengths"
        headingLines={occlusionStrengthsHeadingLines}
        items={vascularStrengthItems}
      />

      {/* 하지동맥폐색증 - 자주 묻는 질문 */}
      <ClinicMediaFaq
        id="vascular-arterial-occlusion-faq"
        thumbnail={occlusionFaqMedia.thumbnail}
        avatar={occlusionFaqMedia.avatar}
        questions={occlusionFaqQuestions}
      />
    </>
  );
}
