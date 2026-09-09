import NavigationPageHeader from '@/app/_components/ui/navigation-page-header';
import { getDoctorBaseBySlug } from '@/_lib/doctors';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import {
  DoctorConsultationsSection,
  DoctorMediaSection,
  DoctorPresentationsSection,
  DoctorProfileSection,
  DoctorReviewsSection,
  DoctorScheduleSection,
} from './_components/doctor-sections';
import {
  DoctorCardsSkeleton,
  DoctorListSkeleton,
  DoctorProfileSkeleton,
  DoctorScheduleSkeleton,
} from './_components/doctor-skeletons';

export const dynamic = 'force-dynamic';

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ doctorSlug: string }>;
}) {
  const { doctorSlug } = await params;
  const doctor = await getDoctorBaseBySlug(doctorSlug);

  if (!doctor) notFound();

  return (
    <div>
      <NavigationPageHeader
        id="doctor-detail-page-header"
        navigationPath="/about/doctors"
        titleAs="div"
      />

      <Suspense fallback={<DoctorProfileSkeleton />}>
        <DoctorProfileSection doctorId={doctor.id} />
      </Suspense>

      <section className="bg-[#F5F5F5] pb-10 pt-5 xl:pb-15">
        <Suspense fallback={<DoctorScheduleSkeleton />}>
          <DoctorScheduleSection doctorId={doctor.id} />
        </Suspense>

        <Suspense fallback={<DoctorCardsSkeleton />}>
          <DoctorReviewsSection doctorId={doctor.id} />
        </Suspense>

        <Suspense fallback={<DoctorCardsSkeleton />}>
          <DoctorMediaSection doctorId={doctor.id} />
        </Suspense>

        <Suspense fallback={<DoctorListSkeleton />}>
          <DoctorConsultationsSection doctorId={doctor.id} />
        </Suspense>
      </section>

      <Suspense fallback={<DoctorCardsSkeleton />}>
        <DoctorPresentationsSection doctorId={doctor.id} />
      </Suspense>
    </div>
  );
}
