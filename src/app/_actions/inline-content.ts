'use server';

import {
  getCurrentSession,
  isActiveMember,
} from '@/_lib/auth-session';
import {
  deleteManagedAzureAssets,
  isManagedAzureAssetUrl,
  uploadManagedImage,
} from '@/_lib/azure-blob-storage';
import type {
  InlineContentData,
  InlineContentSaveResult,
  InlineContentUploadResult,
} from '@/_lib/inline-content-shared';
import { prisma } from '@/_lib/prisma';
import { canEditContent } from '@/_lib/roles';
import { Prisma } from '@/generated/prisma/client';
import { revalidatePath } from 'next/cache';

const MAX_KEY_LENGTH = 220;
const MAX_FIELD_LENGTH = 100_000;

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

function cleanIdentity(value: string, label: string) {
  const cleaned = value.trim();

  if (
    !cleaned ||
    cleaned.length > MAX_KEY_LENGTH ||
    /[\u0000-\u001F\u007F]/.test(cleaned)
  ) {
    throw new Error(`${label} 값이 올바르지 않습니다.`);
  }

  return cleaned;
}

function cleanPublicPath(value: string) {
  const path = value.trim();

  if (!path.startsWith('/') || path.length > 500) {
    throw new Error('공개 페이지 경로가 올바르지 않습니다.');
  }

  return path;
}

function normalizeData(data: InlineContentData): InlineContentData {
  const normalized: InlineContentData = {};

  for (const [rawKey, rawValue] of Object.entries(data)) {
    const key = cleanIdentity(rawKey, '필드 키');

    if (typeof rawValue !== 'string') {
      throw new Error(`${key} 필드는 문자열만 저장할 수 있습니다.`);
    }

    normalized[key] = rawValue.slice(0, MAX_FIELD_LENGTH);
  }

  return normalized;
}

function collectManagedAssetUrls(
  value: unknown,
  output = new Set<string>(),
) {
  if (typeof value === 'string') {
    const candidate = value.trim();

    if (candidate && isManagedAzureAssetUrl(candidate)) {
      output.add(candidate);
    }

    return output;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectManagedAssetUrls(item, output);
    }

    return output;
  }

  if (value && typeof value === 'object') {
    for (const item of Object.values(
      value as Record<string, unknown>,
    )) {
      collectManagedAssetUrls(item, output);
    }
  }

  return output;
}

export async function saveInlineContentBlock(input: {
  pageKey: string;
  sectionKey: string;
  label: string;
  publicPath: string;
  data: InlineContentData;
}): Promise<InlineContentSaveResult> {
  const actor = await getEditor();

  if (!actor) {
    return {
      ok: false,
      error: '콘텐츠를 수정할 권한이 없습니다.',
    };
  }

  try {
    const pageKey = cleanIdentity(input.pageKey, '페이지 키');
    const sectionKey = cleanIdentity(input.sectionKey, '영역 키');
    const label = input.label.trim().slice(0, 200);
    const publicPath = cleanPublicPath(input.publicPath);
    const data = normalizeData(input.data);

    const existing = await prisma.pageContentBlock.findUnique({
      where: {
        pageKey_sectionKey: {
          pageKey,
          sectionKey,
        },
      },
      select: {
        id: true,
        data: true,
        version: true,
      },
    });

    const previousAssets = collectManagedAssetUrls(existing?.data);
    const nextAssets = collectManagedAssetUrls(data);

    await prisma.$transaction(async (tx) => {
      const saved = await tx.pageContentBlock.upsert({
        where: {
          pageKey_sectionKey: {
            pageKey,
            sectionKey,
          },
        },
        create: {
          pageKey,
          sectionKey,
          label: label || null,
          data: data as Prisma.InputJsonValue,
          version: 1,
        },
        update: {
          label: label || null,
          data: data as Prisma.InputJsonValue,
          version: {
            increment: 1,
          },
        },
        select: {
          id: true,
          version: true,
        },
      });

      await tx.adminAuditLog.create({
        data: {
          actorId: actor.id,
          action: existing
            ? 'INLINE_CONTENT_UPDATE'
            : 'INLINE_CONTENT_CREATE',
          targetType: 'PageContentBlock',
          targetId: saved.id,
          metadata: {
            pageKey,
            sectionKey,
            label,
            publicPath,
            previousVersion: existing?.version ?? 0,
            version: saved.version,
          },
        },
      });
    });

    await deleteManagedAzureAssets(
      Array.from(previousAssets).filter(
        (url) => !nextAssets.has(url),
      ),
    );

    revalidatePath(publicPath);

    return {
      ok: true,
      success: '화면의 콘텐츠를 저장했습니다.',
      data,
    };
  } catch (error) {
    console.error('[inline-content] 저장 실패', error);

    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : '콘텐츠 저장 중 오류가 발생했습니다.',
    };
  }
}

export async function resetInlineContentBlock(input: {
  pageKey: string;
  sectionKey: string;
  label: string;
  publicPath: string;
}): Promise<InlineContentSaveResult> {
  const actor = await getEditor();

  if (!actor) {
    return {
      ok: false,
      error: '콘텐츠를 초기화할 권한이 없습니다.',
    };
  }

  try {
    const pageKey = cleanIdentity(input.pageKey, '페이지 키');
    const sectionKey = cleanIdentity(input.sectionKey, '영역 키');
    const publicPath = cleanPublicPath(input.publicPath);

    const existing = await prisma.pageContentBlock.findUnique({
      where: {
        pageKey_sectionKey: {
          pageKey,
          sectionKey,
        },
      },
      select: {
        id: true,
        data: true,
      },
    });

    if (!existing) {
      return {
        ok: true,
        success: '이미 기본 콘텐츠를 사용하고 있습니다.',
      };
    }

    const previousAssets = collectManagedAssetUrls(existing.data);

    await prisma.$transaction(async (tx) => {
      await tx.pageContentBlock.delete({
        where: {
          id: existing.id,
        },
      });

      await tx.adminAuditLog.create({
        data: {
          actorId: actor.id,
          action: 'INLINE_CONTENT_RESET',
          targetType: 'PageContentBlock',
          targetId: existing.id,
          metadata: {
            pageKey,
            sectionKey,
            label: input.label.trim().slice(0, 200),
            publicPath,
          },
        },
      });
    });

    await deleteManagedAzureAssets(previousAssets);
    revalidatePath(publicPath);

    return {
      ok: true,
      success: '코드에 정의된 기본 콘텐츠로 되돌렸습니다.',
    };
  } catch (error) {
    console.error('[inline-content] 초기화 실패', error);

    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : '콘텐츠 초기화 중 오류가 발생했습니다.',
    };
  }
}

export async function uploadInlineContentImage(
  input: {
    pageKey: string;
    sectionKey: string;
    fieldKey: string;
  },
  formData: FormData,
): Promise<InlineContentUploadResult> {
  const actor = await getEditor();

  if (!actor) {
    return {
      ok: false,
      error: '이미지를 업로드할 권한이 없습니다.',
    };
  }

  try {
    const pageKey = cleanIdentity(input.pageKey, '페이지 키');
    const sectionKey = cleanIdentity(input.sectionKey, '영역 키');
    const fieldKey = cleanIdentity(input.fieldKey, '필드 키');
    const file = formData.get('file');

    if (!(file instanceof File) || file.size <= 0) {
      return {
        ok: false,
        error: '업로드할 이미지를 선택해주세요.',
      };
    }

    if (file.size > 20 * 1024 * 1024) {
      return {
        ok: false,
        error: '이미지는 20MB 이하만 업로드할 수 있습니다.',
      };
    }

    const allowedTypes = new Set([
      'image/png',
      'image/jpeg',
      'image/webp',
      'image/gif',
      'image/avif',
    ]);

    if (!allowedTypes.has(file.type)) {
      return {
        ok: false,
        error:
          'PNG, JPG, WEBP, GIF, AVIF 이미지만 업로드할 수 있습니다.',
      };
    }

    const uploaded = await uploadManagedImage(file, [
      'inline',
      pageKey,
      sectionKey,
      fieldKey,
    ]);

    return {
      ok: true,
      success: '새 이미지를 업로드했습니다. 저장을 눌러 반영해주세요.',
      url: uploaded.url,
    };
  } catch (error) {
    console.error('[inline-content] 이미지 업로드 실패', error);

    return {
      ok: false,
      error:
        '이미지를 업로드하지 못했습니다. Azure Storage 설정을 확인해주세요.',
    };
  }
}
