import Inner from '@/app/_components/inner';
import { getNoticeManagedDetail } from '@/_lib/managed-pages';
import { notFound } from 'next/navigation';
import NoticeDetail from '../_components/notice-detail';
import NoticePageHeader from '../_components/notice-page-header';

export const dynamic = 'force-dynamic';

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getNoticeManagedDetail(id);

  if (!result) notFound();

  return (
    <div>
      <NoticePageHeader titleAs="div" />
      <Inner usePaddingHorizontal>
        <NoticeDetail
          detail={result.detail}
          previous={result.previous}
          next={result.next}
        />
      </Inner>
    </div>
  );
}
