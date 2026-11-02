import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

type CommonProps = {
  currentPage: number;
  totalPages: number;
  ariaLabel?: string;
};

type ContentPaginationProps = CommonProps &
  (
    | { getHref: (page: number) => string; onChange?: never }
    | { getHref?: never; onChange: (page: number) => void }
  );

const MAX_VISIBLE_PAGES = 5;

export default function ContentPagination({
  currentPage,
  totalPages,
  getHref,
  onChange,
  ariaLabel = '페이지 이동',
}: ContentPaginationProps) {
  if (totalPages <= 1) return null;

  const visibleCount = Math.min(totalPages, MAX_VISIBLE_PAGES);
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(visibleCount / 2),
      totalPages - visibleCount + 1,
    ),
  );
  const pages = Array.from({ length: visibleCount }, (_, i) => startPage + i);

  const pageControl = (
    page: number,
    label: string,
    children: ReactNode,
    disabled = false,
    active = false,
  ) => {
    const className = `flex size-8 items-center justify-center rounded-lg
    xl:size-10
    ${active ? 'bg-gray-700 text-white' : ''}
    `;

    if (disabled) {
      return (
        <span
          className={`${className} opacity-30`}
          aria-label={label}
          aria-disabled="true"
        >
          {children}
        </span>
      );
    }
    if (getHref) {
      return (
        <Link
          href={getHref(page)}
          aria-label={label}
          aria-current={active ? 'page' : undefined}
          className={className}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        type="button"
        aria-label={label}
        aria-current={active ? 'page' : undefined}
        onClick={() => onChange?.(page)}
        className={className}
      >
        {children}
      </button>
    );
  };

  return (
    <nav
      aria-label={ariaLabel}
      className="-mt-4 pb-24 flex items-center justify-center gap-2 px-5 text-[16px] font-semibold text-gray-600
      xl:-mt-6 xl:pb-30"
    >
      {pageControl(
        1,
        '첫 페이지',
        <ChevronsLeft className="size-5" />,
        currentPage === 1,
      )}
      {pageControl(
        currentPage - 1,
        '이전 페이지',
        <ChevronLeft className="size-5" />,
        currentPage === 1,
      )}
      {pages.map((page) => (
        <span key={page}>
          {pageControl(
            page,
            `${page}페이지`,
            page,
            false,
            page === currentPage,
          )}
        </span>
      ))}
      {pageControl(
        currentPage + 1,
        '다음 페이지',
        <ChevronRight className="size-5" />,
        currentPage >= totalPages,
      )}
      {pageControl(
        totalPages,
        '마지막 페이지',
        <ChevronsRight className="size-5" />,
        currentPage >= totalPages,
      )}
    </nav>
  );
}
