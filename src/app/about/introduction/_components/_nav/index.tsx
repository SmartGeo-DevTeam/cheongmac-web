'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navs } from './data';

export default function AboutIntroductionNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="청맥병원 소개 메뉴"
      className="grid h-11.5 grid-cols-3 text-[15px] font-semibold
      xl:mx-auto xl:mt-15 xl:max-w-157 xl:h-16 xl:gap-3"
    >
      {navs.map((nav) => {
        const isActive = pathname === nav.href;

        return (
          <Link
            key={nav.href}
            href={nav.href}
            aria-current={isActive ? 'page' : undefined}
            className={`flex items-center justify-center transition-colors
              xl:border-b-[3px] xl:text-[20px]
              ${
                isActive
                  ? 'border-b-4 border-b-accent text-accent'
                  : 'border-b-2 border-b-disabled text-disabled'
              }`}
          >
            {nav.label}
          </Link>
        );
      })}
    </nav>
  );
}
