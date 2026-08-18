import Inner from '@/app/_components/inner';
import ShareButton from '@/app/community/notice/[id]/_components/share-button';
import {
  NOTICE_ITEMS,
  getNoticeBody,
  getNoticeItemById,
  getNoticeItemSiblings,
  type NoticeAttachment,
  type NoticeDetailImageAspect,
  type NoticeItem,
} from '@/app/community/notice/_data/notices';
import { ChevronDown, ChevronUp, Home, Link2 } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type NoticeDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string | string[] }>;
};

const DEFAULT_NOTICE_LIST_URL = '/community/notice';

function getSafeNoticeListUrl(value?: string | string[]) {
  const rawValue = Array.isArray(value) ? value[0] : value;

  if (!rawValue || !rawValue.startsWith('/community/notice')) {
    return DEFAULT_NOTICE_LIST_URL;
  }

  try {
    const url = new URL(rawValue, 'https://cheongmac.local');

    if (
      url.origin !== 'https://cheongmac.local' ||
      url.pathname !== '/community/notice'
    ) {
      return DEFAULT_NOTICE_LIST_URL;
    }

    return `${url.pathname}${url.search}`;
  } catch {
    return DEFAULT_NOTICE_LIST_URL;
  }
}

function buildNoticeDetailHref(id: number, returnTo: string) {
  return {
    pathname: `/community/notice/${id}`,
    query: { from: returnTo },
  };
}

function getDetailImageClassName(aspect?: NoticeDetailImageAspect) {
  switch (aspect) {
    case 'tall':
      return 'aspect-[0.58/1] max-w-[330px] xl:max-w-[330px]';
    case 'landscape':
      return 'aspect-[1.5/1] max-w-[620px]';
    case 'square':
      return 'aspect-square max-w-[390px]';
    case 'portrait':
    default:
      return 'aspect-[0.88/1] max-w-[390px]';
  }
}

export function generateStaticParams() {
  return NOTICE_ITEMS.map((item) => ({ id: String(item.id) }));
}

export async function generateMetadata({
  params,
}: NoticeDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getNoticeItemById(Number(id));

  if (!item) {
    return {
      title: '공지사항 | 청맥병원',
    };
  }

  return {
    title: `${item.title} | 공지사항 | 청맥병원`,
    description: `${item.title}에 대한 청맥병원 공지사항입니다.`,
  };
}

export default async function NoticeDetailPage({
  params,
  searchParams,
}: NoticeDetailPageProps) {
  const [{ id }, detailSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const noticeId = Number(id);

  if (!Number.isInteger(noticeId)) notFound();

  const item = getNoticeItemById(noticeId);

  if (!item) notFound();

  const body = getNoticeBody(item);
  const { previous, next } = getNoticeItemSiblings(item.id);
  const returnTo = getSafeNoticeListUrl(detailSearchParams.from);

  return (
    <div className="pt-22 xl:pt-5">
      <Inner usePaddingHorizontal>
        <section>
          <div className="flex items-center text-[11px] text-[#555B63] xl:text-sm">
            <Link href="/" className="flex items-center gap-1">
              <Home className="size-3.5 xl:size-4" strokeWidth={1.8} />
              <span>홈</span>
            </Link>

            <div className="mx-2 h-3.5 w-px bg-[#DDDDDD]" />

            <label className="relative pr-5">
              <span className="sr-only">1차 메뉴</span>
              <select
                aria-label="1차 메뉴"
                defaultValue="소통공간"
                className="appearance-none bg-transparent pr-1 outline-none"
              >
                <option>소통공간</option>
              </select>
              <span className="pointer-events-none absolute right-1 top-1/2 size-1.5 -translate-y-[65%] rotate-45 border-b border-r border-[#777777]" />
            </label>

            <div className="mx-2 h-3.5 w-px bg-[#DDDDDD]" />

            <label className="relative pr-5">
              <span className="sr-only">2차 메뉴</span>
              <select
                aria-label="2차 메뉴"
                defaultValue="공지사항"
                className="appearance-none bg-transparent pr-1 outline-none"
              >
                <option>공지사항</option>
                <option>청맥뉴스</option>
              </select>
              <span className="pointer-events-none absolute right-1 top-1/2 size-1.5 -translate-y-[65%] rotate-45 border-b border-r border-[#777777]" />
            </label>
          </div>

          <header className="mt-10 flex justify-center text-center xl:mt-10">
            <h1 className="text-[26px] font-bold tracking-[-0.04em] text-[#252B33] xl:text-[42px]">
              공지사항
            </h1>
          </header>
        </section>
      </Inner>

      <div className="mt-10 hidden border-t border-[#E8EAED] xl:block" />

      <article className="mx-auto mt-8 w-full max-w-7xl px-5 xl:mt-14">
        <header className="border-b border-[#E5E7EB] pb-5 xl:pb-6">
          <NoticeCategoryBadge item={item} />

          <div className="mt-2 flex items-end justify-between gap-5 xl:mt-2.5">
            <div className="min-w-0">
              <h2 className="break-keep text-[18px] font-semibold leading-[1.45] tracking-[-0.04em] text-[#252B33] xl:text-[22px]">
                {item.title}
              </h2>
              <p className="mt-1 text-[11px] text-[#B0B5BC] xl:text-xs">
                {item.date}
              </p>
            </div>

            <ShareButton title={item.title} />
          </div>
        </header>

        <div className="mx-auto mt-6 max-w-7xl xl:mt-8">
          {item.detailImageSrc ? (
            <div
              className={`relative mx-auto w-full overflow-hidden bg-[#F5F6F7] ${getDetailImageClassName(
                item.detailImageAspect,
              )}`}
            >
              <Image
                src={item.detailImageSrc}
                alt={item.title}
                fill
                priority
                sizes="(min-width: 1280px) 620px, calc(100vw - 40px)"
                className="object-contain"
              />
            </div>
          ) : null}

          <div
            className={`${
              item.detailImageSrc ? 'mt-7 xl:mt-9' : ''
            } space-y-6 text-center xl:space-y-7`}
          >
            {body.map((paragraph, index) => (
              <p
                key={`${item.id}-${index}`}
                className="whitespace-pre-line break-keep text-[13px] leading-[1.9] tracking-[-0.035em] text-[#40464E] xl:text-[15px] xl:leading-[1.9]"
              >
                {paragraph}
              </p>
            ))}

            {item.closingText ? (
              <p className="break-keep pt-1 text-[12px] font-semibold leading-[1.8] tracking-[-0.035em] text-[#454B53] xl:text-[14px]">
                {item.closingText}
              </p>
            ) : null}
          </div>
        </div>

        {item.attachments?.length ? (
          <NoticeAttachments attachments={item.attachments} />
        ) : null}
      </article>

      <nav
        aria-label="이전글 다음글"
        className="mx-auto mt-8 w-full max-w-7xl border-y border-[#E5E7EB] px-5 xl:mt-9"
      >
        <div className="divide-y divide-[#E5E7EB] xl:grid xl:grid-cols-2 xl:divide-x xl:divide-y-0">
          <NoticeSiblingLink
            direction="previous"
            item={previous}
            returnTo={returnTo}
          />
          <NoticeSiblingLink direction="next" item={next} returnTo={returnTo} />
        </div>
      </nav>

      <div className="mt-7 mb-12 flex justify-center xl:mt-8 xl:mb-20">
        <Link
          href={returnTo}
          className="inline-flex h-10 min-w-[96px] items-center justify-center rounded-full border border-[#006553] px-6 text-xs font-semibold text-[#315A50] transition hover:bg-[#006553] hover:text-white xl:h-11 xl:min-w-[110px] xl:text-sm"
        >
          목록보기
        </Link>
      </div>
    </div>
  );
}

function NoticeCategoryBadge({ item }: { item: NoticeItem }) {
  if (item.category === 'holiday') {
    return (
      <span className="inline-flex h-6 items-center rounded-[5px] bg-[#FFF0F0] px-2 text-[11px] font-semibold text-[#F16464] xl:h-7 xl:px-2.5 xl:text-xs">
        휴진
      </span>
    );
  }

  return (
    <span className="inline-flex h-6 items-center rounded-[5px] bg-[#F2F7F5] px-2 text-[11px] font-semibold text-[#558275] xl:h-7 xl:px-2.5 xl:text-xs">
      공지
    </span>
  );
}

function NoticeAttachments({
  attachments,
}: {
  attachments: NoticeAttachment[];
}) {
  return (
    <section className="mt-9 overflow-hidden rounded-[6px] border border-[#E3E6E9] xl:mt-12">
      <div className="grid min-h-[70px] grid-cols-[90px_minmax(0,1fr)] xl:grid-cols-[112px_minmax(0,1fr)]">
        <div className="flex items-center justify-center bg-[#F7F8F8] text-[12px] font-semibold text-[#555C65] xl:text-[13px]">
          첨부파일
        </div>
        <div className="flex flex-col justify-center gap-1.5 px-4 py-3 text-[11px] text-[#454B53] xl:px-5 xl:text-[12px]">
          {attachments.map((attachment) => {
            const content = (
              <>
                <Link2 className="size-3.5 shrink-0" strokeWidth={1.6} />
                <span className="truncate">{attachment.name}</span>
              </>
            );

            return attachment.href ? (
              <a
                key={`${attachment.name}-${attachment.href}`}
                href={attachment.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-w-0 items-center gap-1.5 transition hover:text-[#006553]"
              >
                {content}
              </a>
            ) : (
              <span
                key={attachment.name}
                className="flex min-w-0 items-center gap-1.5"
              >
                {content}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function NoticeSiblingLink({
  direction,
  item,
  returnTo,
}: {
  direction: 'previous' | 'next';
  item?: NoticeItem;
  returnTo: string;
}) {
  const isPrevious = direction === 'previous';
  const label = isPrevious ? '이전글' : '다음글';
  const Icon = isPrevious ? ChevronUp : ChevronDown;

  if (!item) {
    return (
      <div className="flex min-h-12 items-center gap-3 py-3 text-[11px] text-[#A5AAB1] xl:min-h-14 xl:px-4 xl:text-xs">
        <Icon className="size-3.5 shrink-0" strokeWidth={1.5} />
        <span className="shrink-0">{label}</span>
        <span className="truncate">게시물이 없습니다.</span>
      </div>
    );
  }

  return (
    <Link
      href={buildNoticeDetailHref(item.id, returnTo)}
      className="flex min-h-12 items-center gap-3 py-3 text-[11px] text-[#777E87] transition hover:text-[#006553] xl:min-h-14 xl:px-4 xl:text-xs"
    >
      <Icon className="size-3.5 shrink-0" strokeWidth={1.5} />
      <span className="shrink-0">{label}</span>
      <span className="truncate font-medium text-[#535962]">{item.title}</span>
    </Link>
  );
}
