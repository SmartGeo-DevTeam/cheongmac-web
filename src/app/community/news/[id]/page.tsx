import { buttonClassName } from '@/app/_components/ui/button';
import PageHeader from '@/app/_components/ui/page-header';
import ShareButton from '@/app/community/news/[id]/_components/share-button';
import {
  getNewsClientById,
  type NewsClient,
} from '@/app/community/news/_data/clients';
import {
  NEWS_ITEMS,
  getNewsBody,
  getNewsItemById,
  getNewsItemSiblings,
} from '@/app/community/news/_data/news';
import { ChevronDown, ChevronUp, Newspaper } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type NewsDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string | string[] }>;
};

const DEFAULT_NEWS_LIST_URL = '/community/news';

function getSafeNewsListUrl(value?: string | string[]) {
  const rawValue = Array.isArray(value) ? value[0] : value;

  if (!rawValue || !rawValue.startsWith('/community/news')) {
    return DEFAULT_NEWS_LIST_URL;
  }

  try {
    const url = new URL(rawValue, 'https://cheongmac.local');

    if (
      url.origin !== 'https://cheongmac.local' ||
      url.pathname !== '/community/news'
    ) {
      return DEFAULT_NEWS_LIST_URL;
    }

    return `${url.pathname}${url.search}`;
  } catch {
    return DEFAULT_NEWS_LIST_URL;
  }
}

function buildNewsDetailHref(id: number, returnTo: string) {
  return {
    pathname: `/community/news/${id}`,
    query: { from: returnTo },
  };
}

export function generateStaticParams() {
  return NEWS_ITEMS.map((item) => ({ id: String(item.id) }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getNewsItemById(Number(id));

  if (!item) {
    return {
      title: '청맥뉴스 | 청맥병원',
    };
  }

  return {
    title: `${item.title} | 청맥뉴스 | 청맥병원`,
    description: item.excerpt,
  };
}

export default async function NewsDetailPage({
  params,
  searchParams,
}: NewsDetailPageProps) {
  const [{ id }, detailSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const newsId = Number(id);

  if (!Number.isInteger(newsId)) notFound();

  const item = getNewsItemById(newsId);

  if (!item) notFound();

  const body = getNewsBody(item);
  const { previous, next } = getNewsItemSiblings(item.id);
  const client = getNewsClientById(item.clientId);
  const returnTo = getSafeNewsListUrl(detailSearchParams.from);

  return (
    <div>
      <PageHeader
        id="news-detail-page-header"
        breadcrumbs={[
          { label: '병원소식', href: '/community/notice' },
          { label: '청맥뉴스' },
        ]}
        title="청맥뉴스"
      />

      <article className="mx-auto mt-8 w-full max-w-7xl px-5 xl:mt-14">
        <header className="border-b border-[#E5E7EB] pb-5 xl:pb-6">
          <NewsClientBrand client={client} fallbackName={item.source} />

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

        {item.originalArticleUrl ? (
          <div className="mt-5 flex justify-center xl:mt-7">
            <a
              href={item.originalArticleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-3 rounded-md bg-[#F5F6F7] px-5 text-xs font-medium text-[#454B53] transition hover:bg-[#ECEEEF] xl:h-12 xl:px-7 xl:text-sm"
            >
              기사 원문 보기
              <Newspaper className="size-4" strokeWidth={1.5} />
            </a>
          </div>
        ) : null}

        <div className="mx-auto mt-6 max-w-[520px] xl:mt-8">
          <div className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden bg-[#F5F6F7] xl:max-w-[390px]">
            <Image
              src={item.imageSrc}
              alt={item.title}
              fill
              priority
              sizes="(min-width: 1280px) 390px, calc(100vw - 40px)"
              className="object-cover"
            />
          </div>

          <div className="mt-6 space-y-6 text-center xl:mt-7 xl:space-y-7">
            {body.map((paragraph, index) => (
              <p
                key={`${item.id}-${index}`}
                className="break-keep text-[13px] leading-[1.9] tracking-[-0.035em] text-[#40464E] xl:text-[15px] xl:leading-[1.9]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      <nav
        aria-label="이전글 다음글"
        className="mx-auto mt-10 w-full max-w-7xl border-y border-[#E5E7EB] px-5 xl:mt-14"
      >
        <div className="divide-y divide-[#E5E7EB] xl:grid xl:grid-cols-2 xl:divide-x xl:divide-y-0">
          <NewsSiblingLink
            direction="previous"
            item={previous}
            returnTo={returnTo}
          />
          <NewsSiblingLink direction="next" item={next} returnTo={returnTo} />
        </div>
      </nav>

      <div className="mt-7 mb-12 flex justify-center xl:mt-8 xl:mb-20">
        <Link
          href={returnTo}
          className={buttonClassName({ variant: 'outline', size: 'md' })}
        >
          목록보기
        </Link>
      </div>
    </div>
  );
}

function NewsClientBrand({
  client,
  fallbackName,
}: {
  client?: NewsClient;
  fallbackName?: string;
}) {
  const name = client?.name ?? fallbackName ?? '청맥병원';

  if (client?.logoSrc) {
    return (
      <div className="flex min-h-6 items-center">
        <Image
          src={client.logoSrc}
          alt={client.name}
          width={client.logoWidth ?? 120}
          height={client.logoHeight ?? 28}
          className="h-5 w-auto max-w-[140px] object-contain object-left xl:h-6 xl:max-w-[170px]"
        />
      </div>
    );
  }

  return (
    <p className="text-[13px] font-bold tracking-[-0.03em] text-[#252B33] xl:text-base">
      {name}
    </p>
  );
}

function NewsSiblingLink({
  direction,
  item,
  returnTo,
}: {
  direction: 'previous' | 'next';
  item?: (typeof NEWS_ITEMS)[number];
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
      href={buildNewsDetailHref(item.id, returnTo)}
      className="flex min-h-12 items-center gap-3 py-3 text-[11px] text-[#777E87] transition hover:text-[#006553] xl:min-h-14 xl:px-4 xl:text-xs"
    >
      <Icon className="size-3.5 shrink-0" strokeWidth={1.5} />
      <span className="shrink-0">{label}</span>
      <span className="truncate font-medium text-[#535962]">{item.title}</span>
    </Link>
  );
}
