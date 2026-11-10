'use client';

import type { CategoryTabType } from '@/app/_components/common/category-tabs';
import ContentList from '@/app/_components/content-list/content-list';
import ContentPagination from '@/app/_components/content-list/pagination';
import ContentSearch from '@/app/_components/content-list/search';
import PageTabs from '@/app/_components/common/page-tabs';
import { useLayoutEffect, useMemo, useState } from 'react';
import type { CaseCategoryId, CasePost, CaseTabId } from '@/app/_data/community/cases/cases';
import {
  consumeCasesListScroll,
  readCasesListParams,
  replaceCasesListParams,
} from '@/app/_lib/community/cases/list-state.client';
import CasesCard from './case-card';
import CasesCategories from './case-categories';

const PAGE_SIZE = 9;

export type CasesFiltersState = {
  activeTab: CaseTabId;
  category: CaseCategoryId;
  query: string;
  currentPage: number;
};

type CasesFiltersProps = {
  tabs: readonly { id: CaseTabId; label: string }[];
  categories: readonly CategoryTabType<CaseCategoryId>[];
  posts: readonly CasePost[];
  initialFilters: CasesFiltersState;
};

/**
 * 서버가 URL에서 읽은 initialFilters로 첫 화면을 렌더링합니다.
 * 이후 사용자의 필터 조작은 React 상태를 즉시 변경하고 URL에도 기록합니다.
 */
export default function CasesFilters({
  tabs,
  categories,
  posts,
  initialFilters,
}: CasesFiltersProps) {
  const [filters, setFilters] = useState<CasesFiltersState>(initialFilters);
  const { activeTab, category, query, currentPage } = filters;

  // 브라우저 뒤로/앞으로 이동에서 URL이 바뀌면 React 상태도 맞춥니다.
  // useLayoutEffect는 화면에 잘못된 탭이 한 번 그려지는 것을 줄여 줍니다.
  useLayoutEffect(() => {
    const syncFromUrl = () => {
      const saved = readCasesListParams();
      const restoredTab =
        tabs.find((item) => item.id === saved.tab)?.id ??
        tabs[0]?.id ??
        'before-after';
      const restoredCategory: CaseCategoryId =
        categories.find((item) => item.id === saved.category)?.id ?? 'all';

      setFilters((current) => {
        if (
          current.activeTab === restoredTab &&
          current.category === restoredCategory &&
          current.query === saved.query &&
          current.currentPage === saved.page
        ) {
          return current;
        }

        return {
          activeTab: restoredTab,
          category: restoredCategory,
          query: saved.query,
          currentPage: saved.page,
        };
      });
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);

    // 상세에서 되돌아온 경우에만 저장된 스크롤을 한 번 복원합니다.
    const savedY = consumeCasesListScroll();
    if (savedY !== null) window.scrollTo(0, savedY);

    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [tabs, categories]);

  const updateFilters = (next: CasesFiltersState) => {
    // URL 변경만으로 useSearchParams의 재렌더링에 의존하지 않습니다.
    setFilters(next);
    replaceCasesListParams({
      tab: next.activeTab,
      category: next.category,
      query: next.query,
      page: next.currentPage,
    });
  };

  const tabPosts = useMemo(
    () => posts.filter((post) => post.kind === activeTab),
    [posts, activeTab],
  );

  const visibleCategories = useMemo(() => {
    const available = new Set(tabPosts.map((post) => post.category));
    return categories.filter((item) => {
      if (item.id === 'all') return tabPosts.length > 0;
      return available.has(item.id);
    });
  }, [categories, tabPosts]);

  const activeCategory: CaseCategoryId = visibleCategories.some(
    (item) => item.id === category,
  )
    ? category
    : 'all';

  const categoryPosts = useMemo(
    () =>
      activeCategory === 'all'
        ? tabPosts
        : tabPosts.filter((post) => post.category === activeCategory),
    [tabPosts, activeCategory],
  );

  const categoryLabelById = useMemo(
    () => new Map(categories.map((item) => [item.id, item.label])),
    [categories],
  );

  const changePage = (page: number) => {
    updateFilters({ ...filters, currentPage: page });
    document.getElementById('community-cases-results')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const changeTab = (id: string) => {
    const next = tabs.find((item) => item.id === id);
    if (!next) return;
    updateFilters({
      activeTab: next.id,
      category: 'all',
      query: '',
      currentPage: 1,
    });
  };

  return (
    <>
      <PageTabs
        id="community-cases-tabs"
        ariaLabel="치료 사례 분류"
        tabs={tabs}
        activeId={activeTab}
        onChange={changeTab}
        variant="pills"
        desktopVariant="segmented"
        align="center"
      />

      <CasesCategories
        categories={visibleCategories}
        activeId={activeCategory}
        onChange={(id) => {
          updateFilters({ ...filters, category: id, query: '', currentPage: 1 });
        }}
      />

      <ContentList
        id="community-cases-results"
        className="scroll-mt-24 xl:scroll-mt-26"
        items={categoryPosts}
        getKey={(post) => post.id}
        desktopMarginTop={10}
        getSearchText={(post) =>
          [
            post.title,
            post.description,
            post.patient ?? '',
            post.diagnosis ?? '',
            post.treatmentInfo ?? '',
            post.kind === 'reviews' ? post.reviewBody : '',
            categoryLabelById.get(post.category) ?? '',
          ].join(' ')
        }
        renderItem={(post) => <CasesCard post={post} />}
        variant="card"
        query={query}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        search={
          <ContentSearch
            value={query}
            onChange={(value) => {
              updateFilters({ ...filters, query: value, currentPage: 1 });
            }}
            ariaLabel="치료 사례 검색"
          />
        }
        renderPagination={({ currentPage: page, totalPages }) => (
          <ContentPagination
            ariaLabel="치료 사례 페이지 이동"
            currentPage={page}
            totalPages={totalPages}
            onChange={changePage}
          />
        )}
        emptyMessage="조건에 맞는 치료 사례가 없습니다."
      />
    </>
  );
}
