import type { DoctorAdminPayload } from '@/app/admin/_actions/doctor';
import { DOCTOR_IMAGE_KINDS } from '@/_lib/doctors';
import { prisma } from '@/_lib/prisma';
import { notFound } from 'next/navigation';
import DoctorEditor from './doctor-editor';

export const dynamic = 'force-dynamic';

function dateInput(value: Date | null) {
  if (!value) return '';
  return value.toISOString().slice(0, 10);
}

export default async function AdminDoctorDetailPage({
  params,
}: {
  params: Promise<{ doctorId: string }>;
}) {
  const { doctorId } = await params;

  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      specialties: { orderBy: { sortOrder: 'asc' } },
      careers: { orderBy: { sortOrder: 'asc' } },
      schedules: { orderBy: { sortOrder: 'asc' } },
      presentations: { orderBy: { sortOrder: 'asc' } },
      reviews: { orderBy: { sortOrder: 'asc' } },
      media: { orderBy: { sortOrder: 'asc' } },
      consultations: {
        orderBy: [{ publishedAt: 'desc' }, { id: 'desc' }],
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
      const image = doctor.images.find((item) => item.kind === kind);
      return {
        kind,
        url: image?.url ?? '',
        alt: image?.alt ?? `${doctor.name} ${kind}`,
      };
    }),
    specialties: doctor.specialties.map((item) => ({
      name: item.name,
      description: item.description ?? '',
      isVisible: item.isVisible,
    })),
    careers: doctor.careers.map((item) => ({
      kind: item.kind === 'EDUCATION' ? 'EDUCATION' : 'CAREER',
      content: item.content,
      isVisible: item.isVisible,
    })),
    schedules: doctor.schedules.map((item) => ({
      label: item.label,
      mon: item.mon,
      tue: item.tue,
      wed: item.wed,
      thu: item.thu,
      fri: item.fri,
      sat: item.sat,
    })),
    presentations: doctor.presentations.map((item) => ({
      title: item.title,
      organization: item.organization ?? '',
      description: item.description ?? '',
      imageUrl: item.imageUrl ?? '',
      linkUrl: item.linkUrl ?? '',
      presentedAt: dateInput(item.presentedAt),
      isVisible: item.isVisible,
    })),
    reviews: doctor.reviews.map((item) => ({
      patientName: item.patientName,
      age: item.age?.toString() ?? '',
      gender: item.gender ?? '',
      treatment: item.treatment ?? '',
      content: item.content ?? '',
      imageUrl: item.imageUrl ?? '',
      reviewedAt: dateInput(item.reviewedAt),
      isVisible: item.isVisible,
    })),
    media: doctor.media.map((item) => ({
      kind: item.kind,
      title: item.title,
      source: item.source ?? '',
      thumbnailUrl: item.thumbnailUrl ?? '',
      linkUrl: item.linkUrl,
      publishedAt: dateInput(item.publishedAt),
      isFeatured: item.isFeatured,
      isVisible: item.isVisible,
    })),
    consultations: doctor.consultations.map((item) => ({
      id: item.id,
      categoryPrimary: item.categoryPrimary,
      categorySecondary: item.categorySecondary,
      title: item.title,
      questionText: Array.isArray(item.question)
        ? item.question.filter((v): v is string => typeof v === 'string').join('\n')
        : '',
      imageUrl: item.imageUrl ?? '',
      isPrivate: item.isPrivate,
      hasLinkIcon: item.hasLinkIcon,
      answerText: Array.isArray(item.answer)
        ? item.answer.filter((v): v is string => typeof v === 'string').join('\n')
        : '',
      answerDate: dateInput(item.answerDate),
      publishedAt: dateInput(item.publishedAt),
      isVisible: item.isVisible,
    })),
  };

  return <DoctorEditor initial={initial} />;
}
