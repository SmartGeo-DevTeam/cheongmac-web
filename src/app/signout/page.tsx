import { safeCallbackPath } from '@/_lib/auth-utils';
import SignOutClient from './signout-client';

type PageProps = {
  searchParams: Promise<{
    callbackURL?: string;
    reason?: string;
  }>;
};

export default async function SignOutPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const rawCallbackURL = safeCallbackPath(
    params.callbackURL,
  );

  const callbackURL =
    rawCallbackURL === '/signout' ||
    rawCallbackURL.startsWith('/signout?')
      ? '/'
      : rawCallbackURL;

  return (
    <SignOutClient
      callbackURL={callbackURL}
      reason={params.reason}
    />
  );
}
