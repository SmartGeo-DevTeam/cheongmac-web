import { cn } from '@/_lib/utils';
import type { HTMLAttributes } from 'react';

export type BadgeVariant =
  | 'green'
  | 'orange'
  | 'red'
  | 'gray'
  | 'outline';

export type BadgeSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<BadgeVariant, string> = {
  green: 'bg-[#E5F6F1] text-[#2C8A75]',
  orange: 'bg-[#FF7048] text-white',
  red: 'bg-[#FFF0F0] text-[#FF625E]',
  gray: 'bg-[#F3F4F5] text-[#555C64]',
  outline: 'border border-[#006651] bg-white text-[#006651]',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'min-h-6 px-2 text-[10px] xl:min-h-7 xl:px-2.5 xl:text-xs',
  md: 'min-h-7 px-2.5 text-xs xl:min-h-8 xl:px-3 xl:text-sm',
  lg: 'min-h-8 px-2.5 text-base xl:min-h-9 xl:px-3 xl:text-xl',
};

export default function Badge({
  variant = 'gray',
  size = 'md',
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-md font-semibold',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
