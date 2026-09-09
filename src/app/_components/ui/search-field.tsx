'use client';

import { cn } from '@/_lib/utils';
import { Search } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';
import { useComponentId } from './component-id';
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
  componentId: requestedComponentId,
  ariaLabel,
  size = 'sm',
  className,
  inputClassName,
  id: inputId,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  componentId?: string;
  ariaLabel: string;
  size?: SearchFieldSize;
  className?: string;
  inputClassName?: string;
}) {
  const componentId = useComponentId('cm-search-field', requestedComponentId);
  const resolvedInputId = inputId ?? `${componentId}-input`;

  return (
    <label
      id={componentId}
      htmlFor={resolvedInputId}
      className={cn(
        'flex w-full items-center gap-2 rounded-full border border-[#E1E4E8] bg-white transition focus-within:border-[#A9C9C1]',
        wrapperClasses[size],
        className,
      )}
    >
      <span id={`${componentId}-label`} className="sr-only">
        {ariaLabel}
      </span>
      <Input
        {...props}
        id={resolvedInputId}
        type="search"
        variant="bare"
        aria-label={ariaLabel}
        className={cn(inputClasses[size], inputClassName)}
      />
      <Search
        id={`${componentId}-icon`}
        className={cn('shrink-0 text-[#545B62]', iconClasses[size])}
        strokeWidth={1.7}
      />
    </label>
  );
}
