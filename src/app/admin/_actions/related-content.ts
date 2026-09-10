'use server';

import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import { prisma } from '@/_lib/prisma';
import {
  RELATED_CONTENT_META,
  type RelatedContentResource,
} from '@/_lib/related-content-types';
import { canEditContent } from '@/_lib/roles';
import { Prisma } from '@/generated/prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function getEditor() {
  const session = await getCurrentSession();

  if (
    !session ||
    !isActiveMember(session) ||
    !canEditContent(session.user.role)
  ) {
    return null;
  }

  return session.user;
}

function clean(value: FormDataEntryValue | null, max = 5000) {
  return typeof value === 'string'
    ? value.trim().slice(0, max)
    : '';
}

function optional(value: FormDataEntryValue | null, max = 5000) {
  const result = clean(value, max);
  return result || null;
}

function integer(value: FormDataEntryValue | null, fallback = 0) {
  const parsed = Number.parseInt(clean(value, 20), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function dateValue(value: FormDataEntryValue | null) {
  const date = clean(value, 20);
  if (!date) return null;

  const parsed = new Date(`${date}T00:00:00+09:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function lines(value: FormDataEntryValue | null) {
  return clean(value, 20000)
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 200);
}

function checkbox(formData: FormData, name: string) {
  return formData.get(name) === 'on';
}

function relatedDoctors(formData: FormData) {
  return Array.from(
    new Set(
      formData
        .getAll('doctorIds')
        .filter((value): value is string => typeof value === 'string')
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  );
}

async function validateDoctors(
  tx: Prisma.TransactionClient,
  doctorIds: string[],
) {
  if (!doctorIds.length) return [];

  const doctors = await tx.doctor.findMany({
    where: { id: { in: doctorIds } },
    select: { id: true },
  });

  return doctors.map((doctor) => doctor.id);
}

async function audit(
  tx: Prisma.TransactionClient,
  actorId: string,
  action: string,
  targetType: string,
  targetId: string,
  metadata?: Prisma.InputJsonValue,
) {
  await tx.adminAuditLog.create({
    data: {
      actorId,
      action,
      targetType,
      targetId,
      metadata,
    },
  });
}

function refreshRelatedContent(resource: RelatedContentResource) {
  revalidatePath(RELATED_CONTENT_META[resource].href);
  revalidatePath('/admin/doctors');
  revalidatePath('/about/doctors', 'layout');

  if (resource === 'consultations') {
    revalidatePath('/community/consultation', 'layout');
  }
}

export async function saveRelatedContent(
  resource: RelatedContentResource,
  id: string,
  formData: FormData,
): Promise<void> {
  const actor = await getEditor();
  if (!actor) throw new Error('콘텐츠 DB를 관리할 권한이 없습니다.');

  const doctorIds = relatedDoctors(formData);

  const savedId = await prisma.$transaction(async (tx) => {
    const validDoctorIds = await validateDoctors(tx, doctorIds);

    switch (resource) {
      case 'specialties': {
        const name = clean(formData.get('name'), 120);
        if (!name) throw new Error('진료분야명을 입력해주세요.');

        const data = {
          name,
          description: optional(formData.get('description'), 4000),
          sortOrder: Math.max(0, integer(formData.get('sortOrder'))),
          isVisible: checkbox(formData, 'isVisible'),
        };

        const entity =
          id === 'new'
            ? await tx.doctorSpecialty.create({ data })
            : await tx.doctorSpecialty.update({
                where: { id },
                data,
              });

        await tx.doctorSpecialtyDoctor.deleteMany({
          where: { specialtyId: entity.id },
        });
        if (validDoctorIds.length) {
          await tx.doctorSpecialtyDoctor.createMany({
            data: validDoctorIds.map((doctorId, sortOrder) => ({
              specialtyId: entity.id,
              doctorId,
              sortOrder,
            })),
          });
        }

        await audit(
          tx,
          actor.id,
          id === 'new' ? 'SPECIALTY_CREATE' : 'SPECIALTY_UPDATE',
          'DoctorSpecialty',
          entity.id,
          { name, doctorIds: validDoctorIds },
        );
        return entity.id;
      }

      case 'schedules': {
        const label = clean(formData.get('label'), 60);
        if (!label) throw new Error('진료시간표 이름을 입력해주세요.');

        const data = {
          label,
          mon: clean(formData.get('mon'), 20) || '문의',
          tue: clean(formData.get('tue'), 20) || '문의',
          wed: clean(formData.get('wed'), 20) || '문의',
          thu: clean(formData.get('thu'), 20) || '문의',
          fri: clean(formData.get('fri'), 20) || '문의',
          sat: clean(formData.get('sat'), 20) || '문의',
          sortOrder: Math.max(0, integer(formData.get('sortOrder'))),
          isVisible: checkbox(formData, 'isVisible'),
        };

        const entity =
          id === 'new'
            ? await tx.doctorSchedule.create({ data })
            : await tx.doctorSchedule.update({ where: { id }, data });

        await tx.doctorScheduleDoctor.deleteMany({
          where: { scheduleId: entity.id },
        });
        if (validDoctorIds.length) {
          await tx.doctorScheduleDoctor.createMany({
            data: validDoctorIds.map((doctorId, sortOrder) => ({
              scheduleId: entity.id,
              doctorId,
              sortOrder,
            })),
          });
        }

        await audit(
          tx,
          actor.id,
          id === 'new' ? 'SCHEDULE_CREATE' : 'SCHEDULE_UPDATE',
          'DoctorSchedule',
          entity.id,
          { label, doctorIds: validDoctorIds },
        );
        return entity.id;
      }

      case 'presentations': {
        const title = clean(formData.get('title'), 300);
        if (!title) throw new Error('발표/논문 제목을 입력해주세요.');

        const data = {
          title,
          organization: optional(formData.get('organization'), 200),
          description: optional(formData.get('description'), 8000),
          imageUrl: optional(formData.get('imageUrl'), 1000),
          linkUrl: optional(formData.get('linkUrl'), 1000),
          presentedAt: dateValue(formData.get('presentedAt')),
          sortOrder: Math.max(0, integer(formData.get('sortOrder'))),
          isVisible: checkbox(formData, 'isVisible'),
        };

        const entity =
          id === 'new'
            ? await tx.doctorPresentation.create({ data })
            : await tx.doctorPresentation.update({ where: { id }, data });

        await tx.doctorPresentationDoctor.deleteMany({
          where: { presentationId: entity.id },
        });
        if (validDoctorIds.length) {
          await tx.doctorPresentationDoctor.createMany({
            data: validDoctorIds.map((doctorId, sortOrder) => ({
              presentationId: entity.id,
              doctorId,
              sortOrder,
            })),
          });
        }

        await audit(
          tx,
          actor.id,
          id === 'new' ? 'PRESENTATION_CREATE' : 'PRESENTATION_UPDATE',
          'DoctorPresentation',
          entity.id,
          { title, doctorIds: validDoctorIds },
        );
        return entity.id;
      }

      case 'reviews': {
        const patientName = clean(formData.get('patientName'), 120);
        if (!patientName) throw new Error('환자명을 입력해주세요.');

        const ageRaw = integer(formData.get('age'), -1);
        const data = {
          patientName,
          age: ageRaw >= 0 && ageRaw <= 130 ? ageRaw : null,
          gender: optional(formData.get('gender'), 30),
          treatment: optional(formData.get('treatment'), 500),
          content: optional(formData.get('content'), 10000),
          imageUrl: optional(formData.get('imageUrl'), 1000),
          reviewedAt: dateValue(formData.get('reviewedAt')),
          sortOrder: Math.max(0, integer(formData.get('sortOrder'))),
          isVisible: checkbox(formData, 'isVisible'),
        };

        const entity =
          id === 'new'
            ? await tx.doctorReview.create({ data })
            : await tx.doctorReview.update({ where: { id }, data });

        await tx.doctorReviewDoctor.deleteMany({
          where: { reviewId: entity.id },
        });
        if (validDoctorIds.length) {
          await tx.doctorReviewDoctor.createMany({
            data: validDoctorIds.map((doctorId, sortOrder) => ({
              reviewId: entity.id,
              doctorId,
              sortOrder,
            })),
          });
        }

        await audit(
          tx,
          actor.id,
          id === 'new' ? 'REVIEW_CREATE' : 'REVIEW_UPDATE',
          'DoctorReview',
          entity.id,
          { patientName, doctorIds: validDoctorIds },
        );
        return entity.id;
      }

      case 'media': {
        const title = clean(formData.get('title'), 300);
        if (!title) throw new Error('미디어 제목을 입력해주세요.');

        const data = {
          kind: clean(formData.get('kind'), 50) || 'VIDEO',
          title,
          source: optional(formData.get('source'), 200),
          thumbnailUrl: optional(formData.get('thumbnailUrl'), 1000),
          linkUrl: clean(formData.get('linkUrl'), 1000) || '/',
          publishedAt: dateValue(formData.get('publishedAt')),
          isFeatured: checkbox(formData, 'isFeatured'),
          sortOrder: Math.max(0, integer(formData.get('sortOrder'))),
          isVisible: checkbox(formData, 'isVisible'),
        };

        const entity =
          id === 'new'
            ? await tx.doctorMedia.create({ data })
            : await tx.doctorMedia.update({ where: { id }, data });

        const currentLinks = await tx.doctorMediaDoctor.findMany({
          where: { mediaId: entity.id },
          orderBy: { sortOrder: 'asc' },
          select: { doctorId: true },
        });

        await audit(
          tx,
          actor.id,
          id === 'new' ? 'MEDIA_CREATE' : 'MEDIA_UPDATE',
          'DoctorMedia',
          entity.id,
          {
            title,
            doctorIds: currentLinks.map((link) => link.doctorId),
          },
        );
        return entity.id;
      }

      case 'consultations': {
        const title = clean(formData.get('title'), 300);
        const question = lines(formData.get('questionText'));
        const answer = lines(formData.get('answerText'));

        if (!title || !question.length) {
          throw new Error('상담 제목과 질문 내용을 입력해주세요.');
        }

        const data = {
          categoryPrimary:
            clean(formData.get('categoryPrimary'), 100) || '기타',
          categorySecondary: clean(
            formData.get('categorySecondary'),
            100,
          ),
          title,
          question,
          imageUrl: optional(formData.get('imageUrl'), 1000),
          isPrivate: checkbox(formData, 'isPrivate'),
          hasLinkIcon: checkbox(formData, 'hasLinkIcon'),
          answer: answer.length ? answer : Prisma.DbNull,
          answerDate: dateValue(formData.get('answerDate')),
          publishedAt: dateValue(formData.get('publishedAt')) ?? new Date(),
          sortOrder: Math.max(0, integer(formData.get('sortOrder'))),
          isVisible: checkbox(formData, 'isVisible'),
        };

        const numericId = Number(id);
        const entity =
          id === 'new'
            ? await tx.medicalConsultation.create({ data })
            : await tx.medicalConsultation.update({
                where: { id: numericId },
                data,
              });

        await tx.medicalConsultationDoctor.deleteMany({
          where: { consultationId: entity.id },
        });
        if (validDoctorIds.length) {
          await tx.medicalConsultationDoctor.createMany({
            data: validDoctorIds.map((doctorId, sortOrder) => ({
              consultationId: entity.id,
              doctorId,
              sortOrder,
            })),
          });
        }

        await audit(
          tx,
          actor.id,
          id === 'new' ? 'CONSULTATION_CREATE' : 'CONSULTATION_UPDATE',
          'MedicalConsultation',
          String(entity.id),
          { title, doctorIds: validDoctorIds },
        );
        return String(entity.id);
      }
    }

    throw new Error(`지원하지 않는 관계형 콘텐츠 리소스입니다: ${resource}`);
  });

  refreshRelatedContent(resource);
  revalidatePath(`${RELATED_CONTENT_META[resource].href}/${savedId}`);
  redirect(RELATED_CONTENT_META[resource].href);
}

export async function deleteRelatedContent(
  resource: RelatedContentResource,
  id: string,
): Promise<void> {
  const actor = await getEditor();
  if (!actor) throw new Error('콘텐츠 DB를 관리할 권한이 없습니다.');

  await prisma.$transaction(async (tx) => {
    switch (resource) {
      case 'specialties':
        await tx.doctorSpecialty.delete({ where: { id } });
        break;
      case 'schedules':
        await tx.doctorSchedule.delete({ where: { id } });
        break;
      case 'presentations':
        await tx.doctorPresentation.delete({ where: { id } });
        break;
      case 'reviews':
        await tx.doctorReview.delete({ where: { id } });
        break;
      case 'media':
        await tx.doctorMedia.delete({ where: { id } });
        break;
      case 'consultations':
        await tx.medicalConsultation.delete({
          where: { id: Number(id) },
        });
        break;
    }

    await audit(
      tx,
      actor.id,
      'RELATED_CONTENT_DELETE',
      resource,
      id,
    );
  });

  refreshRelatedContent(resource);
  redirect(RELATED_CONTENT_META[resource].href);
}
