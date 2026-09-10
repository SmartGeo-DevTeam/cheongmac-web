import {
  H1 as TypographyH1,
  P as TypographyP,
} from '@/app/_components/ui/typography';
import { buttonClassName } from '@/app/_components/ui/button';
import NavigationPageHeader from '@/app/_components/ui/navigation-page-header';
import ShareButton from '@/app/community/news/[id]/_components/share-button';
import {
  getNewsClientById,
  type NewsClient,
} from '@/app/community/news/_data/clients';
import type { NewsItem } from '@/app/community/news/_data/news';
import { getNewsManagedDetail } from '@/_lib/managed-pages';
import { ChevronDown, ChevronUp, Newspaper } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

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

function newsBody(item: NewsItem) {
  if (item.body?.length) return item.body;

  return [
    item.excerpt,
    `${item.title}와 관련한 청맥병원의 주요 소식을 안내드립니다. 환자분들이 필요한 정보를 보다 편안하게 확인하실 수 있도록 정확한 내용을 전달하고 있습니다.`,
    '청맥병원은 혈관 질환에 대한 전문적인 진료 경험을 바탕으로 안전하고 신뢰할 수 있는 의료 서비스를 제공하기 위해 지속적으로 노력하고 있습니다.',
    '앞으로도 진료 소식과 병원 주요 활동, 의료 정보를 청맥뉴스를 통해 꾸준히 전해드리겠습니다.',
    '감사합니다.',
  ];
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getNewsManagedDetail(id);

  if (!result) {
    return {
      title: '청맥뉴스 | 청맥병원',
    };
  }

  return {
    title: `${result.item.title} | 청맥뉴스 | 청맥병원`,
    description: result.item.excerpt,
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

  const result = await getNewsManagedDetail(id);
  if (!result) notFound();

  const { item, previous, next } = result;
  const body = newsBody(item);
  const client = getNewsClientById(item.clientId);
  const returnTo = getSafeNewsListUrl(detailSearchParams.from);

  return (
    <div>
      <NavigationPageHeader
        id="news-detail-page-header"
        navigationPath="/community/news"
        titleAs="div"
      />

      <article
        aria-labelledby="news-detail-title"
        className="mx-auto w-full max-w-7xl px-5"
      >
        <header className="border-b border-[#E5E7EB] pb-5 xl:pb-6">
          <NewsClientBrand client={client} fallbackName={item.source} />

          <div className="mt-2 flex items-end justify-between gap-5 xl:mt-2.5">
            <div className="min-w-0">
              <TypographyH1 managed={false}
                id="news-detail-title"
                className="break-keep text-[18px] font-semibold leading-[1.45] tracking-[-0.04em] text-[#252B33] xl:text-[22px]"
              >
                {item.title}
              </TypographyH1>
              <TypographyP managed={false} className="mt-1 text-[11px] text-[#B0B5BC] xl:text-xs">
                {item.date}
              </TypographyP>
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
              <TypographyP
                key={`${item.id}-${index}`}
                className="break-keep text-[13px] leading-[1.9] tracking-[-0.035em] text-[#40464E] xl:text-[15px] xl:leading-[1.9]"
              >
                {paragraph}
              </TypographyP>
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
          <NewsSiblingLink
            direction="next"
            item={next}
            returnTo={returnTo}
          />
        </div>
      </nav>

      <div className="mb-12 mt-7 flex justify-center xl:mb-20 xl:mt-8">
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
    <TypographyP className="text-[13px] font-bold tracking-[-0.03em] text-[#252B33] xl:text-base">
      {name}
    </TypographyP>
  );
}

function NewsSiblingLink({
  direction,
  item,
  returnTo,
}: {
  direction: 'previous' | 'next';
  item?: NewsItem;
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
