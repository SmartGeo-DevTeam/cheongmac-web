'use client';

import { useViewport } from '@/app/_providers/viewport-provider';
import type { NewsItem } from '@/app/community/news/_data/news';
import { NEWS_ITEMS } from '@/app/community/news/_data/news';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from 'lucide-react';
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

function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex h-10 w-[160px] items-center gap-2 rounded-full border border-[#E1E4E8] bg-white px-4 xl:h-11 xl:w-[220px]">
      <span className="sr-only">청맥뉴스 검색</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="검색어를 입력하세요."
        className="min-w-0 flex-1 bg-transparent text-xs text-[#333333] placeholder:text-[#A7ADB5] xl:text-sm"
      />
      <Search className="size-5 shrink-0 text-[#313843]" strokeWidth={1.7} />
    </label>
  );
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

function getVisiblePages(currentPage: number, totalPages: number) {
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const half = Math.floor(maxVisiblePages / 2);
  const start = Math.min(
    Math.max(currentPage - half, 1),
    totalPages - maxVisiblePages + 1,
  );

  return Array.from({ length: maxVisiblePages }, (_, index) => start + index);
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <nav
      aria-label="청맥뉴스 페이지"
      className="mt-9 flex justify-center xl:mt-12"
    >
      <div className="flex items-center gap-3 text-xs text-[#9AA1AA] xl:gap-4 xl:text-sm">
        {currentPage > 1 ? (
          <>
            <button
              type="button"
              aria-label="첫 페이지"
              onClick={() => onPageChange(1)}
              className="flex size-6 items-center justify-center"
            >
              <ChevronsLeft className="size-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="이전 페이지"
              onClick={() => onPageChange(currentPage - 1)}
              className="flex size-6 items-center justify-center"
            >
              <ChevronLeft className="size-4" strokeWidth={1.5} />
            </button>
          </>
        ) : null}

        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            aria-current={page === currentPage ? 'page' : undefined}
            onClick={() => onPageChange(page)}
            className={
              page === currentPage
                ? 'flex size-7 items-center justify-center rounded-md bg-[#5B616C] font-semibold text-white'
                : 'flex size-7 items-center justify-center text-[#9AA1AA]'
            }
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages ? (
          <>
            <button
              type="button"
              aria-label="다음 페이지"
              onClick={() => onPageChange(currentPage + 1)}
              className="flex size-6 items-center justify-center"
            >
              <ChevronRight className="size-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="마지막 페이지"
              onClick={() => onPageChange(totalPages)}
              className="flex size-6 items-center justify-center"
            >
              <ChevronsRight className="size-4" strokeWidth={1.5} />
            </button>
          </>
        ) : null}
      </div>
    </nav>
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
    <section ref={sectionRef} className="mx-auto w-full max-w-420 px-5">
      <div className="flex justify-center gap-2.5 xl:gap-3">
        {CATEGORY_TABS.map((tab) => {
          const isActive = category === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleCategoryChange(tab.id)}
              className={`min-w-[68px] rounded-full border px-4 py-2 text-xs transition xl:min-w-[86px] xl:px-5 xl:py-2.5 xl:text-sm ${
                isActive
                  ? 'border-[#006553] bg-[#006553] font-semibold text-white'
                  : 'border-[#E1E4E8] bg-white text-[#60666F] hover:border-[#AEB4BC]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between xl:mt-10">
        <p className="text-[11px] text-[#8D939C] xl:text-sm">
          총{' '}
          <strong className="font-medium text-[#FA6805]">
            {filteredItems.length.toLocaleString('ko-KR')}
          </strong>{' '}
          건
        </p>
        <SearchBox value={query} onChange={handleQueryChange} />
      </div>

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
          />
        </>
      ) : (
        <div className="mt-12 rounded-2xl border border-[#E8EAED] py-20 text-center text-sm text-[#8A9098]">
          검색 결과가 없습니다.
        </div>
      )}
    </section>
  );
}
