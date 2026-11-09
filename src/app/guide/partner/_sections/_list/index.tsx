'use client';

import Inner from '@/app/_components/common/inner';
import ContentPagination from '@/app/_components/content-list/pagination';
import ContentListToolbar from '@/app/_components/content-list/toolbar';
import PageTabs from '@/app/_components/page-tabs';
import { useViewport } from '@/app/_providers/viewport-provider';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import PartnerCard from '../../_components/_partner-card';
import type { PartnerCategory } from '../../_components/types';
import { partnerItems, partnerTabs } from './data';

type PartnerTab = 'all' | PartnerCategory;
type PartnerFilters = {
  category: PartnerTab;
  query: string;
  page: number;
};

const LIST_PATH = '/guide/partner';
const MOBILE_PAGE_SIZE = 5;
const DESKTOP_PAGE_SIZE = 9;

function readFilters(params: URLSearchParams): PartnerFilters {
  const category = params.get('category');
  const page = Number(params.get('page') ?? 1);

  return {
    category:
      category === 'medical' || category === 'support' ? category : 'all',
    query: params.get('q') ?? '',
    page: Number.isSafeInteger(page) && page > 0 ? page : 1,
  };
}

function buildListUrl(filters: PartnerFilters): string {
  const params = new URLSearchParams();
  if (filters.category !== 'all') params.set('category', filters.category);
  if (filters.query.trim()) params.set('q', filters.query.trim());
  if (filters.page > 1) params.set('page', String(filters.page));
  const search = params.toString();
  return search ? `${LIST_PATH}?${search}` : LIST_PATH;
}

export default function PartnerList() {
  const searchParams = useSearchParams();
  const { isDesktop } = useViewport();
  const [filters, setFilters] = useState<PartnerFilters>(() =>
    readFilters(new URLSearchParams(searchParams.toString())),
  );

  useEffect(() => {
    const onPopState = () =>
      setFilters(readFilters(new URLSearchParams(window.location.search)));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const updateFilters = (next: PartnerFilters) => {
    setFilters(next);
    window.history.replaceState(window.history.state, '', buildListUrl(next));
  };

  const filteredItems = useMemo(() => {
    const keyword = filters.query.trim().toLocaleLowerCase('ko-KR');
    return partnerItems.filter((item) => {
      if (filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }
      if (!keyword) return true;
      return [item.name, item.description ?? '', ...(item.keywords ?? [])]
        .join(' ')
        .toLocaleLowerCase('ko-KR')
        .includes(keyword);
    });
  }, [filters.category, filters.query]);

  const pageSize = isDesktop ? DESKTOP_PAGE_SIZE : MOBILE_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const currentPage = Math.min(filters.page, totalPages);
  const visibleItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <section id="guide-partner-list">
      <div className="mt-15 mb-20">
        {/* 기존 공통 PageTabs: 전체 / 진료협약 / 제휴·지원 */}
        <PageTabs
          id="guide-partner-tabs"
          ariaLabel="의료협약병원 분류"
          tabs={partnerTabs}
          activeId={filters.category}
          align="center"
          onChange={(id) => {
            if (id !== 'all' && id !== 'medical' && id !== 'support') return;
            updateFilters({ ...filters, category: id, page: 1 });
          }}
        />

        {/* 기존 공통 ContentListToolbar: 전체 개수 / 실시간 검색 */}
        <Inner
          usePaddingHorizontalInMobile={false}
          usePaddingHorizontalInDesktop={false}
        >
          <div className="mt-5">
            <ContentListToolbar
              count={filteredItems.length}
              searchProps={{
                ariaLabel: '의료협약병원 검색',
                value: filters.query,
                onChange: (query) =>
                  updateFilters({ ...filters, query, page: 1 }),
              }}
            />
          </div>
        </Inner>

        <Inner>
          {visibleItems.length > 0 ? (
            <ul
              className="mt-5 grid grid-cols-1 gap-10
              xl:grid-cols-3 xl:gap-x-6 xl:gap-y-20"
            >
              {visibleItems.map((item) => (
                <li key={item.id}>
                  <PartnerCard item={item} />
                </li>
              ))}
            </ul>
          ) : (
            <p role="status">검색 결과가 없습니다.</p>
          )}

          {/* 기존 공통 ContentPagination: 데이터가 1페이지를 넘을 때 노출 */}
          <ContentPagination
            ariaLabel="의료협약병원 페이지 이동"
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={(page) => {
              updateFilters({ ...filters, page });
              document.getElementById('guide-partner-list')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          />
        </Inner>
      </div>
    </section>
  );
}
