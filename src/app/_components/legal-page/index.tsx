import Inner from '@/app/_components/inner';
import { Home } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface LegalPageLayoutProps {
  title: string;
  breadcrumbLabel: string;
  articleClassName: string;
  children: ReactNode;
}

interface LegalSectionProps {
  title: ReactNode;
  children: ReactNode;
  variant?: 'default' | 'patient';
}

interface LegalArticleProps {
  title: ReactNode;
  children: ReactNode;
  variant?: 'default' | 'patient';
}

export default function LegalPageLayout({
  title,
  breadcrumbLabel,
  articleClassName,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="pt-20 xl:pt-5">
      <Inner usePaddingHorizontal>
        <div>
          <div className="flex items-center text-xs text-[#666666] xl:text-sm">
            <Link href="/" className="flex items-center gap-1">
              <Home size={14} strokeWidth={1.8} />
              <span>홈</span>
            </Link>

            <div className="mx-2 h-3.5 w-px bg-[#DDDDDD]" />

            <label className="relative pr-5">
              <span className="sr-only">현재 페이지</span>
              <select
                aria-label="현재 페이지"
                defaultValue={breadcrumbLabel}
                className="appearance-none bg-transparent pr-1 text-xs outline-none xl:text-sm"
              >
                <option>{breadcrumbLabel}</option>
              </select>
              <span className="pointer-events-none absolute right-1 top-1/2 h-1.5 w-1.5 -translate-y-[65%] rotate-45 border-b border-r border-[#777777]" />
            </label>
          </div>

          <header className="mt-10 flex flex-col items-center text-center xl:mt-11">
            <h1 className="font-bold text-[26px] tracking-[-0.04em] text-[#262C35] xl:text-[50px]">
              {title}
            </h1>
          </header>
        </div>
      </Inner>

      <div className="mt-8 border-t border-[#EEEEEE] xl:mt-12" />

      <Inner usePaddingHorizontal>
        <article className={articleClassName}>{children}</article>
      </Inner>
    </div>
  );
}

export function LegalSection({
  title,
  children,
  variant = 'default',
}: LegalSectionProps) {
  if (variant === 'patient') {
    return (
      <section className="mt-10 xl:mt-15">
        <h2
          className="mb-6 font-bold text-xl leading-[1.4] tracking-[-0.035em] text-[#262C35]
          xl:mb-7 xl:text-[34px]"
        >
          {title}
        </h2>

        <div
          className="space-y-7 text-sm leading-[1.7] text-[#262C35]
          xl:space-y-6 xl:text-lg xl:leading-[1.65]"
        >
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10 first:mt-0 xl:mt-15 xl:first:mt-0">
      <h2
        className="mb-5 font-bold text-xl leading-[1.4] tracking-[-0.035em] text-[#262C35]
        xl:text-[34px]"
      >
        {title}
      </h2>

      <div
        className="space-y-5 text-sm leading-normal text-[#262C35]
        xl:text-lg"
      >
        {children}
      </div>
    </section>
  );
}

export function LegalArticle({
  title,
  children,
  variant = 'default',
}: LegalArticleProps) {
  return (
    <div>
      <h3 className="font-bold text-[#262C35]">{title}</h3>
      <div
        className={
          variant === 'patient'
            ? 'mt-1.5 break-keep'
            : 'mt-1.5 space-y-1.5'
        }
      >
        {children}
      </div>
    </div>
  );
}
