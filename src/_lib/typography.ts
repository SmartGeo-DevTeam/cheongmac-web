import { prisma } from '@/_lib/prisma';
import type { CSSProperties } from 'react';

export const TYPOGRAPHY_TAGS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
] as const;

export type TypographyTag = (typeof TYPOGRAPHY_TAGS)[number];

export type TypographySettingValue = {
  tag: TypographyTag;
  mobileFontSize: number;
  mobileLineHeight: number;
  desktopFontSize: number;
  desktopLineHeight: number;
};

export const DEFAULT_TYPOGRAPHY_SETTINGS: Record<
  TypographyTag,
  TypographySettingValue
> = {
  h1: {
    tag: 'h1',
    mobileFontSize: 26,
    mobileLineHeight: 1.3,
    desktopFontSize: 50,
    desktopLineHeight: 1.25,
  },
  h2: {
    tag: 'h2',
    mobileFontSize: 24,
    mobileLineHeight: 1.4,
    desktopFontSize: 36,
    desktopLineHeight: 1.35,
  },
  h3: {
    tag: 'h3',
    mobileFontSize: 22,
    mobileLineHeight: 1.45,
    desktopFontSize: 32,
    desktopLineHeight: 1.4,
  },
  h4: {
    tag: 'h4',
    mobileFontSize: 20,
    mobileLineHeight: 1.5,
    desktopFontSize: 28,
    desktopLineHeight: 1.45,
  },
  h5: {
    tag: 'h5',
    mobileFontSize: 18,
    mobileLineHeight: 1.55,
    desktopFontSize: 24,
    desktopLineHeight: 1.5,
  },
  h6: {
    tag: 'h6',
    mobileFontSize: 16,
    mobileLineHeight: 1.6,
    desktopFontSize: 20,
    desktopLineHeight: 1.55,
  },
  p: {
    tag: 'p',
    mobileFontSize: 16,
    mobileLineHeight: 1.75,
    desktopFontSize: 20,
    desktopLineHeight: 1.8,
  },
};

function isTypographyTag(value: string): value is TypographyTag {
  return TYPOGRAPHY_TAGS.includes(value as TypographyTag);
}

function isMissingTypographyTable(error: unknown) {
  return Boolean(
    error &&
      typeof error === 'object' &&
      'code' in error &&
      (error as { code?: unknown }).code === 'P2021',
  );
}

export async function getTypographySettings(): Promise<
  TypographySettingValue[]
> {
  let rows: {
    tag: string;
    mobileFontSize: number;
    mobileLineHeight: number;
    desktopFontSize: number;
    desktopLineHeight: number;
  }[] = [];

  try {
    rows = await prisma.typographySetting.findMany({
      orderBy: { tag: 'asc' },
      select: {
        tag: true,
        mobileFontSize: true,
        mobileLineHeight: true,
        desktopFontSize: true,
        desktopLineHeight: true,
      },
    });
  } catch (error) {
    // 배포 시 코드가 DB migration보다 먼저 빌드되더라도 기존 홈페이지가
    // 깨지지 않도록 "테이블 미생성" 오류에 한해 기본값을 사용합니다.
    if (!isMissingTypographyTable(error)) {
      throw error;
    }
  }

  const stored = new Map<TypographyTag, TypographySettingValue>();

  for (const row of rows) {
    if (!isTypographyTag(row.tag)) continue;

    stored.set(row.tag, {
      tag: row.tag,
      mobileFontSize: row.mobileFontSize,
      mobileLineHeight: row.mobileLineHeight,
      desktopFontSize: row.desktopFontSize,
      desktopLineHeight: row.desktopLineHeight,
    });
  }

  return TYPOGRAPHY_TAGS.map(
    (tag) => stored.get(tag) ?? DEFAULT_TYPOGRAPHY_SETTINGS[tag],
  );
}

type TypographyCssVariables = CSSProperties &
  Record<`--cm-typography-${string}`, string>;

export function getTypographyCssVariables(
  settings: TypographySettingValue[],
): TypographyCssVariables {
  const variables = {} as TypographyCssVariables;

  for (const setting of settings) {
    variables[
      `--cm-typography-${setting.tag}-mobile-font-size`
    ] = `${setting.mobileFontSize}px`;
    variables[
      `--cm-typography-${setting.tag}-mobile-line-height`
    ] = String(setting.mobileLineHeight);
    variables[
      `--cm-typography-${setting.tag}-desktop-font-size`
    ] = `${setting.desktopFontSize}px`;
    variables[
      `--cm-typography-${setting.tag}-desktop-line-height`
    ] = String(setting.desktopLineHeight);
  }

  return variables;
}
