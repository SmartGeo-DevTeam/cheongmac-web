'use client';

import type { NavigationItem } from '@/_lib/navigation';
import { cn } from '@/_lib/utils';
import { usePrimaryNavigation } from '@/app/_providers/navigation-provider';
import { ChevronDown, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useComponentId } from './component-id';

export type BreadcrumbItem = {
  label: string;
  href?: string;
  showChevron?: boolean;
};

type BreadcrumbLevel = {
  current: NavigationItem;
  options: NavigationItem[];
};

function isInternalHref(href: string) {
  return href.startsWith('/');
}

function matchesPath(pathname: string, href: string) {
  if (!isInternalHref(href)) return false;
  if (href === '/') return pathname === '/';

  return pathname === href || pathname.startsWith(`${href}/`);
}

function resolveNavigationLevels(
  navigation: NavigationItem[],
  pathname: string,
): BreadcrumbLevel[] {
  let matchedParent: NavigationItem | null = null;
  let matchedChild: NavigationItem | null = null;
  let bestLength = -1;

  for (const parent of navigation) {
    if (matchesPath(pathname, parent.href) && parent.href.length > bestLength) {
      matchedParent = parent;
      matchedChild = null;
      bestLength = parent.href.length;
    }

    for (const child of parent.children ?? []) {
      if (matchesPath(pathname, child.href) && child.href.length > bestLength) {
        matchedParent = parent;
        matchedChild = child;
        bestLength = child.href.length;
      }
    }
  }

  if (!matchedParent) return [];

  const levels: BreadcrumbLevel[] = [
    {
      current: matchedParent,
      options: navigation,
    },
  ];

  if (matchedChild) {
    levels.push({
      current: matchedChild,
      options: matchedParent.children ?? [],
    });
  }

  return levels;
}

function FallbackBreadcrumb({
  componentId,
  items,
}: {
  componentId: string;
  items: BreadcrumbItem[];
}) {
  return (
    <>
      {items.map((item, index) => {
        const itemId = `${componentId}-fallback-${index}`;

        return (
          <div key={`${item.label}-${index}`} className="contents">
            <span
              id={`${itemId}-divider`}
              aria-hidden="true"
              className="mx-2 h-3.5 w-px shrink-0 bg-[#DDDDDD]"
            />
            {item.href ? (
              <Link
                id={itemId}
                href={item.href}
                className="flex min-w-0 items-center gap-2 transition hover:text-[#006651]"
              >
                <span className="truncate">{item.label}</span>
                {item.showChevron !== false ? (
                  <ChevronDown className="size-3.5 shrink-0" strokeWidth={1.6} />
                ) : null}
              </Link>
            ) : (
              <span
                id={itemId}
                aria-current={index === items.length - 1 ? 'page' : undefined}
                className="flex min-w-0 items-center gap-2"
              >
                <span className="truncate">{item.label}</span>
                {item.showChevron !== false ? (
                  <ChevronDown className="size-3.5 shrink-0" strokeWidth={1.6} />
                ) : null}
              </span>
            )}
          </div>
        );
      })}
    </>
  );
}

export default function Breadcrumb({
  id,
  items = [],
  variant = 'default',
  className,
}: {
  id?: string;
  items?: BreadcrumbItem[];
  variant?: 'default' | 'compact';
  className?: string;
}) {
  const componentId = useComponentId('cm-breadcrumb', id);
  const navigation = usePrimaryNavigation();
  const pathname = usePathname();
  const rootRef = useRef<HTMLElement>(null);
  const [openLevel, setOpenLevel] = useState<number | null>(null);

  const levels = useMemo(
    () => resolveNavigationLevels(navigation, pathname),
    [navigation, pathname],
  );

  useEffect(() => {
    setOpenLevel(null);
  }, [pathname]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (
        rootRef.current &&
        event.target instanceof Node &&
        !rootRef.current.contains(event.target)
      ) {
        setOpenLevel(null);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  return (
    <nav
      ref={rootRef}
      id={componentId}
      aria-label="현재 위치"
      className={cn(
        'relative z-30 flex min-w-0 items-center text-[#555B63]',
        variant === 'compact' ? 'text-[11px] xl:text-sm' : 'text-xs xl:text-sm',
        className,
      )}
    >
      <Link
        id={`${componentId}-home`}
        href="/"
        className="flex shrink-0 items-center gap-1 transition hover:text-[#006651]"
      >
        <Home className="size-3.5 xl:size-4" strokeWidth={1.8} />
        <span>홈</span>
      </Link>

      {levels.length ? (
        levels.map((level, index) => {
          const levelId = `${componentId}-level-${index}`;
          const isOpen = openLevel === index;

          return (
            <div key={level.current.id} className="contents">
              <span
                id={`${levelId}-divider`}
                aria-hidden="true"
                className="mx-2 h-3.5 w-px shrink-0 bg-[#DDDDDD]"
              />

              <div className="relative min-w-0">
                <button
                  id={`${levelId}-trigger`}
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenLevel((current) => (current === index ? null : index))
                  }
                  className="flex min-w-0 items-center gap-2 text-left transition hover:text-[#006651]"
                >
                  <span className="truncate">{level.current.title}</span>
                  <ChevronDown
                    className={cn(
                      'size-3.5 shrink-0 transition-transform',
                      isOpen && 'rotate-180',
                    )}
                    strokeWidth={1.6}
                  />
                </button>

                {isOpen ? (
                  <div
                    id={`${levelId}-menu`}
                    role="menu"
                    className="absolute left-0 top-[calc(100%+10px)] min-w-[170px] overflow-hidden rounded-xl border border-[#E5E7EB] bg-white py-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                  >
                    {level.options.map((option) => {
                      const active = option.id === level.current.id;

                      return (
                        <Link
                          id={`${levelId}-option-${option.id}`}
                          key={option.id}
                          href={option.href}
                          role="menuitem"
                          aria-current={active ? 'page' : undefined}
                          onClick={() => setOpenLevel(null)}
                          className={cn(
                            'block whitespace-nowrap px-4 py-2.5 text-sm transition',
                            active
                              ? 'bg-[#F3F8F6] font-semibold text-[#006651]'
                              : 'text-[#555B63] hover:bg-[#F7F8F8] hover:text-[#006651]',
                          )}
                        >
                          {option.title}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })
      ) : (
        <FallbackBreadcrumb componentId={componentId} items={items} />
      )}
    </nav>
  );
}
