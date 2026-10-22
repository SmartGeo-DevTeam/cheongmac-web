import { cn } from '@/_lib/utils';
import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'secondary';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-cm-orange-500 text-white hover:bg-cm-orange-600',
  outline:
    'border border-cm-gray-200 bg-white text-cm-gray-900 hover:bg-cm-gray-50',
  ghost: 'text-cm-gray-700 hover:bg-cm-gray-50 hover:text-cm-gray-900',
  secondary: 'bg-cm-teal-600 text-white hover:bg-cm-teal-700',
};

const sizeClasses: Record<ButtonSize, string> = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3 text-xs',
  lg: 'h-11 rounded-md px-8',
  icon: 'size-10',
};

export function Button({
  className,
  variant = 'default',
  size = 'default',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-slot="button"
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cm-teal-600 disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
