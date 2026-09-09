import { prisma } from '@/_lib/prisma';

export const DOCTOR_IMAGE_KINDS = [
  'COVER',
  'PROFILE',
  'CUTOUT',
  'MOTION',
] as const;

export type DoctorImageKind = (typeof DOCTOR_IMAGE_KINDS)[number];

export type DoctorSummary = {
  id: string;
  slug: string;
  name: string;
  position: string;
  department: string;
  reservationHref: string;
  specialties: string[];
  profileImageUrl: string | null;
  coverImageUrl: string | null;
};

function imageUrl(
  images: { kind: string; url: string }[],
  kind: DoctorImageKind,
) {
  const value = images.find(
    (image) => image.kind === kind && image.url.trim().length > 0,
  )?.url;

  return value ?? null;
}

export async function getVisibleDoctorSummaries(): Promise<DoctorSummary[]> {
  const doctors = await prisma.doctor.findMany({
    where: { isVisible: true },
    orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
    include: {
      images: {
        orderBy: { sortOrder: 'asc' },
        select: { kind: true, url: true },
      },
      specialties: {
        orderBy: { sortOrder: 'asc' },
        where: {
          specialty: { isVisible: true },
        },
        include: {
          specialty: {
            select: { name: true },
          },
        },
      },
    },
  });

  return doctors.map((doctor) => ({
    id: doctor.id,
    slug: doctor.slug,
    name: doctor.name,
    position: doctor.position,
    department: doctor.department,
    reservationHref: doctor.reservationHref,
    specialties: doctor.specialties.map(
      (link) => link.specialty.name,
    ),
    profileImageUrl: imageUrl(doctor.images, 'PROFILE'),
    coverImageUrl: imageUrl(doctor.images, 'COVER'),
  }));
}

export async function getDoctorBaseBySlug(slug: string) {
  return prisma.doctor.findFirst({
    where: {
      slug,
      isVisible: true,
    },
    select: {
      id: true,
      slug: true,
      name: true,
      position: true,
      department: true,
      bio: true,
      reservationHref: true,
    },
  });
}

export async function getDoctorProfileCore(doctorId: string) {
  const [doctor, images] = await Promise.all([
    prisma.doctor.findUnique({
      where: { id: doctorId },
      select: {
        id: true,
        slug: true,
        name: true,
        position: true,
        department: true,
        bio: true,
        reservationHref: true,
      },
    }),
    prisma.doctorImage.findMany({
      where: { doctorId },
      orderBy: { sortOrder: 'asc' },
      select: { id: true, kind: true, url: true, alt: true },
    }),
  ]);

  if (!doctor) return null;

  return {
    ...doctor,
    images: {
      cover: imageUrl(images, 'COVER'),
      profile: imageUrl(images, 'PROFILE'),
      cutout: imageUrl(images, 'CUTOUT'),
      motion: imageUrl(images, 'MOTION'),
    },
  };
}

export async function getDoctorSpecialties(doctorId: string) {
  return prisma.doctorSpecialty.findMany({
    where: {
      isVisible: true,
      doctors: {
        some: { doctorId },
      },
    },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    select: {
      id: true,
      name: true,
      description: true,
    },
  });
}

export async function getDoctorCareers(doctorId: string) {
  return prisma.doctorCareer.findMany({
    where: { doctorId, isVisible: true },
    orderBy: { sortOrder: 'asc' },
    select: { id: true, kind: true, content: true },
  });
}

export async function getDoctorProfileBundle(doctorId: string) {
  const [doctor, images, specialties, careers] = await Promise.all([
    prisma.doctor.findUnique({
      where: { id: doctorId },
      select: {
        id: true,
        slug: true,
        name: true,
        position: true,
        department: true,
        bio: true,
        reservationHref: true,
      },
    }),
    prisma.doctorImage.findMany({
      where: { doctorId },
      orderBy: { sortOrder: 'asc' },
      select: { id: true, kind: true, url: true, alt: true },
    }),
    getDoctorSpecialties(doctorId),
    getDoctorCareers(doctorId),
  ]);

  if (!doctor) return null;

  return {
    ...doctor,
    images: {
      cover: imageUrl(images, 'COVER'),
      profile: imageUrl(images, 'PROFILE'),
      cutout: imageUrl(images, 'CUTOUT'),
      motion: imageUrl(images, 'MOTION'),
    },
    specialties,
    careers,
  };
}

export async function getDoctorSchedule(doctorId: string) {
  return prisma.doctorSchedule.findMany({
    where: {
      isVisible: true,
      doctors: {
        some: { doctorId },
      },
    },
    orderBy: [{ sortOrder: 'asc' }, { label: 'asc' }],
  });
}

export async function getDoctorReviews(doctorId: string) {
  return prisma.doctorReview.findMany({
    where: {
      isVisible: true,
      doctors: {
        some: { doctorId },
      },
    },
    orderBy: [{ sortOrder: 'asc' }, { reviewedAt: 'desc' }],
  });
}

export async function getDoctorMedia(doctorId: string) {
  return prisma.doctorMedia.findMany({
    where: {
      isVisible: true,
      doctors: {
        some: { doctorId },
      },
    },
    orderBy: [
      { isFeatured: 'desc' },
      { sortOrder: 'asc' },
      { publishedAt: 'desc' },
    ],
  });
}

export async function getDoctorPresentations(doctorId: string) {
  return prisma.doctorPresentation.findMany({
    where: {
      isVisible: true,
      doctors: {
        some: { doctorId },
      },
    },
    orderBy: [{ sortOrder: 'asc' }, { presentedAt: 'desc' }],
  });
}

export async function getDoctorConsultations(
  doctorId: string,
  take = 6,
) {
  return prisma.medicalConsultation.findMany({
    where: {
      isVisible: true,
      doctors: {
        some: { doctorId },
      },
    },
    orderBy: [
      { publishedAt: 'desc' },
      { sortOrder: 'asc' },
      { id: 'desc' },
    ],
    take,
    select: {
      id: true,
      categoryPrimary: true,
      categorySecondary: true,
      title: true,
      publishedAt: true,
      isPrivate: true,
      hasLinkIcon: true,
    },
  });
}
