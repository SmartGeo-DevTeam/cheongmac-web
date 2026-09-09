'use client';

import Badge from '@/app/_components/ui/badge';
import {
  ContentCard,
  ContentCardBody,
  ContentCardDescription,
  ContentCardMedia,
  ContentCardMeta,
  ContentCardTitle,
} from '@/app/_components/ui/content-card';
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

function TreatmentCaseCard({
  item,
  isAuthenticated,
}: {
  item: (typeof TREATMENT_CASES)[number];
  isAuthenticated: boolean;
}) {
  const detailHref = `/community/cases/${item.id}`;

  return (
    <ContentCard
      id={`treatment-case-card-${item.id}`}
      variant="treatment"
    >
      <ContentCardMedia variant="treatment">
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
      </ContentCardMedia>

      <Link href={detailHref} className="block">
        <ContentCardBody variant="treatment">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="green" size="lg">
              {item.category}
            </Badge>
            <ContentCardTitle variant="treatment">
              {item.title}
            </ContentCardTitle>
          </div>

          <ContentCardDescription variant="treatment">
            {item.description}
          </ContentCardDescription>

          <ContentCardMeta variant="treatment">
            <span>
              한 ♡ {item.patientName} · {item.age}세 · {item.sex}
            </span>
            <time dateTime={item.date}>{item.date}</time>
          </ContentCardMeta>
        </ContentCardBody>
      </Link>
    </ContentCard>
  );
}

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
    <PageContainer className="pb-20 xl:pb-28">
      <div className="flex flex-col">
        <h2 id="treatment-case-list-heading" className="sr-only">
          치료사례 목록
        </h2>
        <FilterTabs
          id="treatment-case-filter-tabs"
          items={FILTERS}
          value={activeFilter}
          onValueChange={changeFilter}
          ariaLabel="치료사례 종류"
          variant="treatment"
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
            {visibleCases.map((item) => (
              <TreatmentCaseCard
                key={item.id}
                item={item}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        ) : (
          <EmptyState className="mt-12 min-h-[240px] xl:text-xl" />
        )}

        <Pagination
          id="treatment-case-pagination"
          currentPage={1}
          totalPages={5}
          onPageChange={() => undefined}
          ariaLabel="치료사례 페이지"
          variant="large"
          showFirst={false}
          className="mt-10 xl:mt-12"
        />
      </div>
    </PageContainer>
  );
}
