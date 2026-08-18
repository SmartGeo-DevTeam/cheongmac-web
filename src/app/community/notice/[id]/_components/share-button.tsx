'use client';

import { Check, Share2 } from 'lucide-react';
import { useState } from 'react';

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;

      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      } catch {
        // 공유/클립보드를 지원하지 않는 환경에서는 별도 동작 없이 종료합니다.
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={copied ? '링크가 복사되었습니다' : '공지사항 공유하기'}
      title={copied ? '링크가 복사되었습니다' : '공유하기'}
      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F5F6F7] text-[#7B818A] transition hover:bg-[#ECEEEF] xl:size-11"
    >
      {copied ? (
        <Check className="size-[18px]" strokeWidth={1.7} />
      ) : (
        <Share2 className="size-[18px]" strokeWidth={1.6} />
      )}
    </button>
  );
}
