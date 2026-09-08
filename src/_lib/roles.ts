export const USER_ROLES = ['MEMBER', 'EDITOR', 'ADMIN', 'SUPER_ADMIN'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const CONTENT_EDITOR_ROLES: readonly UserRole[] = [
  'EDITOR',
  'ADMIN',
  'SUPER_ADMIN',
];

export const ADMIN_ROLES: readonly UserRole[] = ['ADMIN', 'SUPER_ADMIN'];

export function normalizeRole(value: string | null | undefined): UserRole {
  return USER_ROLES.includes(value as UserRole) ? (value as UserRole) : 'MEMBER';
}

export function canEditContent(role: string | null | undefined) {
  return CONTENT_EDITOR_ROLES.includes(normalizeRole(role));
}

export function canAccessAdmin(role: string | null | undefined) {
  return ADMIN_ROLES.includes(normalizeRole(role));
}
