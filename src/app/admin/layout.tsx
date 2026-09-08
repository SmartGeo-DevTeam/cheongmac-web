import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import { canAccessAdmin, canEditContent } from '@/_lib/roles';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getCurrentSession();

  if (!session || !isActiveMember(session)) {
    redirect('/signin?callbackURL=/admin');
  }

  if (!canEditContent(session.user.role)) {
    redirect('/');
  }

  return (
    <div className="min-h-[calc(100dvh-80px)] bg-[#F6F7F8] px-5 py-10 xl:py-14">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-cm-orange">CHEONGMAC ADMIN</p>
            <p className="mt-1 text-sm text-[#777777]">{session.user.name} · {session.user.role}</p>
          </div>
          <nav className="flex items-center gap-2 text-sm">
            {canAccessAdmin(session.user.role) ? (
              <Link href="/admin" className="rounded-lg px-3 py-2 hover:bg-[#F4F4F4]">대시보드</Link>
            ) : null}
            <Link href="/admin/content" className="rounded-lg px-3 py-2 hover:bg-[#F4F4F4]">콘텐츠</Link>
            <Link href="/" className="rounded-lg border border-[#E3E3E3] px-3 py-2">사이트 보기</Link>
          </nav>
        </header>
        {children}
      </div>
    </div>
  );
}
