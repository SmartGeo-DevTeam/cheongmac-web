import ClinicBanner from '@/app/_components/clinic/banner';
import ClinicCases from '@/app/_components/clinic/cases/section';
import ClinicMediaFaq from '@/app/_components/clinic/media-faq/section';
import ClinicReservationLinks from '@/app/_components/clinic/reservation-links/section';
import ClinicStrengths from '@/app/_components/clinic/strengths/section';
import ClinicSymptoms from '@/app/_components/clinic/symptom-carousel/section';
import ClinicSymptomComparison from '@/app/_components/clinic/symptom-comparison/section';
import ClinicTreatments from '@/app/_components/clinic/treatments/section';
import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import { vascularReservationBanner } from '@/app/_data/vascular/banner/content';
import { vascularReservationLinks } from '@/app/_data/vascular/reservation-links/links';
import { vascularStrengthItems } from '@/app/_data/vascular/strengths/items';
import { pelvicCasePreviews } from '@/app/_data/vascular/venous/pelvic/cases/featured';
import {
  menstrualPainCondition,
  pelvicVaricesCondition,
} from '@/app/_data/vascular/venous/pelvic/comparison/conditions';
import { pelvicPainPattern } from '@/app/_data/vascular/venous/pelvic/comparison/content';
import {
  pelvicFaqHeading,
  pelvicFaqMedia,
  pelvicFaqQuestions,
} from '@/app/_data/vascular/venous/pelvic/faq/questions';
import { pelvicStrengthsHeadingLines } from '@/app/_data/vascular/venous/pelvic/strengths/content';
import { pelvicSymptoms } from '@/app/_data/vascular/venous/pelvic/symptoms/items';
import { pelvicTreatmentMethod } from '@/app/_data/vascular/venous/pelvic/treatments/methods';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import PelvicPainPattern from '@/app/_ui/vascular/venous/pelvic/comparison/pain-pattern';
import PelvicDiagnostics from '@/app/_ui/vascular/venous/pelvic/diagnostics/section';
import PelvicRelated from '@/app/_ui/vascular/venous/pelvic/related/section';
import PelvicStatistics from '@/app/_ui/vascular/venous/pelvic/statistics/section';
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

      {/* 공통 - 일반 생리통과 골반정맥류 비교 */}
      <ClinicSymptomComparison
        id="vascular-venous-pelvic-comparison"
        heading={{
          label: '언제 어떻게 아픈지가 중요 단서',
          title: (
            <>
              <b>단순 생리통</b>과는 {` `}
              <br className="xl:hidden" />
              이렇게 다릅니다
            </>
          ),
        }}
        leftCondition={menstrualPainCondition}
        rightCondition={pelvicVaricesCondition}
      >
        <PelvicPainPattern
          id="vascular-venous-pelvic-comparison-pain-pattern"
          content={pelvicPainPattern}
        />
      </ClinicSymptomComparison>

      {/* 골반정맥류 - 질환 통계 */}
      <PelvicStatistics id="vascular-venous-pelvic-statistics" />

      {/* 골반정맥류 - 연관 질환 */}
      <PelvicRelated id="vascular-venous-pelvic-related" />

      {/* 골반정맥류 - 진단 방법 */}
      <PelvicDiagnostics id="vascular-venous-pelvic-diagnostics" />

      {/* 공통 - 배너: 최대한 빠른 검사 날짜는 언제일까요? */}
      <ClinicBanner
        id="vascular-reservation-banner"
        {...vascularReservationBanner}
      />

      {/* 공통 - 치료사례 */}
      <ClinicCases
        id="vascular-venous-pelvic-cases"
        items={pelvicCasePreviews}
        categoryLabel="골반정맥류"
        title={
          <>
            무거웠던 일상에서{` `}
            <br className={`xl:hidden`} />
            가벼운 걸음으로,
            <br />
            <b>실제 치료 결과로 증명합니다</b>
          </>
        }
        description={<>※ 치료 경과는 개인에 따라서 달라질 수 있습니다.</>}
        moreHref="/community/cases?tab=before-after&category=pelvic-vein"
      />

      {/* 공통 - 치료법 */}
      <ClinicTreatments
        id="vascular-venous-pelvic-treatments"
        mode="standalone"
        title={
          <b>
            자궁은 지키고,{` `}
            <br className={`xl:hidden`} />
            문제 정맥만 막습니다
          </b>
        }
        description={
          <>
            골반정맥류는 자궁이나 난소의 병이 아닌 혈관질환입니다.{` `}
            <br className={`hidden xl:block`} />
            원인이 되는 난소정맥의 역류만 안전하게 차단하는 스마트 코일 색전술을
            통해 정상 정맥의 혈액 순환을 회복시키고 통증과 증상을 효과적으로
            개선합니다.
          </>
        }
        method={pelvicTreatmentMethod}
      />

      {/* 공통 - 네이버/톡톡 예약 */}
      <ClinicReservationLinks
        id="vascular-venous-varicose-reservation-links"
        links={vascularReservationLinks}
      />

      {/* 공통 - 어디서, 누구에게 받느냐가 치료의 결과를 바꿉니다 */}
      {/* TODO: 메시지가 확정되면 _data/.../strengths/content.ts에 입력합니다. */}
      {/* 기존 병원 공통 강점 카드 5개는 동맥 페이지와 동일하게 재사용합니다. */}
      <ClinicStrengths
        id="vascular-venous-pelvic-strengths"
        headingLines={pelvicStrengthsHeadingLines}
        items={vascularStrengthItems}
      />

      {/* 공통 - 자주 묻는 질문 */}
      <ClinicMediaFaq
        id="vascular-venous-pelvic-faq"
        headingLabel={pelvicFaqHeading.label}
        headingTitle={
          <>
            <span className={`font-normal`}>
              {pelvicFaqHeading.firstLine}
            </span>
            <br />
            <b className={`font-bold`}>{pelvicFaqHeading.secondLine}</b>
          </>
        }
        thumbnail={pelvicFaqMedia.thumbnail}
        thumbnailAlt="골반정맥류의 증상·검사·치료를 소개하는 영상 썸네일"
        avatar={pelvicFaqMedia.avatar}
        questions={pelvicFaqQuestions}
      />
    </>
  );
}
