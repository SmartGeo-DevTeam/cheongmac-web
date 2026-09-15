'use server';

import {
  getCurrentSession,
  isActiveMember,
} from '@/_lib/auth-session';
import {
  getManagedItemTypeConfig,
  getManagedPageConfig,
  isManagedPageKey,
  type ManagedField,
  type ManagedPageKey,
} from '@/_lib/page-management-config';
import { prisma } from '@/_lib/prisma';
import { canEditContent } from '@/_lib/roles';
import { Prisma } from '@/generated/prisma/client';
import { revalidatePath } from 'next/cache';

export type InlineManagedFieldValue = string | boolean;

export type InlineManagedField = {
  key: string;
  label: string;
  type:
    | 'text'
    | 'textarea'
    | 'number'
    | 'date'
    | 'url'
    | 'select'
    | 'checkbox'
    | 'lines';
  required?: boolean;
  description?: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  value: InlineManagedFieldValue;
};

export type InlineManagedItemPayload = {
  id: string;
  pageKey: ManagedPageKey;
  pageLabel: string;
  itemKey: string;
  itemType: string;
  itemTypeLabel: string;
  title: string;
  sortOrder: number;
  isVisible: boolean;
  fields: InlineManagedField[];
  detailedFieldCount: number;
};

export type InlineManagedResult = {
  ok: boolean;
  error?: string;
  success?: string;
  item?: InlineManagedItemPayload;
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

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function fieldValue(value: unknown, field: ManagedField): InlineManagedFieldValue {
  if (field.type === 'checkbox') return Boolean(value);

  if (field.type === 'lines') {
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === 'string').join('\n')
      : '';
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  return '';
}

function quickFields(
  fields: ManagedField[],
  imageFields: string[] | undefined,
) {
  const images = new Set(imageFields ?? []);

  return fields.filter(
    (field) =>
      field.key !== 'isVisible' &&
      field.type !== 'json' &&
      !images.has(field.key),
  );
}

function parseValue(
  field: ManagedField,
  raw: InlineManagedFieldValue | undefined,
) {
  if (field.type === 'checkbox') return Boolean(raw);

  const stringValue = typeof raw === 'string' ? raw : '';

  if (field.type === 'number') {
    if (!stringValue.trim()) return null;
    const parsed = Number(stringValue);
    return Number.isFinite(parsed) ? parsed : null;
  }

  if (field.type === 'lines') {
    return stringValue
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  return stringValue;
}

function isEmpty(value: unknown) {
  return (
    value === null ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  );
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

function revalidateManagedPage(pageKey: ManagedPageKey, itemKey: string) {
  const config = getManagedPageConfig(pageKey);
  revalidatePath(config.publicHref);
  revalidatePath(`/admin/pages/${pageKey}`);

  if (['cases', 'notice', 'news'].includes(pageKey)) {
    revalidatePath(`${config.publicHref}/${itemKey}`);
  }
}

export async function getInlineManagedItem(
  pageKeyRaw: string,
  itemKey: string,
): Promise<InlineManagedResult> {
  const actor = await getEditor();
  if (!actor) {
    return { ok: false, error: '콘텐츠를 수정할 권한이 없습니다.' };
  }

  if (!isManagedPageKey(pageKeyRaw)) {
    return { ok: false, error: '지원하지 않는 관리 페이지입니다.' };
  }

  const pageKey = pageKeyRaw;
  const config = getManagedPageConfig(pageKey);

  const item = await prisma.managedPageItem.findUnique({
    where: {
      pageKey_itemKey: {
        pageKey,
        itemKey,
      },
    },
    select: {
      id: true,
      itemKey: true,
      itemType: true,
      title: true,
      data: true,
      sortOrder: true,
      isVisible: true,
    },
  });

  if (!item) {
    return { ok: false, error: '수정할 항목을 찾지 못했습니다.' };
  }

  const typeConfig = getManagedItemTypeConfig(pageKey, item.itemType);
  if (!typeConfig) {
    return { ok: false, error: '항목 유형 설정을 찾지 못했습니다.' };
  }

  const data = asRecord(item.data);
  const fields = quickFields(typeConfig.fields, typeConfig.imageFields).map(
    (field): InlineManagedField => ({
      key: field.key,
      label: field.label,
      type: field.type as InlineManagedField['type'],
      required: field.required,
      description: field.description,
      placeholder: field.placeholder,
      options: field.options,
      value: fieldValue(data[field.key], field),
    }),
  );

  const detailedFieldCount =
    typeConfig.fields.filter(
      (field) =>
        field.type === 'json' ||
        Boolean(typeConfig.imageFields?.includes(field.key)),
    ).length;

  return {
    ok: true,
    item: {
      id: item.id,
      pageKey,
      pageLabel: config.label,
      itemKey: item.itemKey,
      itemType: item.itemType,
      itemTypeLabel: typeConfig.label,
      title: item.title,
      sortOrder: item.sortOrder,
      isVisible: item.isVisible,
      fields,
      detailedFieldCount,
    },
  };
}

export async function saveInlineManagedItem(input: {
  pageKey: string;
  itemKey: string;
  values: Record<string, InlineManagedFieldValue>;
  sortOrder: number;
  isVisible: boolean;
}): Promise<InlineManagedResult> {
  const actor = await getEditor();
  if (!actor) {
    return { ok: false, error: '콘텐츠를 수정할 권한이 없습니다.' };
  }

  if (!isManagedPageKey(input.pageKey)) {
    return { ok: false, error: '지원하지 않는 관리 페이지입니다.' };
  }

  const pageKey = input.pageKey;
  const config = getManagedPageConfig(pageKey);

  try {
    const item = await prisma.managedPageItem.findUnique({
      where: {
        pageKey_itemKey: {
          pageKey,
          itemKey: input.itemKey,
        },
      },
      select: {
        id: true,
        itemKey: true,
        itemType: true,
        data: true,
        imageUrls: true,
      },
    });

    if (!item) {
      return { ok: false, error: '수정할 항목을 찾지 못했습니다.' };
    }

    const typeConfig = getManagedItemTypeConfig(pageKey, item.itemType);
    if (!typeConfig) {
      return { ok: false, error: '항목 유형 설정을 찾지 못했습니다.' };
    }

    const allowedFields = quickFields(typeConfig.fields, typeConfig.imageFields);
    const data = { ...asRecord(item.data) };

    for (const field of allowedFields) {
      if (!(field.key in input.values)) continue;

      const parsed = parseValue(field, input.values[field.key]);

      if (field.required && isEmpty(parsed)) {
        return {
          ok: false,
          error: `${field.label} 항목을 입력해주세요.`,
        };
      }

      if (
        field.type === 'select' &&
        typeof parsed === 'string' &&
        field.options?.length &&
        !field.options.some((option) => option.value === parsed)
      ) {
        return {
          ok: false,
          error: `${field.label} 값을 확인해주세요.`,
        };
      }

      data[field.key] = parsed;
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

    const sortOrder = Number.isFinite(input.sortOrder)
      ? Math.max(0, Math.trunc(input.sortOrder))
      : 0;

    if (
      pageKey === 'home' &&
      item.itemType === 'popup' &&
      Boolean(input.isVisible)
    ) {
      const visiblePopupCount = await prisma.managedPageItem.count({
        where: {
          pageKey: 'home',
          itemType: 'popup',
          isVisible: true,
          id: { not: item.id },
        },
      });

      if (visiblePopupCount >= 3) {
        return {
          ok: false,
          error:
            '메인 팝업은 최대 3개까지만 동시에 노출할 수 있습니다. 다른 팝업을 먼저 비활성화해주세요.',
        };
      }
    }

    if (
      pageKey === 'home' &&
      item.itemType === 'middle-banner' &&
      Boolean(input.isVisible)
    ) {
      const visibleMiddleBannerCount =
        await prisma.managedPageItem.count({
          where: {
            pageKey: 'home',
            itemType: 'middle-banner',
            isVisible: true,
            id: { not: item.id },
          },
        });

      if (visibleMiddleBannerCount >= 1) {
        return {
          ok: false,
          error:
            '메인 중간 배너는 1개만 활성화할 수 있습니다. 기존 배너를 먼저 비활성화해주세요.',
        };
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.managedPageItem.update({
        where: { id: item.id },
        data: {
          title,
          summary: summary || null,
          category: category || null,
          data: data as Prisma.InputJsonValue,
          sortOrder,
          isVisible: Boolean(input.isVisible),
          // 이미지/JSON은 빠른 편집 대상에서 제외하므로 기존 값을 보존합니다.
          imageUrls: item.imageUrls,
        },
      });

      await tx.adminAuditLog.create({
        data: {
          actorId: actor.id,
          action: 'INLINE_MANAGED_PAGE_ITEM_UPDATE',
          targetType: `ManagedPageItem:${pageKey}`,
          targetId: item.id,
          metadata: {
            pageKey,
            itemKey: item.itemKey,
            itemType: item.itemType,
            title,
          },
        },
      });
    });

    revalidateManagedPage(pageKey, item.itemKey);

    return {
      ok: true,
      success: '항목을 저장했습니다.',
    };
  } catch (error) {
    console.error('[inline-managed-item] 저장 실패', error);

    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : '항목 저장 중 오류가 발생했습니다.',
    };
  }
}
