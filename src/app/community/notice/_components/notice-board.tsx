'use client';

import {
  NOTICE_ITEMS,
  type NoticeCategory,
  type NoticeItem,
} from '@/app/community/notice/_data/notices';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

type CategoryFilter = 'all' | NoticeCategory;

const CATEGORY_TABS: Array<{ id: CategoryFilter; label: string }> = [
  { id: 'all', label: '전체' },
  { id: 'notice', label: '공지사항' },
  { id: 'holiday', label: '휴진안내' },
];

const PAGE_SIZE = 10;

const HOLIDAY_ALERTS = [
  {
    id: 1,
    title: '광복절 · 대체공휴일',
    date: '8월 15일(토) ~ 8월 17일(월)',
  },
  {
    id: 2,
    title: '추석연휴',
    date: '9월 24일(목) ~ 9월 26일(토)',
  },
] as const;

const HOLIDAY_DOCTORS = [
  {
    id: 1,
    name: '박용범 원장',
    mobileName: '혈관외과 박용범 원장',
    date: '8월 15일(토)',
    imageSrc: '/assets/doctors/bak-headshot-mobile.png',
  },
  {
    id: 2,
    name: '전진원 원장',
    mobileName: '혈관외과 전진원 원장',
    date: '8월 15일(토) ~ 10월 25일(금)',
    imageSrc: '/assets/doctors/jeon-headshot-mobile.png',
  },
  {
    id: 3,
    name: '장지란 원장',
    mobileName: '혈관외과 장지란 원장',
    date: '9월 3일(목)',
    imageSrc: '/assets/doctors/jang-headshot-mobile.png',
  },
  {
    id: 4,
    name: '변승재 원장',
    mobileName: '혈관외과 변승재 원장',
    date: '9월 10일(목)',
    imageSrc: '/assets/doctors/byun-headshot-mobile.png',
  },
] as const;

function isCategoryFilter(value: string | null): value is CategoryFilter {
  return value === 'all' || value === 'notice' || value === 'holiday';
}

function parsePage(value: string | null) {
  if (!value) return 1;

  const page = Number.parseInt(value, 10);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function buildNoticeListUrl({
  category,
  page,
  query,
}: {
  category: CategoryFilter;
  page: number;
  query: string;
}) {
  const params = new URLSearchParams();
  const normalizedQuery = query.trim();

  if (category !== 'all') params.set('category', category);
  if (page > 1) params.set('page', String(page));
  if (normalizedQuery) params.set('q', normalizedQuery);

  const queryString = params.toString();
  return queryString ? `/community/notice?${queryString}` : '/community/notice';
}

function buildNoticeDetailHref(id: number, returnTo: string) {
  return {
    pathname: `/community/notice/${id}`,
    query: { from: returnTo },
  };
}

function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex h-10 w-[160px] items-center gap-2 rounded-full border border-[#E1E4E8] bg-white px-4 xl:h-11 xl:w-[270px]">
      <span className="sr-only">공지사항 검색</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="검색어를 입력하세요"
        className="min-w-0 flex-1 bg-transparent text-xs text-[#333333] placeholder:text-[#A7ADB5] xl:text-sm"
      />
      <Search className="size-5 shrink-0 text-[#313843]" strokeWidth={1.7} />
    </label>
  );
}

function FeaturedNotice({ returnTo }: { returnTo: string }) {
  const featuredItem = NOTICE_ITEMS[0];

  return (
    <section>
      <h2 className="mb-2 text-[16px] font-semibold tracking-[-0.04em] text-[#252B33] xl:mb-3 xl:text-[20px]">
        주요 공지
      </h2>
      <article className="overflow-hidden rounded-[10px] border border-[#E3E6E9] bg-white">
        <Link
          href={buildNoticeDetailHref(featuredItem.id, returnTo)}
          className="block outline-none focus-visible:ring-2 focus-visible:ring-[#006553] focus-visible:ring-inset"
        >
          <div className="relative aspect-[2.33/1] w-full bg-[#4316F6] xl:aspect-[1.4/1]">
            <Image
              src="/assets/images/home-notice-1.png"
              alt="네이버예약 OPEN"
              fill
              priority
              sizes="(min-width: 1280px) 340px, calc(100vw - 40px)"
              className="object-cover"
            />
          </div>
          <div className="flex min-h-10 items-center px-3 text-[12px] font-medium tracking-[-0.035em] text-[#323840] xl:min-h-12 xl:px-4 xl:text-[14px]">
            네이버예약 OPEN
          </div>
        </Link>
      </article>
    </section>
  );
}

function HolidayAlert({ title, date }: { title: string; date: string }) {
  return (
    <article className="flex min-h-[70px] flex-col justify-center rounded-[9px] bg-[#FFF5F5] px-4 xl:min-h-[116px] xl:items-center xl:px-3 xl:text-center">
      <p className="text-[12px] font-semibold tracking-[-0.035em] text-[#E74C4C] xl:text-[14px]">
        <span aria-hidden>● </span>
        {title}
        <span aria-hidden> ●</span>
      </p>
      <p className="mt-1 text-[13px] font-medium tracking-[-0.035em] text-[#454B53] xl:mt-2 xl:text-[16px]">
        {date}
      </p>
    </article>
  );
}

function DesktopDoctorMini({
  doctor,
}: {
  doctor: (typeof HOLIDAY_DOCTORS)[number];
}) {
  return (
    <article className="flex min-h-[116px] flex-col items-center justify-center rounded-[9px] border border-[#E3E6E9] bg-white px-2 py-3">
      <div className="relative size-14 overflow-hidden rounded-full bg-[#F5F6F7]">
        <Image
          src={doctor.imageSrc}
          alt={doctor.name}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>
      <p className="mt-2 text-[12px] tracking-[-0.04em] text-[#777E87]">
        {doctor.name}
      </p>
    </article>
  );
}

function DesktopDoctorWide({
  doctor,
}: {
  doctor: (typeof HOLIDAY_DOCTORS)[number];
}) {
  return (
    <article className="relative flex min-h-[84px] items-center overflow-hidden rounded-[9px] border border-[#E3E6E9] bg-white px-5">
      <p className="w-[65%] text-center text-[12px] tracking-[-0.04em] text-[#777E87]">
        {doctor.name}
      </p>
      <div className="absolute bottom-0 right-5 size-19 overflow-hidden rounded-full bg-[#F5F6F7]">
        <Image
          src={doctor.imageSrc}
          alt={doctor.name}
          fill
          sizes="76px"
          className="object-cover"
        />
      </div>
    </article>
  );
}

function MobileDoctorRow({
  doctor,
}: {
  doctor: (typeof HOLIDAY_DOCTORS)[number];
}) {
  return (
    <article className="relative flex min-h-[62px] items-center overflow-hidden rounded-[8px] border border-[#E3E6E9] bg-white px-3 pr-20">
      <div>
        <p className="text-[11px] tracking-[-0.035em] text-[#6F7680]">
          {doctor.mobileName}
        </p>
        <p className="mt-1 text-[12px] font-medium tracking-[-0.035em] text-[#454B53]">
          {doctor.date}
        </p>
      </div>
      <div className="absolute -bottom-1 right-3 size-15 overflow-hidden rounded-full bg-[#F5F6F7]">
        <Image
          src={doctor.imageSrc}
          alt={doctor.name}
          fill
          sizes="60px"
          className="object-cover"
        />
      </div>
    </article>
  );
}

function NoticeBadge({ item }: { item: NoticeItem }) {
  if (item.category === 'holiday') {
    return (
      <span className="inline-flex h-6 shrink-0 items-center rounded-[5px] bg-[#FFF0F0] px-2 text-[11px] font-semibold text-[#F16464] xl:h-7 xl:px-2.5 xl:text-xs">
        휴진
      </span>
    );
  }

  if (item.isFeatured) {
    return (
      <span className="inline-flex h-6 shrink-0 items-center rounded-[5px] bg-[#FF7D49] px-2 text-[11px] font-semibold text-white xl:h-7 xl:px-2.5 xl:text-xs">
        공지
      </span>
    );
  }

  return (
    <span className="inline-flex h-6 shrink-0 items-center rounded-[5px] bg-[#F2F7F5] px-2 text-[11px] font-semibold text-[#558275] xl:h-7 xl:px-2.5 xl:text-xs">
      공지
    </span>
  );
}

function NoticeRow({ item, returnTo }: { item: NoticeItem; returnTo: string }) {
  return (
    <article className="border-b border-[#E4E7EA]">
      <Link
        href={buildNoticeDetailHref(item.id, returnTo)}
        className="block py-3.5 outline-none transition hover:bg-[#FAFBFB] focus-visible:ring-2 focus-visible:ring-[#006553] focus-visible:ring-inset xl:grid xl:min-h-[68px] xl:grid-cols-[1fr_130px] xl:items-center xl:px-4 xl:py-0"
      >
        <div className="flex min-w-0 items-center gap-2.5 xl:gap-3">
          <NoticeBadge item={item} />
          <h3
            className={`min-w-0 truncate text-[13px] font-medium tracking-[-0.035em] xl:text-[14px] ${
              item.isFeatured ? 'text-[#F36A3B]' : 'text-[#444B54]'
            }`}
          >
            {item.title}
            {item.hasLinkIcon ? (
              <ArrowUpRight
                aria-label="관련 안내"
                className="ml-1 inline size-3.5 align-[-2px] text-[#57606A]"
                strokeWidth={1.6}
              />
            ) : null}
          </h3>
        </div>
        <p className="mt-1 pl-[45px] text-[10px] text-[#B2B8C0] xl:mt-0 xl:pl-0 xl:text-right xl:text-xs">
          {item.date}
        </p>
      </Link>
    </article>
  );
}

function getVisiblePages(currentPage: number, totalPages: number) {
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const half = Math.floor(maxVisiblePages / 2);
  const start = Math.min(
    Math.max(currentPage - half, 1),
    totalPages - maxVisiblePages + 1,
  );

  return Array.from({ length: maxVisiblePages }, (_, index) => start + index);
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <nav
      aria-label="공지사항 페이지"
      className="mt-8 flex justify-center xl:mt-12"
    >
      <div className="flex items-center gap-3 text-xs text-[#9AA1AA] xl:gap-4 xl:text-sm">
        {currentPage > 1 ? (
          <>
            <button
              type="button"
              aria-label="첫 페이지"
              onClick={() => onPageChange(1)}
              className="flex size-6 items-center justify-center"
            >
              <ChevronsLeft className="size-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="이전 페이지"
              onClick={() => onPageChange(currentPage - 1)}
              className="flex size-6 items-center justify-center"
            >
              <ChevronLeft className="size-4" strokeWidth={1.5} />
            </button>
          </>
        ) : null}

        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            aria-current={page === currentPage ? 'page' : undefined}
            onClick={() => onPageChange(page)}
            className={
              page === currentPage
                ? 'flex size-7 items-center justify-center rounded-md bg-[#5B616C] font-semibold text-white'
                : 'flex size-7 items-center justify-center text-[#9AA1AA]'
            }
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages ? (
          <>
            <button
              type="button"
              aria-label="다음 페이지"
              onClick={() => onPageChange(currentPage + 1)}
              className="flex size-6 items-center justify-center"
            >
              <ChevronRight className="size-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="마지막 페이지"
              onClick={() => onPageChange(totalPages)}
              className="flex size-6 items-center justify-center"
            >
              <ChevronsRight className="size-4" strokeWidth={1.5} />
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
}

export default function NoticeBoard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const listRef = useRef<HTMLDivElement>(null);

  const categoryParam = searchParams.get('category');
  const queryParam = searchParams.get('q') ?? '';
  const pageParam = searchParams.get('page');

  const category: CategoryFilter = isCategoryFilter(categoryParam)
    ? categoryParam
    : 'all';
  const currentPage = parsePage(pageParam);
  const [query, setQuery] = useState(queryParam);

  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('ko-KR');

    return NOTICE_ITEMS.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesQuery =
        !normalizedQuery ||
        item.title.toLocaleLowerCase('ko-KR').includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
  const visibleItems = filteredItems.slice(startIndex, startIndex + PAGE_SIZE);

  const currentListUrl = buildNoticeListUrl({
    category,
    page: safeCurrentPage,
    query,
  });

  useEffect(() => {
    if (currentPage === safeCurrentPage) return;
    router.replace(currentListUrl, { scroll: false });
  }, [currentListUrl, currentPage, router, safeCurrentPage]);

  const scrollToList = () => {
    window.requestAnimationFrame(() => {
      if (!listRef.current) return;

      const top =
        listRef.current.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    });
  };

  const handleCategoryChange = (nextCategory: CategoryFilter) => {
    router.push(
      buildNoticeListUrl({ category: nextCategory, page: 1, query }),
      {
        scroll: false,
      },
    );
  };

  const handleQueryChange = (nextQuery: string) => {
    setQuery(nextQuery);
    router.replace(
      buildNoticeListUrl({ category, page: 1, query: nextQuery }),
      {
        scroll: false,
      },
    );
  };

  const handlePageChange = (nextPage: number) => {
    const clampedPage = Math.min(Math.max(nextPage, 1), totalPages);

    router.push(buildNoticeListUrl({ category, page: clampedPage, query }), {
      scroll: false,
    });
    scrollToList();
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-5">
      <div className="xl:grid xl:grid-cols-[340px_minmax(0,1fr)] xl:gap-6">
        <FeaturedNotice returnTo={currentListUrl} />

        <section className="mt-4 xl:mt-0">
          <h2 className="mb-2 text-[16px] font-semibold tracking-[-0.04em] text-[#252B33] xl:mb-3 xl:text-[20px]">
            휴진
          </h2>

          <div className="hidden grid-cols-[1.65fr_0.8fr_0.8fr] gap-3 xl:grid">
            <div className="grid gap-3">
              {HOLIDAY_ALERTS.map((item) => (
                <HolidayAlert
                  key={item.id}
                  title={item.title}
                  date={item.date}
                />
              ))}
            </div>
            <div className="grid gap-3">
              {HOLIDAY_DOCTORS.slice(0, 2).map((doctor) => (
                <DesktopDoctorMini key={doctor.id} doctor={doctor} />
              ))}
            </div>
            <div className="grid gap-3">
              {HOLIDAY_DOCTORS.slice(2, 4).map((doctor) => (
                <DesktopDoctorMini key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>

          <div className="space-y-2 xl:hidden">
            {HOLIDAY_ALERTS.map((item) => (
              <HolidayAlert key={item.id} title={item.title} date={item.date} />
            ))}
            {HOLIDAY_DOCTORS.slice(0, 2).map((doctor) => (
              <MobileDoctorRow key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 hidden xl:block">
        <h2 className="mb-3 text-[20px] font-semibold tracking-[-0.04em] text-[#252B33]">
          휴진
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {HOLIDAY_DOCTORS.map((doctor) => (
            <DesktopDoctorWide key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>

      <div ref={listRef} className="mt-7 xl:mt-10">
        <div className="flex justify-center gap-2 xl:gap-3">
          {CATEGORY_TABS.map((tab) => {
            const isActive = category === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleCategoryChange(tab.id)}
                className={`min-w-[68px] rounded-full border px-4 py-2 text-xs transition xl:min-w-[92px] xl:px-5 xl:py-2.5 xl:text-sm ${
                  isActive
                    ? 'border-[#006553] bg-[#006553] font-semibold text-white'
                    : 'border-[#E1E4E8] bg-white text-[#60666F] hover:border-[#AEB4BC]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-end justify-between xl:mt-7">
          <p className="pb-1 text-[11px] text-[#8D939C] xl:text-sm">
            총{' '}
            <strong className="font-medium text-[#FA6805]">
              {filteredItems.length.toLocaleString('ko-KR')}
            </strong>{' '}
            건
          </p>
          <SearchBox value={query} onChange={handleQueryChange} />
        </div>

        <div className="mt-2 border-t border-[#C9CDD2] xl:mt-3">
          <div className="hidden h-12 grid-cols-[1fr_130px] items-center border-b border-[#E4E7EA] bg-[#FAFAFA] px-4 text-[13px] font-semibold text-[#555C65] xl:grid">
            <span className="text-center">제목</span>
            <span className="text-right">등록일</span>
          </div>

          {visibleItems.length ? (
            visibleItems.map((item) => (
              <NoticeRow key={item.id} item={item} returnTo={currentListUrl} />
            ))
          ) : (
            <div className="py-16 text-center text-sm text-[#8A9098]">
              검색 결과가 없습니다.
            </div>
          )}
        </div>

        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
