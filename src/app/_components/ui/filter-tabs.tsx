'use client';

import { cn } from '@/_lib/utils';
import type { ReactNode } from 'react';
import { useComponentId } from './component-id';

export type FilterTabItem<T extends string | number> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};

export type FilterTabsVariant =
  | 'news'
  | 'notice'
  | 'treatment'
  | 'equipment'
  | 'year'
  | 'partner'
  | 'department'
  | 'segmented';

type LegacyTone = 'green' | 'orange';
type LegacySize = 'sm' | 'md' | 'lg' | 'category' | 'year';

type VariantStyle = {
  root: string;
  item: string;
  active: string;
  inactive: string;
};

const variants: Record<FilterTabsVariant, VariantStyle> = {
  news: {
    root: 'flex w-full justify-center gap-2.5 xl:gap-3',
    item:
      'shrink-0 rounded-full border font-medium transition disabled:pointer-events-none disabled:opacity-40 min-w-[68px] px-4 py-2 text-xs xl:min-w-[92px] xl:px-5 xl:py-2.5 xl:text-sm',
    active: 'border-[#006651] bg-[#006651] text-white',
    inactive:
      'border-[#E4E6E8] bg-white text-[#6A7076] hover:border-[#AEB4BC] hover:text-[#006651]',
  },
  notice: {
    root: 'flex w-full justify-center gap-2',
    item:
      'shrink-0 rounded-full border font-medium transition disabled:pointer-events-none disabled:opacity-40 h-11 min-w-[76px] px-4 text-base xl:h-[52px] xl:min-w-[104px] xl:px-6 xl:text-xl',
    active: 'border-[#006651] bg-[#006651] text-white',
    inactive:
      'border-[#E4E6E8] bg-white text-[#6A7076] hover:border-[#AEB4BC] hover:text-[#006651]',
  },
  treatment: {
    root: 'flex w-full justify-center gap-2 xl:gap-4',
    item:
      'shrink-0 rounded-full border font-medium transition disabled:pointer-events-none disabled:opacity-40 h-11 min-w-[92px] px-4 text-base xl:h-14 xl:min-w-[132px] xl:px-7 xl:text-xl',
    active: 'border-[#006651] bg-[#006651] text-white',
    inactive:
      'border-[#E4E6E8] bg-white text-[#6A7076] hover:border-[#AEB4BC] hover:text-[#006651]',
  },
  equipment: {
    root:
      'flex w-full justify-start gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:justify-center xl:gap-3',
    item:
      'shrink-0 rounded-full border font-medium transition disabled:pointer-events-none disabled:opacity-40 h-11 px-5 text-base xl:h-12 xl:px-7 xl:text-xl',
    active: 'border-[#006651] bg-[#006651] text-white',
    inactive:
      'border-[#E4E6E8] bg-white text-[#6A7076] hover:border-[#AEB4BC] hover:text-[#006651]',
  },
  year: {
    root:
      'flex w-full justify-start gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-5 px-5 xl:mx-0 xl:gap-4 xl:px-0',
    item:
      'shrink-0 rounded-full border font-medium transition disabled:pointer-events-none disabled:opacity-40 h-10 min-w-[74px] px-5 text-sm xl:h-11 xl:min-w-[82px] xl:text-base',
    active: 'border-[#006651] bg-[#006651] text-white',
    inactive:
      'border-[#E4E6E8] bg-white text-[#6A7076] hover:border-[#AEB4BC] hover:text-[#006651]',
  },
  partner: {
    root: 'hidden w-full justify-center gap-3 xl:flex',
    item:
      'h-12 min-w-[118px] shrink-0 rounded-full border px-7 text-lg font-medium transition disabled:pointer-events-none disabled:opacity-40',
    active: 'border-[#08715F] bg-[#08715F] text-white',
    inactive:
      'border-[#E0E3E5] bg-white text-[#9BA0A6] hover:border-[#BACCC7] hover:text-[#5B6269]',
  },
  department: {
    root:
      'mt-3 grid w-full grid-cols-3 gap-x-2 justify-items-center xl:mx-auto xl:mt-5 xl:w-4/5 xl:gap-x-6',
    item:
      'w-full rounded-lg py-2 font-bold transition disabled:pointer-events-none disabled:opacity-40 xl:py-3 xl:text-xl',
    active: 'bg-[#045545] text-white',
    inactive:
      'bg-white text-[#767C88] xl:border xl:border-[#E5E7EB] xl:bg-transparent',
  },
  segmented: {
    root:
      'mx-auto grid w-full max-w-[520px] grid-cols-2 rounded-full bg-[#F4F5F6] p-2 xl:max-w-[600px]',
    item:
      'h-12 rounded-full text-base font-semibold transition disabled:pointer-events-none disabled:opacity-40 xl:h-14 xl:text-xl',
    active:
      'bg-white text-[#FF6B3D] shadow-[0_2px_12px_rgba(0,0,0,0.04)]',
    inactive: 'text-[#A7ACB3] hover:text-[#6F757C]',
  },
};

function legacyVariant(
  size: LegacySize | undefined,
  tone: LegacyTone | undefined,
): FilterTabsVariant {
  if (size === 'sm') return 'news';
  if (size === 'lg') return 'treatment';
  if (size === 'category') return 'equipment';
  if (size === 'year') return 'year';
  if (tone === 'orange') return 'notice';
  return 'notice';
}

function domPart(value: string | number) {
  return String(value)
    .trim()
    .replace(/[^A-Za-z0-9가-힣_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase() || 'item';
}

export default function FilterTabs<T extends string | number>({
  id,
  items,
  value,
  onValueChange,
  ariaLabel = '목록 필터',
  variant,
  semantic = 'group',
  className,
  // legacy props: 기존 호출부가 남아 있어도 깨지지 않도록 유지합니다.
  tone,
  size,
}: {
  id?: string;
  items: readonly FilterTabItem<T>[];
  value: T;
  onValueChange: (value: T) => void;
  ariaLabel?: string;
  variant?: FilterTabsVariant;
  semantic?: 'group' | 'tabs';
  className?: string;
  tone?: LegacyTone;
  size?: LegacySize;
  scrollable?: boolean;
}) {
  const componentId = useComponentId('cm-filter-tabs', id);
  const resolvedVariant = variant ?? legacyVariant(size, tone);
  const styles = variants[resolvedVariant];
  const isTabs = semantic === 'tabs';

  return (
    <div
      id={componentId}
      role={isTabs ? 'tablist' : 'group'}
      aria-label={ariaLabel}
      className={cn(styles.root, className)}
    >
      {items.map((item) => {
        const active = item.value === value;

        return (
          <button
            id={`${componentId}-item-${domPart(item.value)}`}
            key={String(item.value)}
            type="button"
            role={isTabs ? 'tab' : undefined}
            aria-selected={isTabs ? active : undefined}
            aria-pressed={!isTabs ? active : undefined}
            disabled={item.disabled}
            onClick={() => onValueChange(item.value)}
            className={cn(
              styles.item,
              active ? styles.active : styles.inactive,
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
