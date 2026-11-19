import VenousCauses from './causes/section';
import VenousDiseases from './diseases/section';
import VenousTreatments from './treatments/section';
import VenousBestCases from './best-cases/section';
import VenousExpertise from './expertise/section';
import VenousSpecialists from './specialists/section';
import VenousFaq from './faq/section';

/** 정맥질환 개요: 페이지 전용 섹션의 호출 순서만 관리합니다. */
export default function VenousOverview() {
  return (
    <>
      <VenousCauses />
      <VenousDiseases />
      <VenousTreatments />
      <VenousBestCases />
      <VenousExpertise />
      <VenousSpecialists />
      <VenousFaq />
    </>
  );
}
