import { cn } from '@/_lib/utils';
import type { HTMLAttributes } from 'react';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'secondary' | 'outline';
};

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
        variant === 'default' && 'bg-[#18181B] text-white',
        variant === 'secondary' && 'bg-[#F4F4F5] text-[#52525B]',
        variant === 'outline' && 'border border-[#E4E4E7] bg-white text-[#52525B]',
        className,
      )}
      {...props}
    />
  );
}
