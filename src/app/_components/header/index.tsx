'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/i18n-config';

type HeaderProps = {
  lang: Locale;
  siteName: string;
};

const LOCALES: Locale[] = ['ko', 'en', 'ja'];

export default function Header({
  lang,
  siteName,
}: HeaderProps): React.ReactElement {
  const pathname = usePathname();

  const getLocalePath = (nextLocale: Locale) => {
    if (!pathname) return `/${nextLocale}`;

    const segments = pathname.split('/').filter(Boolean);

    if (segments.length === 0) {
      return `/${nextLocale}`;
    }

    segments[0] = nextLocale;
    return `/${segments.join('/')}`;
  };

  return (
    <header className="border-b px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <strong>{siteName}</strong>
        </div>

        <div className="flex items-center gap-2 text-sm">
          {LOCALES.map((locale) => {
            const isActive = locale === lang;

            return (
              <Link
                key={locale}
                href={getLocalePath(locale)}
                className={`rounded border px-2 py-1 transition ${
                  isActive ? 'font-semibold' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {locale}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
