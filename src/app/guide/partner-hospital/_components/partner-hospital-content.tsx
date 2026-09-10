'use client';

import {
  ContentCard,
  ContentCardBody,
  ContentCardMedia,
  ContentCardTitle,
} from '@/app/_components/ui/content-card';
import FilterTabs from '@/app/_components/ui/filter-tabs';
import Pagination from '@/app/_components/ui/pagination';

import {
  PARTNER_CATEGORY_OPTIONS,
  type PartnerCategory,
  type PartnerHospital,
  type PartnerInstitutionLogo,
} from '../_data';
import { Search } from 'lucide-react';
import Image from 'next/image';
import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';

function PartnershipOverview({
  logos,
}: {
  logos: PartnerInstitutionLogo[];
}) {
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
        {logos.map((institution) => (
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
    <FilterTabs
      id="partner-hospital-filter-tabs"
      items={PARTNER_CATEGORY_OPTIONS}
      value={category}
      onValueChange={onCategoryChange}
      ariaLabel="의료협약기관 분류"
      variant="partner"
    />
  );
}

function PartnerCard({
  id,
  name,
  image,
  agreement,
  phone,
  tags,
}: {
  id: string | number;
  name: string;
  image: string;
  agreement: string;
  phone: string;
  tags: string[];
}) {
  return (
    <ContentCard
      id={`partner-hospital-card-${id}`}
      variant="partner"
    >
      <ContentCardMedia variant="partner">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 33vw, 100vw"
        />
      </ContentCardMedia>

      <ContentCardBody variant="partner">
        <ContentCardTitle variant="partner">
          <span>{name}</span>
          <Image
            src="/assets/icons/partner-home.svg"
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
            className="size-4 shrink-0 xl:size-5"
          />
        </ContentCardTitle>

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
      </ContentCardBody>
    </ContentCard>
  );
}

const PAGE_SIZE = 6;

export default function PartnerHospitalContent({
  logos,
  hospitals,
}: {
  logos: PartnerInstitutionLogo[];
  hospitals: PartnerHospital[];
}) {
  const [category, setCategory] = useState<PartnerCategory>('all');
  const [query, setQuery] = useState('');
  const [activePage, setActivePage] = useState(1);
  const listTopRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return hospitals.filter((item) => {
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
  }, [category, hospitals, query]);

  const resultCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(activePage, totalPages);
  const visibleHospitals = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

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
    <div className="mx-auto w-full max-w-7xl px-5 pb-20 xl:px-0 xl:pb-28">
      <PartnershipOverview logos={logos} />

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
              {visibleHospitals.map((item) => (
                <PartnerCard key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <div className="mt-6 flex min-h-48 items-center justify-center rounded-2xl bg-[#F7F8F8] px-5 text-center text-base text-[#8C9298] xl:text-xl">
              검색 조건에 맞는 협약기관이 없습니다.
            </div>
          )}

          <Pagination
            id="partner-hospital-pagination"
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={changePage}
            ariaLabel="의료협약기관 페이지"
            variant="partner"
            showFirst={false}
            showPrevious={false}
            className="mt-14 xl:mt-20"
          />
        </div>
      </div>
    </div>
  );
}
