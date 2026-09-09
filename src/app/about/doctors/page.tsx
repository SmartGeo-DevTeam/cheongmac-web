import PageHeader from '@/app/_components/ui/page-header';
import { getVisibleDoctorSummaries } from '@/_lib/doctors';
import type { Metadata } from 'next';
import DoctorListClient from './_components/doctor-list-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '의료진/진료과 | 청맥병원',
  description:
    '청맥병원 의료진의 진료과, 전문분야와 의료진별 상세 정보를 확인해보세요.',
};

export default async function AboutDoctors() {
  const doctors = await getVisibleDoctorSummaries();

  return (
    <div>
      <PageHeader
        id="about-doctors-page-header"
        breadcrumbs={[
          { label: '병원 소개', href: '/about/doctors' },
          { label: '의료진/진료과' },
        ]}
        title="의료진/진료과"
        description={
          <>
            환자의 삶에 흐르는 건강을 최고의 전문성으로 지켜내며
            <br className="hidden xl:block" />
            대한민국 혈관 치료의 표준을 만드는 청맥의 의료진을 소개합니다.
          </>
        }
      />

      <DoctorListClient doctors={doctors} />
    </div>
  );
}
