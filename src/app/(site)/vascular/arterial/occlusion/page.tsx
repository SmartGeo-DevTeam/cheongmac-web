import PageHeader from '@/app/_components/common/page-header';
import Breadcrumb from '@/app/_components/common/breadcrumb';
import ClinicBanner from '@/app/_components/clinic/banner';
import ClinicSymptomComparison from '@/app/_components/clinic/symptom-comparison/section';
import { vascularReservationBanner } from '@/app/_data/vascular/banner/content';
import OcclusionCases from '@/app/_ui/vascular/arterial/occlusion/cases/section';
import OcclusionDiagnostics from '@/app/_ui/vascular/arterial/occlusion/diagnostics/section';
import OcclusionFaq from '@/app/_ui/vascular/arterial/occlusion/faq/section';
import OcclusionIntroduction from '@/app/_ui/vascular/arterial/occlusion/introduction/section';
import OcclusionMechanism from '@/app/_ui/vascular/arterial/occlusion/mechanism/section';
import OcclusionReservationLinks from '@/app/_ui/vascular/arterial/occlusion/reservation-links/section';
import OcclusionStrengths from '@/app/_ui/vascular/arterial/occlusion/strengths/section';
import OcclusionTreatments from '@/app/_ui/vascular/arterial/occlusion/treatments/section';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import { notFound } from 'next/navigation';

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
      <OcclusionCases />

      {/* 하지동맥폐색증 - 치료법 */}
      <OcclusionTreatments />

      {/* 공통 - 네이버/톡톡 예약 */}
      <OcclusionReservationLinks />

      {/* 하지동맥폐색증 - 어디서, 누구에게 받느냐가 치료의 결과를 바꿉니다 */}
      <OcclusionStrengths />

      {/* 하지동맥폐색증 - 자주 묻는 질문 */}
      <OcclusionFaq />
    </>
  );
}
