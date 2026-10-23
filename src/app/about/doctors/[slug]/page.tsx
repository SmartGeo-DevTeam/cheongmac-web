import PageHeader from '@/app/_components/common/page-header';
import { notFound } from 'next/navigation';
import { getDoctorBySlug } from '../_sections/_doctors/data';
import Counsel from './_sections/_counsel';
import Media from './_sections/_media';
import Presentation from './_sections/_presentation';
import Profile from './_sections/_profile';
import Review from './_sections/_review';

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

      <Profile doctor={doctor} />
      <Review />
      <Media />
      <Counsel />
      <Presentation />
    </>
  );
}
