import { prisma } from '@/_lib/prisma';

export type PublicConsultationDoctor = {
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
      (image) => image.kind === 'PROFILE' && image.url.trim().length > 0,
    )?.url ??
    images.find(
      (image) => image.kind === 'CUTOUT' && image.url.trim().length > 0,
    )?.url ??
    '/assets/brand/symbol.svg'
  );
}

function mapConsultation(row: {
  id: number;
  categoryPrimary: string;
  categorySecondary: string;
  title: string;
  question: unknown;
  imageUrl: string | null;
  isPrivate: boolean;
  hasLinkIcon: boolean;
  answer: unknown;
  answerDate: Date | null;
  publishedAt: Date;
  doctor: null | {
    name: string;
    position: string;
    department: string;
    images: { kind: string; url: string }[];
    specialties: { name: string }[];
  };
}): PublicConsultationItem {
  const answer = textArray(row.answer);

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
    answered: Boolean(row.doctor && answer.length),
    doctor: row.doctor
      ? {
          name: `${row.doctor.name} ${row.doctor.position}`,
          department: row.doctor.department.replace(' 전문의', ''),
          specialties: row.doctor.specialties.map((item) => item.name),
          imageSrc: doctorImage(row.doctor.images),
        }
      : undefined,
    question: textArray(row.question),
    imageSrc: row.imageUrl ?? undefined,
    answer: answer.length ? answer : undefined,
    answerDate: dateText(row.answerDate),
  };
}

const includeDoctor = {
  doctor: {
    select: {
      name: true,
      position: true,
      department: true,
      images: {
        orderBy: { sortOrder: 'asc' as const },
        select: { kind: true, url: true },
      },
      specialties: {
        where: { isVisible: true },
        orderBy: { sortOrder: 'asc' as const },
        select: { name: true },
      },
    },
  },
};

export async function getPublicConsultations(): Promise<PublicConsultationItem[]> {
  const rows = await prisma.medicalConsultation.findMany({
    where: { isVisible: true },
    orderBy: [{ publishedAt: 'desc' }, { sortOrder: 'asc' }, { id: 'desc' }],
    include: includeDoctor,
  });

  return rows.map(mapConsultation);
}

export async function getPublicConsultationById(id: number) {
  const row = await prisma.medicalConsultation.findFirst({
    where: { id, isVisible: true },
    include: includeDoctor,
  });

  return row ? mapConsultation(row) : null;
}
