import ClinicBanner from '@/app/_components/clinic/banner';
import { vascularReservationBanner } from '@/app/_data/vascular/banner/content';
import VaricoseCases from './cases/section';
import VaricoseCeap from './ceap/section';
import VaricoseDiagnostics from './diagnostics/section';
import VaricoseFaq from './faq/section';
import VaricoseReservationLinks from './reservation-links/section';
import VaricoseStrengths from './strengths/section';
import VaricoseSymptoms from './symptoms/section';
import VaricoseTreatments from './treatments/section';

/** 하지정맥류 상세 페이지의 구성과 호출 순서만 관리합니다. */
export default function VaricoseOverview() {
  return (
    <>
      <VaricoseSymptoms />
      <VaricoseCeap />
      <VaricoseDiagnostics />
      <ClinicBanner {...vascularReservationBanner} />
      <VaricoseTreatments />
      <VaricoseCases />
      <VaricoseReservationLinks />
      <VaricoseStrengths />
      <VaricoseFaq />
    </>
  );
}
