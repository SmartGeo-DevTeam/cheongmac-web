import ClinicBanner from '@/app/_components/clinic/banner';
import ClinicCases from '@/app/_components/clinic/cases/section';
import ClinicMediaFaq from '@/app/_components/clinic/media-faq/section';
import ClinicReservationLinks from '@/app/_components/clinic/reservation-links/section';
import ClinicStrengths from '@/app/_components/clinic/strengths/section';
import ClinicSymptoms from '@/app/_components/clinic/symptom-carousel/section';
import ClinicTreatments from '@/app/_components/clinic/treatments/section';
import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import { vascularReservationBanner } from '@/app/_data/vascular/banner/content';
import { vascularReservationLinks } from '@/app/_data/vascular/reservation-links/links';
import { vascularStrengthItems } from '@/app/_data/vascular/strengths/items';
import { thrombosisCasePreviews } from '@/app/_data/vascular/venous/thrombosis/cases/featured';
import {
  thrombosisFaqHeading,
  thrombosisFaqMedia,
  thrombosisFaqQuestions,
} from '@/app/_data/vascular/venous/thrombosis/faq/questions';
import { thrombosisStrengthsHeadingLines } from '@/app/_data/vascular/venous/thrombosis/strengths/content';
import { thrombosisSymptoms } from '@/app/_data/vascular/venous/thrombosis/symptoms/items';
import { thrombosisTreatmentMethods } from '@/app/_data/vascular/venous/thrombosis/treatments/methods';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import ThrombosisDiagnostics from '@/app/_ui/vascular/venous/thrombosis/diagnostics/section';
import ThrombosisMechanism from '@/app/_ui/vascular/venous/thrombosis/mechanism/section';
import PulmonaryEmbolismSection from '@/app/_ui/vascular/venous/thrombosis/pulmonary-embolism/section';
import { notFound } from 'next/navigation';

export default function VascularVenousThrombosisPage() {
  if (!isPublishedNavigationPath('/vascular/venous/thrombosis')) notFound();

  return (
    <>
      <Breadcrumb />

      <PageHeader
        title="심부정맥혈전증"
        englishTitle="Deep Vein Thrombosis, DVT"
        desc="다리 속 깊은 정맥의 피가 굳어 생긴 혈전이 혈관을 막아 발생하는 질환"
      />

      {/* 공통 - 증상 */}
      <ClinicSymptoms
        id="vascular-venous-thrombosis-symptoms"
        carouselId="vascular-venous-thrombosis-symptoms-carousel"
        items={thrombosisSymptoms}
        tabsAriaLabel="심부정맥혈전증 증상 선택"
      />

      {/* 심부정맥혈전증 - 폐색전증 경고 */}
      <PulmonaryEmbolismSection id="vascular-venous-thrombosis-pulmonary-embolism" />

      {/* 심부정맥혈전증 - 발생 원인 및 위치 */}
      <ThrombosisMechanism id="vascular-venous-thrombosis-mechanism" />

      {/* 심부정맥혈전증 - 진단 방법 */}
      <ThrombosisDiagnostics id="vascular-venous-thrombosis-diagnostics" />

      {/* 공통 - 배너: 최대한 빠른 검사 날짜는 언제일까요? */}
      <ClinicBanner
        id="vascular-reservation-banner"
        {...vascularReservationBanner}
        isPaddingHorizontalInMobile={false}
      />

      {/* 공통 - 치료사례 */}
      <ClinicCases
        id="vascular-venous-thrombosis-cases"
        items={thrombosisCasePreviews}
        categoryLabel="심부정맥혈전증"
        title={
          <>
            심부정맥혈전증 치료 과정,
            <br />
            <b>다양한 사례로 살펴보세요</b>
          </>
        }
        description={<>※ 치료 경과는 개인에 따라서 달라질 수 있습니다.</>}
        moreHref="/community/cases?tab=before-after&category=dvt"
      />

      {/* 공통 - 치료법 */}
      <ClinicTreatments
        id="vascular-venous-thrombosis-treatments"
        ariaLabel="심부정맥혈전증 치료 방법"
        title={
          <>
            환자 개인의 상태에 맞는
            <br />
            <b>단계별 치료를 시행합니다</b>
          </>
        }
        methods={thrombosisTreatmentMethods}
      />

      {/* 공통 - 네이버/톡톡 예약 */}
      <ClinicReservationLinks
        id="vascular-venous-varicose-reservation-links"
        links={vascularReservationLinks}
      />

      {/* 공통 - 어디서, 누구에게 받느냐가 치료의 결과를 바꿉니다 */}
      <ClinicStrengths
        id="vascular-venous-thrombosis-strengths"
        headingLines={thrombosisStrengthsHeadingLines}
        items={vascularStrengthItems}
      />

      {/* 공통 - 자주 묻는 질문 */}
      <ClinicMediaFaq
        id="vascular-venous-thrombosis-faq"
        headingLabel={thrombosisFaqHeading.label}
        headingTitle={
          <>
            <span className={`font-normal`}>
              {thrombosisFaqHeading.firstLine}
            </span>
            <br />
            <b className={`font-bold`}>{thrombosisFaqHeading.secondLine}</b>
          </>
        }
        thumbnail={thrombosisFaqMedia.thumbnail}
        thumbnailAlt="한쪽 다리 부종과 심부정맥혈전증을 소개하는 영상 썸네일"
        avatar={thrombosisFaqMedia.avatar}
        questions={thrombosisFaqQuestions}
      />
    </>
  );
}
