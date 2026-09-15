import 'server-only';

import { prisma } from '@/_lib/prisma';

export type HomeReviewDoctor = {
  id: string;
  slug: string;
  name: string;
  position: string;
  avatarUrl: string | null;
};

export type HomeReview = {
  id: string;
  category: string;
  patientName: string;
  age: number | null;
  gender: string;
  treatment: string;
  content: string;
  imageUrl: string | null;
  beforeImageUrl: string | null;
  afterImageUrl: string | null;
  linkUrl: string | null;
  keywords: string[];
  reviewedAt: string | null;
  sortOrder: number;
  doctors: HomeReviewDoctor[];
};

function imageUrl(
  images: { kind: string; url: string }[],
) {
  const preferredKinds = ['PROFILE', 'COVER', 'CUTOUT'] as const;

  for (const kind of preferredKinds) {
    const value = images.find(
      (image) =>
        image.kind === kind &&
        image.url.trim().length > 0,
    )?.url;

    if (value) return value;
  }

  return null;
}

export async function getHomeReviews(): Promise<HomeReview[]> {
  const rows = await prisma.doctorReview.findMany({
    where: {
      isVisible: true,
      isHomeVisible: true,
    },
    orderBy: [
      { sortOrder: 'asc' },
      { reviewedAt: 'desc' },
      { createdAt: 'desc' },
    ],
    include: {
      doctors: {
        orderBy: { sortOrder: 'asc' },
        include: {
          doctor: {
            select: {
              id: true,
              slug: true,
              name: true,
              position: true,
              images: {
                orderBy: { sortOrder: 'asc' },
                select: {
                  kind: true,
                  url: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return rows.map((row) => ({
    id: row.id,
    category: row.category?.trim() || '기타',
    patientName: row.patientName,
    age: row.age,
    gender: row.gender ?? '',
    treatment: row.treatment ?? '',
    content: row.content ?? '',
    imageUrl: row.imageUrl,
    beforeImageUrl: row.beforeImageUrl,
    afterImageUrl: row.afterImageUrl,
    linkUrl: row.linkUrl,
    keywords: row.keywords,
    reviewedAt: row.reviewedAt
      ? row.reviewedAt.toISOString()
      : null,
    sortOrder: row.sortOrder,
    doctors: row.doctors.map((link) => ({
      id: link.doctor.id,
      slug: link.doctor.slug,
      name: link.doctor.name,
      position: link.doctor.position,
      avatarUrl: imageUrl(link.doctor.images),
    })),
  }));
}
