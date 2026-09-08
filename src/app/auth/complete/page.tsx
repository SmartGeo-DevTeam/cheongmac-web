import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import { safeCallbackPath } from '@/_lib/auth-utils';
import { redirect } from 'next/navigation';

type PageProps = {
  searchParams: Promise<{ callbackURL?: string }>;
};

export default async function AuthCompletePage({ searchParams }: PageProps) {
  const { callbackURL: rawCallbackURL } = await searchParams;
  const callbackURL = safeCallbackPath(rawCallbackURL);
  const session = await getCurrentSession();

  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(callbackURL)}`);
  }

  if (isActiveMember(session)) {
    redirect(callbackURL);
  }

  redirect(`/join?callbackURL=${encodeURIComponent(callbackURL)}`);
}
