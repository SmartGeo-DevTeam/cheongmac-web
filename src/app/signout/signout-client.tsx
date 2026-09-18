'use client';

import { authClient } from '@/_lib/auth-client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function SignOutClient({
  callbackURL,
  reason,
}: {
  callbackURL: string;
  reason?: string;
}) {
  const startedRef = useRef(false);
  const [error, setError] = useState('');

  const signOut = useCallback(async () => {
    setError('');

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setError('로그아웃 처리에 실패했습니다. 다시 시도해주세요.');
        return;
      }

      // Client Router cache에 이전 세션이 남지 않도록 전체 navigation으로 이동합니다.
      window.location.replace(callbackURL);
    } catch {
      setError('로그아웃 처리에 실패했습니다. 다시 시도해주세요.');
    }
  }, [callbackURL]);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    void signOut();
  }, [signOut]);

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-56px)] w-full max-w-7xl items-center justify-center px-5 py-16 xl:min-h-[calc(100dvh-80px)]">
      <div className="w-full max-w-[460px] rounded-3xl border border-[#ECEDEE] bg-white px-6 py-9 text-center shadow-[0_18px_60px_rgba(0,0,0,0.08)] xl:px-9 xl:py-11">
        <div className="text-sm font-semibold tracking-[0.12em] text-cm-orange">
          CHEONGMAC
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-[#222222]">
          로그아웃
        </h1>

        <div className="mt-4 break-keep text-sm leading-6 text-[#777777]">
          {reason === 'membership_incomplete'
            ? '회원 전환이 완료되지 않아 임시 로그인 세션을 종료하고 있습니다.'
            : '로그인 세션을 안전하게 종료하고 있습니다.'}
        </div>

        {!error ? (
          <div className="mt-7 text-sm font-semibold text-[#555555]">
            잠시만 기다려주세요.
          </div>
        ) : (
          <div className="mt-7 space-y-3">
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
            <button
              type="button"
              onClick={() => {
                startedRef.current = true;
                void signOut();
              }}
              className="h-12 w-full rounded-xl bg-[#18181B] text-sm font-semibold text-white hover:bg-[#27272A]"
            >
              다시 로그아웃
            </button>
            <Link
              href="/"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-[#E4E4E7] text-sm font-semibold text-[#52525B]"
            >
              홈으로 이동
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
