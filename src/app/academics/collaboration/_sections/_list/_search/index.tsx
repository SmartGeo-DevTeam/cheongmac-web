'use client';

import ContentSearch from '@/app/_components/content-list/search';
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

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleSearch = (value: string) => {
    setKeyword(value);
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (value.trim()) params.set('query', value.trim());
      const suffix = params.toString();
      router.replace(suffix ? `${pathname}?${suffix}` : pathname, {
        scroll: false,
      });
    }, 300);
  };

  return (
    <ContentSearch
      value={keyword}
      onChange={handleSearch}
      ariaLabel="학술교류 검색"
    />
  );
}
