import ClinicBanner from '@/app/_components/clinic/banner';
import ClinicSymptomComparison from '@/app/_components/clinic/symptom-comparison/section';
import { vascularReservationBanner } from '@/app/_data/vascular/banner/content';
import OcclusionCases from './cases/section';
import OcclusionDiagnostics from './diagnostics/section';
import OcclusionFaq from './faq/section';
import OcclusionIntroduction from './introduction/section';
import OcclusionMechanism from './mechanism/section';
import OcclusionReservationLinks from './reservation-links/section';
import OcclusionStrengths from './strengths/section';
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

      {/* 1/2 폰트 사이즈만 조금더 균일화하고 다음 단계로 넘어가자. */}
      <OcclusionStrengths />

      {/* 2/2 아래 부분 UI만 개선하고 마무리하자. */}
      <OcclusionFaq />
    </>
  );
}
