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
import { varicoceleCasePreviews } from '@/app/_data/vascular/venous/varicocele/cases/featured';
import {
  varicoceleFaqHeading,
  varicoceleFaqMedia,
  varicoceleFaqQuestions,
} from '@/app/_data/vascular/venous/varicocele/faq/questions';
import { varicoceleStrengthsHeadingLines } from '@/app/_data/vascular/venous/varicocele/strengths/content';
import { varicoceleSymptoms } from '@/app/_data/vascular/venous/varicocele/symptoms/items';
import { varicoceleTreatmentMethod } from '@/app/_data/vascular/venous/varicocele/treatments/methods';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import VaricoceleCharacteristics from '@/app/_ui/vascular/venous/varicocele/characteristics/section';
import VaricoceleDiagnostics from '@/app/_ui/vascular/venous/varicocele/diagnostics/section';
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

      {/* 정계정맥류 - 진단 방법 */}
      <VaricoceleDiagnostics id="vascular-venous-varicocele-diagnostics" />

      {/* 공통 - 배너: 최대한 빠른 검사 날짜는 언제일까요? */}
      <ClinicBanner
        id="vascular-reservation-banner"
        {...vascularReservationBanner}
        isPaddingHorizontalInMobile={false}
      />

      {/* 공통 - 치료사례 */}
      <ClinicCases
        id="vascular-venous-varicocele-cases"
        items={varicoceleCasePreviews}
        categoryLabel="정계정맥류"
        title={
          <>
            정계정맥류 치료 과정,
            <br />
            <b>다양한 사례로 살펴보세요</b>
          </>
        }
        description={<>※ 치료 경과는 개인에 따라서 달라질 수 있습니다.</>}
        moreHref="/community/cases?tab=before-after&category=varicocele"
      />

      {/* 공통 - 치료법 */}
      <ClinicTreatments
        id="vascular-venous-varicocele-treatments"
        mode="standalone"
        title={
          <b>
            절개 없이{` `}
            <br className={`xl:hidden`} />
            문제 정맥만 막습니다
          </b>
        }
        description={
          <>
            절개 없이 팔 정맥을 통해 진행하는 간단한 시술로,{` `}
            <br className={`hidden xl:block`} />
            스마트 코일 색전술은 원인이 되는 고환정맥의 역류만 차단해 정상
            정맥의 혈액 순환을 회복시키고 통증과 불편감을 개선합니다.
          </>
        }
        method={varicoceleTreatmentMethod}
      />

      {/* 공통 - 네이버/톡톡 예약 */}
      <ClinicReservationLinks
        id="vascular-venous-varicose-reservation-links"
        links={vascularReservationLinks}
      />

      {/* 공통 - 어디서, 누구에게 받느냐가 치료의 결과를 바꿉니다 */}
      <ClinicStrengths
        id="vascular-venous-varicocele-strengths"
        headingLines={varicoceleStrengthsHeadingLines}
        items={vascularStrengthItems}
      />

      {/* 공통 - 자주 묻는 질문 */}
      <ClinicMediaFaq
        id="vascular-venous-varicocele-faq"
        headingLabel={varicoceleFaqHeading.label}
        headingTitle={
          <>
            <span className={`font-normal`}>
              {varicoceleFaqHeading.firstLine}
            </span>
            <br />
            <b className={`font-bold`}>{varicoceleFaqHeading.secondLine}</b>
          </>
        }
        thumbnail={varicoceleFaqMedia.thumbnail}
        avatar={varicoceleFaqMedia.avatar}
        questions={varicoceleFaqQuestions}
      />
    </>
  );
}
