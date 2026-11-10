import PageHeader from '@/app/_components/common/page-header';
import { notFound } from 'next/navigation';
import { getDoctorBySlug } from '@/app/_data/about/doctors/doctors';
import DoctorDetailConsultation from '@/app/_ui/about/doctors/[slug]/consultation';
import DoctorDetailMedia from '@/app/_ui/about/doctors/[slug]/media';
import DoctorDetailPresentations from '@/app/_ui/about/doctors/[slug]/presentations';
import DoctorDetailProfile from '@/app/_ui/about/doctors/[slug]/profile';
import DoctorDetailPatientReviews from '@/app/_ui/about/doctors/[slug]/patient-reviews';

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);

  if (!doctor) notFound();

  return (
    <>
      <PageHeader
        title="의료진 상세보기"
        desc="대한민국 혈관치료의 표준을 만들어가는 청맥 의료진을 소개합니다."
      />

      <DoctorDetailProfile doctor={doctor} />
      <DoctorDetailPatientReviews />
      <DoctorDetailMedia />
      <DoctorDetailConsultation />
      <DoctorDetailPresentations />
    </>
  );
}
