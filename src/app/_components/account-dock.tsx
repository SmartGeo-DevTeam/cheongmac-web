'use client';

import { authClient } from '@/_lib/auth-client';
import { canAccessAdmin, canEditContent } from '@/_lib/roles';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AccountDock() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();
  const sessionUserId = session?.user.id;

  useEffect(() => {
    if (!session) return;

    // Root layout은 클라이언트 라우팅에서 유지되므로 /join 완료 후에도
    // 로그인 직후의 PENDING 세션 값이 화면에 남을 수 있습니다.
    // 경로가 바뀔 때 DB에서 최신 user 필드를 다시 읽어 도크 상태를 갱신합니다.
    void refetch();
  }, [pathname, refetch, sessionUserId]);

  if (isPending || !session) {
    return null;
  }

  const isActive = session.user.membershipStatus === 'ACTIVE';
  const role = session.user.role;

  return (
    <aside className="fixed bottom-5 right-5 z-[70] hidden items-center gap-2 rounded-2xl border border-black/10 bg-white/95 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.14)] backdrop-blur xl:flex">
      {!isActive ? (
        <Link
          href="/join"
          className="rounded-xl bg-cm-orange px-4 py-2 text-sm font-semibold text-white"
        >
          회원정보 입력
        </Link>
      ) : (
        <>
          <span className="max-w-36 truncate px-2 text-sm font-semibold text-[#333333]">
            {session.user.name}님
          </span>
          {canEditContent(role) ? (
            <Link
              href="/admin/content"
              className="rounded-xl bg-[#EEF5F1] px-3 py-2 text-sm font-semibold text-cm-green"
            >
              콘텐츠 편집
            </Link>
          ) : null}
          {canAccessAdmin(role) ? (
            <Link
              href="/admin"
              className="rounded-xl bg-[#F2F2F2] px-3 py-2 text-sm font-semibold text-[#444444]"
            >
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
