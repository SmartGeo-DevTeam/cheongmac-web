import { cn } from '@/_lib/utils';
import type { InputHTMLAttributes } from 'react';
import { useComponentId } from './component-id';

export type InputVariant = 'default' | 'form' | 'bare';

const variantClasses: Record<InputVariant, string> = {
  default:
    'h-11 rounded-md border border-cm-gray-200 bg-white px-3 text-sm text-cm-gray-900 placeholder:text-cm-gray-400 focus:border-cm-teal-600',
  form:
    'h-11 rounded-[6px] border border-cm-gray-200 bg-white px-3 text-sm tracking-[-0.02em] text-cm-gray-900 placeholder:text-cm-gray-400 focus:border-cm-teal-600 xl:h-12 xl:text-[15px]',
  bare: 'min-w-0 flex-1 bg-transparent p-0',
};

export default function Input({
  id,
  variant = 'default',
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant;
}) {
  const componentId = useComponentId('cm-input', id);

  return (
    <input
      id={componentId}
      className={cn(
        'w-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-cm-teal-100 disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
