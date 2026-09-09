import 'server-only';

import { prisma } from '@/_lib/prisma';
import {
  buildNavigationTree,
  resolveNavigationPage,
  type NavigationItem,
  type NavigationPageContext,
  type NavigationRowLike,
} from '@/_lib/navigation-shared';
import { cache } from 'react';

export type {
  NavigationItem,
  NavigationLevel,
  NavigationPageContext,
} from '@/_lib/navigation-shared';

const getNavigationRows = cache(async (): Promise<NavigationRowLike[]> => {
  try {
    return await prisma.navigationMenu.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      select: {
        id: true,
        parentId: true,
        title: true,
        href: true,
        sortOrder: true,
        isVisible: true,
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'NavigationMenu DB를 읽지 못했습니다. 하드코딩 fallback 없이 빈 메뉴를 반환합니다.',
        error,
      );
    }

    return [];
  }
});

/**
 * Header / Hamburger / client Breadcrumb가 사용하는 현재 공개 Navigation.
 *
 * navigation_menu가 단일 Source of Truth이므로 하드코딩 fallback을 두지 않습니다.
 * 같은 RSC 요청 안에서는 getNavigationRows()가 React cache로 dedupe됩니다.
 */
export const getPrimaryNavigation = cache(
  async (): Promise<NavigationItem[]> => {
    const rows = await getNavigationRows();

    return buildNavigationTree(rows);
  },
);

/**
 * PageHeader처럼 실제 페이지 URL의 Navigation 문맥이 필요한 경우 사용합니다.
 *
 * 관리자에서 LNB 노출을 꺼도 직접 URL로 접근한 페이지의 제목/Breadcrumb가
 * 사라지지 않도록 PageHeader 문맥은 hidden row까지 포함한 DB tree에서 찾습니다.
 */
export const getNavigationPageContext = cache(
  async (pathname: string): Promise<NavigationPageContext | null> => {
    const rows = await getNavigationRows();
    const fullNavigation = buildNavigationTree(rows, {
      includeHidden: true,
    });

    return resolveNavigationPage(fullNavigation, pathname);
  },
);
