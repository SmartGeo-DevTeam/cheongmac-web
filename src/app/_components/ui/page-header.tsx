import type { ReactNode } from 'react';
import Breadcrumb, { type BreadcrumbItem } from './breadcrumb';
import { useComponentId } from './component-id';
import PageContainer from './page-container';

export type PageHeaderTitleAs = 'h1' | 'div';

export default function PageHeader({
  id,
  breadcrumbs = [],
  title,
  description,
  titleAs = 'h1',
  showDivider = true,
}: {
  id?: string;
  breadcrumbs?: BreadcrumbItem[];
  title: ReactNode;
  description?: ReactNode;
  titleAs?: PageHeaderTitleAs;
  showDivider?: boolean;
}) {
  const componentId = useComponentId('cm-page-header', id);
  const TitleTag = titleAs;

  return (
    <>
      <div id={componentId} className="pt-20 xl:pt-5">
        <PageContainer id={`${componentId}-container`} gutter="always">
          <Breadcrumb
            id={`${componentId}-breadcrumb`}
            items={breadcrumbs}
          />

          <header
            id={`${componentId}-content`}
            className="mt-10 flex flex-col items-center text-center xl:mt-11"
          >
            <TitleTag
              id={`${componentId}-title`}
              className="text-[26px] font-bold tracking-[-0.04em] text-[#262C35] xl:text-[50px]"
            >
              {title}
            </TitleTag>

            <div
              id={`${componentId}-description`}
              className="mx-auto mt-4 flex min-h-[54px] max-w-[860px] items-start justify-center break-keep text-base leading-[1.7] text-[#777D83] xl:mt-5 xl:min-h-[70px] xl:text-xl xl:leading-[1.75]"
              aria-hidden={description ? undefined : true}
            >
              {description ?? null}
            </div>
          </header>
        </PageContainer>
      </div>

      {showDivider ? (
        <div
          id={`${componentId}-divider`}
          className="mt-8 border-t border-[#EEEEEE] xl:mt-12"
        />
      ) : null}

      <div
        id={`${componentId}-content-gap`}
        aria-hidden="true"
        className="h-12 xl:h-20"
      />
    </>
  );
}
