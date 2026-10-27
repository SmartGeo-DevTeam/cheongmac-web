import PageHeader from '@/app/_components/common/page-header';
import Hero from './_sections/_hero';
import List from './_sections/_list';

type SearchParams = Promise<{
  page?: string | string[];
  query?: string | string[];
}>;

export default async function AcademicsCollaborationPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const parsedPage = Number(rawPage);

  const currentPage =
    rawPage && Number.isSafeInteger(parsedPage) && parsedPage > 0
      ? parsedPage
      : 1;

  const query = (
    Array.isArray(params.query) ? params.query[0] : (params.query ?? '')
  ).trim();

  return (
    <>
      <PageHeader
        title="학술교류"
        desc={`국내외 활발한 학술 교류를 통해 축적된 임상 노하우를 공유하며 \n 대한민국 혈관의학의 발전을 선도합니다.`}
      />

      <Hero />
      <List currentPage={currentPage} query={query} />
    </>
  );
}
