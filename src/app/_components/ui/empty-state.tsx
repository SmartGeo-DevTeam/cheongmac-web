import { cn } from '@/_lib/utils';
import type { ReactNode } from 'react';

export default function EmptyState({
  children = '검색 결과가 없습니다.',
  variant = 'bordered',
  className,
}: {
  children?: ReactNode;
  variant?: 'bordered' | 'soft' | 'plain';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex min-h-48 items-center justify-center px-5 text-center text-sm text-[#8A9098] xl:text-base',
        variant === 'bordered' && 'rounded-xl border border-[#E4E6E8]',
        variant === 'soft' && 'rounded-2xl bg-[#F6F7F7]',
        className,
      )}
    >
      {children}
    </div>
  );
}
