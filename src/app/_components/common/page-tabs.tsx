'use client';

import Inner from '@/app/_components/common/inner';
import Link from 'next/link';
import { useState } from 'react';

export type PageTabType = {
  id: string;
  label: string;
  href?: string;
};

type PageTabsProps = {
  id: string;
  ariaLabel: string;
  tabs: readonly PageTabType[];
  activeId?: string;
  onChange?: (id: string) => void;
  variant?: 'pills' | 'segmented';
  desktopVariant?: 'pills' | 'segmented';
  align?: 'start' | 'center' | 'end';
  centerOnMobile?: boolean;
};

export default function PageTabs({
  id,
  ariaLabel,
  tabs,
  activeId,
  onChange,
  variant = 'pills',
  desktopVariant,
  align,
  centerOnMobile = false,
}: PageTabsProps) {
  const [selectedId, setSelectedId] = useState(tabs[0]?.id ?? '');
  const currentId = activeId ?? selectedId;
  const isMobileSegmented = variant === 'segmented';
  const isDesktopSegmented = (desktopVariant ?? variant) === 'segmented';

  const alignClasses = {
    start: 'justify-start xl:justify-start',
    center: 'justify-center-safe xl:justify-center-safe',
    end: 'justify-end-safe xl:justify-end-safe',
  };

  const desktopAlignClasses = {
    start: 'xl:ml-0 xl:mr-auto',
    center: 'xl:mx-auto',
    end: 'xl:ml-auto xl:mr-0',
  };

  const mobilePadding = align || centerOnMobile ? 'px-5' : 'pl-5 pr-10';

  return (
    <nav id={id} aria-label={ariaLabel} className="scroll-mt-20 xl:scroll-mt-0">
      <Inner usePaddingHorizontalInMobile={false}>
        <ul
          className={`
            mt-5 flex w-full gap-2 overflow-x-auto whitespace-nowrap
            ${isMobileSegmented ? 'px-5 text-[14px]' : `${mobilePadding} text-[15px]`}
            ${
              isDesktopSegmented
                ? 'xl:mt-15 xl:w-fit xl:gap-0 xl:overflow-visible xl:rounded-full xl:border xl:border-default xl:p-2 xl:text-[16px]'
                : 'xl:mt-20 xl:gap-3 xl:text-[18px]'
            }
            ${align ? alignClasses[align] : centerOnMobile ? 'justify-center-safe xl:justify-center' : 'xl:justify-center'}
            ${isDesktopSegmented ? (align ? desktopAlignClasses[align] : 'xl:mx-auto') : ''}
            `}
        >
          {tabs.map((tab) => {
            const isActive = currentId === tab.id;

            const className = `
            inline-block rounded-full border
            ${isMobileSegmented ? 'px-4 py-2' : 'px-5 py-2.5'}
            ${isDesktopSegmented ? 'xl:px-7 xl:py-3' : 'xl:px-8 xl:py-3'}
            ${
              isActive
                ? 'border-brand bg-brand font-bold text-white'
                : `border-default bg-base font-medium text-tertiary
              ${isDesktopSegmented ? 'xl:border-transparent' : ''}`
            }
            `;

            return (
              <li key={tab.id} className="shrink-0">
                {tab.href ? (
                  <Link
                    href={tab.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={className}
                  >
                    {tab.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setSelectedId(tab.id);
                      onChange?.(tab.id);
                    }}
                    className={className}
                  >
                    {tab.label}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </Inner>
    </nav>
  );
}
