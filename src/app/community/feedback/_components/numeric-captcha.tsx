'use client';

import { RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { FormTextInput } from '@/app/community/_components/form-fields';

const digitColors = [
  'text-[#9A7ADF]',
  'text-[#4B8DD7]',
  'text-[#FD7740]',
  'text-[#62A5D2]',
  'text-[#5995D0]',
];

type CaptchaData = { challenge: string; token: string };

export default function NumericCaptcha({
  version,
  onTokenChange,
}: {
  version: number;
  onTokenChange: (value: string) => void;
}) {
  const [data, setData] = useState<CaptchaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setData(null);
    setError('');
    onTokenChange('');
    try {
      const response = await fetch('/api/community/feedback/captcha', {
        cache: 'no-store',
        signal,
      });
      const result = (await response.json()) as Partial<CaptchaData> & { message?: string };
      if (!response.ok || !result.challenge || !result.token) {
        throw new Error(result.message ?? '자동입력방지 숫자를 불러오지 못했습니다.');
      }
      if (signal?.aborted) return;
      setData({ challenge: result.challenge, token: result.token });
      onTokenChange(result.token);
    } catch (reason) {
      if (signal?.aborted) return;
      setError(reason instanceof Error ? reason.message : '자동입력방지 로드에 실패했습니다.');
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [onTokenChange]);

  useEffect(() => {
    const controller = new AbortController();
    void refresh(controller.signal);
    return () => controller.abort();
  }, [refresh, version]);

  return (
    <div>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2 xl:max-w-[540px]">
        <div className="flex min-w-0 items-center justify-between gap-1 rounded-md bg-gray-100 px-3">
          {loading ? (
            <span className="text-[12px] text-gray-600">생성 중...</span>
          ) : data ? (
            <span aria-label="자동입력방지 숫자" className="flex select-none items-center gap-0.5 font-mono text-[20px] font-bold tracking-wider xl:text-[24px]">
              {data.challenge.split('').map((digit, index) => (
                <span key={index} className={digitColors[index]}>{digit}</span>
              ))}
            </span>
          ) : (
            <span className="text-[12px] text-danger">불러오기 실패</span>
          )}
          <button
            type="button"
            aria-label="자동입력방지 숫자 새로고침"
            onClick={() => void refresh()}
            disabled={loading}
            className="shrink-0 p-1 text-gray-700 disabled:opacity-50"
          >
            <RefreshCw className="size-4" />
          </button>
        </div>
        <FormTextInput
          name="captchaAnswer"
          aria-label="자동입력방지 숫자 입력"
          autoComplete="off"
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength={5}
          required
          disabled={!data}
          placeholder="숫자를 순서대로 입력하세요"
          className="min-w-0 px-3! text-[12px]! xl:px-4! xl:text-[14px]!"
        />
      </div>
      {error ? <p role="alert" className="mt-2 text-[12px] text-danger">{error}</p> : null}
      <p className="mt-1 text-[11px] text-tertiary">표시된 숫자를 입력해 주세요. (5분 유효)</p>
    </div>
  );
}
