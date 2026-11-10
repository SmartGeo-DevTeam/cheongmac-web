import PageHeader from '@/app/_components/common/page-header';
import CasesFilters, {
  type CasesFiltersState,
} from '@/app/_ui/community/cases/case-filters';
import { caseCategories, casePosts, caseTabs } from '@/app/_data/community/cases/cases';
import { attachYouTubeThumbnails } from '@/app/_lib/community/cases/youtube-api.server';

type SearchParams = {
  tab?: string | string[];
  category?: string | string[];
  q?: string | string[];
  page?: string | string[];
};

type CommunityCasesPageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function CasesOverview({
  searchParams,
}: CommunityCasesPageProps) {
  // 서버에서 URL 상태를 해석해 첫 HTML부터 맞는 탭/페이지를 표시합니다.
  const params = await searchParams;
  const requestedPage =
    typeof params.page === 'string' ? Number(params.page) : 1;

  const initialFilters: CasesFiltersState = {
    activeTab:
      caseTabs.find((item) => item.id === params.tab)?.id ??
      caseTabs[0].id,
    category:
      caseCategories.find((item) => item.id === params.category)?.id ?? 'all',
    query: typeof params.q === 'string' ? params.q : '',
    currentPage:
      Number.isSafeInteger(requestedPage) && requestedPage > 0
        ? requestedPage
        : 1,
  };

  const posts = await attachYouTubeThumbnails(casePosts);

  return (
    <>
      <PageHeader
        title="치료 사례"
        desc={`수만 건의 데이터가 증명하는 것은 단순한 숫자가 아닌, \n환자분의 되찾은 일상입니다.`}
      />

      <section id="community-cases-list">
        <CasesFilters
          tabs={caseTabs}
          categories={caseCategories}
          posts={posts}
          initialFilters={initialFilters}
        />
      </section>
    </>
  );
}
