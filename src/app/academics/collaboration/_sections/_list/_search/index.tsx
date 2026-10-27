'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function SearchInput({ query }: { query: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const [keyword, setKeyword] = useState(query);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setKeyword(query);
  }, [query]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleSearch = (value: string) => {
    setKeyword(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams();

      if (value.trim()) {
        params.set('query', value.trim());
      }

      const queryString = params.toString();

      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    }, 300);
  };

  return (
    <div className="pr-5 flex items-center rounded-full border border-default">
      <input
        type="search"
        aria-label="학술교류 검색"
        value={keyword}
        onChange={(event) => handleSearch(event.target.value)}
        className="min-w-0 pl-5 py-3 font-medium text-[12px] placeholder:text-tertiary
        xl:py-4 xl:min-w-75 xl:text-[16px]"
        placeholder="검색어를 입력하세요."
      />
      <Search aria-hidden="true" className="size-5 shrink-0" />
    </div>
  );
}
