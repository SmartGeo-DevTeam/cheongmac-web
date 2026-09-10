'use server';

import {
  getCurrentSession,
  isActiveMember,
} from '@/_lib/auth-session';
import { prisma } from '@/_lib/prisma';
import { canAccessAdmin } from '@/_lib/roles';
import {
  TYPOGRAPHY_TAGS,
  type TypographySettingValue,
  type TypographyTag,
} from '@/_lib/typography';
import { revalidatePath } from 'next/cache';

export type TypographyActionResult = {
  ok: boolean;
  error?: string;
  success?: string;
};

function validNumber(value: number, min: number, max: number) {
  return Number.isFinite(value) && value >= min && value <= max;
}

function normalizeSetting(
  value: TypographySettingValue,
): TypographySettingValue | null {
  if (!TYPOGRAPHY_TAGS.includes(value.tag as TypographyTag)) {
    return null;
  }

  if (
    !validNumber(value.mobileFontSize, 10, 120) ||
    !validNumber(value.desktopFontSize, 10, 160) ||
    !validNumber(value.mobileLineHeight, 0.8, 3) ||
    !validNumber(value.desktopLineHeight, 0.8, 3)
  ) {
    return null;
  }

  return {
    tag: value.tag,
    mobileFontSize: Math.round(value.mobileFontSize),
    mobileLineHeight:
      Math.round(value.mobileLineHeight * 100) / 100,
    desktopFontSize: Math.round(value.desktopFontSize),
    desktopLineHeight:
      Math.round(value.desktopLineHeight * 100) / 100,
  };
}

export async function saveTypographySettings(
  input: TypographySettingValue[],
): Promise<TypographyActionResult> {
  const session = await getCurrentSession();

  if (
    !session ||
    !isActiveMember(session) ||
    !canAccessAdmin(session.user.role)
  ) {
    return {
      ok: false,
      error: '본문 타이포그래피를 관리할 권한이 없습니다.',
    };
  }

  if (input.length !== TYPOGRAPHY_TAGS.length) {
    return {
      ok: false,
      error: '모든 태그 설정을 입력해주세요.',
    };
  }

  const normalized = input.map(normalizeSetting);

  if (normalized.some((item) => !item)) {
    return {
      ok: false,
      error:
        '폰트 크기 또는 줄높이 값이 허용 범위를 벗어났습니다.',
    };
  }

  const settings = normalized as TypographySettingValue[];
  const uniqueTags = new Set(settings.map((item) => item.tag));

  if (
    uniqueTags.size !== TYPOGRAPHY_TAGS.length ||
    TYPOGRAPHY_TAGS.some((tag) => !uniqueTags.has(tag))
  ) {
    return {
      ok: false,
      error: '태그 구성이 올바르지 않습니다.',
    };
  }

  const before = await prisma.typographySetting.findMany({
    orderBy: { tag: 'asc' },
    select: {
      tag: true,
      mobileFontSize: true,
      mobileLineHeight: true,
      desktopFontSize: true,
      desktopLineHeight: true,
    },
  });

  await prisma.$transaction(async (tx) => {
    for (const setting of settings) {
      await tx.typographySetting.upsert({
        where: { tag: setting.tag },
        create: {
          tag: setting.tag,
          mobileFontSize: setting.mobileFontSize,
          mobileLineHeight: setting.mobileLineHeight,
          desktopFontSize: setting.desktopFontSize,
          desktopLineHeight: setting.desktopLineHeight,
        },
        update: {
          mobileFontSize: setting.mobileFontSize,
          mobileLineHeight: setting.mobileLineHeight,
          desktopFontSize: setting.desktopFontSize,
          desktopLineHeight: setting.desktopLineHeight,
        },
      });
    }

    await tx.adminAuditLog.create({
      data: {
        actorId: session.user.id,
        action: 'TYPOGRAPHY_SETTINGS_UPDATE',
        targetType: 'TypographySetting',
        targetId: 'global',
        metadata: {
          before,
          after: settings,
        },
      },
    });
  });

  revalidatePath('/', 'layout');
  revalidatePath('/admin/common/typography');

  return {
    ok: true,
    success:
      '본문 타이포그래피 설정을 저장했습니다. 홈페이지 전체에 반영됩니다.',
  };
}
