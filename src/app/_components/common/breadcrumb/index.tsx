'use client';

import { NAVIGATION, getNavigationTrail } from '@/_lib/navigation';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import Inner from '../inner';
import { BreadcrumbDivider } from './_components/divider';
import { BreadcrumbDropdown } from './_components/dropdown';

export default function Breadcrumb() {
  const pathname = usePathname();

  // 현재 경로에 해당하는 메뉴 계층
  const trail = getNavigationTrail(pathname);

  // 등록되지 않은 경로라면 표시하지 않음
  if (trail.length === 0) return null;

  return (
    <section id="body-top-breadcrumb">
      <Inner>
        <div
          className="flex items-center gap-2 text-[11px] text-primary
          xl:h-15.5 xl:gap-3 xl:text-[16px]"
        >
          {/* 홈 */}
          <Link href="/" aria-label="홈으로 이동">
            <Home className="size-3 xl:size-4" />
          </Link>

          {/* 현재 메뉴 깊이에 따라 드롭다운 자동 생성 */}
          {trail.map((item, depth) => {
            // 1차 메뉴라면 전체 NAVIGATION
            // 2차 이상이라면 부모 메뉴의 children
            const siblings =
              depth === 0 ? NAVIGATION : (trail[depth - 1].children ?? []);

            return (
              <Fragment key={item.id}>
                <BreadcrumbDivider />

                <BreadcrumbDropdown
                  label={item.title}
                  items={siblings.map((sibling) => ({
                    label: sibling.title,
                    href: sibling.href,
                  }))}
                />
              </Fragment>
            );
          })}
        </div>
      </Inner>
    </section>
  );
}
