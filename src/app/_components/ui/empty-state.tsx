import { cn } from '@/_lib/utils';
import type { ReactNode } from 'react';
import { useComponentId } from './component-id';

export default function EmptyState({
  id,
  children = '검색 결과가 없습니다.',
  variant = 'bordered',
  className,
}: {
  id?: string;
  children?: ReactNode;
  variant?: 'bordered' | 'soft' | 'plain';
  className?: string;
}) {
  const componentId = useComponentId('cm-empty-state', id);

  return (
    <div
      id={componentId}
      className={cn(
        'cm-type-body-2 flex min-h-48 items-center justify-center px-5 text-center text-cm-gray-500',
        variant === 'bordered' && 'rounded-xl border border-cm-gray-200',
        variant === 'soft' && 'rounded-2xl bg-cm-gray-50',
        className,
      )}
    >
      {children}
    </div>
  );
}
