'use client';

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Link2,
  Share2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getNoticeDetail, notices } from '../_data';

function CategoryBadge({ holiday = false }: { holiday?: boolean }) {
  return (
    <span
      className={`inline-flex h-[22px] items-center rounded-[4px] px-2 text-[10px] font-semibold ${
        holiday
          ? 'bg-[#FFF0F0] text-[#FF625E]'
          : 'bg-[#F0F7F5] text-[#317C6A]'
      }`}
    >
      {holiday ? '휴진' : '공지'}
    </span>
  );
}

export default function NoticeDetail({ id }: { id: string }) {
  const pathname = usePathname();
  const detail = getNoticeDetail(id);
  const parentPath = pathname.replace(/\/[^/]+\/?$/, '') || '/';
  const index = notices.findIndex((notice) => notice.id === detail.id);
  const previous = index > 0 ? notices[index - 1] : notices[notices.length - 1];
  const next = index >= 0 && index < notices.length - 1 ? notices[index + 1] : notices[0];

  const share = async () => {
    const shareData = {
      title: detail.title,
      text: detail.title,
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
      return;
    }

    await navigator.clipboard?.writeText(window.location.href).catch(() => undefined);
  };

  return (
    <article className="mx-auto w-full max-w-[890px] pb-20 pt-8 xl:pb-28 xl:pt-10">
      <header className="border-y border-[#E5E7E9] py-5 xl:border-t-0 xl:pb-5 xl:pt-0">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <CategoryBadge holiday={detail.kind === 'holiday'} />
            <h2 className="mt-2 truncate text-[16px] font-semibold tracking-[-0.035em] text-[#282D32] xl:text-[20px]">
              {detail.title}
            </h2>
            <p className="mt-1 text-[10px] text-[#ADB2B7] xl:text-[11px]">{detail.date}</p>
          </div>

          <button
            type="button"
            onClick={share}
            aria-label="공지사항 공유하기"
            className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-[#F4F5F6] text-[#4E545B] xl:h-[42px] xl:w-[42px]"
          >
            <Share2 size={15} strokeWidth={1.5} className="xl:size-[18px]" />
          </button>
        </div>
      </header>

      <div className="px-0 pb-12 pt-5 text-center xl:pb-14 xl:pt-8">
        {detail.image ? (
          <div
            className={`mx-auto ${
              detail.imageMode === 'poster'
                ? 'w-[70%] max-w-[285px]'
                : 'w-full max-w-[460px]'
            }`}
          >
            <Image
              src={detail.image}
              alt={detail.imageAlt ?? detail.title}
              width={detail.imageMode === 'poster' ? 285 : 528}
              height={detail.imageMode === 'poster' ? 510 : 594}
              className="h-auto w-full"
              priority
            />
          </div>
        ) : null}

        {detail.lead?.length ? (
          <div className="mx-auto mt-3 max-w-[540px] text-[13px] font-bold leading-[1.55] text-[#3A3F44] xl:mt-4 xl:text-[16px]">
            {detail.lead.map((line, lineIndex) => (
              <p key={line}>
                <span className={lineIndex === detail.lead!.length - 1 ? 'bg-[#FFF1A5] px-1' : ''}>
                  {line}
                </span>
              </p>
            ))}
          </div>
        ) : null}

        <div className="mx-auto mt-4 max-w-[720px] space-y-5 whitespace-pre-line break-keep text-[12px] leading-[1.75] tracking-[-0.02em] text-[#3E4348] xl:mt-8 xl:space-y-6 xl:text-[14px] xl:leading-[1.85]">
          {detail.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {detail.emphasis ? (
          <p className="mt-8 text-[11px] font-semibold text-[#2E3338] xl:mt-10 xl:text-[12px]">
            {detail.emphasis}
          </p>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-[4px] border border-[#E4E6E8]">
        <div className="grid min-h-[62px] grid-cols-[82px_1fr] xl:grid-cols-[100px_1fr]">
          <div className="grid place-items-center bg-[#F6F7F8] text-[11px] font-semibold text-[#555B61]">
            첨부파일
          </div>
          <div className="flex flex-col justify-center gap-1 px-4 text-[10px] text-[#454A50] xl:text-[11px]">
            <a href="#" onClick={(event) => event.preventDefault()} className="flex items-center gap-2">
              <Link2 size={13} strokeWidth={1.7} />
              첨부파일.xls
            </a>
            <a href="#" onClick={(event) => event.preventDefault()} className="flex items-center gap-2">
              <Link2 size={13} strokeWidth={1.7} />
              첨부파일.pdf
            </a>
          </div>
        </div>
      </div>

      <div className="mt-5 grid border-y border-[#E4E6E8] text-[10px] text-[#8D9298] xl:grid-cols-2 xl:text-[11px]">
        <Link
          href={`${parentPath}/${previous.id}`}
          className="flex min-h-[44px] items-center gap-3 border-b border-[#E4E6E8] px-3 xl:border-b-0 xl:border-r"
        >
          <ChevronLeft size={13} />
          <span className="shrink-0">이전글</span>
          <strong className="truncate font-medium text-[#5A5F65]">{previous.title}</strong>
        </Link>
        <Link
          href={`${parentPath}/${next.id}`}
          className="flex min-h-[44px] items-center gap-3 px-3 xl:flex-row-reverse xl:justify-end"
        >
          <ChevronRight size={13} className="xl:hidden" />
          <ChevronDown size={13} className="hidden xl:block" />
          <span className="shrink-0">다음글</span>
          <strong className="truncate font-medium text-[#5A5F65]">{next.title}</strong>
        </Link>
      </div>

      <div className="mt-6 flex justify-center xl:mt-8">
        <Link
          href={parentPath}
          className="inline-flex h-[35px] min-w-[82px] items-center justify-center rounded-full border border-[#164E44] px-5 text-[11px] font-semibold text-[#164E44] xl:h-[40px] xl:min-w-[96px] xl:text-[12px]"
        >
          목록보기
        </Link>
      </div>
    </article>
  );
}
