import { cn } from '@/_lib/utils';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'orange'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'white';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#006651] text-white hover:bg-[#005446]',
  orange: 'bg-[#FA6805] text-white hover:bg-[#E85F05]',
  outline:
    'border border-[#006651] bg-white text-[#315A50] hover:bg-[#006651] hover:text-white',
  secondary: 'bg-[#AEB6C0] text-white hover:bg-[#9DA6B1]',
  ghost: 'bg-transparent text-[#7E848A] hover:bg-[#F1F2F3] hover:text-[#333A40]',
  white: 'bg-white text-[#39444A] hover:bg-[#F7F8F8]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-xs xl:text-sm',
  md: 'h-11 px-5 text-sm xl:h-12 xl:px-6 xl:text-base',
  lg: 'h-11 min-w-[104px] px-6 text-base xl:h-[52px] xl:min-w-[132px] xl:text-xl',
  icon: 'size-10 p-0 xl:size-11',
};

export function buttonClassName({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold transition disabled:pointer-events-none disabled:opacity-40',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  );
}
