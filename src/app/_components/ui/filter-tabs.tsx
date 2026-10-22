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

// Shared theme treatments; layout/sizing variants remain compatible with existing callers.
const activeTeal = 'border-cm-teal-600 bg-cm-teal-600 text-white';
const inactiveTeal =
  'border-cm-gray-200 bg-white text-cm-gray-600 hover:border-cm-teal-300 hover:text-cm-teal-600';
const sharedItem =
  'cm-type-label shrink-0 rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cm-teal-600 disabled:pointer-events-none disabled:opacity-40';

const variants: Record<FilterTabsVariant, VariantStyle> = {
  news: {
    root: 'flex w-full justify-center gap-2.5 xl:gap-3',
    item: `${sharedItem} min-w-[68px] px-4 py-2 xl:min-w-[92px] xl:px-5 xl:py-2.5`,
    active: activeTeal,
    inactive: inactiveTeal,
  },
  notice: {
    root: 'flex w-full justify-center gap-2',
    item: `${sharedItem} h-11 min-w-[76px] px-4 xl:h-[52px] xl:min-w-[104px] xl:px-6`,
    active: activeTeal,
    inactive: inactiveTeal,
  },
  treatment: {
    root: 'flex w-full justify-center gap-2 xl:gap-4',
    item: `${sharedItem} h-11 min-w-[92px] px-4 xl:h-14 xl:min-w-[132px] xl:px-7`,
    active: activeTeal,
    inactive: inactiveTeal,
  },
  equipment: {
    root: 'flex w-full justify-start gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:justify-center xl:gap-3',
    item: `${sharedItem} h-11 px-5 xl:h-12 xl:px-7`,
    active: activeTeal,
    inactive: inactiveTeal,
  },
  year: {
    root: 'flex w-full justify-start gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-5 px-5 xl:mx-0 xl:gap-4 xl:px-0',
    item: `${sharedItem} h-10 min-w-[74px] px-5 xl:h-11 xl:min-w-[82px]`,
    active: activeTeal,
    inactive: inactiveTeal,
  },
  partner: {
    root: 'hidden w-full justify-center gap-3 xl:flex',
    item: `${sharedItem} h-12 min-w-[118px] px-7`,
    active: activeTeal,
    inactive: inactiveTeal,
  },
  department: {
    root: 'mt-3 grid w-full grid-cols-3 gap-x-2 justify-items-center xl:mx-auto xl:mt-5 xl:w-4/5 xl:gap-x-6',
    item: 'cm-type-label w-full rounded-lg py-2 transition-colors disabled:pointer-events-none disabled:opacity-40 xl:py-3',
    active: 'bg-cm-teal-600 text-white',
    inactive: 'bg-white text-cm-gray-600 xl:border xl:border-cm-gray-200 xl:bg-transparent',
  },
  segmented: {
    root: 'mx-auto grid w-full max-w-[520px] grid-cols-2 rounded-full bg-cm-gray-50 p-2 xl:max-w-[600px]',
    item: 'cm-type-label h-12 rounded-full transition-colors disabled:pointer-events-none disabled:opacity-40 xl:h-14',
    active: 'bg-white text-cm-orange-700 shadow-[0_2px_12px_rgba(0,0,0,0.04)]',
    inactive: 'text-cm-gray-500 hover:text-cm-gray-700',
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
  return (
    String(value)
      .trim()
      .replace(/[^A-Za-z0-9가-힣_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase() || 'item'
  );
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
            className={cn(styles.item, active ? styles.active : styles.inactive)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
