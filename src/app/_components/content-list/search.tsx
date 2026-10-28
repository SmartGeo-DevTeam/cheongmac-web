'use client';

import { Search } from 'lucide-react';

type ContentSearchProps = {
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  placeholder?: string;
};

export default function ContentSearch({
  value,
  onChange,
  ariaLabel,
  placeholder = '검색어를 입력하세요.',
}: ContentSearchProps) {
  return (
    <label
      className="max-w-6/10 w-full flex items-center rounded-full border border-default pl-4 pr-3
      xl:max-w-2/5 xl:pl-5 xl:pr-4"
    >
      <span className="sr-only">{ariaLabel}</span>
      <input
        type="search"
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 w-full bg-transparent py-3 text-[12px] font-medium outline-none placeholder:text-tertiary xl:py-4 xl:text-[16px]"
      />
      <Search aria-hidden="true" className="size-4 shrink-0 xl:size-5" />
    </label>
  );
}
