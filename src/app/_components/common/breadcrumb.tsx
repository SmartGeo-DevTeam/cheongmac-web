'use client';

import { getNavigationTrail, getPrimaryNavigation, getNavigationHref } from '@/app/_lib/navigation/navigation-tree';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import Inner from './inner';
import { BreadcrumbDivider } from './breadcrumb-divider';
import { BreadcrumbDropdown } from './breadcrumb-dropdown';

export default function Breadcrumb() {
  const pathname = usePathname();

  // 현재 경로에 해당하는 메뉴 계층
  const trail = getNavigationTrail(pathname);
  const navigation = getPrimaryNavigation();

  // 진료 개요 페이지에서는 공개된 3차 항목 선택기를 추가합니다.
  // 기존 Breadcrumb 계층은 유지하고, 상세 페이지를 현재 위치로 오인하지 않게 합니다.
  const clinicDetailItems =
    trail.length === 2 &&
    (trail[0]?.id === 'vascular' || trail[0]?.id === 'general')
      ? (trail[1]?.children ?? [])
      : [];

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
              depth === 0 ? navigation : (trail[depth - 1].children ?? []);

            return (
              <Fragment key={item.id}>
                <BreadcrumbDivider />

                <BreadcrumbDropdown
                  label={item.title}
                  items={siblings.map((sibling) => ({
                    label: sibling.title,
                    href: getNavigationHref(sibling),
                  }))}
                />
              </Fragment>
            );
          })}

          {/* 2차 진료 개요에서도 공개된 3차 메뉴를 선택할 수 있습니다. */}
          {clinicDetailItems.length > 0 && (
            <>
              <BreadcrumbDivider />
              <BreadcrumbDropdown
                label="세부 진료 선택"
                items={clinicDetailItems.map((child) => ({
                  label: child.title,
                  href: getNavigationHref(child),
                }))}
              />
            </>
          )}
        </div>
      </Inner>
    </section>
  );
}
