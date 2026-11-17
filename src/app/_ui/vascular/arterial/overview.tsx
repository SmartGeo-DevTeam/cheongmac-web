import { arterialOcclusionBanner } from '@/app/_data/vascular/arterial/occlusion-banner/content';
import {
  vascularHealthBanner,
  vascularReservationBanner,
} from '@/app/_data/vascular/banner/content';
import ClinicBanner from '@/app/_components/clinic/banner';
import ArterialBestCases from './best-cases/section';
import ArterialDiagnostics from './diagnostics/section';
import ArterialDiseases from './diseases/section';
import ArterialExpertise from './expertise/section';
import ArterialFaq from './faq/section';
import ArterialProgression from './progression/section';
import ArterialSelfDiagnosis from './self-diagnosis/section';
import ArterialSpecialists from './specialists/section';
import ArterialSymptomComparison from './symptom-comparison/section';

export default function ArterialOverview() {
  return (
    <>
      <ArterialSelfDiagnosis />
      <ArterialDiseases />
      <ArterialProgression />
      <ArterialSymptomComparison />
      <ClinicBanner {...arterialOcclusionBanner} />
      <ArterialDiagnostics />
      <ClinicBanner {...vascularReservationBanner} />
      <ArterialBestCases />
      <ArterialExpertise />
      <ArterialSpecialists />
      <ClinicBanner {...vascularHealthBanner} />
      <ArterialFaq />
    </>
  );
}
