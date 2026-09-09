'use server';

import { getCurrentSession } from '@/_lib/auth-session';
import { prisma } from '@/_lib/prisma';
import { canAccessAdmin } from '@/_lib/roles';
import { revalidatePath } from 'next/cache';

type ActionResult = {
  ok: boolean;
  error?: string;
};

export type UpdatePageBottomBannerInput = {
  id: string;
  emoji: string;
  iconColor: string;
  title: string;
  linkTitle: string;
  href: string;
  isVisible: boolean;
  visiblePaths: string[];
};

async function getAdminActor() {
  const session = await getCurrentSession();

  if (!session) return null;

  const actor = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      role: true,
      membershipStatus: true,
    },
  });

  if (
    !actor ||
    actor.membershipStatus !== 'ACTIVE' ||
    !canAccessAdmin(actor.role)
  ) {
    return null;
  }

  return actor;
}

function validateHref(value: string) {
  const href = value.trim();

  if (!href || href.length > 300) return null;
  if (href.startsWith('/')) return href;
  if (/^https?:\/\//i.test(href)) return href;

  return null;
}

function validateColor(value: string) {
  const color = value.trim().toUpperCase();
  return /^#[0-9A-F]{6}$/.test(color) ? color : null;
}

function normalizePaths(values: string[]) {
  return Array.from(
    new Set(
      values
        .map((value) => value.trim())
        .filter((value) => value.startsWith('/') && value.length <= 300),
    ),
  ).sort();
}

export async function updatePageBottomBanner(
  input: UpdatePageBottomBannerInput,
): Promise<ActionResult> {
  const actor = await getAdminActor();

  if (!actor) {
    return { ok: false, error: '하단 배너를 관리할 권한이 없습니다.' };
  }

  const emoji = input.emoji.trim();
  const title = input.title.trim();
  const linkTitle = input.linkTitle.trim();
  const href = validateHref(input.href);
  const iconColor = validateColor(input.iconColor);
  const visiblePaths = normalizePaths(input.visiblePaths);

  if (!emoji || emoji.length > 12) {
    return { ok: false, error: '이모지는 1자 이상 12자 이하로 입력해주세요.' };
  }

  if (!iconColor) {
    return { ok: false, error: '아이콘 색상은 #RRGGBB 형식으로 입력해주세요.' };
  }

  if (!title || title.length > 60) {
    return { ok: false, error: '제목은 1자 이상 60자 이하로 입력해주세요.' };
  }

  if (!linkTitle || linkTitle.length > 30) {
    return { ok: false, error: '링크 타이틀은 1자 이상 30자 이하로 입력해주세요.' };
  }

  if (!href) {
    return {
      ok: false,
      error: '링크 주소는 /로 시작하는 주소 또는 http(s) 주소로 입력해주세요.',
    };
  }

  const current = await prisma.pageBottomBanner.findUnique({
    where: { id: input.id },
  });

  if (!current) {
    return { ok: false, error: '수정할 하단 배너를 찾을 수 없습니다.' };
  }

  await prisma.$transaction(async (tx) => {
    await tx.pageBottomBanner.update({
      where: { id: current.id },
      data: {
        emoji,
        iconColor,
        title,
        linkTitle,
        href,
        isVisible: input.isVisible,
        visiblePaths,
      },
    });

    await tx.adminAuditLog.create({
      data: {
        actorId: actor.id,
        action: 'PAGE_BOTTOM_BANNER_UPDATE',
        targetType: 'PageBottomBanner',
        targetId: current.id,
        metadata: {
          before: {
            emoji: current.emoji,
            iconColor: current.iconColor,
            title: current.title,
            linkTitle: current.linkTitle,
            href: current.href,
            isVisible: current.isVisible,
            visiblePaths: current.visiblePaths,
          },
          after: {
            emoji,
            iconColor,
            title,
            linkTitle,
            href,
            isVisible: input.isVisible,
            visiblePaths,
          },
        },
      },
    });
  });

  revalidatePath('/', 'layout');
  revalidatePath('/admin/common/bottom-banners');

  return { ok: true };
}
