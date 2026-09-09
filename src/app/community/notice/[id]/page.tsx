import Inner from '@/app/_components/inner';
import NoticeDetail from '../_components/notice-detail';
import NoticePageHeader from '../_components/notice-page-header';

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <NoticePageHeader titleAs="div" />
      <Inner usePaddingHorizontal>
        <NoticeDetail id={id ?? 'naver-reservation-open'} />
      </Inner>
    </div>
  );
}
