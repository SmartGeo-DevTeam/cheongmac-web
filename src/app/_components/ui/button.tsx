import { cn } from '@/_lib/utils';
import type { ButtonHTMLAttributes } from 'react';
import { useComponentId } from './component-id';

export type ButtonVariant =
  | 'primary'
  | 'orange'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'white';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

const variantClasses: Record<ButtonVariant, string> = {
  // CTA / active emphasis: Coral Orange 500
  primary: 'bg-cm-orange-500 text-white hover:bg-cm-orange-600',
  orange: 'bg-cm-orange-500 text-white hover:bg-cm-orange-600',
  outline:
    'border border-cm-teal-600 bg-white text-cm-teal-600 hover:bg-cm-teal-600 hover:text-white',
  // Secondary actions: Deep Teal
  secondary: 'bg-cm-teal-600 text-white hover:bg-cm-teal-700',
  ghost:
    'bg-transparent text-cm-gray-600 hover:bg-cm-gray-50 hover:text-cm-gray-900',
  white: 'bg-white text-cm-gray-800 hover:bg-cm-gray-50',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4',
  md: 'h-11 px-5 xl:h-12 xl:px-6',
  lg: 'h-11 min-w-[104px] px-6 xl:h-[52px] xl:min-w-[132px]',
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
    'cm-type-label inline-flex shrink-0 items-center justify-center gap-2 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cm-teal-600 disabled:pointer-events-none disabled:opacity-40',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export default function Button({
  id,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  const componentId = useComponentId('cm-button', id);

  return (
    <button
      id={componentId}
      type={type}
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  );
}
