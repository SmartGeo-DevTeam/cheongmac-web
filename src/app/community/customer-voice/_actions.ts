'use server';

import { uploadPrivateFormAttachment } from '@/_lib/private-form-storage';
import { prisma } from '@/_lib/prisma';

export type CustomerVoiceSubmitResult = {
  ok: boolean;
  error?: string;
  id?: string;
};

function clean(value: FormDataEntryValue | null, max: number) {
  return typeof value === 'string'
    ? value.trim().slice(0, max)
    : '';
}

export async function submitCustomerVoice(
  formData: FormData,
): Promise<CustomerVoiceSubmitResult> {
  const category = clean(formData.get('category'), 30);
  const title = clean(formData.get('title'), 200);
  const content = clean(formData.get('content'), 2000);
  const name = clean(formData.get('name'), 80);
  const phonePrefix = clean(formData.get('phonePrefix'), 4);
  const phoneMiddle = clean(formData.get('phoneMiddle'), 4);
  const phoneLast = clean(formData.get('phoneLast'), 4);
  const captcha = clean(formData.get('captcha'), 10);

  if (!['praise', 'suggestion', 'complaint'].includes(category)) {
    return { ok: false, error: '분류를 확인해주세요.' };
  }

  if (!title || !content || !name) {
    return { ok: false, error: '필수 입력 항목을 확인해주세요.' };
  }

  if (!/^\d{3,4}$/.test(phoneMiddle) || !/^\d{4}$/.test(phoneLast)) {
    return { ok: false, error: '연락처를 확인해주세요.' };
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
        'customer-voice',
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

  const created = await prisma.customerVoiceSubmission.create({
    data: {
      category,
      title,
      content,
      attachmentName,
      attachmentUrl,
      name,
      phone: `${phonePrefix}-${phoneMiddle}-${phoneLast}`,
      status: 'RECEIVED',
    },
    select: { id: true },
  });

  return {
    ok: true,
    id: created.id,
  };
}
