import MoreSocials from '@/app/_components/more-socials';
import NavigationPageHeader from '@/app/_components/ui/navigation-page-header';
import NewsBoard from '@/app/community/news/_components/news-board';
import { getNewsManagedContent } from '@/_lib/managed-pages';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '청맥뉴스 | 청맥병원',
  description: '청맥병원의 원내 소식과 언론보도를 확인해보세요.',
};

export default async function CommunityNewsPage() {
  const items = await getNewsManagedContent();

  return (
    <div>
      <NavigationPageHeader
        id="community-news-page-header"
        navigationPath="/community/news"
      />

      <div className="mt-8 xl:mt-14">
        <Suspense
          fallback={
            <div className="mx-auto min-h-[520px] w-full max-w-7xl px-5" />
          }
        >
          <NewsBoard items={items} />
        </Suspense>
      </div>

      <div className="mb-16 mt-14 xl:mb-20 xl:mt-24">
        <MoreSocials />
      </div>
    </div>
  );
}
