import ContentPagination from '@/app/_components/content-list/pagination';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  query?: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  query = '',
}: PaginationProps) {
  const getHref = (page: number) => {
    const params = new URLSearchParams();
    if (query.trim()) params.set('query', query.trim());
    params.set('page', String(page));
    return `/academics/collaboration?${params.toString()}#academics-collaboration-list`;
  };

  return (
    <ContentPagination
      ariaLabel="학술교류 페이지 이동"
      currentPage={currentPage}
      totalPages={totalPages}
      getHref={getHref}
    />
  );
}
