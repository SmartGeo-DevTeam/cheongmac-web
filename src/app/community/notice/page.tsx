import PageHeader from '@/app/_components/common/page-header';
import { ReactNode } from 'react';
import List from './_sections/list';
import Off from './_sections/off';

export default function CommunityNoticePage(): ReactNode {
  return (
    <>
      <PageHeader title="공지사항" />

      <Off />
      <List />
    </>
  );
}
