import PageHeader from '@/app/_components/common/page-header';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NoticeDetail from '../_components/detail';
import { getNotices } from '../_sections/list/data';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ returnTo?: string | string[] }>;
};

/** 목록으로 돌아갈 주소는 공지사항 목록 내부로만 제한합니다. */
function getReturnTo(value: string | string[] | undefined): string {
  if (typeof value !== 'string') return '/community/notice';

  try {
    const parsed = new URL(value, 'https://cheongmac.example');
    if (
      parsed.origin !== 'https://cheongmac.example' ||
      parsed.pathname !== '/community/notice' ||
      parsed.hash
    ) {
      return '/community/notice';
    }

    const params = new URLSearchParams();
    const query = parsed.searchParams.get('q');
    const page = Number(parsed.searchParams.get('page') ?? 1);

    if (query?.trim()) params.set('q', query.trim());
    if (Number.isSafeInteger(page) && page > 1) {
      params.set('page', String(page));
    }

    const search = params.toString();
    return search ? `/community/notice?${search}` : '/community/notice';
  } catch {
    return '/community/notice';
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const notices = await getNotices();
  const item = notices.find((notice) => notice.id === id);

  return {
    title: item ? `${item.title} | 공지사항 | 청맥병원` : '공지사항 | 청맥병원',
  };
}

export default async function CommunityNoticeDetailPage({
  params,
  searchParams,
}: Props) {
  const [{ id }, query, notices] = await Promise.all([
    params,
    searchParams,
    getNotices(),
  ]);

  // 외부 링크로만 이동하는 항목은 이 상세 페이지의 이전/다음글에서 제외합니다.
  const orderedNotices = notices.filter((item) => !item.isExternal && !item.href).sort(
    (a, b) =>
      Number(Boolean(b.isPinned)) - Number(Boolean(a.isPinned)) ||
      b.date.localeCompare(a.date) ||
      a.id.localeCompare(b.id),
  );
  const index = orderedNotices.findIndex((item) => item.id === id);
  if (index < 0) notFound();

  const returnTo = getReturnTo(query.returnTo);
  const current = orderedNotices[index];

  return (
    <>
      <PageHeader title="공지사항" />
      <NoticeDetail
        item={current}
        previous={orderedNotices[index - 1] ?? null}
        next={orderedNotices[index + 1] ?? null}
        returnTo={returnTo}
      />
    </>
  );
}
