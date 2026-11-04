'use client';

import CategoryTabs from '@/app/_components/category-tabs';
import ContentPagination from '@/app/_components/content-list/pagination';
import ContentListToolbar from '@/app/_components/content-list/toolbar';
import { PenLine } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  consultationCategories,
  type ConsultationCategoryId,
  type ConsultationItem,
} from '../data';
import ConsultationListItem from './consultation-item';

const PAGE_SIZE = 7;
const LIST_PATH = '/community/consultation';

export type ConsultationFilters = {
  category: ConsultationCategoryId;
  query: string;
  page: number;
};

function readFiltersFromUrl(): ConsultationFilters {
  const params = new URLSearchParams(window.location.search);
  const rawPage = Number(params.get('page') ?? 1);
  const category =
    consultationCategories.find((item) => item.id === params.get('category'))
      ?.id ?? 'all';

  return {
    category,
    query: params.get('q') ?? '',
    page: Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1,
  };
}

function buildListUrl(filters: ConsultationFilters) {
  const params = new URLSearchParams();

  if (filters.category !== 'all') params.set('category', filters.category);
  if (filters.query.trim()) params.set('q', filters.query.trim());
  if (filters.page > 1) params.set('page', String(filters.page));

  const suffix = params.toString();

  return suffix ? `${LIST_PATH}?${suffix}` : LIST_PATH;
}

export default function ConsultationBoard({
  items,
  initialFilters,
}: {
  items: readonly ConsultationItem[];
  initialFilters: ConsultationFilters;
}) {
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    // 뒤로 가기/앞으로 가기 시 URL과 화면 상태 동기화
    const onPopState = () => setFilters(readFiltersFromUrl());

    window.addEventListener('popstate', onPopState);

    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const updateFilters = (next: ConsultationFilters) => {
    setFilters(next);

    window.history.replaceState(window.history.state, '', buildListUrl(next));
  };

  // 진료분야 및 검색어 필터링
  const filteredItems = useMemo(() => {
    const keyword = filters.query.trim().toLocaleLowerCase('ko-KR');

    return items.filter((item) => {
      if (filters.category !== 'all' && filters.category !== item.category)
        return false;

      if (!keyword) return true;

      const label =
        consultationCategories.find((category) => category.id === item.category)
          ?.label ?? '';

      const searchable = [
        item.title,
        item.primaryCategory,
        label,
        item.doctor?.department ?? '',
        item.doctor?.name ?? '',
      ]
        .join(' ')
        .toLocaleLowerCase('ko-KR');

      return searchable.includes(keyword);
    });
  }, [items, filters.category, filters.query]);

  // 모바일 / 데스크탑 공통 페이지네이션
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));

  const currentPage = Math.min(filters.page, totalPages);

  const visibleItems = filteredItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const returnTo = buildListUrl(filters);

  const onPageChange = (page: number) => {
    updateFilters({ ...filters, page });

    document.getElementById('community-consultation-results')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const renderCards = (items: ConsultationItem[]) =>
    items.length
      ? items.map((item) => (
          <ConsultationListItem key={item.id} item={item} returnTo={returnTo} />
        ))
      : null;

  return (
    <div
      id="community-consultation-results"
      className="mt-5
      xl:mx-auto xl:mt-10 xl:max-w-7xl xl:w-full"
    >
      <ContentListToolbar
        count={filteredItems.length}
        variant="compact"
        searchClassName={`w-[58%] max-w-62.5 [&>label]:max-w-full
          xl:w-100 xl:max-w-none`}
        searchProps={{
          ariaLabel: '의학상담 검색',
          value: filters.query,
          onChange: (query) => updateFilters({ ...filters, query, page: 1 }),
        }}
      />

      <div
        className="mt-3 pl-5
        xl:mt-7 xl:px-5"
      >
        <CategoryTabs
          id="community-consultation-categories"
          ariaLabel="의학상담 진료분야"
          categories={consultationCategories}
          activeId={filters.category}
          onChange={(category) =>
            updateFilters({ ...filters, category, page: 1 })
          }
          desktopAlign="start"
          className="[&>ul]:pl-0"
        />
      </div>

      <h2 className="sr-only">의학상담 게시글 목록</h2>

      {filteredItems.length ? (
        <ul
          className="mt-3 px-5 space-y-3
          xl:space-y-4"
        >
          {renderCards(visibleItems)}
        </ul>
      ) : (
        <p role="status" className="py-24 text-center text-secondary">
          검색 결과가 없습니다.
        </p>
      )}

      <div className="py-10 flex justify-center">
        <Link
          href="/community/consultation/write"
          className="px-8 py-3 flex items-center gap-2 rounded-full bg-green-900 font-bold text-inverse text-[14px]
          xl:px-10 xl:py-3.5 xl:gap-3 xl:text-[16px]"
        >
          <PenLine
            className="size-4
            xl:size-5"
            aria-hidden="true"
          />
          문의글 작성하기
        </Link>
      </div>

      <div className="mt-10 xl:mt-12">
        <ContentPagination
          ariaLabel="의학상담 페이지 이동"
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
}
