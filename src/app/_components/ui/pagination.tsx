'use client';

import { cn } from '@/_lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import Button from './button';
import { useComponentId } from './component-id';

type PaginationSize = 'sm' | 'md' | 'lg';

const pageClasses: Record<PaginationSize, string> = {
  sm: 'size-7 text-xs xl:text-sm',
  md: 'size-8 text-sm xl:text-base',
  lg: 'size-10 text-base xl:size-11 xl:text-xl',
};

const iconClasses: Record<PaginationSize, string> = {
  sm: 'size-4',
  md: 'size-4',
  lg: 'size-5 xl:size-6',
};

function visiblePages(currentPage: number, totalPages: number, maxVisible: number) {
  const count = Math.min(maxVisible, totalPages);
  const start = Math.min(
    Math.max(currentPage - Math.floor(count / 2), 1),
    Math.max(totalPages - count + 1, 1),
  );

  return Array.from({ length: count }, (_, index) => start + index);
}

export default function Pagination({
  id,
  currentPage,
  totalPages,
  onPageChange,
  ariaLabel = '페이지 이동',
  size = 'sm',
  maxVisible = 5,
  showFirst = true,
  showLast = true,
  className,
}: {
  id?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  ariaLabel?: string;
  size?: PaginationSize;
  maxVisible?: number;
  showFirst?: boolean;
  showLast?: boolean;
  className?: string;
}) {
  const componentId = useComponentId('cm-pagination', id);

  if (totalPages <= 1) return null;

  const pages = visiblePages(currentPage, totalPages, maxVisible);
  const move = (next: number) =>
    onPageChange(Math.min(Math.max(next, 1), totalPages));

  return (
    <nav
      id={componentId}
      aria-label={ariaLabel}
      className={cn('flex items-center justify-center gap-1.5 xl:gap-2', className)}
    >
      {showFirst ? (
        <Button
          id={`${componentId}-first`}
          variant="ghost"
          size="icon"
          onClick={() => move(1)}
          disabled={currentPage === 1}
          aria-label="첫 페이지"
          className={size === 'lg' ? 'size-10 xl:size-11' : 'size-8 xl:size-8'}
        >
          <ChevronsLeft className={iconClasses[size]} />
        </Button>
      ) : null}

      <Button
        id={`${componentId}-previous`}
        variant="ghost"
        size="icon"
        onClick={() => move(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
        className={size === 'lg' ? 'size-10 xl:size-11' : 'size-8 xl:size-8'}
      >
        <ChevronLeft className={iconClasses[size]} />
      </Button>

      {pages.map((page) => (
        <button
          id={`${componentId}-page-${page}`}
          key={page}
          type="button"
          aria-current={page === currentPage ? 'page' : undefined}
          onClick={() => move(page)}
          className={cn(
            'grid place-items-center rounded-md font-medium transition',
            pageClasses[size],
            page === currentPage
              ? 'bg-[#555B66] text-white'
              : 'text-[#8D9298] hover:bg-[#F5F6F7]',
          )}
        >
          {page}
        </button>
      ))}

      <Button
        id={`${componentId}-next`}
        variant="ghost"
        size="icon"
        onClick={() => move(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
        className={size === 'lg' ? 'size-10 xl:size-11' : 'size-8 xl:size-8'}
      >
        <ChevronRight className={iconClasses[size]} />
      </Button>

      {showLast ? (
        <Button
          id={`${componentId}-last`}
          variant="ghost"
          size="icon"
          onClick={() => move(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="마지막 페이지"
          className={size === 'lg' ? 'size-10 xl:size-11' : 'size-8 xl:size-8'}
        >
          <ChevronsRight className={iconClasses[size]} />
        </Button>
      ) : null}
    </nav>
  );
}
