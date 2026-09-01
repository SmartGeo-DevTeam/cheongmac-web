import Inner from '@/app/_components/inner';
import type { Metadata } from 'next';
import NoticeList from './_components/notice-list';
import NoticePageHeader from './_components/notice-page-header';

export const metadata: Metadata = {
  title: '공지사항 | 청맥병원',
  description: '청맥병원의 주요 공지와 휴진 일정을 안내합니다.',
};

export default function NoticePage() {
  return (
    <div className="pt-20 xl:pt-5">
      <NoticePageHeader />
      <Inner usePaddingHorizontal>
        <NoticeList />
      </Inner>
    </div>
  );
}
