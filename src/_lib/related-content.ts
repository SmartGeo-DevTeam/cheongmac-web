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

export async function getAdminDoctors(): Promise<RelatedDoctorSummary[]> {
  return prisma.doctor.findMany({
    orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
    select: doctorSelect,
  });
}

export async function getRelatedContentList(
  resource: RelatedContentResource,
  doctorId?: string,
): Promise<RelatedContentListItem[]> {
  switch (resource) {
    case 'specialties': {
      const rows = await prisma.doctorSpecialty.findMany({
        where: doctorId
          ? { doctors: { some: { doctorId } } }
          : undefined,
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
        include: {
          doctors: {
            orderBy: { sortOrder: 'asc' },
            include: { doctor: { select: doctorSelect } },
          },
        },
      });

      return rows.map((row) => ({
        id: row.id,
        title: row.name,
        summary: row.description ?? '',
        isVisible: row.isVisible,
        doctors: row.doctors.map((link) => doctorSummary(link.doctor)),
      }));
    }

    case 'schedules': {
      const rows = await prisma.doctorSchedule.findMany({
        where: doctorId
          ? { doctors: { some: { doctorId } } }
          : undefined,
        orderBy: [{ sortOrder: 'asc' }, { label: 'asc' }],
        include: {
          doctors: {
            orderBy: { sortOrder: 'asc' },
            include: { doctor: { select: doctorSelect } },
          },
        },
      });

      return rows.map((row) => ({
        id: row.id,
        title: row.label,
        summary: `월 ${row.mon} · 화 ${row.tue} · 수 ${row.wed} · 목 ${row.thu} · 금 ${row.fri} · 토 ${row.sat}`,
        isVisible: row.isVisible,
        doctors: row.doctors.map((link) => doctorSummary(link.doctor)),
      }));
    }

    case 'presentations': {
      const rows = await prisma.doctorPresentation.findMany({
        where: doctorId
          ? { doctors: { some: { doctorId } } }
          : undefined,
        orderBy: [{ sortOrder: 'asc' }, { presentedAt: 'desc' }],
        include: {
          doctors: {
            orderBy: { sortOrder: 'asc' },
            include: { doctor: { select: doctorSelect } },
          },
        },
      });

      return rows.map((row) => ({
        id: row.id,
        title: row.title,
        summary: [row.organization, dateInput(row.presentedAt)]
          .filter(Boolean)
          .join(' · '),
        isVisible: row.isVisible,
        doctors: row.doctors.map((link) => doctorSummary(link.doctor)),
      }));
    }

    case 'reviews': {
      const rows = await prisma.doctorReview.findMany({
        where: doctorId
          ? { doctors: { some: { doctorId } } }
          : undefined,
        orderBy: [{ sortOrder: 'asc' }, { reviewedAt: 'desc' }],
        include: {
          doctors: {
            orderBy: { sortOrder: 'asc' },
            include: { doctor: { select: doctorSelect } },
          },
        },
      });

      return rows.map((row) => ({
        id: row.id,
        title: row.patientName,
        summary: [row.treatment, dateInput(row.reviewedAt)]
          .filter(Boolean)
          .join(' · '),
        isVisible: row.isVisible,
        doctors: row.doctors.map((link) => doctorSummary(link.doctor)),
      }));
    }

    case 'media': {
      const rows = await prisma.doctorMedia.findMany({
        where: doctorId
          ? { doctors: { some: { doctorId } } }
          : undefined,
        orderBy: [
          { isFeatured: 'desc' },
          { sortOrder: 'asc' },
          { publishedAt: 'desc' },
        ],
        include: {
          doctors: {
            orderBy: { sortOrder: 'asc' },
            include: { doctor: { select: doctorSelect } },
          },
        },
      });

      return rows.map((row) => ({
        id: row.id,
        title: row.title,
        summary: [row.kind, row.source, dateInput(row.publishedAt)]
          .filter(Boolean)
          .join(' · '),
        isVisible: row.isVisible,
        doctors: row.doctors.map((link) => doctorSummary(link.doctor)),
      }));
    }

    case 'consultations': {
      const rows = await prisma.medicalConsultation.findMany({
        where: doctorId
          ? { doctors: { some: { doctorId } } }
          : undefined,
        orderBy: [{ publishedAt: 'desc' }, { sortOrder: 'asc' }, { id: 'desc' }],
        include: {
          doctors: {
            orderBy: { sortOrder: 'asc' },
            include: { doctor: { select: doctorSelect } },
          },
        },
      });

      return rows.map((row) => ({
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
      }));
    }
  }

  throw new Error(`지원하지 않는 관계형 콘텐츠 리소스입니다: ${resource}`);
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
