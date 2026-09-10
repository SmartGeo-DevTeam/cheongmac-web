'use client';

import UiPagination from '@/app/_components/ui/pagination';

export default function ConsultationDetailPagination({
  returnTo,
}: {
  returnTo: string;
}) {
  const url = new URL(returnTo, 'https://cheongmac.local');
  const currentPage = Math.max(
    1,
    Number.parseInt(url.searchParams.get('page') ?? '1', 10) || 1,
  );
  const query = url.searchParams.get('q') ?? '';

  const hrefForPage = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', String(page));
    if (query) params.set('q', query);
    const search = params.toString();

    return search
      ? `/community/consultation?${search}`
      : '/community/consultation';
  };

  return (
    <UiPagination
      id="consultation-detail-pagination"
      currentPage={currentPage}
      totalPages={7}
      getPageHref={hrefForPage}
      ariaLabel="의학상담 목록 페이지 바로가기"
      variant="compact"
      className="mt-3 xl:hidden"
    />
  );
}
