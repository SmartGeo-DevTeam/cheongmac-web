'use client';

import Inner from '@/app/_components/inner';
import { useParams } from 'next/navigation';
import NoticeDetail from '../_components/notice-detail';
import NoticePageHeader from '../_components/notice-page-header';

export default function NoticeDetailPage() {
  const params = useParams<Record<string, string | string[]>>();
  const rawId = Object.values(params)[0];
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  return (
    <div>
      <NoticePageHeader />
      <Inner usePaddingHorizontal>
        <NoticeDetail id={id ?? 'naver-reservation-open'} />
      </Inner>
    </div>
  );
}
