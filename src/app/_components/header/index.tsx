'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import type { Locale } from '@/i18n-config';
import {
  LANGUAGE_OPTIONS,
  getLocalePath,
  getPrimaryNavigation,
  withLocale,
} from '@/_lib/navigation';

type HeaderProps = {
  lang: Locale;
};

export default function Header({ lang }: HeaderProps) {
  const pathname = usePathname();
  const [hoveredPrimaryId, setHoveredPrimaryId] = useState<string | null>(null);

  const primaryNavigation = useMemo(() => getPrimaryNavigation(lang), [lang]);

  const hoveredPrimary = hoveredPrimaryId
    ? (primaryNavigation.find((item) => item.id === hoveredPrimaryId) ?? null)
    : null;

  const isCurrentPath = (href: string) => {
    const localizedHref = withLocale(lang, href);

    if (localizedHref === `/${lang}`) {
      return pathname === localizedHref;
    }

    return (
      pathname === localizedHref || pathname.startsWith(`${localizedHref}/`)
    );
  };

  return (
    <>
      <header
        className="fixed left-0 top-0 w-full border-b border-b-[#CCCCCC] bg-white z-50"
        onMouseLeave={() => setHoveredPrimaryId(null)}
      >
        <div className="mx-auto px-6 h-15 flex justify-between items-center gap-6">
          <div className="w-full h-full flex items-center gap-37.5">
            <Link
              href={withLocale(lang, '/')}
              className="shrink-0 relative w-38.75 aspect-logo"
            >
              <Image
                src={`/common/logo.svg`}
                alt="logo"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Link>

            <nav className="w-full h-full flex">
              {primaryNavigation.map((item) => {
                const isHovered = hoveredPrimary?.id === item.id;
                const isActive = isHovered || isCurrentPath(item.href);

                return (
                  <Link
                    key={item.id}
                    href={withLocale(lang, item.href)}
                    onMouseEnter={() => setHoveredPrimaryId(item.id)}
                    onFocus={() => setHoveredPrimaryId(item.id)}
                    className={`relative px-7 flex items-center font-medium cursor-pointer transition ${
                      isActive
                        ? 'border-cm-orange text-cm-orange'
                        : 'border-transparent text-gray-700 hover:text-cm-orange'
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-sm">
            {LANGUAGE_OPTIONS.map((locale) => {
              const isActive = locale.code === lang;

              return (
                <Link
                  key={locale.code}
                  href={getLocalePath(pathname, locale.code)}
                  className={`rounded px-2 py-1 transition ${
                    isActive
                      ? 'border-gray-900 font-semibold text-gray-900'
                      : 'border-gray-300 text-gray-500 hover:border-gray-500 hover:text-gray-900'
                  }`}
                >
                  {locale.label}
                </Link>
              );
            })}
          </div>
        </div>

        {hoveredPrimary?.children?.length ? (
          <div className="relative border-t border-t-[#CCCCCC] bg-white before:absolute before:left-0 before:top-0 before:w-82.25 before:h-full before:bg-[#EEEEEE]">
            <div className="flex gap-37.5">
              <div className="w-44.75 bg-gray-100" />

              <div className="pt-6 pb-10 flex gap-1">
                {hoveredPrimary.children.map((group) => (
                  <div key={group.id} className="px-7">
                    <Link
                      href={withLocale(lang, group.href)}
                      className="font-medium text-sm text-gray-900 hover:text-cm-orange"
                    >
                      {group.title}
                    </Link>

                    {group.children?.length ? (
                      <ul className="mt-2">
                        {group.children.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={withLocale(lang, child.href)}
                              className="py-2 inline-block font-light text-sm  hover:text-cm-orange"
                            >
                              {`-${child.title}`}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </header>

      <div id="header-spacer" className="h-15" />
    </>
  );
}
