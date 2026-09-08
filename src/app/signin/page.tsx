import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import { safeCallbackPath } from '@/_lib/auth-utils';
import SignInPanel from './sign-in-panel';
import { redirect } from 'next/navigation';

type PageProps = {
  searchParams: Promise<{
    callbackURL?: string;
    error?: string;
  }>;
};

export default async function SignIn({ searchParams }: PageProps) {
  const params = await searchParams;
  const callbackURL = safeCallbackPath(params.callbackURL);
  const session = await getCurrentSession();

  if (isActiveMember(session)) {
    redirect(callbackURL);
  }

  if (session) {
    redirect(`/join?callbackURL=${encodeURIComponent(callbackURL)}`);
  }

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-56px)] w-full max-w-7xl items-center justify-center px-5 py-16 xl:min-h-[calc(100dvh-80px)]">
      <SignInPanel callbackURL={callbackURL} error={params.error} />
    </section>
  );
}
