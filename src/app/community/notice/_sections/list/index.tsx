import Inner from '@/app/_components/common/inner';
import { Suspense } from 'react';
import Title from '../../_components/title';
import NoticeBoard from './_components/notice-board';
import { getNotices } from './data';

export default async function List() {
  const notices = await getNotices();

  return (
    <section id="community-notice-list">
      <div className="mt-16">
        <Inner>
          <Title text="공지사항" />
        </Inner>

        <Suspense fallback={null}>
          <NoticeBoard items={notices} />
        </Suspense>
      </div>
    </section>
  );
}
