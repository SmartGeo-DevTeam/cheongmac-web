import ClinicBanner from '@/app/_components/clinic/banner';
import { vascularHealthBanner } from '@/app/_data/vascular/banner/content';
import VenousCauses from './causes/section';
import VenousDiseases from './diseases/section';
import VenousTreatments from './treatments/section';
import VenousBestCases from './best-cases/section';
import VenousExpertise from './expertise/section';
import VenousSpecialists from './specialists/section';
import VenousFaq from './faq/section';
/** 정맥질환 루트: 섹션 호출 순서만 관리. */
export default function VenousOverview() {
  return <>
    <VenousCauses />
    <VenousDiseases />
    <VenousTreatments />
    <VenousBestCases />
    <VenousExpertise />
    <VenousSpecialists />
    <ClinicBanner {...vascularHealthBanner} id="vascular-venous-health-banner" />
    <VenousFaq />
  </>;
}
