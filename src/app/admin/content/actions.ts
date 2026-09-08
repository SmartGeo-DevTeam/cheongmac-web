'use server';

import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import { prisma } from '@/_lib/prisma';
import { canEditContent } from '@/_lib/roles';
import { revalidatePath } from 'next/cache';

export type ContentActionState = { error?: string; success?: string };

export async function saveContent(
  _previousState: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const session = await getCurrentSession();

  if (!session || !isActiveMember(session) || !canEditContent(session.user.role)) {
    return { error: '콘텐츠 수정 권한이 없습니다.' };
  }

  const key = String(formData.get('key') ?? '').trim();
  const value = String(formData.get('value') ?? '').trim();

  if (!/^[a-z0-9][a-z0-9._-]{2,119}$/i.test(key)) {
    return { error: '키는 영문/숫자/점/하이픈/언더스코어 3~120자로 입력해주세요.' };
  }

  if (!value || value.length > 10000) {
    return { error: '내용을 1자 이상 10,000자 이하로 입력해주세요.' };
  }

  await prisma.$transaction(async (tx) => {
    const current = await tx.content.findUnique({ where: { key } });

    if (!current) {
      const created = await tx.content.create({ data: { key, value } });
      await tx.contentRevision.create({
        data: {
          contentId: created.id,
          oldValue: '',
          newValue: value,
          version: 1,
          editorId: session.user.id,
        },
      });
      await tx.adminAuditLog.create({
        data: {
          actorId: session.user.id,
          action: 'CONTENT_CREATE',
          targetType: 'Content',
          targetId: created.id,
          metadata: { key, version: 1 },
        },
      });
      return;
    }

    if (current.value === value) return;

    const nextVersion = current.version + 1;
    await tx.content.update({
      where: { id: current.id },
      data: { value, version: nextVersion },
    });
    await tx.contentRevision.create({
      data: {
        contentId: current.id,
        oldValue: current.value,
        newValue: value,
        version: nextVersion,
        editorId: session.user.id,
      },
    });
    await tx.adminAuditLog.create({
      data: {
        actorId: session.user.id,
        action: 'CONTENT_UPDATE',
        targetType: 'Content',
        targetId: current.id,
        metadata: { key, version: nextVersion },
      },
    });
  });

  revalidatePath('/admin/content');
  return { success: '저장했습니다. 수정 이력이 함께 기록되었습니다.' };
}
