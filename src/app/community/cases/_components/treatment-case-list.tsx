'use client';

import {
  TREATMENT_CASE_COUNT,
  TREATMENT_CASES,
  type TreatmentCaseKind,
} from '../_data';
import { ChevronLeft, ChevronRight, ChevronsRight, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const FILTERS: Array<{ id: TreatmentCaseKind; label: string }> = [
  { id: 'treatment', label: '치료 전후' },
  { id: 'review', label: '환자 후기' },
  { id: 'video', label: '영상 인터뷰' },
];

export default function TreatmentCaseList() {
  const [activeFilter, setActiveFilter] =
    useState<TreatmentCaseKind>('treatment');
  const [query, setQuery] = useState('');

  const visibleCases = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = TREATMENT_CASES.filter(
      (item) => item.kind === activeFilter,
    );

    if (!normalizedQuery) {
      return filtered;
    }

    return filtered.filter((item) =>
      [item.title, item.category, item.description].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [activeFilter, query]);

  return (
    <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-10 xl:px-0 xl:pb-28 xl:pt-20">
      <div className="flex flex-col">
        <div className="flex justify-center gap-2 xl:gap-4">
          {FILTERS.map((filter) => {
            const isActive = filter.id === activeFilter;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`h-11 min-w-[92px] rounded-full border px-4 text-base font-medium transition xl:h-14 xl:min-w-[132px] xl:px-7 xl:text-xl ${
                  isActive
                    ? 'border-cm-green bg-cm-green text-white'
                    : 'border-[#E2E4E6] bg-white text-[#4E5358] hover:border-cm-green hover:text-cm-green'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 xl:mt-8">
          <p className="shrink-0 text-base text-[#8A8F94] xl:text-xl">
            총{' '}
            <strong className="font-semibold text-[#F15A45]">
              {TREATMENT_CASE_COUNT.toLocaleString()}
            </strong>{' '}
            건
          </p>

          <label className="flex h-11 w-full max-w-[260px] items-center gap-2 rounded-full border border-[#E4E6E8] px-4 xl:h-14 xl:max-w-[320px] xl:px-5">
            <span className="sr-only">치료사례 검색</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="검색어를 입력하세요"
              className="min-w-0 flex-1 bg-transparent text-base text-[#444444] outline-none placeholder:text-[#B0B4B8] xl:text-xl"
            />
            <Search
              className="size-5 shrink-0 text-[#6F7479] xl:size-6"
              strokeWidth={1.8}
            />
          </label>
        </div>

        {visibleCases.length ? (
          <div className="mt-5 grid grid-cols-1 gap-5 xl:mt-6 xl:grid-cols-3 xl:gap-7">
            {visibleCases.map((item) => (
              <Link
                key={item.id}
                href={`/community/cases/${item.id}`}
                className="group overflow-hidden rounded-xl border border-[#E0E3E5] bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.07)]"
              >
                <div className="relative aspect-[202/115] w-full overflow-hidden bg-[#F1F2F3]">
                  <Image
                    src={item.thumbnail}
                    alt={`${item.title} 치료사례`}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.01]"
                    sizes="(min-width: 1280px) 400px, 100vw"
                  />
                </div>

                <div className="p-4 xl:p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex min-h-8 items-center rounded-md bg-[#E5F6F1] px-2.5 text-base font-semibold text-[#2C8A75] xl:min-h-9 xl:px-3 xl:text-xl">
                      {item.category}
                    </span>
                    <strong className="text-lg font-bold tracking-[-0.03em] text-[#252A30] xl:text-2xl">
                      {item.title}
                    </strong>
                  </div>

                  <p className="mt-3 line-clamp-2 text-base leading-[1.55] text-[#73787D] xl:min-h-[62px] xl:text-xl">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3 text-sm text-[#9A9FA4] xl:text-xl">
                    <span>
                      한 ♡ {item.patientName} · {item.age}세 · {item.sex}
                    </span>
                    <time dateTime={item.date}>{item.date}</time>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-12 flex min-h-[240px] items-center justify-center rounded-xl border border-[#E4E6E8] text-base text-[#999999] xl:text-xl">
            검색 결과가 없습니다.
          </div>
        )}

        <nav
          aria-label="치료사례 페이지네이션"
          className="mt-10 flex items-center justify-center gap-1.5 xl:mt-12 xl:gap-2"
        >
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg text-[#A2A6AA] xl:size-11"
            aria-label="이전 페이지"
          >
            <ChevronLeft className="size-5 xl:size-6" />
          </button>

          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              type="button"
              className={`grid size-10 place-items-center rounded-lg text-base font-medium xl:size-11 xl:text-xl ${
                page === 1
                  ? 'bg-[#555B66] text-white'
                  : 'text-[#8D9298] hover:bg-[#F5F6F7]'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg text-[#A2A6AA] xl:size-11"
            aria-label="다음 페이지"
          >
            <ChevronRight className="size-5 xl:size-6" />
          </button>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg text-[#A2A6AA] xl:size-11"
            aria-label="마지막 페이지"
          >
            <ChevronsRight className="size-5 xl:size-6" />
          </button>
        </nav>
      </div>
    </div>
  );
}
