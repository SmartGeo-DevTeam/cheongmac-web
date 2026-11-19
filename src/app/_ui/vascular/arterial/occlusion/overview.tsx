import ClinicBanner from '@/app/_components/clinic/banner';
import ClinicSymptomComparison from '@/app/_components/clinic/symptom-comparison/section';
import { vascularReservationBanner } from '@/app/_data/vascular/banner/content';
import OcclusionStrengths from './strengths/section';
import OcclusionCases from './cases/section';
import OcclusionDiagnostics from './diagnostics/section';
import OcclusionFaq from './faq/section';
import OcclusionIntroduction from './introduction/section';
import OcclusionMechanism from './mechanism/section';
import OcclusionReservationLinks from './reservation-links/section';
import OcclusionTreatments from './treatments/section';

/** 하지동맥폐색증 상세 페이지: 섹션 호출 순서만 관리합니다. */
export default function OcclusionOverview() {
  return (
    <>
      <OcclusionIntroduction />
      <OcclusionMechanism />
      <ClinicSymptomComparison id="vascular-arterial-occlusion-comparison" />
      <OcclusionDiagnostics />
      <ClinicBanner
        {...vascularReservationBanner}
        isPaddingHorizontalInMobile={false}
      />
      <OcclusionCases />
      <OcclusionTreatments />
      <OcclusionReservationLinks />
      <OcclusionStrengths />
      <OcclusionFaq />
    </>
  );
}
