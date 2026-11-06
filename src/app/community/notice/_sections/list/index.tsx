import Inner from '@/app/_components/common/inner';
import SectionTitle from '@/app/_components/common/section-title';
import { Suspense } from 'react';
import NoticeBoard from './_components/notice-board';
import { getNotices } from './data';

export default async function List() {
  const notices = await getNotices();

  return (
    <section id="community-notice-list">
      <div className="mt-16">
        <Inner>
          <SectionTitle text="공지사항" />
        </Inner>

        <Suspense fallback={null}>
          <NoticeBoard items={notices} />
        </Suspense>
      </div>
    </section>
  );
}
