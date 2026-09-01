'use client';

import {
  PARTNER_CATEGORY_OPTIONS,
  PARTNER_HOSPITALS,
  PARTNER_INSTITUTION_LOGOS,
  PARTNER_TOTAL_COUNT,
  type PartnerCategory,
} from '../_data';
import {
  ChevronRight,
  ChevronsRight,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';

const PAGE_NUMBERS = [1, 2, 3, 4, 5] as const;

function PartnershipOverview() {
  return (
    <section>
      <div>
        <h2 className="text-[24px] font-bold tracking-[-0.04em] text-[#262C35] xl:text-[34px]">
          협약기관 현황
        </h2>
        <p className="mt-3 break-keep text-base leading-[1.7] text-[#8A9096] xl:text-xl">
          청맥병원과 협약을 맺은 기관을 이용하시면 진료비 감면 등 폭넓은
          의료·제휴 혜택을 누리실 수 있습니다.
        </p>
      </div>

      <div className="relative mt-5 aspect-[165/58] overflow-hidden rounded-xl xl:hidden">
        <Image
          src="/assets/images/partner-hospital/partnership-handshake.jpg"
          alt="의료 협약을 상징하는 악수"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 xl:mt-10 xl:grid-cols-4 xl:gap-3">
        {PARTNER_INSTITUTION_LOGOS.map((institution) => (
          <div
            key={institution.id}
            className="relative aspect-[2.5/1] overflow-hidden rounded-lg transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)]"
          >
            <Image
              src={institution.image}
              alt={institution.name}
              fill
              className="object-contain"
              sizes="(min-width: 1280px) 25vw, 50vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function PartnerFilters({
  category,
  onCategoryChange,
}: {
  category: PartnerCategory;
  onCategoryChange: (category: PartnerCategory) => void;
}) {
  return (
    <div className="hidden justify-center gap-3 xl:flex">
      {PARTNER_CATEGORY_OPTIONS.map((option) => {
        const active = option.value === category;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onCategoryChange(option.value)}
            className={`h-12 min-w-[118px] rounded-full border px-7 text-lg font-medium transition ${
              active
                ? 'border-[#08715F] bg-[#08715F] text-white'
                : 'border-[#E0E3E5] bg-white text-[#9BA0A6] hover:border-[#BACCC7] hover:text-[#5B6269]'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function PartnerCard({
  name,
  image,
  agreement,
  phone,
  tags,
}: {
  name: string;
  image: string;
  agreement: string;
  phone: string;
  tags: string[];
}) {
  return (
    <article className="min-w-0">
      <div className="relative aspect-[264/166] overflow-hidden rounded-xl bg-[#F3F4F5]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 33vw, 100vw"
        />
      </div>

      <div className="pt-4 xl:pt-5">
        <h3 className="flex items-center gap-2 break-keep text-[19px] font-bold tracking-[-0.035em] text-[#262C35] xl:text-[24px]">
          <span>{name}</span>
          <Image
            src="/assets/icons/partner-home.svg"
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
            className="size-4 shrink-0 xl:size-5"
          />
        </h3>

        <dl className="mt-4 space-y-3">
          <div className="grid grid-cols-[64px_1fr] gap-3 xl:grid-cols-[78px_1fr] xl:gap-4">
            <dt className="text-sm leading-[1.7] text-[#9BA0A5] xl:text-base">
              협약내용
            </dt>
            <dd className="break-keep text-base leading-[1.65] text-[#454B51] xl:text-lg xl:leading-[1.7]">
              {agreement}
            </dd>
          </div>

          <div className="grid grid-cols-[64px_1fr] gap-3 xl:grid-cols-[78px_1fr] xl:gap-4">
            <dt className="text-sm text-[#9BA0A5] xl:text-base">전화번호</dt>
            <dd className="text-base font-semibold text-[#333A40] xl:text-lg">
              {phone}
            </dd>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex min-h-8 items-center rounded-full border border-[#E1E4E6] bg-white px-3 text-sm text-[#8D9399] xl:min-h-9 xl:px-4 xl:text-base"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function PartnerHospitalContent() {
  const [category, setCategory] = useState<PartnerCategory>('all');
  const [query, setQuery] = useState('');
  const [activePage, setActivePage] = useState(1);
  const listTopRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return PARTNER_HOSPITALS.filter((item) => {
      const categoryMatches =
        category === 'all' || item.category === category;
      const queryMatches =
        normalized.length === 0 ||
        [item.name, item.agreement, item.phone, ...item.tags]
          .join(' ')
          .toLowerCase()
          .includes(normalized);

      return categoryMatches && queryMatches;
    });
  }, [category, query]);

  const resultCount =
    category === 'all' && query.trim().length === 0
      ? PARTNER_TOTAL_COUNT
      : filtered.length;

  const updateQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setActivePage(1);
  };

  const changeCategory = (next: PartnerCategory) => {
    setCategory(next);
    setActivePage(1);
  };

  const changePage = (next: number) => {
    setActivePage(next);
    listTopRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-8 xl:px-0 xl:pb-28 xl:pt-14">
      <PartnershipOverview />

      <div className="mt-14 xl:mt-20">
        <PartnerFilters
          category={category}
          onCategoryChange={changeCategory}
        />

        <div
          ref={listTopRef}
          className="mt-8 scroll-mt-28 xl:mt-10"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-[#9A9FA5] xl:text-base">
              총{' '}
              <strong className="font-semibold text-[#FF6B3D]">
                {resultCount.toLocaleString()}
              </strong>{' '}
              건
            </p>

            <label className="relative block w-[190px] xl:w-[250px]">
              <span className="sr-only">의료협약기관 검색</span>
              <input
                type="search"
                value={query}
                onChange={updateQuery}
                placeholder="검색어를 입력하세요"
                className="h-11 w-full rounded-full border border-[#E2E5E7] bg-white pl-4 pr-11 text-sm text-[#30373D] outline-none placeholder:text-[#A7ACB1] focus:border-[#A9C7C0] xl:h-12 xl:text-base"
              />
              <Search
                className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#5D646B]"
                strokeWidth={1.7}
              />
            </label>
          </div>

          {filtered.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-12 xl:mt-7 xl:grid-cols-3 xl:gap-y-16">
              {filtered.map((item) => (
                <PartnerCard key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <div className="mt-6 flex min-h-48 items-center justify-center rounded-2xl bg-[#F7F8F8] px-5 text-center text-base text-[#8C9298] xl:text-xl">
              검색 조건에 맞는 협약기관이 없습니다.
            </div>
          )}

          <nav
            aria-label="의료협약기관 페이지"
            className="mt-14 flex items-center justify-center gap-5 text-sm text-[#7E848A] xl:mt-20 xl:text-base"
          >
            {PAGE_NUMBERS.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => changePage(page)}
                aria-current={activePage === page ? 'page' : undefined}
                className={`grid size-8 place-items-center rounded-md transition ${
                  activePage === page
                    ? 'bg-[#5A616A] font-semibold text-white'
                    : 'hover:bg-[#F1F2F3] hover:text-[#333A40]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => changePage(Math.min(5, activePage + 1))}
              className="grid size-8 place-items-center rounded-md transition hover:bg-[#F1F2F3]"
              aria-label="다음 페이지"
            >
              <ChevronRight className="size-4" strokeWidth={1.7} />
            </button>

            <button
              type="button"
              onClick={() => changePage(5)}
              className="grid size-8 place-items-center rounded-md transition hover:bg-[#F1F2F3]"
              aria-label="마지막 페이지"
            >
              <ChevronsRight className="size-4" strokeWidth={1.7} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
