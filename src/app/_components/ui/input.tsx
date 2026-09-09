import { cn } from '@/_lib/utils';
import type { InputHTMLAttributes } from 'react';

export type InputVariant = 'default' | 'form' | 'bare';

const variantClasses: Record<InputVariant, string> = {
  default:
    'h-11 rounded-md border border-[#DFE3E7] bg-white px-3 text-sm text-[#424951] placeholder:text-[#ADB3BA] focus:border-[#AEB6BE]',
  form:
    'h-11 rounded-[6px] border border-[#DFE3E7] bg-white px-3 text-[12px] tracking-[-0.03em] text-[#424951] placeholder:text-[#ADB3BA] focus:border-[#AEB6BE] xl:h-12 xl:text-[13px]',
  bare: 'min-w-0 flex-1 bg-transparent p-0',
};

export default function Input({
  variant = 'default',
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant;
}) {
  return (
    <input
      className={cn(
        'w-full outline-none transition disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
