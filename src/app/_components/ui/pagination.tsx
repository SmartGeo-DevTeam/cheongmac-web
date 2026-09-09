'use client';

import { cn } from '@/_lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useComponentId } from './component-id';

export type PaginationVariant =
  | 'compact'
  | 'default'
  | 'large'
  | 'partner';

type LegacySize = 'sm' | 'md' | 'lg';

type VariantStyle = {
  root: string;
  page: string;
  control: string;
  icon: string;
  active: string;
  inactive: string;
};

const variants: Record<PaginationVariant, VariantStyle> = {
  compact: {
    root: 'flex items-center justify-center gap-1.5 xl:gap-2',
    page: 'size-7 text-xs xl:text-sm',
    control: 'size-8',
    icon: 'size-4',
    active: 'bg-[#555B66] text-white',
    inactive: 'text-[#8D9298] hover:bg-[#F5F6F7]',
  },
  default: {
    root: 'flex items-center justify-center gap-2 xl:gap-2.5',
    page: 'size-8 text-sm xl:text-base',
    control: 'size-8',
    icon: 'size-4',
    active: 'bg-[#555B66] text-white',
    inactive: 'text-[#8D9298] hover:bg-[#F5F6F7]',
  },
  large: {
    root: 'flex items-center justify-center gap-2 xl:gap-2.5',
    page: 'size-10 text-base xl:size-11 xl:text-xl',
    control: 'size-10 xl:size-11',
    icon: 'size-5 xl:size-6',
    active: 'bg-[#555B66] text-white',
    inactive: 'text-[#8D9298] hover:bg-[#F5F6F7]',
  },
  partner: {
    root:
      'flex items-center justify-center gap-5 text-sm text-[#7E848A] xl:text-base',
    page: 'size-8 text-sm xl:text-base',
    control: 'size-8',
    icon: 'size-4',
    active: 'bg-[#5A616A] font-semibold text-white',
    inactive: 'hover:bg-[#F1F2F3] hover:text-[#333A40]',
  },
};

function resolveVariant(
  variant: PaginationVariant | undefined,
  size: LegacySize | undefined,
): PaginationVariant {
  if (variant) return variant;
  if (size === 'lg') return 'large';
  if (size === 'md') return 'default';
  return 'compact';
}

function visiblePages(currentPage: number, totalPages: number, maxVisible: number) {
  const count = Math.min(maxVisible, totalPages);
  const start = Math.min(
    Math.max(currentPage - Math.floor(count / 2), 1),
    Math.max(totalPages - count + 1, 1),
  );

  return Array.from({ length: count }, (_, index) => start + index);
}

function PageControl({
  id,
  href,
  disabled,
  label,
  className,
  children,
  onClick,
}: {
  id: string;
  href?: string;
  disabled: boolean;
  label: string;
  className: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  if (disabled) {
    return (
      <span
        id={id}
        aria-disabled="true"
        aria-label={label}
        className={cn(
          'grid place-items-center rounded-md opacity-30',
          className,
        )}
      >
        {children}
      </span>
    );
  }

  if (href) {
    return (
      <Link
        id={id}
        href={href}
        aria-label={label}
        className={cn(
          'grid place-items-center rounded-md transition hover:bg-[#F1F2F3]',
          className,
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'grid place-items-center rounded-md transition hover:bg-[#F1F2F3]',
        className,
      )}
    >
      {children}
    </button>
  );
}

export default function Pagination({
  id,
  currentPage,
  totalPages,
  onPageChange,
  getPageHref,
  ariaLabel = '페이지 이동',
  variant,
  size,
  maxVisible = 5,
  showFirst = true,
  showLast = true,
  showPrevious = true,
  showNext = true,
  className,
}: {
  id?: string;
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  getPageHref?: (page: number) => string;
  ariaLabel?: string;
  variant?: PaginationVariant;
  size?: LegacySize;
  maxVisible?: number;
  showFirst?: boolean;
  showLast?: boolean;
  showPrevious?: boolean;
  showNext?: boolean;
  className?: string;
}) {
  const componentId = useComponentId('cm-pagination', id);

  if (totalPages <= 1) return null;

  const resolvedVariant = resolveVariant(variant, size);
  const styles = variants[resolvedVariant];
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const pages = visiblePages(safeCurrentPage, totalPages, maxVisible);

  const move = (page: number) => {
    const next = Math.min(Math.max(page, 1), totalPages);
    onPageChange?.(next);
  };

  const hrefFor = (page: number) => getPageHref?.(
    Math.min(Math.max(page, 1), totalPages),
  );

  return (
    <nav
      id={componentId}
      aria-label={ariaLabel}
      className={cn(styles.root, className)}
    >
      {showFirst ? (
        <PageControl
          id={`${componentId}-first`}
          href={hrefFor(1)}
          disabled={safeCurrentPage === 1}
          label="첫 페이지"
          className={styles.control}
          onClick={() => move(1)}
        >
          <ChevronsLeft className={styles.icon} />
        </PageControl>
      ) : null}

      {showPrevious ? (
        <PageControl
          id={`${componentId}-previous`}
          href={hrefFor(safeCurrentPage - 1)}
          disabled={safeCurrentPage === 1}
          label="이전 페이지"
          className={styles.control}
          onClick={() => move(safeCurrentPage - 1)}
        >
          <ChevronLeft className={styles.icon} />
        </PageControl>
      ) : null}

      {pages.map((page) => {
        const active = page === safeCurrentPage;
        const href = hrefFor(page);

        if (href && !active) {
          return (
            <Link
              id={`${componentId}-page-${page}`}
              key={page}
              href={href}
              className={cn(
                'grid place-items-center rounded-md font-medium transition',
                styles.page,
                styles.inactive,
              )}
            >
              {page}
            </Link>
          );
        }

        return (
          <button
            id={`${componentId}-page-${page}`}
            key={page}
            type="button"
            aria-current={active ? 'page' : undefined}
            onClick={() => move(page)}
            className={cn(
              'grid place-items-center rounded-md font-medium transition',
              styles.page,
              active ? styles.active : styles.inactive,
            )}
          >
            {page}
          </button>
        );
      })}

      {showNext ? (
        <PageControl
          id={`${componentId}-next`}
          href={hrefFor(safeCurrentPage + 1)}
          disabled={safeCurrentPage === totalPages}
          label="다음 페이지"
          className={styles.control}
          onClick={() => move(safeCurrentPage + 1)}
        >
          <ChevronRight className={styles.icon} />
        </PageControl>
      ) : null}

      {showLast ? (
        <PageControl
          id={`${componentId}-last`}
          href={hrefFor(totalPages)}
          disabled={safeCurrentPage === totalPages}
          label="마지막 페이지"
          className={styles.control}
          onClick={() => move(totalPages)}
        >
          <ChevronsRight className={styles.icon} />
        </PageControl>
      ) : null}
    </nav>
  );
}
