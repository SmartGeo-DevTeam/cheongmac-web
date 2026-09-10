'use server';

import { uploadPrivateFormAttachment } from '@/_lib/private-form-storage';
import { prisma } from '@/_lib/prisma';
import { randomBytes, scryptSync } from 'node:crypto';

export type MedicalConsultationSubmitResult = {
  ok: boolean;
  error?: string;
  id?: number;
  isPrivate?: boolean;
};

function clean(value: FormDataEntryValue | null, max: number) {
  return typeof value === 'string'
    ? value.trim().slice(0, max)
    : '';
}

function hashPostPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 32).toString('hex');
  return `${salt}:${hash}`;
}

export async function submitMedicalConsultation(
  formData: FormData,
): Promise<MedicalConsultationSubmitResult> {
  const visibility = clean(formData.get('visibility'), 20);
  const categoryPrimary = clean(formData.get('consultationArea'), 100);
  const categorySecondary = clean(formData.get('consultationDisease'), 100);
  const title = clean(formData.get('title'), 300);
  const content = clean(formData.get('content'), 2000);
  const phoneConsult = clean(formData.get('phoneConsult'), 10);
  const patientName = clean(formData.get('patientName'), 80);
  const phonePrefix = clean(formData.get('phonePrefix'), 4);
  const phoneMiddle = clean(formData.get('phoneMiddle'), 4);
  const phoneLast = clean(formData.get('phoneLast'), 4);
  const birthDate = clean(formData.get('birthDate'), 6);
  const captcha = clean(formData.get('captcha'), 10);
  const postPassword = clean(formData.get('postPassword'), 4);

  if (!categoryPrimary || !title || !content || !patientName) {
    return { ok: false, error: '필수 입력 항목을 확인해주세요.' };
  }

  if (!/^\d{3,4}$/.test(phoneMiddle) || !/^\d{4}$/.test(phoneLast)) {
    return { ok: false, error: '연락처를 확인해주세요.' };
  }

  if (!/^\d{6}$/.test(birthDate)) {
    return { ok: false, error: '생년월일 6자리를 확인해주세요.' };
  }

  if (!/^\d{4}$/.test(postPassword)) {
    return { ok: false, error: '게시글 비밀번호 4자리를 확인해주세요.' };
  }

  if (captcha !== '49180') {
    return { ok: false, error: '자동입력방지 숫자를 확인해주세요.' };
  }

  let attachmentName: string | null = null;
  let attachmentUrl: string | null = null;
  const attachment = formData.get('attachment');

  if (attachment instanceof File && attachment.size > 0) {
    attachmentName = attachment.name.slice(0, 255);

    try {
      attachmentUrl = await uploadPrivateFormAttachment(
        attachment,
        'medical-consultation',
      );
    } catch (error) {
      return {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : '첨부파일 저장에 실패했습니다.',
      };
    }
  }

  const question = content
    .split(/\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const created = await prisma.medicalConsultation.create({
    data: {
      categoryPrimary,
      categorySecondary,
      title,
      question,
      imageUrl: null,
      isPrivate: visibility === 'private',
      hasLinkIcon: false,
      answerDate: null,
      publishedAt: new Date(),
      isVisible: visibility !== 'private',
      sortOrder: 0,
      patientName,
      phone: `${phonePrefix}-${phoneMiddle}-${phoneLast}`,
      birthDate,
      phoneConsultRequested: phoneConsult === 'yes',
      postPasswordHash: hashPostPassword(postPassword),
      attachmentName,
      attachmentUrl,
    },
    select: { id: true },
  });

  return {
    ok: true,
    id: created.id,
    isPrivate: visibility === 'private',
  };
}
