'use client';

import Badge from '@/app/_components/ui/badge';
import BoardToolbar from '@/app/_components/ui/board-toolbar';
import EmptyState from '@/app/_components/ui/empty-state';
import FilterTabs from '@/app/_components/ui/filter-tabs';
import PageContainer from '@/app/_components/ui/page-container';
import Pagination from '@/app/_components/ui/pagination';
import SearchField from '@/app/_components/ui/search-field';
import {
  TREATMENT_CASE_COUNT,
  TREATMENT_CASES,
  type TreatmentCaseKind,
} from '../_data';
import { TreatmentCaseImageLock } from './treatment-case-access';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const FILTERS: Array<{ value: TreatmentCaseKind; label: string }> = [
  { value: 'treatment', label: '치료 전후' },
  { value: 'review', label: '환자 후기' },
  { value: 'video', label: '영상 인터뷰' },
];

type Props = {
  isAuthenticated: boolean;
};

export default function TreatmentCaseList({ isAuthenticated }: Props) {
  const [activeFilter, setActiveFilter] =
    useState<TreatmentCaseKind>('treatment');
  const [query, setQuery] = useState('');

  const filteredCases = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = TREATMENT_CASES.filter(
      (item) => item.kind === activeFilter,
    );

    if (!normalizedQuery) return filtered;

    return filtered.filter((item) =>
      [item.title, item.category, item.description].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [activeFilter, query]);

  const visibleCases = filteredCases;

  const changeFilter = (next: TreatmentCaseKind) => {
    setActiveFilter(next);
  };

  const changeQuery = (next: string) => {
    setQuery(next);
  };

  return (
    <PageContainer className="pb-20 pt-10 xl:pb-28 xl:pt-20">
      <div className="flex flex-col">
        <FilterTabs
          items={FILTERS}
          value={activeFilter}
          onValueChange={changeFilter}
          ariaLabel="치료사례 종류"
          size="lg"
          className="xl:gap-4"
        />

        <BoardToolbar
          count={TREATMENT_CASE_COUNT}
          size="lg"
          accent="coral"
          className="mt-6 xl:mt-8"
        >
          <SearchField
            ariaLabel="치료사례 검색"
            size="lg"
            value={query}
            onChange={(event) => changeQuery(event.target.value)}
            placeholder="검색어를 입력하세요"
            className="max-w-[260px] xl:max-w-[320px]"
          />
        </BoardToolbar>

        {visibleCases.length ? (
          <div className="mt-5 grid grid-cols-1 gap-5 xl:mt-6 xl:grid-cols-3 xl:gap-7">
            {visibleCases.map((item) => {
              const detailHref = `/community/cases/${item.id}`;

              return (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-xl border border-[#E0E3E5] bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.07)]"
                >
                  <div className="relative aspect-[202/115] w-full overflow-hidden bg-[#F1F2F3]">
                    <Image
                      src={
                        item.kind === 'treatment'
                          ? '/assets/images/treatment-cases/case-before-after.jpg'
                          : item.thumbnail
                      }
                      alt={`${item.title} 치료사례`}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.01]"
                      sizes="(min-width: 1280px) 400px, 100vw"
                    />
                    <Link
                      href={detailHref}
                      aria-label={`${item.title} 상세 보기`}
                      className="absolute inset-0 z-10"
                    >
                      <span className="sr-only">{item.title} 상세 보기</span>
                    </Link>
                    {item.kind === 'treatment' && !isAuthenticated ? (
                      <TreatmentCaseImageLock compact />
                    ) : null}
                  </div>

                  <Link href={detailHref} className="block p-4 xl:p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="green" size="lg">
                        {item.category}
                      </Badge>
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
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyState className="mt-12 min-h-[240px] xl:text-xl" />
        )}

        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={() => undefined}
          ariaLabel="치료사례 페이지"
          size="lg"
          showFirst={false}
          className="mt-10 xl:mt-12"
        />
      </div>
    </PageContainer>
  );
}
