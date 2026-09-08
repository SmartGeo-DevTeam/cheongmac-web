import { cn } from '@/_lib/utils';
import type { InputHTMLAttributes } from 'react';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      data-slot="input"
      className={cn(
        'flex h-10 w-full rounded-md border border-[#D4D4D8] bg-white px-3 py-2 text-sm text-[#18181B] shadow-sm transition placeholder:text-[#A1A1AA] focus:border-[#A1A1AA] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}
