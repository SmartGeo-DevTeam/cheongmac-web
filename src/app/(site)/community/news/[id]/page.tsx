import PageHeader from '@/app/_components/common/page-header';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NewsDetail from '@/app/_ui/community/news/[id]/news-detail';
import { getNewsItemById, getNewsItemSiblings } from '@/app/_data/community/news/news';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    returnTo?: string | string[];
    /** 기존 목록 링크(`from`)와의 호환을 위해 유지합니다. */
    from?: string | string[];
  }>;
};

const LIST_PATH = '/community/news';

/** 목록 내 경로/쿼리만 허용하여 외부 주소로 돌아가지 않도록 제한합니다. */
function getReturnTo(value: string | string[] | undefined): string {
  if (typeof value !== 'string') return LIST_PATH;

  try {
    const parsed = new URL(value, 'https://cheongmac.example');
    if (
      parsed.origin !== 'https://cheongmac.example' ||
      parsed.pathname !== LIST_PATH ||
      parsed.hash
    ) {
      return LIST_PATH;
    }

    const params = new URLSearchParams();
    const category = parsed.searchParams.get('category');
    const query = parsed.searchParams.get('q');
    const page = Number(parsed.searchParams.get('page') ?? 1);

    if (category === 'inside' || category === 'press') {
      params.set('category', category);
    }
    if (query?.trim()) params.set('q', query.trim());
    if (Number.isSafeInteger(page) && page > 1) {
      params.set('page', String(page));
    }

    const search = params.toString();
    return search ? `${LIST_PATH}?${search}` : LIST_PATH;
  } catch {
    return LIST_PATH;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const newsId = Number(id);
  const item = Number.isSafeInteger(newsId) ? getNewsItemById(newsId) : null;

  return {
    title: item ? `${item.title} | 청맥뉴스 | 청맥병원` : '청맥뉴스 | 청맥병원',
    description: item?.excerpt,
  };
}

export default async function CommunityNewsDetailPage({
  params,
  searchParams,
}: Props) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const newsId = Number(id);
  if (!Number.isSafeInteger(newsId) || newsId < 1) notFound();

  const item = getNewsItemById(newsId);
  if (!item) notFound();

  const { previous, next } = getNewsItemSiblings(newsId);
  const returnTo = getReturnTo(query.returnTo ?? query.from);

  return (
    <>
      <PageHeader title="청맥뉴스" />
      <NewsDetail
        item={item}
        previous={previous ?? null}
        next={next ?? null}
        returnTo={returnTo}
      />
    </>
  );
}
