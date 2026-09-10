import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/_lib/prisma';
import {
  RELATED_CONTENT_META,
  type RelatedContentResource,
} from '@/_lib/related-content-types';

export type RelatedDoctorSummary = {
  id: string;
  name: string;
  position: string;
  department: string;
};

export type RelatedContentListItem = {
  id: string;
  title: string;
  summary: string;
  isVisible: boolean;
  doctors: RelatedDoctorSummary[];
};

export type RelatedContentPage = {
  items: RelatedContentListItem[];
  query: string;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type RelatedContentEditorData = {
  id: string | null;
  resource: RelatedContentResource;
  values: Record<string, string | number | boolean>;
  doctorIds: string[];
};

const doctorSelect = {
  id: true,
  name: true,
  position: true,
  department: true,
} satisfies Prisma.DoctorSelect;

function doctorSummary(
  doctor: Prisma.DoctorGetPayload<{ select: typeof doctorSelect }>,
): RelatedDoctorSummary {
  return doctor;
}

function dateInput(value: Date | null | undefined) {
  return value ? value.toISOString().slice(0, 10) : '';
}

function textArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

function normalizedPageSize(value?: number) {
  if (value === 20 || value === 50) return value;
  return 10;
}

function normalizedPage(value?: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.max(1, Math.trunc(value ?? 1));
}

function doctorKeywordWhere(query: string): Prisma.DoctorWhereInput {
  return {
    OR: [
      { name: { contains: query, mode: 'insensitive' } },
      { position: { contains: query, mode: 'insensitive' } },
      { department: { contains: query, mode: 'insensitive' } },
    ],
  };
}

function pageResult({
  items,
  query,
  page,
  pageSize,
  total,
}: {
  items: RelatedContentListItem[];
  query: string;
  page: number;
  pageSize: number;
  total: number;
}): RelatedContentPage {
  return {
    items,
    query,
    page,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getAdminDoctors(): Promise<RelatedDoctorSummary[]> {
  return prisma.doctor.findMany({
    orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
    select: doctorSelect,
  });
}

export async function getRelatedContentPage(
  resource: RelatedContentResource,
  {
    query: rawQuery = '',
    page: rawPage = 1,
    pageSize: rawPageSize = 10,
    doctorId,
  }: {
    query?: string;
    page?: number;
    pageSize?: number;
    doctorId?: string;
  } = {},
): Promise<RelatedContentPage> {
  const query = rawQuery.trim().slice(0, 120);
  const pageSize = normalizedPageSize(rawPageSize);
  const requestedPage = normalizedPage(rawPage);

  switch (resource) {
    case 'specialties': {
      const and: Prisma.DoctorSpecialtyWhereInput[] = [];

      if (doctorId) {
        and.push({ doctors: { some: { doctorId } } });
      }

      if (query) {
        and.push({
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            {
              doctors: {
                some: {
                  doctor: doctorKeywordWhere(query),
                },
              },
            },
          ],
        });
      }

      const where: Prisma.DoctorSpecialtyWhereInput | undefined =
        and.length ? { AND: and } : undefined;

      const total = await prisma.doctorSpecialty.count({ where });
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      const page = Math.min(requestedPage, totalPages);

      const rows = await prisma.doctorSpecialty.findMany({
        where,
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          doctors: {
            orderBy: { sortOrder: 'asc' },
            include: { doctor: { select: doctorSelect } },
          },
        },
      });

      return pageResult({
        query,
        page,
        pageSize,
        total,
        items: rows.map((row) => ({
          id: row.id,
          title: row.name,
          summary: row.description ?? '',
          isVisible: row.isVisible,
          doctors: row.doctors.map((link) => doctorSummary(link.doctor)),
        })),
      });
    }

    case 'schedules': {
      const and: Prisma.DoctorScheduleWhereInput[] = [];

      if (doctorId) {
        and.push({ doctors: { some: { doctorId } } });
      }

      if (query) {
        and.push({
          OR: [
            { label: { contains: query, mode: 'insensitive' } },
            { mon: { contains: query, mode: 'insensitive' } },
            { tue: { contains: query, mode: 'insensitive' } },
            { wed: { contains: query, mode: 'insensitive' } },
            { thu: { contains: query, mode: 'insensitive' } },
            { fri: { contains: query, mode: 'insensitive' } },
            { sat: { contains: query, mode: 'insensitive' } },
            {
              doctors: {
                some: {
                  doctor: doctorKeywordWhere(query),
                },
              },
            },
          ],
        });
      }

      const where: Prisma.DoctorScheduleWhereInput | undefined =
        and.length ? { AND: and } : undefined;

      const total = await prisma.doctorSchedule.count({ where });
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      const page = Math.min(requestedPage, totalPages);

      const rows = await prisma.doctorSchedule.findMany({
        where,
        orderBy: [{ sortOrder: 'asc' }, { label: 'asc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          doctors: {
            orderBy: { sortOrder: 'asc' },
            include: { doctor: { select: doctorSelect } },
          },
        },
      });

      return pageResult({
        query,
        page,
        pageSize,
        total,
        items: rows.map((row) => ({
          id: row.id,
          title: row.label,
          summary: `월 ${row.mon} · 화 ${row.tue} · 수 ${row.wed} · 목 ${row.thu} · 금 ${row.fri} · 토 ${row.sat}`,
          isVisible: row.isVisible,
          doctors: row.doctors.map((link) => doctorSummary(link.doctor)),
        })),
      });
    }

    case 'presentations': {
      const and: Prisma.DoctorPresentationWhereInput[] = [];

      if (doctorId) {
        and.push({ doctors: { some: { doctorId } } });
      }

      if (query) {
        and.push({
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { organization: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            {
              doctors: {
                some: {
                  doctor: doctorKeywordWhere(query),
                },
              },
            },
          ],
        });
      }

      const where: Prisma.DoctorPresentationWhereInput | undefined =
        and.length ? { AND: and } : undefined;

      const total = await prisma.doctorPresentation.count({ where });
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      const page = Math.min(requestedPage, totalPages);

      const rows = await prisma.doctorPresentation.findMany({
        where,
        orderBy: [{ sortOrder: 'asc' }, { presentedAt: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          doctors: {
            orderBy: { sortOrder: 'asc' },
            include: { doctor: { select: doctorSelect } },
          },
        },
      });

      return pageResult({
        query,
        page,
        pageSize,
        total,
        items: rows.map((row) => ({
          id: row.id,
          title: row.title,
          summary: [row.organization, dateInput(row.presentedAt)]
            .filter(Boolean)
            .join(' · '),
          isVisible: row.isVisible,
          doctors: row.doctors.map((link) => doctorSummary(link.doctor)),
        })),
      });
    }

    case 'reviews': {
      const and: Prisma.DoctorReviewWhereInput[] = [];

      if (doctorId) {
        and.push({ doctors: { some: { doctorId } } });
      }

      if (query) {
        and.push({
          OR: [
            { patientName: { contains: query, mode: 'insensitive' } },
            { gender: { contains: query, mode: 'insensitive' } },
            { treatment: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
            {
              doctors: {
                some: {
                  doctor: doctorKeywordWhere(query),
                },
              },
            },
          ],
        });
      }

      const where: Prisma.DoctorReviewWhereInput | undefined =
        and.length ? { AND: and } : undefined;

      const total = await prisma.doctorReview.count({ where });
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      const page = Math.min(requestedPage, totalPages);

      const rows = await prisma.doctorReview.findMany({
        where,
        orderBy: [{ sortOrder: 'asc' }, { reviewedAt: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          doctors: {
            orderBy: { sortOrder: 'asc' },
            include: { doctor: { select: doctorSelect } },
          },
        },
      });

      return pageResult({
        query,
        page,
        pageSize,
        total,
        items: rows.map((row) => ({
          id: row.id,
          title: row.patientName,
          summary: [row.treatment, dateInput(row.reviewedAt)]
            .filter(Boolean)
            .join(' · '),
          isVisible: row.isVisible,
          doctors: row.doctors.map((link) => doctorSummary(link.doctor)),
        })),
      });
    }

    case 'media': {
      const and: Prisma.DoctorMediaWhereInput[] = [];

      if (doctorId) {
        and.push({ doctors: { some: { doctorId } } });
      }

      if (query) {
        and.push({
          OR: [
            { kind: { contains: query, mode: 'insensitive' } },
            { title: { contains: query, mode: 'insensitive' } },
            { source: { contains: query, mode: 'insensitive' } },
            {
              doctors: {
                some: {
                  doctor: doctorKeywordWhere(query),
                },
              },
            },
          ],
        });
      }

      const where: Prisma.DoctorMediaWhereInput | undefined =
        and.length ? { AND: and } : undefined;

      const total = await prisma.doctorMedia.count({ where });
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      const page = Math.min(requestedPage, totalPages);

      const rows = await prisma.doctorMedia.findMany({
        where,
        orderBy: [
          { isFeatured: 'desc' },
          { sortOrder: 'asc' },
          { publishedAt: 'desc' },
        ],
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          doctors: {
            orderBy: { sortOrder: 'asc' },
            include: { doctor: { select: doctorSelect } },
          },
        },
      });

      return pageResult({
        query,
        page,
        pageSize,
        total,
        items: rows.map((row) => ({
          id: row.id,
          title: row.title,
          summary: [row.kind, row.source, dateInput(row.publishedAt)]
            .filter(Boolean)
            .join(' · '),
          isVisible: row.isVisible,
          doctors: row.doctors.map((link) => doctorSummary(link.doctor)),
        })),
      });
    }

    case 'consultations': {
      const and: Prisma.MedicalConsultationWhereInput[] = [];

      if (doctorId) {
        and.push({ doctors: { some: { doctorId } } });
      }

      if (query) {
        and.push({
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { categoryPrimary: { contains: query, mode: 'insensitive' } },
            { categorySecondary: { contains: query, mode: 'insensitive' } },
            {
              doctors: {
                some: {
                  doctor: doctorKeywordWhere(query),
                },
              },
            },
          ],
        });
      }

      const where: Prisma.MedicalConsultationWhereInput | undefined =
        and.length ? { AND: and } : undefined;

      const total = await prisma.medicalConsultation.count({ where });
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      const page = Math.min(requestedPage, totalPages);

      const rows = await prisma.medicalConsultation.findMany({
        where,
        orderBy: [{ publishedAt: 'desc' }, { sortOrder: 'asc' }, { id: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          doctors: {
            orderBy: { sortOrder: 'asc' },
            include: { doctor: { select: doctorSelect } },
          },
        },
      });

      return pageResult({
        query,
        page,
        pageSize,
        total,
        items: rows.map((row) => ({
          id: String(row.id),
          title: row.title,
          summary: [
            row.categoryPrimary,
            row.categorySecondary,
            dateInput(row.publishedAt),
          ]
            .filter(Boolean)
            .join(' · '),
          isVisible: row.isVisible,
          doctors: row.doctors.map((link) => doctorSummary(link.doctor)),
        })),
      });
    }
  }

  throw new Error(`지원하지 않는 관계형 콘텐츠 리소스입니다: ${resource}`);
}

export async function getRelatedContentList(
  resource: RelatedContentResource,
  doctorId?: string,
): Promise<RelatedContentListItem[]> {
  const page = await getRelatedContentPage(resource, {
    page: 1,
    pageSize: 50,
    doctorId,
  });

  return page.items;
}

export async function getRelatedContentEditorData(
  resource: RelatedContentResource,
  id: string,
): Promise<RelatedContentEditorData | null> {
  if (id === 'new') {
    return {
      id: null,
      resource,
      doctorIds: [],
      values: {
        isVisible: true,
        sortOrder: 0,
        ...(resource === 'media'
          ? { kind: 'VIDEO', linkUrl: '/', isFeatured: false }
          : {}),
        ...(resource === 'schedules'
          ? {
              label: '',
              mon: '진료',
              tue: '진료',
              wed: '진료',
              thu: '진료',
              fri: '진료',
              sat: '문의',
            }
          : {}),
        ...(resource === 'consultations'
          ? {
              categoryPrimary: '정맥',
              categorySecondary: '',
              isPrivate: false,
              hasLinkIcon: false,
              publishedAt: new Date().toISOString().slice(0, 10),
            }
          : {}),
      },
    };
  }

  switch (resource) {
    case 'specialties': {
      const row = await prisma.doctorSpecialty.findUnique({
        where: { id },
        include: { doctors: true },
      });
      if (!row) return null;

      return {
        id: row.id,
        resource,
        doctorIds: row.doctors.map((link) => link.doctorId),
        values: {
          name: row.name,
          description: row.description ?? '',
          sortOrder: row.sortOrder,
          isVisible: row.isVisible,
        },
      };
    }

    case 'schedules': {
      const row = await prisma.doctorSchedule.findUnique({
        where: { id },
        include: { doctors: true },
      });
      if (!row) return null;

      return {
        id: row.id,
        resource,
        doctorIds: row.doctors.map((link) => link.doctorId),
        values: {
          label: row.label,
          mon: row.mon,
          tue: row.tue,
          wed: row.wed,
          thu: row.thu,
          fri: row.fri,
          sat: row.sat,
          sortOrder: row.sortOrder,
          isVisible: row.isVisible,
        },
      };
    }

    case 'presentations': {
      const row = await prisma.doctorPresentation.findUnique({
        where: { id },
        include: { doctors: true },
      });
      if (!row) return null;

      return {
        id: row.id,
        resource,
        doctorIds: row.doctors.map((link) => link.doctorId),
        values: {
          title: row.title,
          organization: row.organization ?? '',
          description: row.description ?? '',
          imageUrl: row.imageUrl ?? '',
          linkUrl: row.linkUrl ?? '',
          presentedAt: dateInput(row.presentedAt),
          sortOrder: row.sortOrder,
          isVisible: row.isVisible,
        },
      };
    }

    case 'reviews': {
      const row = await prisma.doctorReview.findUnique({
        where: { id },
        include: { doctors: true },
      });
      if (!row) return null;

      return {
        id: row.id,
        resource,
        doctorIds: row.doctors.map((link) => link.doctorId),
        values: {
          patientName: row.patientName,
          age: row.age ?? '',
          gender: row.gender ?? '',
          treatment: row.treatment ?? '',
          content: row.content ?? '',
          imageUrl: row.imageUrl ?? '',
          reviewedAt: dateInput(row.reviewedAt),
          sortOrder: row.sortOrder,
          isVisible: row.isVisible,
        },
      };
    }

    case 'media': {
      const row = await prisma.doctorMedia.findUnique({
        where: { id },
        include: { doctors: true },
      });
      if (!row) return null;

      return {
        id: row.id,
        resource,
        doctorIds: row.doctors.map((link) => link.doctorId),
        values: {
          kind: row.kind,
          title: row.title,
          source: row.source ?? '',
          thumbnailUrl: row.thumbnailUrl ?? '',
          linkUrl: row.linkUrl,
          publishedAt: dateInput(row.publishedAt),
          isFeatured: row.isFeatured,
          sortOrder: row.sortOrder,
          isVisible: row.isVisible,
        },
      };
    }

    case 'consultations': {
      const numericId = Number(id);
      if (!Number.isInteger(numericId)) return null;

      const row = await prisma.medicalConsultation.findUnique({
        where: { id: numericId },
        include: { doctors: true },
      });
      if (!row) return null;

      return {
        id: String(row.id),
        resource,
        doctorIds: row.doctors.map((link) => link.doctorId),
        values: {
          categoryPrimary: row.categoryPrimary,
          categorySecondary: row.categorySecondary,
          title: row.title,
          questionText: textArray(row.question).join('\n'),
          imageUrl: row.imageUrl ?? '',
          isPrivate: row.isPrivate,
          hasLinkIcon: row.hasLinkIcon,
          answerText: textArray(row.answer).join('\n'),
          answerDate: dateInput(row.answerDate),
          publishedAt: dateInput(row.publishedAt),
          sortOrder: row.sortOrder,
          isVisible: row.isVisible,
        },
      };
    }
  }

  throw new Error(`지원하지 않는 관계형 콘텐츠 리소스입니다: ${resource}`);
}

export function relatedContentTitle(resource: RelatedContentResource) {
  return RELATED_CONTENT_META[resource].label;
}
