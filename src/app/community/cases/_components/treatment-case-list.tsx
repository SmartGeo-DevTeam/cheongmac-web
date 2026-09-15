'use client';

import CollectionAdminEditButton from '@/app/_components/inline-editor/collection-admin-edit-button';
import ManagedItemEditButton from '@/app/_components/inline-editor/managed-item-edit-button';
import {
  H2 as TypographyH2,
} from '@/app/_components/ui/typography';
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
import type { InlineContentData } from '@/_lib/inline-content-shared';
import {
  type TreatmentCase,
  type TreatmentCaseKind,
} from '../_data';
import { TreatmentCaseImageLock } from './treatment-case-access';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const FILTER_VALUES: TreatmentCaseKind[] = [
  'treatment',
  'review',
  'video',
];

type Props = {
  isAuthenticated: boolean;
  items: TreatmentCase[];
  copy: InlineContentData;
};

const PAGE_SIZE = 6;

function TreatmentCaseCard({
  item,
  isAuthenticated,
  copy,
}: {
  item: TreatmentCase;
  isAuthenticated: boolean;
  copy: InlineContentData;
}) {
  const detailHref = `/community/cases/${item.id}`;

  return (
    <ContentCard
      id={`treatment-case-card-${item.id}`}
      variant="treatment"
      className="relative"
    >
      <ManagedItemEditButton
        pageKey="cases"
        itemKey={String(item.id)}
        label={item.title}
      />
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
              {copy.patientPrefix} {item.patientName} · {item.age}세 · {item.sex}
            </span>
            <time dateTime={item.date}>{item.date}</time>
          </ContentCardMeta>
        </ContentCardBody>
      </Link>
    </ContentCard>
  );
}

export default function TreatmentCaseList({
  isAuthenticated,
  items,
  copy,
}: Props) {
  const [activeFilter, setActiveFilter] =
    useState<TreatmentCaseKind>('treatment');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filteredCases = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = items.filter(
      (item) => item.kind === activeFilter,
    );

    if (!normalizedQuery) return filtered;

    return filtered.filter((item) =>
      [item.title, item.category, item.description].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [activeFilter, items, query]);

  const totalPages = Math.max(1, Math.ceil(filteredCases.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleCases = filteredCases.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const changeFilter = (next: TreatmentCaseKind) => {
    setActiveFilter(next);
    setPage(1);
  };

  const changeQuery = (next: string) => {
    setQuery(next);
    setPage(1);
  };

  return (
    <PageContainer className="group/cms-collection relative pb-20 xl:pb-28">
      <CollectionAdminEditButton
        href="/admin/pages/cases"
        label="치료사례"
      />
      <div className="flex flex-col">
        <TypographyH2 id="treatment-case-list-heading" className="sr-only">
          {copy.listHeading}
        </TypographyH2>
        <FilterTabs
          id="treatment-case-filter-tabs"
          items={FILTER_VALUES.map((value) => ({
            value,
            label:
              value === 'review'
                ? copy.filterReview
                : value === 'video'
                  ? copy.filterVideo
                  : copy.filterTreatment,
          }))}
          value={activeFilter}
          onValueChange={changeFilter}
          ariaLabel={copy.filterAria}
          variant="treatment"
        />

        <BoardToolbar
          count={filteredCases.length}
          size="lg"
          accent="coral"
          className="mt-6 xl:mt-8"
        >
          <SearchField
            ariaLabel={copy.searchAria}
            size="lg"
            value={query}
            onChange={(event) => changeQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
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
                copy={copy}
              />
            ))}
          </div>
        ) : (
          <EmptyState className="mt-12 min-h-[240px] xl:text-xl">
            {copy.emptyText}
          </EmptyState>
        )}

        <Pagination
          id="treatment-case-pagination"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
          ariaLabel={copy.paginationAria}
          variant="large"
          showFirst={false}
          className="mt-10 xl:mt-12"
        />
      </div>
    </PageContainer>
  );
}
