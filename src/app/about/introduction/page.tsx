import NavigationPageHeader from '@/app/_components/ui/navigation-page-header';
import { pickInlineContentData } from '@/_lib/inline-content-shared';
import {
  getAboutIntroductionManagedContent,
  getNewsManagedContent,
} from '@/_lib/managed-pages';
import { getPageContentBlock } from '@/_lib/page-content-blocks';
import { getPublicPageCopyConfig } from '@/_lib/public-page-copy';
import type { Metadata } from 'next';
import AboutIntroductionContent from './_components/about-introduction-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '청맥병원 소개 | 청맥병원',
  description:
    '혈관질환 진료에 집중해 온 청맥병원의 소개, 연혁과 사회공헌 활동을 확인해보세요.',
};

export default async function AboutIntroductionPage() {
  const copyConfig = getPublicPageCopyConfig(
    '/about/introduction',
  );

  const [managed, news, copyContent] = await Promise.all([
    getAboutIntroductionManagedContent(),
    getNewsManagedContent(),
    getPageContentBlock(
      'page-copy',
      '/about/introduction',
      copyConfig.defaults,
    ),
  ]);

  const copy = pickInlineContentData(
    copyContent.data,
    copyConfig.fields,
  );

  const latestNews = [...news]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4)
    .map((item) => ({
      id: item.id,
      title: item.title,
      date: item.date,
      imageSrc: item.imageSrc,
    }));

  return (
    <div>
      <NavigationPageHeader
        id="about-introduction-page-header"
        navigationPath="/about/introduction"
        showDivider
      />

      <AboutIntroductionContent
        copy={copy}
        copyPersisted={copyContent.persisted}
        specialtyCards={managed.specialtyCards}
        whyPoints={managed.whyPoints}
        promises={managed.promises}
        quickLinks={managed.quickLinks}
        overviewRows={managed.overviewRows}
        historyYears={managed.historyYears}
        contributionActivities={managed.contributionActivities}
        latestNews={latestNews}
      />
    </div>
  );
}
