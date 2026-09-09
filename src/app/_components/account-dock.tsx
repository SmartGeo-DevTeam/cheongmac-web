'use client';

import { authClient } from '@/_lib/auth-client';
import { canAccessAdmin, canEditContent } from '@/_lib/roles';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AccountDock() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();
  const [isHydrated, setIsHydrated] = useState(false);
  const sessionUserId = session?.user.id;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || !session) return;

    // Root layout은 클라이언트 라우팅에서 유지되므로 /join 완료 후에도
    // 로그인 직후의 PENDING 세션 값이 화면에 남을 수 있습니다.
    // hydration 완료 후 경로가 바뀔 때 DB에서 최신 user 필드를 다시 읽어
    // 도크 상태를 갱신합니다.
    void refetch();
  }, [isHydrated, pathname, refetch, sessionUserId]);

  /*
   * Better Auth의 클라이언트 세션은 브라우저에서 먼저 복원될 수 있습니다.
   * 서버 렌더에서는 session이 없고 클라이언트 첫 렌더에서는 session이 있으면
   * null ↔ aside가 달라져 hydration mismatch가 발생합니다.
   *
   * 따라서 서버 렌더와 브라우저의 첫 렌더는 항상 null로 맞추고,
   * hydration이 끝난 뒤에만 AccountDock UI를 표시합니다.
   */
  if (!isHydrated || isPending || !session) {
    return null;
  }

  const isActive = session.user.membershipStatus === 'ACTIVE';
  const role = session.user.role;

  return (
    <aside
      id="account-dock"
      className="fixed bottom-5 right-5 z-[70] hidden items-center gap-2 rounded-2xl border border-black/10 bg-white/95 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.14)] backdrop-blur xl:flex"
    >
      {!isActive ? (
        <Link
          id="account-dock-complete-membership"
          href="/join"
          className="rounded-xl bg-cm-orange px-4 py-2 text-sm font-semibold text-white"
        >
          회원정보 입력
        </Link>
      ) : (
        <>
          <span
            id="account-dock-user"
            className="max-w-36 truncate px-2 text-sm font-semibold text-[#333333]"
          >
            {session.user.name}님
          </span>

          {canEditContent(role) ? (
            <Link
              id="account-dock-content"
              href="/admin/content"
              className="rounded-xl bg-[#EEF5F1] px-3 py-2 text-sm font-semibold text-cm-green"
            >
              콘텐츠 편집
            </Link>
          ) : null}

          {canAccessAdmin(role) ? (
            <Link
              id="account-dock-admin"
              href="/admin"
              className="rounded-xl bg-[#F2F2F2] px-3 py-2 text-sm font-semibold text-[#444444]"
            >
              관리자
            </Link>
          ) : null}

          <button
            id="account-dock-sign-out"
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
