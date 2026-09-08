'use client';

import { authClient } from '@/_lib/auth-client';
import { useState } from 'react';

const PROVIDERS = [
  { id: 'google', label: 'Google로 계속하기', mark: 'G', className: 'border-[#E5E7EB] bg-white text-[#202124]' },
  { id: 'naver', label: '네이버로 계속하기', mark: 'N', className: 'border-[#03C75A] bg-[#03C75A] text-white' },
  { id: 'kakao', label: '카카오로 계속하기', mark: 'K', className: 'border-[#FEE500] bg-[#FEE500] text-[#191919]' },
] as const;

type Props = {
  callbackURL: string;
  error?: string;
};

export default function SignInPanel({ callbackURL, error }: Props) {
  const [pendingProvider, setPendingProvider] = useState<string | null>(null);
  const [clientError, setClientError] = useState('');

  const handleSignIn = async (provider: (typeof PROVIDERS)[number]['id']) => {
    setPendingProvider(provider);
    setClientError('');

    const completeURL = `/auth/complete?callbackURL=${encodeURIComponent(callbackURL)}`;
    const result = await authClient.signIn.social({
      provider,
      callbackURL: completeURL,
      errorCallbackURL: `/signin?callbackURL=${encodeURIComponent(callbackURL)}&error=social_login`,
    });

    if (result.error) {
      setClientError('로그인 연결에 실패했습니다. OAuth 설정을 확인해주세요.');
      setPendingProvider(null);
    }
  };

  return (
    <div className="w-full max-w-[460px] rounded-3xl border border-[#ECEDEE] bg-white px-6 py-9 shadow-[0_18px_60px_rgba(0,0,0,0.08)] xl:px-9 xl:py-11">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-[0.12em] text-cm-orange">CHEONGMAC</p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-[#222222]">로그인</h1>
        <p className="mt-3 break-keep text-sm leading-6 text-[#777777]">
          청맥병원 회원 서비스는 소셜 계정으로 간편하게 이용할 수 있습니다.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {PROVIDERS.map((provider) => (
          <button
            key={provider.id}
            type="button"
            disabled={Boolean(pendingProvider)}
            onClick={() => handleSignIn(provider.id)}
            className={`relative flex h-14 w-full items-center justify-center rounded-xl border px-5 text-[15px] font-semibold transition disabled:cursor-wait disabled:opacity-60 ${provider.className}`}
          >
            <span className="absolute left-5 grid size-8 place-items-center rounded-full bg-white/85 text-sm font-black text-black/80">
              {provider.mark}
            </span>
            {pendingProvider === provider.id ? '연결 중...' : provider.label}
          </button>
        ))}
      </div>

      {error || clientError ? (
        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-600">
          {clientError || '소셜 로그인 중 문제가 발생했습니다. 다시 시도해주세요.'}
        </p>
      ) : null}

      <p className="mt-7 break-keep text-center text-xs leading-5 text-[#999999]">
        최초 로그인 시 본명·연락처 확인 및 필수 약관 동의 후 홈페이지 회원으로 전환됩니다.
      </p>
    </div>
  );
}
