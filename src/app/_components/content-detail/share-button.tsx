'use client';

import { Link, MessageCircle, MessageCircleMore } from 'lucide-react';
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
    <div
      className="mt-5 flex justify-center items-center gap-2
      xl:mt-4 xl:justify-start xl:gap-3"
    >
      <button
        className="size-13 flex justify-center items-center rounded-full bg-base
        xl:size-15"
      >
        <MessageCircle className="fill-black" />
      </button>
      <button
        className="size-13 flex justify-center items-center rounded-full bg-base
        xl:size-15"
      >
        <Link />
      </button>

      <button
        className="size-13 flex justify-center items-center rounded-full bg-base
        xl:size-15"
      >
        <MessageCircleMore />
      </button>
    </div>
  );
}
