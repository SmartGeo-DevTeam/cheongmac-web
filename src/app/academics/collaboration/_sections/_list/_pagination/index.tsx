import Inner from '@/app/_components/common/inner';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

const MAX_VISIBLE_PAGES = 5;

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  query?: string;
};

type PageArrowProps = {
  href: string;
  label: string;
  disabled: boolean;
  children: ReactNode;
};

function PageArrow({ href, label, disabled, children }: PageArrowProps) {
  const className = 'size-8 flex items-center justify-center rounded-lg';

  if (disabled) {
    return (
      <span
        aria-label={label}
        aria-disabled="true"
        className={`${className} opacity-30`}
      >
        {children}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={label} className={className}>
      {children}
    </Link>
  );
}

export default function Pagination({
  currentPage,
  totalPages,
  query = '',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // 한 번에 표시할 페이지 개수
  const visibleCount = Math.min(totalPages, MAX_VISIBLE_PAGES);

  // 현재 페이지를 중심으로 표시할 첫 페이지 계산
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(visibleCount / 2),
      totalPages - visibleCount + 1,
    ),
  );

  const pages = Array.from(
    { length: visibleCount },
    (_, index) => startPage + index,
  );

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  // URL 생성
  const createPageHref = (page: number) => {
    const params = new URLSearchParams();

    if (query.trim()) {
      params.set('query', query.trim());
    }

    params.set('page', String(page));

    return `/academics/collaboration?${params.toString()}#academics-collaboration-list`;
  };

  return (
    <nav aria-label="학술교류 페이지 이동">
      <Inner>
        <div
          className="my-10 flex justify-center items-center gap-2 font-semibold text-gray-600 text-[16px]
          xl:mt-20 xl:mb-30"
        >
          <PageArrow
            href={createPageHref(1)}
            label="첫 페이지"
            disabled={isFirstPage}
          >
            <ChevronsLeft className="size-5" />
          </PageArrow>

          <PageArrow
            href={createPageHref(currentPage - 1)}
            label="이전 페이지"
            disabled={isFirstPage}
          >
            <ChevronLeft className="size-5" />
          </PageArrow>

          {pages.map((page) => (
            <Link
              key={page}
              href={createPageHref(page)}
              aria-label={`${page}페이지`}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`size-8 flex items-center justify-center rounded-lg ${
                page === currentPage ? 'bg-gray-700 text-white' : ''
              }`}
            >
              {page}
            </Link>
          ))}

          <PageArrow
            href={createPageHref(currentPage + 1)}
            label="다음 페이지"
            disabled={isLastPage}
          >
            <ChevronRight className="size-5" />
          </PageArrow>

          <PageArrow
            href={createPageHref(totalPages)}
            label="마지막 페이지"
            disabled={isLastPage}
          >
            <ChevronsRight className="size-5" />
          </PageArrow>
        </div>
      </Inner>
    </nav>
  );
}
