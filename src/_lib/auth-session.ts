import { auth, type AuthSession } from '@/_lib/auth';
import { headers } from 'next/headers';

export async function getCurrentSession(): Promise<AuthSession | null> {
  return auth.api.getSession({
    headers: await headers(),
    query: {
      // 회원 전환/권한 변경 직후에도 최신 user additionalFields를 사용합니다.
      disableCookieCache: true,
    },
  });
}

export function isActiveMember(session: AuthSession | null) {
  return session?.user.membershipStatus === 'ACTIVE';
}
