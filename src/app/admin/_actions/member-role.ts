'use server';

import { getCurrentSession } from '@/_lib/auth-session';
import { prisma } from '@/_lib/prisma';
import {
  canManageMemberRoles,
  normalizeRole,
  type UserRole,
} from '@/_lib/roles';
import { revalidatePath } from 'next/cache';

const ASSIGNABLE_ROLES = ['MEMBER', 'EDITOR', 'ADMIN'] as const;
type AssignableRole = (typeof ASSIGNABLE_ROLES)[number];

type UpdateMemberRoleInput = {
  userId: string;
  role: AssignableRole;
};

export type UpdateMemberRoleResult = {
  ok: boolean;
  error?: string;
  role?: UserRole;
};

export type MemberRoleSearchResult = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
};

async function getRoleManager() {
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
    !canManageMemberRoles(actor.role)
  ) {
    return null;
  }

  return actor;
}

export async function searchMembersForRole(
  emailQuery: string,
): Promise<{ ok: boolean; users: MemberRoleSearchResult[]; error?: string }> {
  const actor = await getRoleManager();

  if (!actor) {
    return {
      ok: false,
      users: [],
      error: '회원을 검색할 권한이 없습니다.',
    };
  }

  const query = emailQuery.trim();

  if (query.length < 3) {
    return {
      ok: false,
      users: [],
      error: '이메일을 3자 이상 입력해주세요.',
    };
  }

  const users = await prisma.user.findMany({
    where: {
      membershipStatus: 'ACTIVE',
      role: 'MEMBER',
      email: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 8,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
    },
  });

  return { ok: true, users };
}

export async function updateMemberRole(
  input: UpdateMemberRoleInput,
): Promise<UpdateMemberRoleResult> {
  const actor = await getRoleManager();

  if (!actor) {
    return { ok: false, error: '회원 권한을 변경할 권한이 없습니다.' };
  }

  if (!input.userId || !ASSIGNABLE_ROLES.includes(input.role)) {
    return { ok: false, error: '변경할 권한 값이 올바르지 않습니다.' };
  }

  if (actor.id === input.userId) {
    return {
      ok: false,
      error: '현재 로그인한 자신의 권한은 관리자 화면에서 변경할 수 없습니다.',
    };
  }

  const target = await prisma.user.findUnique({
    where: { id: input.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      membershipStatus: true,
    },
  });

  if (!target) {
    return { ok: false, error: '대상 회원을 찾을 수 없습니다.' };
  }

  if (target.membershipStatus !== 'ACTIVE') {
    return {
      ok: false,
      error: '홈페이지 회원가입을 완료한 회원에게만 권한을 부여할 수 있습니다.',
    };
  }

  const currentRole = normalizeRole(target.role);

  if (currentRole === 'SUPER_ADMIN') {
    return {
      ok: false,
      error: '최고 관리자 권한은 관리자 화면에서 변경할 수 없습니다.',
    };
  }

  const nextRole = normalizeRole(input.role);

  if (currentRole === nextRole) {
    return { ok: true, role: currentRole };
  }

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: target.id },
      data: { role: nextRole },
    });

    await tx.adminAuditLog.create({
      data: {
        actorId: actor.id,
        action: 'USER_ROLE_UPDATE',
        targetType: 'User',
        targetId: target.id,
        metadata: {
          targetName: target.name,
          targetEmail: target.email,
          previousRole: currentRole,
          nextRole,
        },
      },
    });
  });

  revalidatePath('/admin');
  revalidatePath('/admin/members');
  revalidatePath('/admin/roles');

  return { ok: true, role: nextRole };
}
