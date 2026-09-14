import 'server-only';

import type { InlineContentData } from '@/_lib/inline-content-shared';
import { prisma } from '@/_lib/prisma';

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function isMissingTable(error: unknown) {
  return Boolean(
    error &&
      typeof error === 'object' &&
      'code' in error &&
      (error as { code?: unknown }).code === 'P2021',
  );
}

function isDatabaseUnavailable(error: unknown) {
  return Boolean(
    error &&
      typeof error === 'object' &&
      'code' in error &&
      (error as { code?: unknown }).code === 'P1001',
  );
}

function stringData(value: unknown): InlineContentData {
  const record = asRecord(value);
  const result: InlineContentData = {};

  for (const [key, item] of Object.entries(record)) {
    if (typeof item === 'string') result[key] = item;
  }

  return result;
}

export async function getPageContentBlock(
  pageKey: string,
  sectionKey: string,
  defaults: InlineContentData,
): Promise<{
  data: InlineContentData;
  persisted: boolean;
}> {
  if (!pageKey.trim() || !sectionKey.trim()) {
    return { data: { ...defaults }, persisted: false };
  }

  try {
    const row = await prisma.pageContentBlock.findUnique({
      where: {
        pageKey_sectionKey: {
          pageKey,
          sectionKey,
        },
      },
      select: {
        data: true,
      },
    });

    if (!row) {
      return { data: { ...defaults }, persisted: false };
    }

    return {
      data: {
        ...defaults,
        ...stringData(row.data),
      },
      persisted: true,
    };
  } catch (error) {
    // 코드 배포 후 migration이 이어지는 순서에서도 공개 페이지는 기존 문구를 유지합니다.
    if (isMissingTable(error) || isDatabaseUnavailable(error)) {
      return { data: { ...defaults }, persisted: false };
    }

    throw error;
  }
}
