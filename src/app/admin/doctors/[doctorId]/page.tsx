import type { DoctorAdminPayload } from '@/app/admin/_actions/doctor';
import { DOCTOR_IMAGE_KINDS } from '@/_lib/doctors';
import { prisma } from '@/_lib/prisma';
import { notFound } from 'next/navigation';
import DoctorEditor from './doctor-editor';

export const dynamic = 'force-dynamic';

export default async function AdminDoctorDetailPage({
  params,
}: {
  params: Promise<{ doctorId: string }>;
}) {
  const { doctorId } = await params;

  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    include: {
      images: {
        orderBy: { sortOrder: 'asc' },
      },
      careers: {
        orderBy: { sortOrder: 'asc' },
      },
      _count: {
        select: {
          specialties: true,
          schedules: true,
          presentations: true,
          reviews: true,
          media: true,
          consultations: true,
        },
      },
    },
  });

  if (!doctor) notFound();

  const initial: DoctorAdminPayload = {
    id: doctor.id,
    slug: doctor.slug,
    name: doctor.name,
    position: doctor.position,
    department: doctor.department,
    bio: doctor.bio ?? '',
    reservationHref: doctor.reservationHref,
    displayOrder: doctor.displayOrder,
    isVisible: doctor.isVisible,
    images: DOCTOR_IMAGE_KINDS.map((kind) => {
      const image = doctor.images.find(
        (item) => item.kind === kind,
      );

      return {
        kind,
        url: image?.url ?? '',
        alt: image?.alt ?? `${doctor.name} ${kind}`,
      };
    }),
    careers: doctor.careers.map((item) => ({
      kind:
        item.kind === 'EDUCATION'
          ? 'EDUCATION'
          : 'CAREER',
      content: item.content,
      isVisible: item.isVisible,
    })),
  };

  const relationCounts = [
    {
      label: '진료분야',
      count: doctor._count.specialties,
      href: `/admin/content-relations/specialties?doctorId=${doctor.id}`,
    },
    {
      label: '진료시간표',
      count: doctor._count.schedules,
      href: `/admin/content-relations/schedules?doctorId=${doctor.id}`,
    },
    {
      label: '발표 이력',
      count: doctor._count.presentations,
      href: `/admin/content-relations/presentations?doctorId=${doctor.id}`,
    },
    {
      label: '환자 후기',
      count: doctor._count.reviews,
      href: `/admin/content-relations/reviews?doctorId=${doctor.id}`,
    },
    {
      label: '미디어',
      count: doctor._count.media,
      href: `/admin/content-relations/media?doctorId=${doctor.id}`,
    },
    {
      label: '의학상담',
      count: doctor._count.consultations,
      href: `/admin/content-relations/consultations?doctorId=${doctor.id}`,
    },
  ];

  return (
    <DoctorEditor
      initial={initial}
      relationCounts={relationCounts}
    />
  );
}
