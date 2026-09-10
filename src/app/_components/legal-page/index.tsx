import {
  H2 as TypographyH2,
  H3 as TypographyH3,
} from '@/app/_components/ui/typography';
import PageContainer from '@/app/_components/ui/page-container';
import PageHeader from '@/app/_components/ui/page-header';
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
    <>
      <PageHeader
        breadcrumbs={[{ label: breadcrumbLabel }]}
        title={title}
      />

      <PageContainer gutter="always">
        <article className={articleClassName}>{children}</article>
      </PageContainer>
    </>
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
        <TypographyH2
          className="mb-6 font-bold text-xl leading-[1.4] tracking-[-0.035em] text-[#262C35]
          xl:mb-7 xl:text-[34px]"
        >
          {title}
        </TypographyH2>

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
      <TypographyH2
        className="mb-5 font-bold text-xl leading-[1.4] tracking-[-0.035em] text-[#262C35]
        xl:text-[34px]"
      >
        {title}
      </TypographyH2>

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
      <TypographyH3 className="font-bold text-[#262C35]">{title}</TypographyH3>
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
