'use server';

import { getCurrentSession } from '@/_lib/auth-session';
import { prisma } from '@/_lib/prisma';
import { canAccessAdmin } from '@/_lib/roles';
import { randomUUID } from 'node:crypto';
import { revalidatePath } from 'next/cache';

type ActionResult = {
  ok: boolean;
  error?: string;
};

type CreateNavigationInput = {
  parentId: string | null;
  title: string;
  href: string;
};

type UpdateNavigationInput = {
  id: string;
  title: string;
  href: string;
  isVisible: boolean;
};

type MoveNavigationInput = {
  id: string;
  direction: 'UP' | 'DOWN';
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

function validateTitle(value: string) {
  const title = value.trim();
  return title.length >= 1 && title.length <= 40 ? title : null;
}

function validateHref(value: string) {
  const href = value.trim();

  if (!href || href.length > 300) return null;
  if (href.startsWith('/')) return href;
  if (/^https?:\/\//i.test(href)) return href;

  return null;
}

function refreshNavigation() {
  revalidatePath('/', 'layout');
  revalidatePath('/admin/common/navigation');
}

export async function createNavigationItem(
  input: CreateNavigationInput,
): Promise<ActionResult> {
  const actor = await getAdminActor();

  if (!actor) {
    return { ok: false, error: '메뉴를 관리할 권한이 없습니다.' };
  }

  const title = validateTitle(input.title);
  const href = validateHref(input.href);

  if (!title) {
    return { ok: false, error: '메뉴 이름을 1자 이상 40자 이하로 입력해주세요.' };
  }

  if (!href) {
    return {
      ok: false,
      error: '연결 주소는 /로 시작하는 주소 또는 http(s) 주소로 입력해주세요.',
    };
  }

  if (input.parentId) {
    const parent = await prisma.navigationMenu.findUnique({
      where: { id: input.parentId },
      select: { id: true, parentId: true },
    });

    if (!parent) {
      return { ok: false, error: '선택한 상위 메뉴를 찾을 수 없습니다.' };
    }

    if (parent.parentId) {
      return {
        ok: false,
        error: '현재 메뉴는 상위 메뉴와 하위 메뉴 두 단계까지 관리할 수 있습니다.',
      };
    }
  }

  const maxOrder = await prisma.navigationMenu.aggregate({
    where: { parentId: input.parentId },
    _max: { sortOrder: true },
  });

  const item = await prisma.navigationMenu.create({
    data: {
      id: `nav-${randomUUID()}`,
      parentId: input.parentId,
      title,
      href,
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
      isVisible: true,
    },
  });

  await prisma.adminAuditLog.create({
    data: {
      actorId: actor.id,
      action: 'NAVIGATION_CREATE',
      targetType: 'NavigationMenu',
      targetId: item.id,
      metadata: {
        title,
        href,
        parentId: input.parentId,
      },
    },
  });

  refreshNavigation();
  return { ok: true };
}

export async function updateNavigationItem(
  input: UpdateNavigationInput,
): Promise<ActionResult> {
  const actor = await getAdminActor();

  if (!actor) {
    return { ok: false, error: '메뉴를 관리할 권한이 없습니다.' };
  }

  const title = validateTitle(input.title);
  const href = validateHref(input.href);

  if (!title) {
    return { ok: false, error: '메뉴 이름을 1자 이상 40자 이하로 입력해주세요.' };
  }

  if (!href) {
    return {
      ok: false,
      error: '연결 주소는 /로 시작하는 주소 또는 http(s) 주소로 입력해주세요.',
    };
  }

  const current = await prisma.navigationMenu.findUnique({
    where: { id: input.id },
    select: {
      id: true,
      title: true,
      href: true,
      isVisible: true,
    },
  });

  if (!current) {
    return { ok: false, error: '수정할 메뉴를 찾을 수 없습니다.' };
  }

  await prisma.$transaction(async (tx) => {
    await tx.navigationMenu.update({
      where: { id: current.id },
      data: {
        title,
        href,
        isVisible: input.isVisible,
      },
    });

    await tx.adminAuditLog.create({
      data: {
        actorId: actor.id,
        action: 'NAVIGATION_UPDATE',
        targetType: 'NavigationMenu',
        targetId: current.id,
        metadata: {
          before: current,
          after: {
            title,
            href,
            isVisible: input.isVisible,
          },
        },
      },
    });
  });

  refreshNavigation();
  return { ok: true };
}

export async function moveNavigationItem(
  input: MoveNavigationInput,
): Promise<ActionResult> {
  const actor = await getAdminActor();

  if (!actor) {
    return { ok: false, error: '메뉴를 관리할 권한이 없습니다.' };
  }

  const current = await prisma.navigationMenu.findUnique({
    where: { id: input.id },
    select: {
      id: true,
      title: true,
      parentId: true,
      sortOrder: true,
    },
  });

  if (!current) {
    return { ok: false, error: '순서를 바꿀 메뉴를 찾을 수 없습니다.' };
  }

  const siblings = await prisma.navigationMenu.findMany({
    where: { parentId: current.parentId },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    select: {
      id: true,
      title: true,
      sortOrder: true,
    },
  });

  const currentIndex = siblings.findIndex((item) => item.id === current.id);
  const nextIndex = input.direction === 'UP' ? currentIndex - 1 : currentIndex + 1;

  if (currentIndex < 0 || nextIndex < 0 || nextIndex >= siblings.length) {
    return { ok: true };
  }

  const target = siblings[nextIndex];

  await prisma.$transaction(async (tx) => {
    await tx.navigationMenu.update({
      where: { id: current.id },
      data: { sortOrder: target.sortOrder },
    });

    await tx.navigationMenu.update({
      where: { id: target.id },
      data: { sortOrder: current.sortOrder },
    });

    await tx.adminAuditLog.create({
      data: {
        actorId: actor.id,
        action: 'NAVIGATION_REORDER',
        targetType: 'NavigationMenu',
        targetId: current.id,
        metadata: {
          title: current.title,
          direction: input.direction,
          swappedWith: target.title,
          parentId: current.parentId,
        },
      },
    });
  });

  refreshNavigation();
  return { ok: true };
}
