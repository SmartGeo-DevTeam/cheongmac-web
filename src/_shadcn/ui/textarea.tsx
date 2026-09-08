import { cn } from '@/_lib/utils';
import type { TextareaHTMLAttributes } from 'react';

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-24 w-full rounded-md border border-[#D4D4D8] bg-white px-3 py-2 text-sm text-[#18181B] shadow-sm transition placeholder:text-[#A1A1AA] focus:border-[#A1A1AA] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}
