import NavigationPageHeader from '@/app/_components/ui/navigation-page-header';
import type { Metadata } from 'next';
import PartnerHospitalContent from './_components/partner-hospital-content';

export const metadata: Metadata = {
  title: '의료협약병원 | 청맥병원',
  description:
    '청맥병원과 의료·산학·지원 협약을 맺은 주요 기관과 협약 내용을 안내합니다.',
};

export default function PartnerHospitalPage() {
  return (
    <div>
      <NavigationPageHeader
        id="partner-hospital-page-header"
        navigationPath="/guide/partner-hospital"
        description={
          <>
            우수 의료기관 및 다양한 기관과의 긴밀한 협력으로
            <br />
            환자 중심의 통합 의료서비스를 실현합니다.
          </>
        }
      />

      <PartnerHospitalContent />
    </div>
  );
}
