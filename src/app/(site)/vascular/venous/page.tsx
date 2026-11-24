import ClinicBanner from '@/app/_components/clinic/banner';
import BestCasesSection from '@/app/_components/clinic/best-cases/section';
import ClinicExpertiseSection from '@/app/_components/clinic/expertise/section';
import ClinicSplitFaq from '@/app/_components/clinic/faq/section';
import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import {
  vascularHealthBanner,
  vascularReservationBanner,
} from '@/app/_data/vascular/banner/content';
import { venousBestCases } from '@/app/_data/vascular/venous/best-cases/cases';
import { venousExpertiseItems } from '@/app/_data/vascular/venous/expertise/items';
import {
  venousFaqMoreLink,
  venousFaqs,
} from '@/app/_data/vascular/venous/faq/questions';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import VenousCauses from '@/app/_ui/vascular/venous/causes/section';
import VenousDiseases from '@/app/_ui/vascular/venous/diseases/section';
import VenousSpecialists from '@/app/_ui/vascular/venous/specialists/section';
import VenousTreatments from '@/app/_ui/vascular/venous/treatments/section';
import { notFound } from 'next/navigation';

export default function VascularVenousPage() {
  if (!isPublishedNavigationPath('/vascular/venous')) notFound();

  return (
    <>
      <Breadcrumb />
      <PageHeader title="정맥질환" englishTitle="Venous Disease" />
      {/* 정맥질환 - 원인 */}
      <VenousCauses />

      {/* 정맥질환 - 부위별 정맥질환 */}
      <VenousDiseases />

      {/* 정맥질환 - 혈관 맞춤 치료 */}
      <VenousTreatments />

      {/* 공통배너 - 최대한 빠른 검사 날짜는 언제일까요? */}
      <ClinicBanner {...vascularReservationBanner} />

      {/* 정맥질환 - BEST 치료사례 */}
      <BestCasesSection id="vascular-venous-best-cases" cases={venousBestCases} />

      {/* 정맥질환 - 혈관만 봅니다 그래서 다릅니다 */}
      <ClinicExpertiseSection
        id="vascular-venous-expertise"
        items={venousExpertiseItems}
      />

      {/* 정맥질환 - 의료진 */}
      <VenousSpecialists />

      {/* 공통배너 - 청맥병원에서 시작하는 혈관 건강 */}
      <ClinicBanner {...vascularHealthBanner} />

      {/* 정맥질환 - 자주 묻는 질문 */}
      <ClinicSplitFaq
        id="vascular-venous-faq"
        title={
          <>
            정맥질환
            <br />
            <strong>자주 묻는 질문</strong>
          </>
        }
        questions={venousFaqs}
        moreLink={venousFaqMoreLink}
      />
    </>
  );
}
