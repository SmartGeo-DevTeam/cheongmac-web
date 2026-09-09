import MoreSocials from '@/app/_components/more-socials';
import PageHeader from '@/app/_components/ui/page-header';
import NewsBoard from '@/app/community/news/_components/news-board';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '청맥뉴스 | 청맥병원',
  description: '청맥병원의 원내 소식과 언론보도를 확인해보세요.',
};

export default function CommunityNewsPage() {
  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: '소통공간', href: '/community/cases' },
          { label: '청맥뉴스' },
        ]}
        title="청맥뉴스"
      />

      <div className="mt-8 xl:mt-14">
        <Suspense
          fallback={
            <div className="mx-auto min-h-[520px] w-full max-w-7xl px-5" />
          }
        >
          <NewsBoard />
        </Suspense>
      </div>

      <div className="mt-14 mb-16 xl:mt-24 xl:mb-20">
        <MoreSocials />
      </div>
    </div>
  );
}
