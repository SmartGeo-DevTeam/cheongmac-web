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
    media: 'relative aspect-[1.95/1] overflow-hidden rounded-xl bg-cm-gray-50',
    body: 'mt-3 flex items-start justify-between gap-3',
    title: 'cm-type-body-1 mt-1 line-clamp-2 break-keep font-medium text-cm-gray-900',
    description: '',
    meta: '',
  },
  academic: {
    root: 'min-w-0 xl:overflow-hidden xl:rounded-[18px] xl:border xl:border-cm-gray-200 xl:bg-white',
    media: 'relative hidden aspect-[16/9] overflow-hidden bg-cm-gray-50 xl:block',
    body: 'pt-5 xl:px-5 xl:pb-6 xl:pt-5',
    title: 'cm-type-heading-1 mt-3 break-keep text-cm-gray-900',
    description: 'cm-type-body-1 mt-3 line-clamp-2 break-keep text-cm-gray-700',
    meta: 'cm-type-body-2 text-cm-gray-500',
  },
  treatment: {
    root: 'group overflow-hidden rounded-xl border border-cm-gray-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.07)]',
    media: 'relative aspect-[202/115] w-full overflow-hidden bg-cm-gray-50',
    body: 'p-4 xl:p-5',
    title: 'cm-type-heading-1 text-cm-gray-900',
    description: 'cm-type-body-1 mt-3 line-clamp-2 text-cm-gray-600 xl:min-h-[62px]',
    meta: 'cm-type-body-2 mt-4 flex items-center justify-between gap-3 text-cm-gray-500',
  },
  notice: {
    root: 'w-[280px] overflow-hidden rounded-[8px] border border-cm-gray-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md',
    media: 'relative h-[168px] w-full overflow-hidden bg-cm-gray-50',
    body: 'cm-type-body-1 flex min-h-[58px] items-center px-4 py-3 font-medium text-cm-gray-800',
    title: 'truncate',
    description: '',
    meta: '',
  },
  news: {
    root: 'min-w-0',
    media: 'relative aspect-square overflow-hidden rounded-[10px] bg-cm-gray-50',
    body: '',
    title: 'cm-type-body-2 mt-3 line-clamp-2 min-h-[2.75em] break-keep font-medium text-cm-gray-900 transition group-hover:text-cm-teal-600',
    description: '',
    meta: 'cm-type-caption mt-1 text-cm-gray-500',
  },
  'news-wide': {
    root: 'min-w-0',
    media: 'relative aspect-[2.12/1] overflow-hidden rounded-[8px] bg-cm-gray-50',
    body: '',
    title: 'cm-type-body-2 mt-2 break-keep font-medium text-cm-gray-900',
    description: 'cm-type-caption mt-1 line-clamp-2 break-keep text-cm-gray-600',
    meta: 'cm-type-caption mt-1 text-cm-gray-500',
  },
  'news-horizontal': {
    root: 'min-w-0',
    media: 'relative aspect-square overflow-hidden rounded-[8px] bg-cm-gray-50',
    body: 'min-w-0 py-0.5',
    title: 'cm-type-body-2 line-clamp-2 break-keep font-medium text-cm-gray-900',
    description: 'cm-type-caption mt-1 line-clamp-2 break-keep text-cm-gray-600',
    meta: 'mt-2 flex items-end justify-between gap-2',
  },
  partner: {
    root: 'min-w-0',
    media: 'relative aspect-[264/166] overflow-hidden rounded-xl bg-cm-gray-50',
    body: 'pt-4 xl:pt-5',
    title: 'cm-type-heading-1 flex items-center gap-2 break-keep text-cm-gray-900',
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
    <article id={componentId} className={cn(variants[variant].root, className)}>
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
    <div id={id} data-slot="content-card-media" className={cn(variants[variant].media, className)}>
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
    <div id={id} data-slot="content-card-body" className={cn(variants[variant].body, className)}>
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
    <TypographyP
      managed={false}
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
