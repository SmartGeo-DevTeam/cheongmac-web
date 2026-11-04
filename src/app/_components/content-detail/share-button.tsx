'use client';

import { Check, Share2 } from 'lucide-react';
import { useState } from 'react';

/** 상세 콘텐츠에서 함께 사용하는 공유 버튼입니다. */
export default function ContentDetailShareButton({
  title,
  ariaLabel,
}: {
  title: string;
  ariaLabel: string;
}) {
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
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;

      // Web Share API 실패 시 클립보드 복사를 한 번 시도합니다.
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
      } catch {
        // 공유 기능을 지원하지 않는 환경에서도 페이지를 사용할 수 있습니다.
      }
    }
  };

  return (
    <div className="col-start-2 col-end-3 row-start-1 row-end-3 flex items-end">
      <button
        type="button"
        onClick={handleShare}
        aria-label={copied ? '링크가 복사되었습니다' : ariaLabel}
        title={copied ? '링크가 복사되었습니다.' : '공유하기'}
        className="flex size-9 items-center justify-center rounded-full bg-subtle text-primary transition-colors hover:bg-gray
        xl:size-15"
      >
        {copied ? (
          <Check className="size-5 xl:size-6" aria-hidden="true" />
        ) : (
          <Share2 className="size-5 xl:size-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
