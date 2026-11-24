import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import ClinicBanner from '@/app/_components/clinic/banner';
import {
  vascularHealthBanner,
  vascularReservationBanner,
} from '@/app/_data/vascular/banner/content';
import VenousBestCases from '@/app/_ui/vascular/venous/best-cases/section';
import VenousCauses from '@/app/_ui/vascular/venous/causes/section';
import VenousDiseases from '@/app/_ui/vascular/venous/diseases/section';
import VenousExpertise from '@/app/_ui/vascular/venous/expertise/section';
import VenousFaq from '@/app/_ui/vascular/venous/faq/section';
import VenousSpecialists from '@/app/_ui/vascular/venous/specialists/section';
import VenousTreatments from '@/app/_ui/vascular/venous/treatments/section';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
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
      <VenousBestCases />

      {/* 정맥질환 - 혈관만 봅니다 그래서 다릅니다 */}
      <VenousExpertise />

      {/* 정맥질환 - 의료진 */}
      <VenousSpecialists />

      {/* 공통배너 - 청맥병원에서 시작하는 혈관 건강 */}
      <ClinicBanner {...vascularHealthBanner} />

      {/* 정맥질환 - 자주 묻는 질문 */}
      <VenousFaq />
    </>
  );
}
