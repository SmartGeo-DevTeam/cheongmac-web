import ClinicBanner from '@/app/_components/clinic/banner';
import {
  vascularHealthBanner,
  vascularReservationBanner,
} from '@/app/_data/vascular/banner/content';
import VenousBestCases from './best-cases/section';
import VenousCauses from './causes/section';
import VenousDiseases from './diseases/section';
import VenousExpertise from './expertise/section';
import VenousFaq from './faq/section';
import VenousSpecialists from './specialists/section';
import VenousTreatments from './treatments/section';

export default function VenousOverview() {
  return (
    <>
      <VenousCauses />
      <VenousDiseases />
      <VenousTreatments />
      <ClinicBanner {...vascularReservationBanner} />
      <VenousBestCases />
      <VenousExpertise />
      <VenousSpecialists />
      <ClinicBanner {...vascularHealthBanner} />
      <VenousFaq />
    </>
  );
}
