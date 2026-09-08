import { cn } from '@/_lib/utils';
import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'secondary';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-[#18181B] text-white hover:bg-[#27272A]',
  outline: 'border border-[#E4E4E7] bg-white text-[#27272A] hover:bg-[#F4F4F5]',
  ghost: 'text-[#52525B] hover:bg-[#F4F4F5] hover:text-[#18181B]',
  secondary: 'bg-[#F4F4F5] text-[#27272A] hover:bg-[#E4E4E7]',
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
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
