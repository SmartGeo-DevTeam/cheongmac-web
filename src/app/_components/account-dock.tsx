'use client';

import { authClient } from '@/_lib/auth-client';
import { canAccessAdmin, canEditContent } from '@/_lib/roles';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AccountDock() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending || !session) {
    return null;
  }

  const isActive = session.user.membershipStatus === 'ACTIVE';
  const role = session.user.role;

  return (
    <aside className="fixed bottom-5 right-5 z-[70] hidden items-center gap-2 rounded-2xl border border-black/10 bg-white/95 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.14)] backdrop-blur xl:flex">
      {!isActive ? (
        <Link href="/join" className="rounded-xl bg-cm-orange px-4 py-2 text-sm font-semibold text-white">
          회원정보 입력
        </Link>
      ) : (
        <>
          <span className="max-w-36 truncate px-2 text-sm font-semibold text-[#333333]">{session.user.name}님</span>
          {canEditContent(role) ? (
            <Link href="/admin/content" className="rounded-xl bg-[#EEF5F1] px-3 py-2 text-sm font-semibold text-cm-green">
              콘텐츠 편집
            </Link>
          ) : null}
          {canAccessAdmin(role) ? (
            <Link href="/admin" className="rounded-xl bg-[#F2F2F2] px-3 py-2 text-sm font-semibold text-[#444444]">
              관리자
            </Link>
          ) : null}
          <button
            type="button"
            onClick={async () => {
              await authClient.signOut();
              router.refresh();
            }}
            className="rounded-xl px-3 py-2 text-sm text-[#777777] hover:bg-[#F5F5F5]"
          >
            로그아웃
          </button>
        </>
      )}
    </aside>
  );
}
