'use client';

import { cn } from '@/_lib/utils';
import { Search } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';
import Input from './input';

type SearchFieldSize = 'sm' | 'md' | 'lg';

const wrapperClasses: Record<SearchFieldSize, string> = {
  sm: 'h-10 px-4 xl:h-11',
  md: 'h-11 px-4 xl:h-12',
  lg: 'h-11 px-4 xl:h-14 xl:px-5',
};

const inputClasses: Record<SearchFieldSize, string> = {
  sm: 'text-xs text-[#333333] placeholder:text-[#A7ADB5] xl:text-sm',
  md: 'text-sm text-[#30373D] placeholder:text-[#A5AAAF] xl:text-base',
  lg: 'text-base text-[#444444] placeholder:text-[#B0B4B8] xl:text-xl',
};

const iconClasses: Record<SearchFieldSize, string> = {
  sm: 'size-5',
  md: 'size-5',
  lg: 'size-5 xl:size-6',
};

export default function SearchField({
  ariaLabel,
  size = 'sm',
  className,
  inputClassName,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  ariaLabel: string;
  size?: SearchFieldSize;
  className?: string;
  inputClassName?: string;
}) {
  return (
    <label
      className={cn(
        'flex w-full items-center gap-2 rounded-full border border-[#E1E4E8] bg-white transition focus-within:border-[#A9C9C1]',
        wrapperClasses[size],
        className,
      )}
    >
      <span className="sr-only">{ariaLabel}</span>
      <Input
        {...props}
        type="search"
        variant="bare"
        className={cn(inputClasses[size], inputClassName)}
      />
      <Search
        className={cn('shrink-0 text-[#545B62]', iconClasses[size])}
        strokeWidth={1.7}
      />
    </label>
  );
}
