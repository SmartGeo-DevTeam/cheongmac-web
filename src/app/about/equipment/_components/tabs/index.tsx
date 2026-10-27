'use client';

import Inner from '@/app/_components/common/inner';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tabs } from './data';

export default function AbouteEuipmentTabs() {
  const pathname = usePathname();
  const activeCategory = pathname.split('/')[3] ?? 'all';

  return (
    <nav
      id="about-euipment-tabs"
      aria-label="첨단의료장비 분류"
      className="scroll-mt-20 xl:scroll-mt-0"
    >
      <Inner usePaddingHorizontalInMobile={false}>
        <ul
          className="mt-5 pl-5 pr-10 flex gap-2 w-full overflow-x-auto whitespace-nowrap text-[15px]
          xl:mt-20 xl:justify-center xl:gap-3 xl:text-[18px]"
        >
          {tabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            const href =
              tab.id === 'all'
                ? '/about/equipment'
                : `/about/equipment/${tab.id}`;

            return (
              <li key={tab.id} className="shrink-0">
                <Link
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`inline-block px-5 py-2.5 rounded-full border
                    xl:px-8 xl:py-3
                    ${
                      isActive
                        ? 'border-brand bg-brand font-bold text-white'
                        : 'border-default bg-base font-medium text-tertiary'
                    }
                  `}
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </Inner>
    </nav>
  );
}
