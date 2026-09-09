import { cn } from '@/_lib/utils';
import type { ReactNode } from 'react';

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
  count,
  children,
  size = 'sm',
  accent = 'orange',
  className,
}: {
  count: number;
  children?: ReactNode;
  size?: keyof typeof sizeClasses;
  accent?: keyof typeof accentClasses;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <p className={cn('shrink-0 text-[#8D939C]', sizeClasses[size])}>
        총{' '}
        <strong className={cn('font-semibold', accentClasses[accent])}>
          {count.toLocaleString('ko-KR')}
        </strong>{' '}
        건
      </p>
      {children}
    </div>
  );
}
