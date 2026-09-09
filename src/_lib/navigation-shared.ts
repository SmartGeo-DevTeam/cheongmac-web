export type NavigationItem = {
  id: string;
  href: string;
  title: string;
  children?: NavigationItem[];
};

export type NavigationRowLike = {
  id: string;
  parentId: string | null;
  title: string;
  href: string;
  sortOrder: number;
  isVisible: boolean;
};

export type NavigationLevel = {
  current: NavigationItem;
  options: NavigationItem[];
};

export type NavigationPageContext = {
  current: NavigationItem;
  levels: NavigationLevel[];
};

function isInternalHref(href: string) {
  return href.startsWith('/');
}

export function matchesNavigationPath(pathname: string, href: string) {
  if (!isInternalHref(href)) return false;
  if (href === '/') return pathname === '/';

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function buildNavigationTree(
  rows: NavigationRowLike[],
  {
    includeHidden = false,
  }: {
    includeHidden?: boolean;
  } = {},
): NavigationItem[] {
  const sourceRows = includeHidden
    ? rows
    : rows.filter((row) => row.isVisible);

  const items = new Map<string, NavigationItem>();

  for (const row of sourceRows) {
    items.set(row.id, {
      id: row.id,
      href: row.href,
      title: row.title,
      children: [],
    });
  }

  const roots: NavigationItem[] = [];

  for (const row of sourceRows) {
    const item = items.get(row.id);
    if (!item) continue;

    if (!row.parentId) {
      roots.push(item);
      continue;
    }

    const parent = items.get(row.parentId);
    if (parent) {
      parent.children?.push(item);
    }
  }

  return roots;
}

function isBetterChain(
  candidate: NavigationItem[],
  current: NavigationItem[],
) {
  if (!current.length) return true;

  const candidateItem = candidate[candidate.length - 1];
  const currentItem = current[current.length - 1];

  if (candidateItem.href.length !== currentItem.href.length) {
    return candidateItem.href.length > currentItem.href.length;
  }

  return candidate.length > current.length;
}

function findBestNavigationChain(
  navigation: NavigationItem[],
  pathname: string,
) {
  let bestChain: NavigationItem[] = [];

  const visit = (
    items: NavigationItem[],
    parents: NavigationItem[],
  ) => {
    for (const item of items) {
      const chain = [...parents, item];

      if (
        matchesNavigationPath(pathname, item.href) &&
        isBetterChain(chain, bestChain)
      ) {
        bestChain = chain;
      }

      if (item.children?.length) {
        visit(item.children, chain);
      }
    }
  };

  visit(navigation, []);
  return bestChain;
}

export function resolveNavigationLevels(
  navigation: NavigationItem[],
  pathname: string,
): NavigationLevel[] {
  const chain = findBestNavigationChain(navigation, pathname);

  if (!chain.length) return [];

  return chain.map((current, index) => ({
    current,
    options:
      index === 0
        ? navigation
        : chain[index - 1].children ?? [],
  }));
}

export function resolveNavigationPage(
  navigation: NavigationItem[],
  pathname: string,
): NavigationPageContext | null {
  const levels = resolveNavigationLevels(navigation, pathname);

  if (!levels.length) return null;

  return {
    current: levels[levels.length - 1].current,
    levels,
  };
}
