'use client';

import { Share2 } from 'lucide-react';
import { useState } from 'react';

export default function TreatmentCaseShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // 사용자가 공유 창을 닫은 경우에는 별도 처리를 하지 않습니다.
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="치료사례 공유"
      title={copied ? '링크가 복사되었습니다.' : '공유하기'}
      className="grid size-11 place-items-center rounded-full bg-[#F5F6F7] text-[#565B61] transition hover:bg-[#ECEEEF] xl:size-14"
    >
      <Share2 className="size-5 xl:size-6" strokeWidth={1.7} />
    </button>
  );
}
