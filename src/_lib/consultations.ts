import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/_lib/prisma';

export type PublicConsultationDoctor = {
  id: string;
  name: string;
  department: string;
  specialties: string[];
  imageSrc: string;
};

export type PublicConsultationItem = {
  id: number;
  category: {
    primary: string;
    secondary: string;
  };
  title: string;
  date: string;
  isPrivate: boolean;
  hasLinkIcon: boolean;
  answered: boolean;
  doctor?: PublicConsultationDoctor;
  doctors: PublicConsultationDoctor[];
  question: string[];
  imageSrc?: string;
  answer?: string[];
  answerDate?: string;
};

function textArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

function dateText(value: Date | null | undefined) {
  if (!value) return undefined;

  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(value)
    .replaceAll(' ', '')
    .replace(/\.$/, '');
}

function doctorImage(
  images: { kind: string; url: string }[],
) {
  return (
    images.find(
      (image) =>
        image.kind === 'PROFILE' &&
        image.url.trim().length > 0,
    )?.url ??
    images.find(
      (image) =>
        image.kind === 'CUTOUT' &&
        image.url.trim().length > 0,
    )?.url ??
    '/assets/brand/symbol.svg'
  );
}

const consultationInclude = {
  doctors: {
    orderBy: { sortOrder: 'asc' as const },
    include: {
      doctor: {
        select: {
          id: true,
          name: true,
          position: true,
          department: true,
          images: {
            orderBy: { sortOrder: 'asc' as const },
            select: { kind: true, url: true },
          },
          specialties: {
            orderBy: { sortOrder: 'asc' as const },
            where: {
              specialty: {
                isVisible: true,
              },
            },
            include: {
              specialty: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.MedicalConsultationInclude;

type ConsultationRow =
  Prisma.MedicalConsultationGetPayload<{
    include: typeof consultationInclude;
  }>;

function mapDoctor(
  link: ConsultationRow['doctors'][number],
): PublicConsultationDoctor {
  return {
    id: link.doctor.id,
    name: `${link.doctor.name} ${link.doctor.position}`,
    department: link.doctor.department.replace(' 전문의', ''),
    specialties: link.doctor.specialties.map(
      (specialtyLink) => specialtyLink.specialty.name,
    ),
    imageSrc: doctorImage(link.doctor.images),
  };
}

function mapConsultation(
  row: ConsultationRow,
): PublicConsultationItem {
  const answer = textArray(row.answer);
  const doctors = row.doctors.map(mapDoctor);

  return {
    id: row.id,
    category: {
      primary: row.categoryPrimary,
      secondary: row.categorySecondary,
    },
    title: row.title,
    date: dateText(row.publishedAt) ?? '',
    isPrivate: row.isPrivate,
    hasLinkIcon: row.hasLinkIcon,
    answered: Boolean(doctors.length && answer.length),
    doctor: doctors[0],
    doctors,
    question: textArray(row.question),
    imageSrc: row.imageUrl ?? undefined,
    answer: answer.length ? answer : undefined,
    answerDate: dateText(row.answerDate),
  };
}

export async function getPublicConsultations(): Promise<
  PublicConsultationItem[]
> {
  const rows = await prisma.medicalConsultation.findMany({
    where: { isVisible: true },
    orderBy: [
      { publishedAt: 'desc' },
      { sortOrder: 'asc' },
      { id: 'desc' },
    ],
    include: consultationInclude,
  });

  return rows.map(mapConsultation);
}

export async function getPublicConsultationById(id: number) {
  const row = await prisma.medicalConsultation.findFirst({
    where: { id, isVisible: true },
    include: consultationInclude,
  });

  return row ? mapConsultation(row) : null;
}
