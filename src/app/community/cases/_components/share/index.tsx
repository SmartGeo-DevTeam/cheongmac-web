'use client';

import { Share2 } from 'lucide-react';
import { useState } from 'react';

export default function CasesShare() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url: location.href });
      } else {
        await navigator.clipboard.writeText(location.href);
        setCopied(true);
      }
    } catch {
      // 사용자가 공유 창을 닫은 경우 오류 메시지를 노출하지 않습니다.
    }
  };

  return (
    <div className="col-start-2 col-end-3 row-start-1 row-end-3 flex items-end">
      <button
        type="button"
        onClick={handleShare}
        aria-label="치료 사례 공유하기"
        title={copied ? '링크가 복사되었습니다.' : '공유하기'}
        className="flex justify-center items-center size-9 rounded-full bg-subtle
        xl:size-15"
      >
        <Share2
          className="size-5
          xl:size-6"
        />
      </button>
    </div>
  );
}
