import PageHeader from '@/app/_components/ui/page-header';
import PartnerHospitalContent from './_components/partner-hospital-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '의료협약병원 | 청맥병원',
  description:
    '청맥병원과 의료·산학·지원 협약을 맺은 주요 기관과 협약 내용을 안내합니다.',
};

export default function PartnerHospitalPage() {
  return (
    <main>
      <PageHeader
        breadcrumbs={[
          { label: '이용안내', href: '/guide/partner-hospital' },
          { label: '의료협약병원' },
        ]}
        title="의료협약병원"
        description={
          <>
            우수 의료기관 및 다양한 기관과의 긴밀한 협력으로
            <br />
            환자 중심의 통합 의료서비스를 실현합니다.
          </>
        }
      />

      <PartnerHospitalContent />
    </main>
  );
}
