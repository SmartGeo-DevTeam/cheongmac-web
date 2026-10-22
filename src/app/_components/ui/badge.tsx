import { cn } from '@/_lib/utils';
import type { HTMLAttributes } from 'react';
import { useComponentId } from './component-id';

export type BadgeVariant =
  | 'green'
  | 'orange'
  | 'red'
  | 'gray'
  | 'outline';

export type BadgeSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<BadgeVariant, string> = {
  green: 'bg-cm-success-50 text-cm-success-700',
  orange: 'bg-cm-orange-500 text-white',
  red: 'bg-cm-red-50 text-cm-red-600',
  gray: 'bg-cm-gray-50 text-cm-gray-700',
  outline: 'border border-cm-teal-600 bg-white text-cm-teal-600',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'min-h-6 px-2 text-[10px] xl:min-h-7 xl:px-2.5 xl:text-xs',
  md: 'min-h-7 px-2.5 text-xs xl:min-h-8 xl:px-3 xl:text-sm',
  lg: 'min-h-8 px-2.5 text-sm xl:min-h-9 xl:px-3 xl:text-[15px]',
};

export default function Badge({
  id,
  variant = 'gray',
  size = 'md',
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
}) {
  const componentId = useComponentId('cm-badge', id);

  return (
    <span
      id={componentId}
      className={cn(
        'inline-flex shrink-0 items-center rounded-md font-bold tracking-[-0.02em]',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
