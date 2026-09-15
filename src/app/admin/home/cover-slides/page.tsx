import HomeSectionList from '../_components/home-section-list';

export const dynamic = 'force-dynamic';

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string | string[];
    page?: string | string[];
    pageSize?: string | string[];
  }>;
}) {
  return (
    <HomeSectionList
      sectionKey="cover-slides"
      searchParams={searchParams}
    />
  );
}
