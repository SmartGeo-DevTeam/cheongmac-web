'use server';

import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import { DOCTOR_IMAGE_KINDS, type DoctorImageKind } from '@/_lib/doctors';
import { prisma } from '@/_lib/prisma';
import { canEditContent } from '@/_lib/roles';
import { Prisma } from '@/generated/prisma/client';
import { revalidatePath } from 'next/cache';

export type DoctorAdminImage = {
  kind: DoctorImageKind;
  url: string;
  alt: string;
};

export type DoctorAdminSpecialty = {
  name: string;
  description: string;
  isVisible: boolean;
};

export type DoctorAdminCareer = {
  kind: 'EDUCATION' | 'CAREER';
  content: string;
  isVisible: boolean;
};

export type DoctorAdminSchedule = {
  label: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
};

export type DoctorAdminPresentation = {
  title: string;
  organization: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  presentedAt: string;
  isVisible: boolean;
};

export type DoctorAdminReview = {
  patientName: string;
  age: string;
  gender: string;
  treatment: string;
  content: string;
  imageUrl: string;
  reviewedAt: string;
  isVisible: boolean;
};

export type DoctorAdminMedia = {
  kind: string;
  title: string;
  source: string;
  thumbnailUrl: string;
  linkUrl: string;
  publishedAt: string;
  isFeatured: boolean;
  isVisible: boolean;
};

export type DoctorAdminConsultation = {
  id?: number;
  categoryPrimary: string;
  categorySecondary: string;
  title: string;
  questionText: string;
  imageUrl: string;
  isPrivate: boolean;
  hasLinkIcon: boolean;
  answerText: string;
  answerDate: string;
  publishedAt: string;
  isVisible: boolean;
};

export type DoctorAdminPayload = {
  id: string;
  slug: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  reservationHref: string;
  displayOrder: number;
  isVisible: boolean;
  images: DoctorAdminImage[];
  specialties: DoctorAdminSpecialty[];
  careers: DoctorAdminCareer[];
  schedules: DoctorAdminSchedule[];
  presentations: DoctorAdminPresentation[];
  reviews: DoctorAdminReview[];
  media: DoctorAdminMedia[];
  consultations: DoctorAdminConsultation[];
};

export type DoctorActionResult = {
  ok: boolean;
  error?: string;
  success?: string;
  doctorId?: string;
  url?: string;
};

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

function clean(value: string, max = 5000) {
  return value.trim().slice(0, max);
}

function optional(value: string, max = 5000) {
  const result = clean(value, max);
  return result || null;
}

function validHref(value: string) {
  const href = clean(value, 500);
  if (!href) return '/';
  if (href.startsWith('/')) return href;
  if (/^https?:\/\//i.test(href)) return href;
  return null;
}

function validSlug(value: string) {
  const slug = clean(value, 120).toLowerCase();
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? slug : null;
}

function dateValue(value: string) {
  const date = clean(value, 20);
  if (!date) return null;

  const parsed = new Date(`${date}T00:00:00+09:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function lines(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 100);
}

function numericAge(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed >= 0 && parsed <= 130
    ? parsed
    : null;
}

function normalizeStatus(value: string) {
  const status = clean(value, 20);
  return status || '문의';
}

function relationId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

export async function createDoctor(input: {
  slug: string;
  name: string;
  position: string;
  department: string;
}): Promise<DoctorActionResult> {
  const actor = await getEditor();
  if (!actor) return { ok: false, error: '의료진을 관리할 권한이 없습니다.' };

  const slug = validSlug(input.slug);
  const name = clean(input.name, 80);
  const position = clean(input.position, 80);
  const department = clean(input.department, 120);

  if (!slug) {
    return {
      ok: false,
      error: 'slug는 영문 소문자, 숫자, 하이픈(-)만 사용할 수 있습니다.',
    };
  }

  if (!name || !position || !department) {
    return { ok: false, error: '성명, 직책, 진료과를 모두 입력해주세요.' };
  }

  const exists = await prisma.doctor.findUnique({ where: { slug } });
  if (exists) return { ok: false, error: '이미 사용 중인 slug입니다.' };

  const maxOrder = await prisma.doctor.aggregate({
    _max: { displayOrder: true },
  });

  const created = await prisma.$transaction(async (tx) => {
    const doctor = await tx.doctor.create({
      data: {
        slug,
        name,
        position,
        department,
        reservationHref: '/',
        displayOrder: (maxOrder._max.displayOrder ?? -1) + 1,
        isVisible: false,
      },
    });

    await tx.doctorImage.createMany({
      data: DOCTOR_IMAGE_KINDS.map((kind, index) => ({
        id: relationId(`doctor-image-${kind.toLowerCase()}`),
        doctorId: doctor.id,
        kind,
        url: '',
        alt: `${name} ${kind}`,
        sortOrder: index,
      })),
    });

    await tx.adminAuditLog.create({
      data: {
        actorId: actor.id,
        action: 'DOCTOR_CREATE',
        targetType: 'Doctor',
        targetId: doctor.id,
        metadata: { slug, name },
      },
    });

    return doctor;
  });

  revalidatePath('/admin/doctors');
  return {
    ok: true,
    success: '의료진을 추가했습니다. 상세 정보를 입력해주세요.',
    doctorId: created.id,
  };
}

export async function saveDoctor(
  input: DoctorAdminPayload,
): Promise<DoctorActionResult> {
  const actor = await getEditor();
  if (!actor) return { ok: false, error: '의료진을 관리할 권한이 없습니다.' };

  const slug = validSlug(input.slug);
  const name = clean(input.name, 80);
  const position = clean(input.position, 80);
  const department = clean(input.department, 120);
  const reservationHref = validHref(input.reservationHref);

  if (!slug || !name || !position || !department || !reservationHref) {
    return {
      ok: false,
      error: '기본정보의 slug, 성명, 직책, 진료과, 예약 링크를 확인해주세요.',
    };
  }

  const current = await prisma.doctor.findUnique({
    where: { id: input.id },
    select: { id: true, slug: true, name: true },
  });

  if (!current) return { ok: false, error: '의료진을 찾을 수 없습니다.' };

  const slugOwner = await prisma.doctor.findUnique({ where: { slug } });
  if (slugOwner && slugOwner.id !== input.id) {
    return { ok: false, error: '이미 다른 의료진이 사용 중인 slug입니다.' };
  }

  await prisma.$transaction(async (tx) => {
    await tx.doctor.update({
      where: { id: input.id },
      data: {
        slug,
        name,
        position,
        department,
        bio: optional(input.bio, 10000),
        reservationHref,
        displayOrder: Number.isFinite(input.displayOrder)
          ? Math.max(0, Math.trunc(input.displayOrder))
          : 0,
        isVisible: input.isVisible,
      },
    });

    for (const [index, kind] of DOCTOR_IMAGE_KINDS.entries()) {
      const image = input.images.find((item) => item.kind === kind);
      const url = clean(image?.url ?? '', 1000);
      const alt = clean(image?.alt ?? `${name} ${kind}`, 200);

      await tx.doctorImage.upsert({
        where: {
          doctorId_kind: {
            doctorId: input.id,
            kind,
          },
        },
        create: {
          id: relationId(`doctor-image-${kind.toLowerCase()}`),
          doctorId: input.id,
          kind,
          url,
          alt,
          sortOrder: index,
        },
        update: {
          url,
          alt,
          sortOrder: index,
        },
      });
    }

    await tx.doctorSpecialty.deleteMany({ where: { doctorId: input.id } });
    for (const [index, item] of input.specialties.entries()) {
      const specialtyName = clean(item.name, 120);
      if (!specialtyName) continue;

      await tx.doctorSpecialty.create({
        data: {
          id: relationId('doctor-specialty'),
          doctorId: input.id,
          name: specialtyName,
          description: optional(item.description, 2000),
          sortOrder: index,
          isVisible: item.isVisible,
        },
      });
    }

    await tx.doctorCareer.deleteMany({ where: { doctorId: input.id } });
    for (const [index, item] of input.careers.entries()) {
      const content = clean(item.content, 3000);
      if (!content) continue;

      await tx.doctorCareer.create({
        data: {
          id: relationId('doctor-career'),
          doctorId: input.id,
          kind: item.kind === 'EDUCATION' ? 'EDUCATION' : 'CAREER',
          content,
          sortOrder: index,
          isVisible: item.isVisible,
        },
      });
    }

    await tx.doctorSchedule.deleteMany({ where: { doctorId: input.id } });
    for (const [index, item] of input.schedules.entries()) {
      const label = clean(item.label, 30);
      if (!label) continue;

      await tx.doctorSchedule.create({
        data: {
          id: relationId('doctor-schedule'),
          doctorId: input.id,
          label,
          mon: normalizeStatus(item.mon),
          tue: normalizeStatus(item.tue),
          wed: normalizeStatus(item.wed),
          thu: normalizeStatus(item.thu),
          fri: normalizeStatus(item.fri),
          sat: normalizeStatus(item.sat),
          sortOrder: index,
        },
      });
    }

    await tx.doctorPresentation.deleteMany({ where: { doctorId: input.id } });
    for (const [index, item] of input.presentations.entries()) {
      const title = clean(item.title, 300);
      if (!title) continue;

      await tx.doctorPresentation.create({
        data: {
          id: relationId('doctor-presentation'),
          doctorId: input.id,
          title,
          organization: optional(item.organization, 200),
          description: optional(item.description, 5000),
          imageUrl: optional(item.imageUrl, 1000),
          linkUrl: optional(item.linkUrl, 1000),
          presentedAt: dateValue(item.presentedAt),
          sortOrder: index,
          isVisible: item.isVisible,
        },
      });
    }

    await tx.doctorReview.deleteMany({ where: { doctorId: input.id } });
    for (const [index, item] of input.reviews.entries()) {
      const patientName = clean(item.patientName, 120);
      if (!patientName) continue;

      await tx.doctorReview.create({
        data: {
          id: relationId('doctor-review'),
          doctorId: input.id,
          patientName,
          age: numericAge(item.age),
          gender: optional(item.gender, 30),
          treatment: optional(item.treatment, 500),
          content: optional(item.content, 5000),
          imageUrl: optional(item.imageUrl, 1000),
          reviewedAt: dateValue(item.reviewedAt),
          sortOrder: index,
          isVisible: item.isVisible,
        },
      });
    }

    await tx.doctorMedia.deleteMany({ where: { doctorId: input.id } });
    for (const [index, item] of input.media.entries()) {
      const title = clean(item.title, 300);
      if (!title) continue;

      await tx.doctorMedia.create({
        data: {
          id: relationId('doctor-media'),
          doctorId: input.id,
          kind: clean(item.kind, 50) || 'VIDEO',
          title,
          source: optional(item.source, 200),
          thumbnailUrl: optional(item.thumbnailUrl, 1000),
          linkUrl: validHref(item.linkUrl) ?? '/',
          publishedAt: dateValue(item.publishedAt),
          isFeatured: item.isFeatured,
          sortOrder: index,
          isVisible: item.isVisible,
        },
      });
    }

    const submittedIds = input.consultations
      .map((item) => item.id)
      .filter((id): id is number => Number.isInteger(id));

    await tx.medicalConsultation.deleteMany({
      where: {
        doctorId: input.id,
        ...(submittedIds.length ? { id: { notIn: submittedIds } } : {}),
      },
    });

    for (const [index, item] of input.consultations.entries()) {
      const questionLines = lines(item.questionText);
      const answerLines = lines(item.answerText);
      const data = {
        doctorId: input.id,
        categoryPrimary: clean(item.categoryPrimary, 100) || '기타',
        categorySecondary: clean(item.categorySecondary, 100),
        title: clean(item.title, 300),
        question: questionLines,
        imageUrl: optional(item.imageUrl, 1000),
        isPrivate: item.isPrivate,
        hasLinkIcon: item.hasLinkIcon,
        answer: answerLines.length ? answerLines : Prisma.DbNull,
        answerDate: dateValue(item.answerDate),
        publishedAt: dateValue(item.publishedAt) ?? new Date(),
        isVisible: item.isVisible,
        sortOrder: index,
      };

      if (!data.title || !questionLines.length) continue;

      if (item.id) {
        const owned = await tx.medicalConsultation.findFirst({
          where: { id: item.id, doctorId: input.id },
          select: { id: true },
        });

        if (owned) {
          await tx.medicalConsultation.update({
            where: { id: item.id },
            data,
          });
          continue;
        }
      }

      await tx.medicalConsultation.create({ data });
    }

    await tx.adminAuditLog.create({
      data: {
        actorId: actor.id,
        action: 'DOCTOR_UPDATE',
        targetType: 'Doctor',
        targetId: input.id,
        metadata: {
          before: { slug: current.slug, name: current.name },
          after: {
            slug,
            name,
            specialties: input.specialties.length,
            careers: input.careers.length,
            presentations: input.presentations.length,
            reviews: input.reviews.length,
            media: input.media.length,
            consultations: input.consultations.length,
          },
        },
      },
    });
  });

  revalidatePath('/about/doctors');
  revalidatePath(`/about/doctors/${slug}`);
  if (current.slug !== slug) revalidatePath(`/about/doctors/${current.slug}`);
  revalidatePath('/community/consultation');
  revalidatePath('/admin/doctors');
  revalidatePath(`/admin/doctors/${input.id}`);

  return { ok: true, success: '의료진 정보를 저장했습니다.' };
}

async function storageRequest(
  url: string,
  serviceRoleKey: string,
  path: string,
  init: RequestInit = {},
) {
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${serviceRoleKey}`);
  headers.set('apikey', serviceRoleKey);

  return fetch(`${url.replace(/\/$/, '')}/storage/v1${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  });
}

async function ensureDoctorBucket(
  url: string,
  serviceRoleKey: string,
  bucket: string,
) {
  const existing = await storageRequest(
    url,
    serviceRoleKey,
    `/bucket/${encodeURIComponent(bucket)}`,
    { method: 'GET' },
  );

  if (existing.ok) return true;

  const created = await storageRequest(url, serviceRoleKey, '/bucket', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: bucket,
      name: bucket,
      public: true,
      file_size_limit: 10485760,
      allowed_mime_types: [
        'image/png',
        'image/jpeg',
        'image/webp',
        'image/gif',
      ],
    }),
  });

  return created.ok || created.status === 409;
}

export async function uploadDoctorImage(
  doctorId: string,
  kind: DoctorImageKind,
  formData: FormData,
): Promise<DoctorActionResult> {
  const actor = await getEditor();
  if (!actor) return { ok: false, error: '의료진 이미지를 수정할 권한이 없습니다.' };

  if (!DOCTOR_IMAGE_KINDS.includes(kind)) {
    return { ok: false, error: '지원하지 않는 이미지 종류입니다.' };
  }

  const file = formData.get('file');
  if (!(file instanceof File) || file.size <= 0) {
    return { ok: false, error: '업로드할 이미지 파일을 선택해주세요.' };
  }

  if (file.size > 10 * 1024 * 1024) {
    return { ok: false, error: '이미지는 10MB 이하만 업로드할 수 있습니다.' };
  }

  const allowed = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
  if (!allowed.includes(file.type)) {
    return { ok: false, error: 'PNG, JPG, WEBP, GIF 파일만 업로드할 수 있습니다.' };
  }

  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: { id: true, slug: true, name: true },
  });
  if (!doctor) return { ok: false, error: '의료진을 찾을 수 없습니다.' };

  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const bucket =
    process.env.SUPABASE_DOCTOR_MEDIA_BUCKET?.trim() || 'doctor-media';

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      ok: false,
      error:
        '파일 업로드를 사용하려면 SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY를 .env에 설정해주세요. URL 직접 입력은 지금도 사용할 수 있습니다.',
    };
  }

  const bucketReady = await ensureDoctorBucket(
    supabaseUrl,
    serviceRoleKey,
    bucket,
  );

  if (!bucketReady) {
    return { ok: false, error: 'Supabase Storage 버킷을 준비하지 못했습니다.' };
  }

  const extension =
    file.name.split('.').pop()?.replace(/[^a-z0-9]/gi, '').toLowerCase() ||
    (file.type === 'image/gif' ? 'gif' : 'png');
  const objectPath = `doctors/${doctor.slug}/${kind.toLowerCase()}-${Date.now()}.${extension}`;

  const upload = await storageRequest(
    supabaseUrl,
    serviceRoleKey,
    `/object/${encodeURIComponent(bucket)}/${objectPath
      .split('/')
      .map(encodeURIComponent)
      .join('/')}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': file.type,
        'x-upsert': 'true',
      },
      body: file,
    },
  );

  if (!upload.ok) {
    const message = await upload.text().catch(() => '');
    return {
      ok: false,
      error: `이미지 업로드에 실패했습니다.${message ? ` ${message.slice(0, 180)}` : ''}`,
    };
  }

  const publicUrl = `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/public/${bucket}/${objectPath}`;

  await prisma.$transaction(async (tx) => {
    await tx.doctorImage.upsert({
      where: {
        doctorId_kind: {
          doctorId,
          kind,
        },
      },
      create: {
        id: relationId(`doctor-image-${kind.toLowerCase()}`),
        doctorId,
        kind,
        url: publicUrl,
        alt: `${doctor.name} ${kind}`,
        sortOrder: DOCTOR_IMAGE_KINDS.indexOf(kind),
      },
      update: {
        url: publicUrl,
      },
    });

    await tx.adminAuditLog.create({
      data: {
        actorId: actor.id,
        action: 'DOCTOR_IMAGE_UPLOAD',
        targetType: 'DoctorImage',
        targetId: `${doctorId}:${kind}`,
        metadata: {
          doctorId,
          kind,
          url: publicUrl,
        },
      },
    });
  });

  revalidatePath('/about/doctors');
  revalidatePath(`/about/doctors/${doctor.slug}`);
  revalidatePath(`/admin/doctors/${doctorId}`);

  return {
    ok: true,
    success: '이미지를 업로드했습니다.',
    url: publicUrl,
  };
}
