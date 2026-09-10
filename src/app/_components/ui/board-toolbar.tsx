import {
  P as TypographyP,
  Strong as TypographyStrong,
} from '@/app/_components/ui/typography';
import { cn } from '@/_lib/utils';
import type { ReactNode } from 'react';
import { useComponentId } from './component-id';

const sizeClasses = {
  sm: 'text-[11px] xl:text-sm',
  md: 'text-sm xl:text-base',
  lg: 'text-base xl:text-xl',
} as const;

const accentClasses = {
  orange: 'text-[#FA6805]',
  coral: 'text-[#F15A45]',
  green: 'text-[#006651]',
} as const;

export default function BoardToolbar({
  id,
  count,
  children,
  size = 'sm',
  accent = 'orange',
  className,
}: {
  id?: string;
  count: number;
  children?: ReactNode;
  size?: keyof typeof sizeClasses;
  accent?: keyof typeof accentClasses;
  className?: string;
}) {
  const componentId = useComponentId('cm-board-toolbar', id);

  return (
    <div
      id={componentId}
      className={cn('flex items-center justify-between gap-4', className)}
    >
      <TypographyP managed={false}
        id={`${componentId}-count`}
        className={cn('shrink-0 text-[#8D939C]', sizeClasses[size])}
      >
        총{' '}
        <TypographyStrong className={cn('font-semibold', accentClasses[accent])}>
          {count.toLocaleString('ko-KR')}
        </TypographyStrong>{' '}
        건
      </TypographyP>
      <div id={`${componentId}-actions`}>{children}</div>
    </div>
  );
}
