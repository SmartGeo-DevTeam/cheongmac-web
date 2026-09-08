import { auth, type AuthSession } from '@/_lib/auth';
import { headers } from 'next/headers';

export async function getCurrentSession(): Promise<AuthSession | null> {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export function isActiveMember(session: AuthSession | null) {
  return session?.user.membershipStatus === 'ACTIVE';
}
