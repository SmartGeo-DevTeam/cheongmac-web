import PageHeader from '@/app/_components/common/page-header';
import { ReactNode } from 'react';
import NoticeList from '@/app/_ui/community/notice/notice-list';
import NoticeClinicClosures from '@/app/_ui/community/notice/clinic-closures';

export default function CommunityNoticePage(): ReactNode {
  return (
    <>
      <PageHeader title="공지사항" />

      <NoticeClinicClosures />
      <NoticeList />
    </>
  );
}
