import { NAVIGATION } from '@/app/_data/site/navigation';
import type { NavigationItem } from '@/app/_types/site/navigation';

export function getPrimaryNavigation(): NavigationItem[] {
  return NAVIGATION;
}

/**
 * 현재 URL에 해당하는 메뉴 경로 반환
 *
 * 예:
 * /about/doctors
 * → [병원 소개, 의료진/진료과]
 *
 * /community/news
 * → [병원소식, 청맥뉴스]
 */
export function getNavigationTrail(pathname: string): NavigationItem[] {
  const currentPath = pathname.replace(/\/+$/, '') || '/';

  let bestTrail: NavigationItem[] = [];
  let bestLength = -1;

  function traverse(items: NavigationItem[], parents: NavigationItem[] = []) {
    for (const item of items) {
      const href = item.href.replace(/\/+$/, '') || '/';
      const trail = [...parents, item];

      // 정확히 일치하거나 하위 경로인지 확인
      const isMatch =
        currentPath === href ||
        (href !== '/' && currentPath.startsWith(`${href}/`));

      // 가장 구체적인 경로를 우선 선택
      if (
        isMatch &&
        (href.length > bestLength ||
          (href.length === bestLength && trail.length > bestTrail.length))
      ) {
        bestTrail = trail;
        bestLength = href.length;
      }

      // 하위 메뉴 재귀 탐색
      if (item.children?.length) {
        traverse(item.children, trail);
      }
    }
  }

  traverse(NAVIGATION);

  return bestTrail;
}
