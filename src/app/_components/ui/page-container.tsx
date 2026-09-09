import { cn } from '@/_lib/utils';
import type { ReactNode } from 'react';
import { useComponentId } from './component-id';

export type PageContainerWidth = 'default' | 'narrow' | 'wide' | 'full';
export type PageContainerGutter = 'none' | 'mobile' | 'always';

const widthClasses: Record<PageContainerWidth, string> = {
  default: 'max-w-7xl',
  narrow: 'max-w-[1080px]',
  wide: 'max-w-[1440px]',
  full: 'max-w-none',
};

const gutterClasses: Record<PageContainerGutter, string> = {
  none: '',
  mobile: 'px-5 xl:px-0',
  always: 'px-5',
};

export default function PageContainer({
  id,
  children,
  width = 'default',
  gutter = 'mobile',
  className,
}: {
  id?: string;
  children: ReactNode;
  width?: PageContainerWidth;
  gutter?: PageContainerGutter;
  className?: string;
}) {
  const componentId = useComponentId('cm-page-container', id);

  return (
    <div
      id={componentId}
      className={cn(
        'mx-auto w-full',
        widthClasses[width],
        gutterClasses[gutter],
        className,
      )}
    >
      {children}
    </div>
  );
}
