import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import { safeCallbackPath } from '@/_lib/auth-utils';
import MembershipForm from './membership-form';
import { redirect } from 'next/navigation';

type PageProps = {
  searchParams: Promise<{ callbackURL?: string }>;
};

export default async function JoinPage({ searchParams }: PageProps) {
  const { callbackURL: rawCallbackURL } = await searchParams;
  const callbackURL = safeCallbackPath(rawCallbackURL);
  const session = await getCurrentSession();

  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(callbackURL)}`);
  }

  if (isActiveMember(session)) {
    redirect(callbackURL);
  }

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-56px)] w-full max-w-7xl items-center justify-center px-5 py-16 xl:min-h-[calc(100dvh-80px)]">
      <div className="w-full max-w-[520px] rounded-3xl border border-[#ECEDEE] bg-white px-6 py-9 shadow-[0_18px_60px_rgba(0,0,0,0.08)] xl:px-9 xl:py-11">
        <p className="text-sm font-semibold text-cm-orange">최초 1회</p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-[#222222]">홈페이지 회원 전환</h1>
        <p className="mt-3 break-keep text-sm leading-6 text-[#777777]">
          소셜 계정 인증은 완료되었습니다. 아래 회원 정보를 확인하면 청맥병원 홈페이지 회원 기능을 이용할 수 있습니다.
        </p>

        <MembershipForm
          callbackURL={callbackURL}
          defaultName={session.user.name ?? ''}
          email={session.user.email}
        />
      </div>
    </section>
  );
}
