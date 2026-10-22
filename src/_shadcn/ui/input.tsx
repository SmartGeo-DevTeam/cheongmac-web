import { cn } from '@/_lib/utils';
import type { InputHTMLAttributes } from 'react';

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      data-slot="input"
      className={cn(
        'flex h-10 w-full rounded-md border border-cm-gray-200 bg-white px-3 py-2 text-sm text-cm-gray-900 shadow-sm transition-colors placeholder:text-cm-gray-400 focus:border-cm-teal-600 focus-visible:ring-2 focus-visible:ring-cm-teal-100 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}
