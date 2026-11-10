'use client';

import Inner from '@/app/_components/common/inner';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tabs } from '@/app/_data/about/tour/tabs';

export default function TourTabs() {
  const pathname = usePathname();

  return (
    <nav id="about-tour-tabs">
      <Inner>
        <div
          className="mt-5
          xl:mt-15 xl:flex xl:justify-center"
        >
          <div
            className="relative p-2 grid grid-cols-2 gap-2 rounded-[10px] bg-subtle z-10
            xl:p-4 xl:gap-0 xl:rounded-full"
          >
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  aria-current={isActive ? 'page' : undefined}
                  data-active={isActive}
                  className={`p-3 rounded-lg text-center font-semibold text-[15px]
                    xl:px-26 xl:py-4 xl:rounded-full xl:text-[22px]
                    ${isActive ? `bg-base font-bold text-accent` : ``}
                    `}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </Inner>
    </nav>
  );
}
