'use server';

import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import { prisma } from '@/_lib/prisma';
import { canAccessAdmin, normalizeRole } from '@/_lib/roles';
import { revalidatePath } from 'next/cache';

async function getAdmin() {
  const session = await getCurrentSession();
  if (!session || !isActiveMember(session)) return null;

  const role = normalizeRole(session.user.role);
  return canAccessAdmin(role) ? session.user : null;
}

export async function updateCustomerVoiceStatus(
  id: string,
  formData: FormData,
) {
  const actor = await getAdmin();
  if (!actor) throw new Error('고객의 소리를 관리할 권한이 없습니다.');

  const status = String(formData.get('status') ?? '').trim();
  if (!['RECEIVED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'].includes(status)) {
    throw new Error('처리 상태를 확인해주세요.');
  }

  await prisma.$transaction(async (tx) => {
    await tx.customerVoiceSubmission.update({
      where: { id },
      data: { status },
    });

    await tx.adminAuditLog.create({
      data: {
        actorId: actor.id,
        action: 'CUSTOMER_VOICE_STATUS_UPDATE',
        targetType: 'CustomerVoiceSubmission',
        targetId: id,
        metadata: { status },
      },
    });
  });

  revalidatePath('/admin/customer-voice');
  revalidatePath(`/admin/customer-voice/${id}`);
}
