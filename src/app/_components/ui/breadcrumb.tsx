import { cn } from '@/_lib/utils';
import { ChevronDown, Home } from 'lucide-react';
import Link from 'next/link';

export type BreadcrumbItem = {
  label: string;
  href?: string;
  showChevron?: boolean;
};

export default function Breadcrumb({
  items,
  variant = 'default',
  className,
}: {
  items: BreadcrumbItem[];
  variant?: 'default' | 'compact';
  className?: string;
}) {
  return (
    <nav
      aria-label="현재 위치"
      className={cn(
        'flex min-w-0 items-center text-[#555B63]',
        variant === 'compact' ? 'text-[11px] xl:text-sm' : 'text-xs xl:text-sm',
        className,
      )}
    >
      <Link
        href="/"
        className="flex shrink-0 items-center gap-1 transition hover:text-[#006651]"
      >
        <Home className="size-3.5 xl:size-4" strokeWidth={1.8} />
        <span>홈</span>
      </Link>

      {items.map((item, index) => {
        const content = (
          <>
            <span className="truncate">{item.label}</span>
            {item.showChevron !== false ? (
              <ChevronDown className="size-3.5 shrink-0" strokeWidth={1.6} />
            ) : null}
          </>
        );

        return (
          <div key={`${item.label}-${index}`} className="contents">
            <span
              aria-hidden="true"
              className="mx-2 h-3.5 w-px shrink-0 bg-[#DDDDDD]"
            />
            {item.href ? (
              <Link
                href={item.href}
                className="flex min-w-0 items-center gap-2 transition hover:text-[#006651]"
              >
                {content}
              </Link>
            ) : (
              <span
                aria-current={index === items.length - 1 ? 'page' : undefined}
                className="flex min-w-0 items-center gap-2"
              >
                {content}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
