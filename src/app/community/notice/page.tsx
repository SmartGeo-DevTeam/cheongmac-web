import Inner from '@/app/_components/inner';
import { getNoticeManagedContent } from '@/_lib/managed-pages';
import type { Metadata } from 'next';
import NoticeList from './_components/notice-list';
import NoticePageHeader from './_components/notice-page-header';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '공지사항 | 청맥병원',
  description: '청맥병원의 주요 공지와 휴진 일정을 안내합니다.',
};

export default async function NoticePage() {
  const content = await getNoticeManagedContent();

  return (
    <div>
      <NoticePageHeader />
      <Inner usePaddingHorizontal>
        <NoticeList
          items={content.notices}
          doctorLeaves={content.doctorLeaves}
        />
      </Inner>
    </div>
  );
}
