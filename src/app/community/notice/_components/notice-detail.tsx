'use client';

import { buttonClassName } from '@/app/_components/ui/button';
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
import type { NoticeDetail as NoticeDetailData } from '../_data';

function CategoryBadge({ holiday = false }: { holiday?: boolean }) {
  return (
    <span
      className={`inline-flex h-8 items-center rounded-[4px] px-2.5 text-base font-semibold xl:h-9 xl:px-3 xl:text-xl ${
        holiday
          ? 'bg-[#FFF0F0] text-[#FF625E]'
          : 'bg-[#F0F7F5] text-[#317C6A]'
      }`}
    >
      {holiday ? '휴진' : '공지'}
    </span>
  );
}

export default function NoticeDetail({
  detail,
  previous,
  next,
}: {
  detail: NoticeDetailData;
  previous?: NoticeDetailData;
  next?: NoticeDetailData;
}) {
  const pathname = usePathname();
  const parentPath = pathname.replace(/\/[^/]+\/?$/, '') || '/';
  const previousItem = previous ?? detail;
  const nextItem = next ?? detail;

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
    <article
      aria-labelledby="notice-detail-title"
      className="mx-auto w-full max-w-7xl pb-20 xl:pb-28"
    >
      <header className="border-y border-[#E5E7E9] py-5 xl:border-t-0 xl:pb-5 xl:pt-0">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <CategoryBadge holiday={detail.kind === 'holiday'} />
            <h1
              id="notice-detail-title"
              className="mt-3 truncate text-2xl font-semibold tracking-[-0.035em] text-[#282D32] xl:text-3xl"
            >
              {detail.title}
            </h1>
            <p className="mt-2 text-sm text-[#ADB2B7] xl:text-xl">{detail.date}</p>
          </div>

          <button
            type="button"
            onClick={share}
            aria-label="공지사항 공유하기"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F4F5F6] text-[#4E545B] xl:h-14 xl:w-14"
          >
            <Share2 size={15} strokeWidth={1.5} className="size-5 xl:size-6" />
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
          <div className="mx-auto mt-3 max-w-3xl text-base font-bold leading-[1.55] text-[#3A3F44] xl:mt-6 xl:text-2xl">
            {detail.lead.map((line, lineIndex) => (
              <p key={line}>
                <span className={lineIndex === detail.lead!.length - 1 ? 'bg-[#FFF1A5] px-1' : ''}>
                  {line}
                </span>
              </p>
            ))}
          </div>
        ) : null}

        <div className="mx-auto mt-4 max-w-5xl space-y-5 whitespace-pre-line break-keep text-base leading-[1.75] tracking-[-0.02em] text-[#3E4348] xl:mt-10 xl:space-y-8 xl:text-xl xl:leading-[1.85]">
          {detail.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {detail.emphasis ? (
          <p className="mt-8 text-base font-semibold text-[#2E3338] xl:mt-10 xl:text-xl">
            {detail.emphasis}
          </p>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-[4px] border border-[#E4E6E8]">
        <div className="grid min-h-[88px] grid-cols-[96px_1fr] xl:min-h-[108px] xl:grid-cols-[150px_1fr]">
          <div className="grid place-items-center bg-[#F6F7F8] text-base font-semibold xl:text-xl text-[#555B61]">
            첨부파일
          </div>
          <div className="flex flex-col justify-center gap-2 px-4 text-base text-[#454A50] xl:px-6 xl:text-xl">
            <a href="#" onClick={(event) => event.preventDefault()} className="flex items-center gap-2">
              <Link2 className="size-5 xl:size-6" strokeWidth={1.7} />
              첨부파일.xls
            </a>
            <a href="#" onClick={(event) => event.preventDefault()} className="flex items-center gap-2">
              <Link2 className="size-5 xl:size-6" strokeWidth={1.7} />
              첨부파일.pdf
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 grid border-y border-[#E4E6E8] text-base text-[#8D9298] xl:grid-cols-2 xl:text-xl">
        <Link
          href={`${parentPath}/${previousItem.id}`}
          className="flex min-h-[60px] items-center gap-3 border-b border-[#E4E6E8] px-3 xl:border-b-0 xl:border-r"
        >
          <ChevronLeft className="size-5 xl:size-6" />
          <span className="shrink-0">이전글</span>
          <strong className="truncate font-medium text-[#5A5F65]">{previousItem.title}</strong>
        </Link>
        <Link
          href={`${parentPath}/${nextItem.id}`}
          className="flex min-h-[60px] items-center gap-3 px-3 xl:flex-row-reverse xl:justify-end"
        >
          <ChevronRight className="size-5 xl:hidden" />
          <ChevronDown className="hidden size-6 xl:block" />
          <span className="shrink-0">다음글</span>
          <strong className="truncate font-medium text-[#5A5F65]">{nextItem.title}</strong>
        </Link>
      </div>

      <div className="mt-6 flex justify-center xl:mt-8">
        <Link
          href={parentPath}
          className={buttonClassName({ variant: 'outline', size: 'lg' })}
        >
          목록보기
        </Link>
      </div>
    </article>
  );
}
