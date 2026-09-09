'use client';

import { cn } from '@/_lib/utils';
import type { ReactNode } from 'react';

export type FilterTabItem<T extends string | number> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};

type FilterTabsTone = 'green' | 'orange';
type FilterTabsSize = 'sm' | 'md' | 'lg' | 'category' | 'year';

const sizeClasses: Record<FilterTabsSize, string> = {
  sm: 'min-w-[68px] px-4 py-2 text-xs xl:min-w-[92px] xl:px-5 xl:py-2.5 xl:text-sm',
  md: 'h-11 min-w-[76px] px-4 text-base xl:h-[52px] xl:min-w-[104px] xl:px-6 xl:text-xl',
  lg: 'h-11 min-w-[92px] px-4 text-base xl:h-14 xl:min-w-[132px] xl:px-7 xl:text-xl',
  category: 'h-11 px-5 text-base xl:h-12 xl:px-7 xl:text-xl',
  year: 'h-10 min-w-[74px] px-5 text-sm xl:h-11 xl:min-w-[82px] xl:text-base',
};

const activeClasses: Record<FilterTabsTone, string> = {
  green: 'border-[#006651] bg-[#006651] text-white',
  orange: 'border-[#FF7040] bg-[#FF7040] text-white',
};

const inactiveClasses: Record<FilterTabsTone, string> = {
  green:
    'border-[#E4E6E8] bg-white text-[#6A7076] hover:border-[#AEB4BC] hover:text-[#006651]',
  orange:
    'border-[#DDE1E5] bg-white text-[#8C939A] hover:border-[#FFB09A] hover:text-[#FF7040]',
};

export default function FilterTabs<T extends string | number>({
  items,
  value,
  onValueChange,
  ariaLabel = '목록 필터',
  tone = 'green',
  size = 'md',
  scrollable = false,
  className,
}: {
  items: readonly FilterTabItem<T>[];
  value: T;
  onValueChange: (value: T) => void;
  ariaLabel?: string;
  tone?: FilterTabsTone;
  size?: FilterTabsSize;
  scrollable?: boolean;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'flex w-full gap-2',
        scrollable
          ? 'justify-start overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          : 'justify-center',
        className,
      )}
    >
      {items.map((item) => {
        const active = item.value === value;

        return (
          <button
            key={String(item.value)}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={item.disabled}
            onClick={() => onValueChange(item.value)}
            className={cn(
              'shrink-0 rounded-full border font-medium transition disabled:pointer-events-none disabled:opacity-40',
              sizeClasses[size],
              active ? activeClasses[tone] : inactiveClasses[tone],
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
