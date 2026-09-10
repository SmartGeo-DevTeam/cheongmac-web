'use client';

import FilterTabs from '@/app/_components/ui/filter-tabs';

import {
  FACILITY_CATEGORY_OPTIONS,
  type FacilityCategory,
  type FacilityItem,
  type FloorGuide,
  type HospitalTourTab,
} from '../_data';
import { ChevronDown, Search, X } from 'lucide-react';
import Image from 'next/image';
import {
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';

const INITIAL_VISIBLE_FACILITY_COUNT = 9;

function HospitalTourTabs({
  activeTab,
  onChange,
}: {
  activeTab: HospitalTourTab;
  onChange: (tab: HospitalTourTab) => void;
}) {
  return (
    <FilterTabs
      id="hospital-tour-view-tabs"
      items={[
        { value: 'floor' as const, label: '층별안내' },
        { value: 'facility' as const, label: '시설안내' },
      ]}
      value={activeTab}
      onValueChange={onChange}
      ariaLabel="병원 둘러보기 보기 방식"
      variant="segmented"
      semantic="tabs"
    />
  );
}

function FloorCard({ floor, title, details }: FloorGuide) {
  return (
    <article
      tabIndex={0}
      className="group rounded-xl border border-[#DCE0E3] bg-white px-5 py-5 transition duration-200 outline-none hover:border-[#006656] hover:bg-[#006656] focus-visible:border-[#006656] focus-visible:bg-[#006656] xl:px-6 xl:py-5"
    >
      <div className="flex items-center gap-3 xl:gap-4">
        <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg bg-[#F3F4F5] px-2 text-base font-semibold text-[#262C35] xl:h-12 xl:min-w-12 xl:text-xl">
          {floor}
        </span>
        <h3 className="break-keep text-xl font-bold tracking-[-0.035em] text-[#262C35] transition group-hover:text-white group-focus-visible:text-white xl:text-2xl">
          {title}
        </h3>
      </div>

      <ul className="mt-3 space-y-1.5 pl-[52px] text-base leading-[1.65] text-[#262C35] transition group-hover:text-[#8FD5C6] group-focus-visible:text-[#8FD5C6] xl:pl-[64px] xl:text-xl">
        {details.map((detail) => (
          <li key={detail} className="relative pl-4">
            <span className="absolute left-0 top-[0.72em] size-1 rounded-full bg-current" />
            {detail}
          </li>
        ))}
      </ul>
    </article>
  );
}

function FloorGuideSection({
  floorGuides,
}: {
  floorGuides: FloorGuide[];
}) {
  return (
    <section className="relative left-1/2 mt-8 w-screen -translate-x-1/2 bg-[linear-gradient(180deg,#FFFFFF_0%,#EAF2FD_100%)] xl:mt-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 px-5 pb-10 xl:grid-cols-2 xl:gap-14 xl:px-0 xl:pb-0">
        {/*
          데스크탑에서는 우측 층별 카드 컬럼의 실제 높이에 맞춰 이 컬럼이
          자동으로 stretch 됩니다. 건물은 투명 PNG를 배경으로 사용하므로
          별도의 고정 height 없이 항상 하단에 맞춰 자연스럽게 배치됩니다.
        */}
        <div
          aria-hidden="true"
          className="hidden self-stretch bg-contain bg-bottom bg-no-repeat xl:block"
          style={{
            backgroundImage:
              "url('/assets/images/hospital-tour/building.png')",
          }}
        />

        <div className="space-y-3 py-0 xl:py-12">
          {floorGuides.map((guide) => (
            <FloorCard key={guide.floor} {...guide} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FacilityCard({
  item,
  onOpen,
}: {
  item: FacilityItem;
  onOpen: (item: FacilityItem) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group overflow-hidden rounded-xl border border-[#DDE1E4] bg-white text-left transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7463]/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F2F3F4]">
        <Image
          src={item.images[0]}
          alt={item.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.015]"
          sizes="(min-width: 1280px) 31vw, 50vw"
        />
      </div>

      <div className="flex min-h-[62px] items-center gap-2 px-3 py-3 xl:min-h-[70px] xl:px-4">
        <span className="inline-flex shrink-0 items-center rounded-full bg-[#EFF8F5] px-2.5 py-1 text-sm font-semibold text-[#08715F] xl:text-base">
          {item.floor}
        </span>
        <strong className="line-clamp-1 text-base font-semibold text-[#262C35] xl:text-xl">
          {item.title}
        </strong>
      </div>
    </button>
  );
}

function FacilitySection({
  onOpen,
  facilityItems,
}: {
  onOpen: (item: FacilityItem) => void;
  facilityItems: FacilityItem[];
}) {
  const [category, setCategory] = useState<FacilityCategory>('all');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(
    INITIAL_VISIBLE_FACILITY_COUNT,
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return facilityItems.filter((item) => {
      const categoryMatches =
        category === 'all' || item.category === category;
      const queryMatches =
        normalizedQuery.length === 0 ||
        `${item.floor} ${item.title}`
          .toLowerCase()
          .includes(normalizedQuery);

      return categoryMatches && queryMatches;
    });
  }, [category, facilityItems, query]);

  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleItems.length < filtered.length;

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_FACILITY_COUNT);
  }, [category, query]);

  return (
    <section className="mt-8 xl:mt-14">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {FACILITY_CATEGORY_OPTIONS.map((option) => {
            const isActive = option.value === category;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setCategory(option.value)}
                className={`relative text-base transition xl:text-xl ${
                  isActive
                    ? 'font-bold text-[#006656]'
                    : 'font-medium text-[#92979E] hover:text-[#555C63]'
                }`}
              >
                {isActive ? (
                  <span className="mr-1 inline-block size-1.5 rounded-full bg-[#006656] align-middle" />
                ) : null}
                {option.label}
              </button>
            );
          })}
        </div>

        <label className="relative block w-full xl:w-[320px]">
          <span className="sr-only">시설 검색</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="찾으려는 시설을 검색하세요."
            className="h-12 w-full rounded-full border border-[#D9DDE1] bg-white pl-5 pr-12 text-base text-[#262C35] outline-none placeholder:text-[#A8ADB3] focus:border-[#8ABFB3] xl:h-14 xl:text-lg"
          />
          <Search
            className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#262C35] xl:size-6"
            strokeWidth={1.8}
          />
        </label>
      </div>

      {visibleItems.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-3 xl:mt-8 xl:grid-cols-3 xl:gap-5">
          {visibleItems.map((item) => (
            <FacilityCard key={item.id} item={item} onOpen={onOpen} />
          ))}
        </div>
      ) : (
        <div className="mt-8 flex min-h-48 items-center justify-center rounded-2xl bg-[#F7F8F8] px-5 text-center text-base text-[#858B91] xl:text-xl">
          검색 조건에 맞는 시설이 없습니다.
        </div>
      )}

      {hasMore ? (
        <div className="mt-8 flex justify-center xl:mt-10">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + 6)}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#F4F5F6] px-7 text-base font-semibold text-[#3F454B] transition hover:bg-[#ECEEEF] xl:h-14 xl:px-8 xl:text-xl"
          >
            더보기
            <ChevronDown className="size-5" strokeWidth={1.8} />
          </button>
        </div>
      ) : null}
    </section>
  );
}

function FacilityModal({
  item,
  onClose,
}: {
  item: FacilityItem;
  onClose: () => void;
}) {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setSlideIndex(0);
  }, [item.id]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const moveSlide = (direction: number) => {
    if (item.images.length <= 1) {
      return;
    }

    setSlideIndex((current) => {
      const next = current + direction;

      if (next < 0) {
        return item.images.length - 1;
      }

      if (next >= item.images.length) {
        return 0;
      }

      return next;
    });
  };

  const handleImageKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === 'ArrowRight') {
      moveSlide(1);
    }

    if (event.key === 'ArrowLeft') {
      moveSlide(-1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-black/45 px-0 py-0 backdrop-blur-[2px] xl:items-center xl:px-6 xl:py-8"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={`${item.title} 시설 상세`}
        className="max-h-[92dvh] w-full overflow-y-auto rounded-t-[32px] bg-white px-5 pb-8 pt-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] xl:max-h-[90vh] xl:max-w-4xl xl:rounded-[32px] xl:px-10 xl:pb-10 xl:pt-9"
      >
        <header className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <span className="inline-flex h-14 min-w-14 shrink-0 items-center justify-center rounded-xl bg-[#006656] px-3 text-xl font-semibold text-white xl:h-16 xl:min-w-16 xl:text-2xl">
              {item.floor}
            </span>
            <h2 className="truncate text-2xl font-bold tracking-[-0.04em] text-[#262C35] xl:text-[34px]">
              {item.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid size-11 shrink-0 place-items-center rounded-full text-[#4F5660] transition hover:bg-[#F3F4F5]"
            aria-label="시설 상세 닫기"
          >
            <X className="size-8" strokeWidth={1.8} />
          </button>
        </header>

        <div
          className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl bg-[#F0F2F3] outline-none xl:mt-7"
          tabIndex={0}
          onKeyDown={handleImageKeyDown}
        >
          <Image
            src={item.images[slideIndex]}
            alt={`${item.title} ${slideIndex + 1}`}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 780px, 100vw"
            priority
          />

          {item.images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => moveSlide(-1)}
                className="absolute inset-y-0 left-0 w-1/3 cursor-w-resize"
                aria-label="이전 시설 사진"
              />
              <button
                type="button"
                onClick={() => moveSlide(1)}
                className="absolute inset-y-0 right-0 w-1/3 cursor-e-resize"
                aria-label="다음 시설 사진"
              />
            </>
          ) : null}

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {item.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSlideIndex(index)}
                aria-label={`${index + 1}번째 사진 보기`}
                className={`h-3 rounded-full transition ${
                  slideIndex === index
                    ? 'w-10 bg-[#37A18D]'
                    : 'w-3 bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {item.description ? (
          <p className="mt-6 break-keep text-base leading-[1.75] text-[#262C35] xl:mt-8 xl:text-xl xl:leading-[1.8]">
            {item.description}
          </p>
        ) : null}

        {item.bulletDetails ? (
          <ul className="mt-6 list-disc space-y-2 pl-7 text-base leading-[1.65] text-[#262C35] xl:mt-8 xl:text-xl">
            {item.bulletDetails.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        ) : null}

        {item.infoRows ? (
          <div className="mt-7 rounded-2xl bg-[#F5F6F7] px-5 py-6 xl:mt-9 xl:px-8 xl:py-8">
            <dl className="space-y-6">
              {item.infoRows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[86px_1fr] gap-3 xl:grid-cols-[110px_1fr] xl:gap-5"
                >
                  <dt className="text-base font-semibold text-[#969BA2] xl:text-xl">
                    {row.label}
                  </dt>
                  <dd className="space-y-2 text-base leading-[1.7] text-[#262C35] xl:text-xl">
                    {row.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default function HospitalTourContent({
  floorGuides,
  facilityItems,
}: {
  floorGuides: FloorGuide[];
  facilityItems: FacilityItem[];
}) {
  const [activeTab, setActiveTab] = useState<HospitalTourTab>('floor');
  const [selectedFacility, setSelectedFacility] =
    useState<FacilityItem | null>(null);

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-5 pb-16 xl:px-0 xl:pb-24">
        <HospitalTourTabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'floor' ? (
          <FloorGuideSection floorGuides={floorGuides} />
        ) : (
          <FacilitySection
            onOpen={setSelectedFacility}
            facilityItems={facilityItems}
          />
        )}
      </div>

      {selectedFacility ? (
        <FacilityModal
          item={selectedFacility}
          onClose={() => setSelectedFacility(null)}
        />
      ) : null}
    </>
  );
}
