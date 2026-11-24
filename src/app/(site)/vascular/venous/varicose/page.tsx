import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import ClinicBanner from '@/app/_components/clinic/banner';
import { vascularReservationBanner } from '@/app/_data/vascular/banner/content';
import VaricoseCases from '@/app/_ui/vascular/venous/varicose/cases/section';
import VaricoseCeap from '@/app/_ui/vascular/venous/varicose/ceap/section';
import VaricoseDiagnostics from '@/app/_ui/vascular/venous/varicose/diagnostics/section';
import VaricoseFaq from '@/app/_ui/vascular/venous/varicose/faq/section';
import VaricoseReservationLinks from '@/app/_ui/vascular/venous/varicose/reservation-links/section';
import VaricoseStrengths from '@/app/_ui/vascular/venous/varicose/strengths/section';
import VaricoseSymptoms from '@/app/_ui/vascular/venous/varicose/symptoms/section';
import VaricoseTreatments from '@/app/_ui/vascular/venous/varicose/treatments/section';
import { notFound } from 'next/navigation';

export default function VascularVenousVaricosePage() {
  if (!isPublishedNavigationPath('/vascular/venous/varicose')) notFound();

  return (
    <>
      <Breadcrumb />
      <PageHeader title="하지정맥류" />
      {/* 하지정맥류 - 증상 */}
      <VaricoseSymptoms />

      {/* 하지정맥류 - 나는 몇기에 해당될까? */}
      <VaricoseCeap />

      {/* 하지정맥류 - 진단 방법 */}
      <VaricoseDiagnostics />

      {/* 공통배너 - 최대한 빠른 검사 날짜는 언제일까요? */}
      <ClinicBanner {...vascularReservationBanner} />

      {/* 하지정맥류 - 치료법 */}
      <VaricoseTreatments />

      {/* 하지정맥류 - 치료사례 */}
      <VaricoseCases />

      {/* 공통 - 네이버/톡톡 예약 */}
      <VaricoseReservationLinks />

      {/* 하지정맥류 - 어디서, 누구에게 받느냐가 치료의 결과를 바꿉니다 */}
      <VaricoseStrengths />

      {/* 하지정맥류 - 자주 묻는 질문 */}
      <VaricoseFaq />
    </>
  );
}
