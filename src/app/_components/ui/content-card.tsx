import {
  H3 as TypographyH3,
  P as TypographyP,
} from '@/app/_components/ui/typography';
import { cn } from '@/_lib/utils';
import type { ReactNode } from 'react';
import { useComponentId } from './component-id';

export type ContentCardVariant =
  | 'equipment'
  | 'academic'
  | 'treatment'
  | 'notice'
  | 'news'
  | 'news-wide'
  | 'news-horizontal'
  | 'partner';

type VariantStyle = {
  root: string;
  media: string;
  body: string;
  title: string;
  description: string;
  meta: string;
};

const variants: Record<ContentCardVariant, VariantStyle> = {
  equipment: {
    root: 'group min-w-0',
    media:
      'relative aspect-[1.95/1] overflow-hidden rounded-xl bg-[#F3F4F5]',
    body: 'mt-3 flex items-start justify-between gap-3',
    title:
      'mt-1 line-clamp-2 break-keep text-base font-medium text-[#252B33] xl:text-xl',
    description: '',
    meta: '',
  },
  academic: {
    root:
      'min-w-0 xl:overflow-hidden xl:rounded-[18px] xl:border xl:border-[#E0E3E5] xl:bg-white',
    media:
      'relative hidden aspect-[16/9] overflow-hidden bg-[#F1F2F3] xl:block',
    body: 'pt-5 xl:px-5 xl:pb-6 xl:pt-5',
    title:
      'mt-3 break-keep text-xl font-bold tracking-[-0.035em] text-[#262C35] xl:text-[24px]',
    description:
      'mt-3 line-clamp-2 break-keep text-base leading-[1.7] text-[#656C73] xl:text-xl xl:leading-[1.65]',
    meta: 'text-sm text-[#A0A5AA] xl:text-base',
  },
  treatment: {
    root:
      'group overflow-hidden rounded-xl border border-[#E0E3E5] bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.07)]',
    media:
      'relative aspect-[202/115] w-full overflow-hidden bg-[#F1F2F3]',
    body: 'p-4 xl:p-5',
    title:
      'text-lg font-bold tracking-[-0.03em] text-[#252A30] xl:text-2xl',
    description:
      'mt-3 line-clamp-2 text-base leading-[1.55] text-[#73787D] xl:min-h-[62px] xl:text-xl',
    meta:
      'mt-4 flex items-center justify-between gap-3 text-sm text-[#9A9FA4] xl:text-xl',
  },
  notice: {
    root:
      'w-[280px] overflow-hidden rounded-[8px] border border-[#E6E7E9] bg-white transition hover:-translate-y-0.5 hover:shadow-md',
    media: 'relative h-[168px] w-full overflow-hidden bg-[#F3F4F5]',
    body:
      'flex min-h-[58px] items-center px-4 py-3 text-base font-medium text-[#3B3F44] xl:text-xl',
    title: 'truncate',
    description: '',
    meta: '',
  },
  news: {
    root: 'min-w-0',
    media:
      'relative aspect-square overflow-hidden rounded-[10px] bg-[#F3F4F6]',
    body: '',
    title:
      'mt-3 line-clamp-2 min-h-[2.75em] break-keep text-[15px] font-medium leading-[1.4] tracking-[-0.04em] text-[#252B33] transition group-hover:text-[#006553]',
    description: '',
    meta: 'mt-1 text-xs text-[#B4BAC2]',
  },
  'news-wide': {
    root: 'min-w-0',
    media:
      'relative aspect-[2.12/1] overflow-hidden rounded-[8px] bg-[#F3F4F6]',
    body: '',
    title:
      'mt-2 break-keep text-[13px] font-medium leading-[1.4] tracking-[-0.04em] text-[#252B33]',
    description:
      'mt-1 line-clamp-2 break-keep text-[11px] leading-[1.45] tracking-[-0.03em] text-[#6F7680]',
    meta: 'mt-1 text-[10px] text-[#B4BAC2]',
  },
  'news-horizontal': {
    root: 'min-w-0',
    media:
      'relative aspect-square overflow-hidden rounded-[8px] bg-[#F1F3F5]',
    body: 'min-w-0 py-0.5',
    title:
      'line-clamp-2 break-keep text-[13px] font-medium leading-[1.35] tracking-[-0.04em] text-[#252B33]',
    description:
      'mt-1 line-clamp-2 break-keep text-[11px] leading-[1.45] tracking-[-0.03em] text-[#7B818A]',
    meta: 'mt-2 flex items-end justify-between gap-2',
  },
  partner: {
    root: 'min-w-0',
    media:
      'relative aspect-[264/166] overflow-hidden rounded-xl bg-[#F3F4F5]',
    body: 'pt-4 xl:pt-5',
    title:
      'flex items-center gap-2 break-keep text-[19px] font-bold tracking-[-0.035em] text-[#262C35] xl:text-[24px]',
    description: '',
    meta: '',
  },
};

export function ContentCard({
  id,
  variant,
  className,
  children,
}: {
  id?: string;
  variant: ContentCardVariant;
  className?: string;
  children: ReactNode;
}) {
  const componentId = useComponentId('cm-content-card', id);

  return (
    <article
      id={componentId}
      className={cn(variants[variant].root, className)}
    >
      {children}
    </article>
  );
}

export function ContentCardMedia({
  id,
  variant,
  className,
  children,
}: {
  id?: string;
  variant: ContentCardVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      data-slot="content-card-media"
      className={cn(variants[variant].media, className)}
    >
      {children}
    </div>
  );
}

export function ContentCardBody({
  id,
  variant,
  className,
  children,
}: {
  id?: string;
  variant: ContentCardVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      data-slot="content-card-body"
      className={cn(variants[variant].body, className)}
    >
      {children}
    </div>
  );
}

export function ContentCardTitle({
  as = 'h3',
  id,
  variant,
  className,
  children,
}: {
  as?: 'h3' | 'span';
  id?: string;
  variant: ContentCardVariant;
  className?: string;
  children: ReactNode;
}) {
  const classNames = cn(variants[variant].title, className);

  if (as === 'span') {
    return (
      <span id={id} data-slot="content-card-title" className={classNames}>
        {children}
      </span>
    );
  }

  return (
    <TypographyH3 managed={false} id={id} data-slot="content-card-title" className={classNames}>
      {children}
    </TypographyH3>
  );
}

export function ContentCardDescription({
  id,
  variant,
  className,
  children,
}: {
  id?: string;
  variant: ContentCardVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <TypographyP managed={false}
      id={id}
      data-slot="content-card-description"
      className={cn(variants[variant].description, className)}
    >
      {children}
    </TypographyP>
  );
}

export function ContentCardMeta({
  as = 'div',
  id,
  variant,
  className,
  children,
}: {
  as?: 'div' | 'p';
  id?: string;
  variant: ContentCardVariant;
  className?: string;
  children: ReactNode;
}) {
  const classNames = cn(variants[variant].meta, className);

  if (as === 'p') {
    return (
      <TypographyP managed={false} id={id} data-slot="content-card-meta" className={classNames}>
        {children}
      </TypographyP>
    );
  }

  return (
    <div id={id} data-slot="content-card-meta" className={classNames}>
      {children}
    </div>
  );
}
