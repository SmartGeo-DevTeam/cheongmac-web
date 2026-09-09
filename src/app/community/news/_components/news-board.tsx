'use client';

import BoardToolbar from '@/app/_components/ui/board-toolbar';
import EmptyState from '@/app/_components/ui/empty-state';
import FilterTabs from '@/app/_components/ui/filter-tabs';
import Pagination from '@/app/_components/ui/pagination';
import SearchField from '@/app/_components/ui/search-field';
import { useViewport } from '@/app/_providers/viewport-provider';
import type { NewsItem } from '@/app/community/news/_data/news';
import { NEWS_ITEMS } from '@/app/community/news/_data/news';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

type CategoryFilter = 'all' | 'inside' | 'press';

const CATEGORY_TABS: Array<{ id: CategoryFilter; label: string }> = [
  { id: 'all', label: '전체' },
  { id: 'inside', label: '원내소식' },
  { id: 'press', label: '언론보도' },
];

const DESKTOP_PAGE_SIZE = 12;

const MOBILE_PAGE_SIZE: Record<CategoryFilter, number> = {
  all: 10,
  inside: 6,
  press: 5,
};

function isCategoryFilter(value: string | null): value is CategoryFilter {
  return value === 'all' || value === 'inside' || value === 'press';
}

function parsePage(value: string | null) {
  if (!value) return 1;

  const page = Number.parseInt(value, 10);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function buildNewsListUrl({
  category,
  page,
  query,
}: {
  category: CategoryFilter;
  page: number;
  query: string;
}) {
  const params = new URLSearchParams();
  const normalizedQuery = query.trim();

  if (category !== 'all') params.set('category', category);
  if (page > 1) params.set('page', String(page));
  if (normalizedQuery) params.set('q', normalizedQuery);

  const queryString = params.toString();
  return queryString ? `/community/news?${queryString}` : '/community/news';
}

function buildNewsDetailHref(id: number, returnTo: string) {
  return {
    pathname: `/community/news/${id}`,
    query: { from: returnTo },
  };
}

function DesktopCard({ item, returnTo }: { item: NewsItem; returnTo: string }) {
  return (
    <article className="min-w-0">
      <Link
        href={buildNewsDetailHref(item.id, returnTo)}
        className="group block outline-none focus-visible:ring-2 focus-visible:ring-[#006553] focus-visible:ring-offset-4"
      >
        <div className="relative aspect-square overflow-hidden rounded-[10px] bg-[#F3F4F6]">
          <Image
            src={item.imageSrc}
            alt=""
            fill
            sizes="(min-width: 1280px) 215px, 50vw"
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <h3 className="mt-3 line-clamp-2 min-h-[2.75em] break-keep text-[15px] font-medium leading-[1.4] tracking-[-0.04em] text-[#252B33] transition group-hover:text-[#006553]">
          {item.title}
        </h3>
        <p className="mt-1 text-xs text-[#B4BAC2]">{item.date}</p>
      </Link>
    </article>
  );
}

function MobileAllCard({
  item,
  returnTo,
}: {
  item: NewsItem;
  returnTo: string;
}) {
  return (
    <article className="min-w-0">
      <Link
        href={buildNewsDetailHref(item.id, returnTo)}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-[#006553] focus-visible:ring-offset-4"
      >
        <div className="relative aspect-square overflow-hidden rounded-[8px] bg-[#F3F4F6]">
          <Image
            src={item.imageSrc}
            alt=""
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
        <h3 className="mt-2 line-clamp-2 min-h-[2.7em] break-keep text-[13px] font-medium leading-[1.35] tracking-[-0.04em] text-[#252B33]">
          {item.title}
        </h3>
        <p className="mt-1 text-[10px] text-[#B4BAC2]">{item.date}</p>
      </Link>
    </article>
  );
}

function MobileInsideCard({
  item,
  returnTo,
}: {
  item: NewsItem;
  returnTo: string;
}) {
  return (
    <article>
      <Link
        href={buildNewsDetailHref(item.id, returnTo)}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-[#006553] focus-visible:ring-offset-4"
      >
        <div className="relative aspect-[2.12/1] overflow-hidden rounded-[8px] bg-[#F3F4F6]">
          <Image
            src={item.imageSrc}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <h3 className="mt-2 break-keep text-[13px] font-medium leading-[1.4] tracking-[-0.04em] text-[#252B33]">
          {item.title}
        </h3>
        <p className="mt-1 line-clamp-2 break-keep text-[11px] leading-[1.45] tracking-[-0.03em] text-[#6F7680]">
          {item.excerpt}
        </p>
        <p className="mt-1 text-[10px] text-[#B4BAC2]">{item.date}</p>
      </Link>
    </article>
  );
}

function MobilePressCard({
  item,
  returnTo,
}: {
  item: NewsItem;
  returnTo: string;
}) {
  return (
    <article>
      <Link
        href={buildNewsDetailHref(item.id, returnTo)}
        className="grid grid-cols-[96px_minmax(0,1fr)] gap-3 outline-none focus-visible:ring-2 focus-visible:ring-[#006553] focus-visible:ring-offset-4"
      >
        <div className="relative aspect-square overflow-hidden rounded-[8px] bg-[#F1F3F5]">
          <Image
            src={item.imageSrc}
            alt=""
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 py-0.5">
          <h3 className="line-clamp-2 break-keep text-[13px] font-medium leading-[1.35] tracking-[-0.04em] text-[#252B33]">
            {item.title}
          </h3>
          <p className="mt-1 line-clamp-2 break-keep text-[11px] leading-[1.45] tracking-[-0.03em] text-[#7B818A]">
            {item.excerpt}
          </p>
          <div className="mt-2 flex items-end justify-between gap-2">
            <span
              className={`text-[10px] ${item.sourceClassName ?? 'text-[#4B5563]'}`}
            >
              {item.source}
            </span>
            <span className="shrink-0 text-[9px] text-[#B4BAC2]">
              {item.date}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function NewsBoard() {
  const { isDesktop } = useViewport();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLElement>(null);

  const categoryParam = searchParams.get('category');
  const queryParam = searchParams.get('q') ?? '';
  const pageParam = searchParams.get('page');

  const category: CategoryFilter = isCategoryFilter(categoryParam)
    ? categoryParam
    : 'all';
  const currentPage = parsePage(pageParam);
  const [query, setQuery] = useState(queryParam);

  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('ko-KR');

    return NEWS_ITEMS.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesQuery =
        !normalizedQuery ||
        item.title.toLocaleLowerCase('ko-KR').includes(normalizedQuery) ||
        item.excerpt.toLocaleLowerCase('ko-KR').includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const pageSize = isDesktop ? DESKTOP_PAGE_SIZE : MOBILE_PAGE_SIZE[category];
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const visibleItems = filteredItems.slice(startIndex, startIndex + pageSize);

  const returnTo = buildNewsListUrl({
    category,
    page: safeCurrentPage,
    query,
  });

  useEffect(() => {
    if (currentPage === safeCurrentPage) return;

    router.replace(returnTo, { scroll: false });
  }, [currentPage, returnTo, router, safeCurrentPage]);

  const scrollToBoard = () => {
    window.requestAnimationFrame(() => {
      if (!sectionRef.current) return;

      const top =
        sectionRef.current.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    });
  };

  const handleCategoryChange = (nextCategory: CategoryFilter) => {
    router.push(buildNewsListUrl({ category: nextCategory, page: 1, query }), {
      scroll: false,
    });
  };

  const handleQueryChange = (nextQuery: string) => {
    setQuery(nextQuery);
    router.replace(buildNewsListUrl({ category, page: 1, query: nextQuery }), {
      scroll: false,
    });
  };

  const handlePageChange = (nextPage: number) => {
    const clampedPage = Math.min(Math.max(nextPage, 1), totalPages);

    router.push(buildNewsListUrl({ category, page: clampedPage, query }), {
      scroll: false,
    });
    scrollToBoard();
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="news-list-heading"
      className="mx-auto w-full max-w-7xl px-5"
    >
      <h2 id="news-list-heading" className="sr-only">
        청맥뉴스 목록
      </h2>
      <FilterTabs
        items={CATEGORY_TABS.map((tab) => ({
          value: tab.id,
          label: tab.label,
        }))}
        value={category}
        onValueChange={handleCategoryChange}
        ariaLabel="청맥뉴스 분류"
        size="sm"
        className="gap-2.5 xl:gap-3"
      />

      <BoardToolbar
        count={filteredItems.length}
        className="mt-8 xl:mt-10"
      >
        <SearchField
          ariaLabel="청맥뉴스 검색"
          value={query}
          onChange={(event) => handleQueryChange(event.target.value)}
          placeholder="검색어를 입력하세요."
          className="max-w-[160px] xl:max-w-[220px]"
        />
      </BoardToolbar>

      {visibleItems.length ? (
        <>
          <div className="mt-3 hidden grid-cols-4 gap-x-4 gap-y-6 xl:grid">
            {visibleItems.map((item) => (
              <DesktopCard key={item.id} item={item} returnTo={returnTo} />
            ))}
          </div>

          <div className="mt-3 xl:hidden">
            {category === 'all' ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-5">
                {visibleItems.map((item) => (
                  <MobileAllCard
                    key={item.id}
                    item={item}
                    returnTo={returnTo}
                  />
                ))}
              </div>
            ) : null}

            {category === 'inside' ? (
              <div className="space-y-5">
                {visibleItems.map((item) => (
                  <MobileInsideCard
                    key={item.id}
                    item={item}
                    returnTo={returnTo}
                  />
                ))}
              </div>
            ) : null}

            {category === 'press' ? (
              <div className="space-y-5">
                {visibleItems.map((item) => (
                  <MobilePressCard
                    key={item.id}
                    item={item}
                    returnTo={returnTo}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <Pagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            ariaLabel="청맥뉴스 페이지"
            size="sm"
            className="mt-9 xl:mt-12"
          />
        </>
      ) : (
        <EmptyState className="mt-12 min-h-[208px]" />
      )}
    </section>
  );
}
