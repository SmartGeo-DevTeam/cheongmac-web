import { cn } from '@/_lib/utils';
import type { HTMLAttributes } from 'react';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'secondary' | 'outline';
};

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
        variant === 'default' && 'bg-cm-teal-600 text-white',
        variant === 'secondary' && 'bg-cm-gray-50 text-cm-gray-700',
        variant === 'outline' &&
          'border border-cm-gray-200 bg-white text-cm-gray-700',
        className,
      )}
      {...props}
    />
  );
}
