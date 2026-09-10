'use server';

import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import {
  getManagedItemTypeConfig,
  getManagedPageConfig,
  type ManagedField,
  type ManagedPageKey,
} from '@/_lib/page-management-config';
import { prisma } from '@/_lib/prisma';
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

function clean(value: FormDataEntryValue | null, max = 20000) {
  return typeof value === 'string'
    ? value.trim().slice(0, max)
    : '';
}

function parseField(field: ManagedField, formData: FormData) {
  if (field.key === 'isVisible') return undefined;

  if (field.type === 'checkbox') {
    return formData.get(field.key) === 'on';
  }

  const raw = clean(formData.get(field.key));

  if (field.type === 'number') {
    if (!raw) return null;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  }

  if (field.type === 'lines') {
    return raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  if (field.type === 'json') {
    if (!raw) return [];
    try {
      return JSON.parse(raw) as Prisma.InputJsonValue;
    } catch {
      throw new Error(`${field.label} JSON 형식을 확인해주세요.`);
    }
  }

  return raw;
}

function summaryValue(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === 'string')
      .join(' · ')
      .slice(0, 5000);
  }

  return typeof value === 'string' ? value.slice(0, 5000) : '';
}

function collectImageUrls(
  data: Record<string, unknown>,
  imageFields: string[] | undefined,
) {
  if (!imageFields?.length) return [];

  const result: string[] = [];

  for (const field of imageFields) {
    const value = data[field];

    if (typeof value === 'string' && value.trim()) {
      result.push(value.trim());
    } else if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === 'string' && item.trim()) {
          result.push(item.trim());
        }
      }
    }
  }

  return Array.from(new Set(result)).slice(0, 30);
}

function revalidateManagedPage(pageKey: ManagedPageKey, itemKey?: string) {
  const config = getManagedPageConfig(pageKey);
  revalidatePath(config.publicHref);
  revalidatePath(`/admin/pages/${pageKey}`);

  if (itemKey && ['cases', 'notice', 'news'].includes(pageKey)) {
    revalidatePath(`${config.publicHref}/${itemKey}`);
  }
}

export async function saveManagedPageItem(
  pageKey: ManagedPageKey,
  id: string,
  itemType: string,
  formData: FormData,
): Promise<void> {
  const actor = await getEditor();
  if (!actor) throw new Error('페이지 데이터를 관리할 권한이 없습니다.');

  const config = getManagedPageConfig(pageKey);
  const typeConfig = getManagedItemTypeConfig(pageKey, itemType);
  if (!typeConfig) throw new Error('지원하지 않는 데이터 유형입니다.');

  const itemKey = clean(formData.get('_itemKey'), 180);
  if (!itemKey) throw new Error('관리용 ID를 입력해주세요.');

  const sortOrder = Math.max(
    0,
    Number.parseInt(clean(formData.get('_sortOrder'), 20), 10) || 0,
  );
  const isVisible = formData.get('isVisible') === 'on';

  const existing =
    id === 'new'
      ? null
      : await prisma.managedPageItem.findFirst({
          where: { id, pageKey },
          select: { data: true, itemKey: true },
        });

  if (id !== 'new' && !existing) {
    throw new Error('수정할 데이터를 찾을 수 없습니다.');
  }

  if (existing && itemKey !== existing.itemKey) {
    throw new Error('기존 항목의 관리용 ID는 변경할 수 없습니다.');
  }

  const existingData =
    existing?.data &&
    typeof existing.data === 'object' &&
    !Array.isArray(existing.data)
      ? (existing.data as Record<string, unknown>)
      : {};

  const data: Record<string, unknown> = { ...existingData };

  for (const field of typeConfig.fields) {
    const parsed = parseField(field, formData);
    if (parsed === undefined) continue;

    const isEmpty =
      parsed === null ||
      parsed === '' ||
      (Array.isArray(parsed) && parsed.length === 0);

    if (field.required && isEmpty) {
      throw new Error(`${field.label} 항목을 입력해주세요.`);
    }

    if (
      field.type === 'select' &&
      typeof parsed === 'string' &&
      field.options?.length &&
      !field.options.some((option) => option.value === parsed)
    ) {
      throw new Error(`${field.label} 값을 확인해주세요.`);
    }

    data[field.key] = parsed;
  }

  if ((pageKey === 'cases' || pageKey === 'news') && !/^\d+$/.test(itemKey)) {
    throw new Error('치료사례와 청맥뉴스의 관리용 ID는 숫자로 입력해주세요.');
  }

  const titleRaw = data[typeConfig.titleField];
  const title =
    typeof titleRaw === 'string' && titleRaw.trim()
      ? titleRaw.trim()
      : config.label;

  const summary = typeConfig.summaryField
    ? summaryValue(data[typeConfig.summaryField])
    : '';

  const category = typeConfig.categoryField
    ? summaryValue(data[typeConfig.categoryField]).slice(0, 300)
    : '';

  const imageUrls = collectImageUrls(data, typeConfig.imageFields);

  await prisma.$transaction(async (tx) => {
    let targetId: string;

    if (id === 'new') {
      const duplicate = await tx.managedPageItem.findUnique({
        where: {
          pageKey_itemKey: {
            pageKey,
            itemKey,
          },
        },
        select: { id: true },
      });

      if (duplicate) {
        throw new Error('같은 관리용 ID가 이미 존재합니다.');
      }

      const created = await tx.managedPageItem.create({
        data: {
          pageKey,
          itemKey,
          itemType,
          title,
          summary: summary || null,
          category: category || null,
          imageUrls,
          data: data as Prisma.InputJsonValue,
          sortOrder,
          isVisible,
        },
      });
      targetId = created.id;
    } else {
      const updated = await tx.managedPageItem.update({
        where: { id },
        data: {
          itemKey,
          itemType,
          title,
          summary: summary || null,
          category: category || null,
          imageUrls,
          data: data as Prisma.InputJsonValue,
          sortOrder,
          isVisible,
        },
      });
      targetId = updated.id;
    }

    await tx.adminAuditLog.create({
      data: {
        actorId: actor.id,
        action:
          id === 'new'
            ? 'MANAGED_PAGE_ITEM_CREATE'
            : 'MANAGED_PAGE_ITEM_UPDATE',
        targetType: `ManagedPageItem:${pageKey}`,
        targetId,
        metadata: {
          pageKey,
          itemKey,
          itemType,
          title,
        },
      },
    });
  });

  revalidateManagedPage(pageKey, itemKey);
  redirect(`/admin/pages/${pageKey}`);
}

export async function deleteManagedPageItem(
  pageKey: ManagedPageKey,
  id: string,
): Promise<void> {
  const actor = await getEditor();
  if (!actor) throw new Error('페이지 데이터를 관리할 권한이 없습니다.');

  const existing = await prisma.managedPageItem.findFirst({
    where: { id, pageKey },
    select: {
      id: true,
      itemKey: true,
      title: true,
    },
  });

  if (!existing) throw new Error('삭제할 데이터를 찾을 수 없습니다.');

  await prisma.$transaction(async (tx) => {
    await tx.managedPageItem.delete({
      where: { id },
    });

    await tx.adminAuditLog.create({
      data: {
        actorId: actor.id,
        action: 'MANAGED_PAGE_ITEM_DELETE',
        targetType: `ManagedPageItem:${pageKey}`,
        targetId: id,
        metadata: {
          pageKey,
          itemKey: existing.itemKey,
          title: existing.title,
        },
      },
    });
  });

  revalidateManagedPage(pageKey, existing.itemKey);
  redirect(`/admin/pages/${pageKey}`);
}
