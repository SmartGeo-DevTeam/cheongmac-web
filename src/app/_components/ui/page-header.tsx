import { cn } from '@/_lib/utils';
import type { ReactNode } from 'react';
import Breadcrumb, { type BreadcrumbItem } from './breadcrumb';
import PageContainer from './page-container';

type PageHeaderVariant = 'standard' | 'compact';
type PageHeaderDivider = 'always' | 'desktop' | 'none';

const titleClasses: Record<PageHeaderVariant, string> = {
  standard:
    'text-[26px] font-bold tracking-[-0.04em] text-[#262C35] xl:text-[50px]',
  compact:
    'text-[26px] font-bold tracking-[-0.04em] text-[#252B33] xl:text-[42px]',
};

const descriptionClasses: Record<PageHeaderVariant, string> = {
  standard:
    'mt-4 break-keep text-base leading-[1.7] text-[#777D83] xl:mt-5 xl:text-xl xl:leading-[1.75]',
  compact:
    'mx-auto mt-3 max-w-[720px] break-keep text-[12px] leading-[1.65] tracking-[-0.035em] text-[#7C828A] xl:mt-4 xl:text-[16px] xl:leading-[1.75]',
};

export default function PageHeader({
  breadcrumbs,
  title,
  description,
  variant = 'standard',
  divider = 'always',
  className,
  titleClassName,
  descriptionClassName,
  dividerClassName,
}: {
  breadcrumbs: BreadcrumbItem[];
  title: ReactNode;
  description?: ReactNode;
  variant?: PageHeaderVariant;
  divider?: PageHeaderDivider;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dividerClassName?: string;
}) {
  return (
    <>
      <div
        className={cn(
          variant === 'compact' ? 'pt-22 xl:pt-5' : 'pt-20 xl:pt-5',
          className,
        )}
      >
        <PageContainer gutter="always">
          <Breadcrumb
            items={breadcrumbs}
            variant={variant === 'compact' ? 'compact' : 'default'}
          />

          <header
            className={cn(
              'flex flex-col items-center text-center',
              variant === 'compact' ? 'mt-10 xl:mt-10' : 'mt-10 xl:mt-11',
            )}
          >
            <h1 className={cn(titleClasses[variant], titleClassName)}>{title}</h1>

            {description ? (
              <div
                className={cn(
                  descriptionClasses[variant],
                  descriptionClassName,
                )}
              >
                {description}
              </div>
            ) : null}
          </header>
        </PageContainer>
      </div>

      {divider !== 'none' ? (
        <div
          className={cn(
            'mt-8 border-t border-[#EEEEEE] xl:mt-12',
            divider === 'desktop' && 'hidden xl:block',
            dividerClassName,
          )}
        />
      ) : null}
    </>
  );
}
