'use client';

import type { DiagnosticTab } from '@/app/_types/clinic/diagnostics';
import type { KeyboardEvent } from 'react';

type MethodTabsProps = {
  tabs: readonly DiagnosticTab[];
  activeId: string;
  onSelect: (id: string) => void;
  ariaLabel?: string;
};

const desktopColumns: Record<number, string> = {
  1: 'xl:grid-cols-[auto]',
  2: 'xl:grid-cols-[auto_auto]',
  3: 'xl:grid-cols-[auto_auto_auto]',
  4: 'xl:grid-cols-[auto_auto_auto_auto]',
};

export default function MethodTabs({ tabs, activeId, onSelect, ariaLabel = '검사 방법 선택' }: MethodTabsProps) {
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, current: number) {
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown': next = (current + 1) % tabs.length; break;
      case 'ArrowLeft':
      case 'ArrowUp': next = (current - 1 + tabs.length) % tabs.length; break;
      case 'Home': next = 0; break;
      case 'End': next = tabs.length - 1; break;
      default: return;
    }
    event.preventDefault();
    onSelect(tabs[next].id);
    const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[next]?.focus();
  }

  return (
    <div className="mt-15 text-[16px] xl:mt-20 xl:px-50 xl:sticky xl:top-16 xl:z-1">
      <div role="tablist" aria-label={ariaLabel} className={`grid grid-cols-2 gap-2 xl:p-4 xl:gap-5 xl:rounded-full xl:border xl:border-default xl:bg-base ${desktopColumns[tabs.length] ?? 'xl:flex xl:flex-wrap'}`}>
        {tabs.map((tab, index) => {
          const selected = tab.id === activeId;
          return (
            <button
              type="button"
              key={tab.id}
              role="tab"
              id={`${tab.id}-tab`}
              aria-selected={selected}
              aria-controls={selected ? tab.id : undefined}
              tabIndex={selected ? 0 : -1}
              onClick={() => onSelect(tab.id)}
              onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) => onKeyDown(event, index)}
              className={selected
                ? 'py-3 rounded-lg border border-green-600 bg-green-600 font-semibold text-inverse xl:px-7 xl:py-4 xl:rounded-full xl:text-[22px]'
                : 'py-3 rounded-lg border border-default font-medium xl:px-7 xl:py-4 xl:rounded-full xl:border-0 xl:text-[22px]'}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
