'use client';

import Inner from '@/app/_components/common/inner';
import ContentPagination from '@/app/_components/content-list/pagination';
import ContentListToolbar from '@/app/_components/content-list/toolbar';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import type { NoticeItemType } from '@/app/_data/community/notice/notices';
import NoticeItem from './notice-item';

const LIST_PATH = '/community/notice';
const PAGE_SIZE = 10;

export type NoticeFilters = {
  query: string;
  page: number;
};

function readFiltersFromUrl(): NoticeFilters {
  const params = new URLSearchParams(window.location.search);
  const rawPage = Number(params.get('page') ?? 1);

  return {
    query: params.get('q') ?? '',
    page: Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1,
  };
}

function buildListUrl(filters: NoticeFilters): string {
  const params = new URLSearchParams();

  if (filters.query.trim()) {
    params.set('q', filters.query.trim());
  }

  if (filters.page > 1) {
    params.set('page', String(filters.page));
  }

  const suffix = params.toString();

  return suffix ? `${LIST_PATH}?${suffix}` : LIST_PATH;
}

export default function NoticeBoard({
  items,
}: {
  items: readonly NoticeItemType[];
}) {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<NoticeFilters>(() => {
    const rawPage = Number(searchParams.get('page') ?? 1);

    return {
      query: searchParams.get('q') ?? '',
      page: Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1,
    };
  });

  // 뒤로 가기 / 앞으로 가기 대응
  useEffect(() => {
    const onPopState = () => {
      setFilters(readFiltersFromUrl());
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  const updateFilters = (next: NoticeFilters) => {
    setFilters(next);

    window.history.replaceState(window.history.state, '', buildListUrl(next));
  };

  const filteredItems = useMemo(() => {
    const keyword = filters.query.trim().toLocaleLowerCase('ko-KR');

    return items
      .filter(
        (item) =>
          !keyword || item.title.toLocaleLowerCase('ko-KR').includes(keyword),
      )
      .sort(
        (a, b) =>
          Number(Boolean(b.isPinned)) - Number(Boolean(a.isPinned)) ||
          b.date.localeCompare(a.date) ||
          a.id.localeCompare(b.id),
      );
  }, [items, filters.query]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));

  const currentPage = Math.min(filters.page, totalPages);

  const visibleItems = filteredItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const changePage = (page: number) => {
    updateFilters({ ...filters, page });

    document.getElementById('community-notice-list')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <Inner
        usePaddingHorizontalInMobile={false}
        usePaddingHorizontalInDesktop={false}
      >
        <ContentListToolbar
          count={filteredItems.length}
          searchClassName={`w-[58%] max-w-62.5 [&>label]:max-w-full
            xl:w-100 xl:max-w-none`}
          searchProps={{
            ariaLabel: '공지사항 검색',
            value: filters.query,
            onChange: (query) => updateFilters({ ...filters, query, page: 1 }),
          }}
        />
      </Inner>

      <Inner>
        <div
          className="mt-3 w-full border-t-2 border-t-gray-200
          xl:grid xl:grid-cols-[minmax(0,1fr)_max-content]"
        >
          {/* 데스크탑 목록 헤더 */}
          <div
            className="hidden
            xl:px-10 xl:col-span-2 xl:grid xl:grid-cols-subgrid xl:items-center
            xl:bg-subtle xl:py-5 xl:font-semibold xl:text-[18px]"
          >
            <div className="text-center">제목</div>
            <div className="px-10 whitespace-nowrap text-center">등록일</div>
          </div>

          {/* 목록 */}
          <ul
            aria-label="공지사항 게시글 목록"
            className="xl:col-span-2 xl:grid xl:grid-cols-subgrid"
          >
            {visibleItems.length ? (
              visibleItems.map((item) => (
                <NoticeItem
                  key={item.id}
                  item={item}
                  returnTo={buildListUrl({ ...filters, page: currentPage })}
                />
              ))
            ) : (
              <li className="py-20 text-center xl:col-span-2" role="status">
                검색 결과가 없습니다.
              </li>
            )}
          </ul>
        </div>

        <div className="mt-10">
          <ContentPagination
            ariaLabel="공지사항 페이지 이동"
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={changePage}
          />
        </div>
      </Inner>
    </>
  );
}
