import ClinicBanner from '@/app/_components/clinic/banner';
import ClinicCases from '@/app/_components/clinic/cases/section';
import ClinicSymptoms from '@/app/_components/clinic/symptom-carousel/section';
import ClinicSymptomComparison from '@/app/_components/clinic/symptom-comparison/section';
import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import { vascularReservationBanner } from '@/app/_data/vascular/banner/content';
import { pelvicCasePreviews } from '@/app/_data/vascular/venous/pelvic/cases/featured';
import {
  menstrualPainCondition,
  pelvicVaricesCondition,
} from '@/app/_data/vascular/venous/pelvic/comparison/conditions';
import { pelvicPainPattern } from '@/app/_data/vascular/venous/pelvic/comparison/content';
import { pelvicSymptoms } from '@/app/_data/vascular/venous/pelvic/symptoms/items';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import PelvicPainPattern from '@/app/_ui/vascular/venous/pelvic/comparison/pain-pattern';
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
        description={
          <>
            ※ 치료 경과는 개인에 따라서 달라질 수 있습니다.
            <br />
            ※ 현재는 시안용 가상 사례 및 예시 이미지입니다.
          </>
        }
        moreHref="/community/cases?tab=before-after&category=pelvic-vein"
      />
    </>
  );
}
