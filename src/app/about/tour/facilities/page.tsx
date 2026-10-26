'use client';

import Inner from '@/app/_components/common/inner';
import { ChevronDown, Search } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import FacilityModal from './_components/modal';
import {
  facilities,
  facilityCategories,
  type FacilityCategoryId,
  type FacilityType,
} from './data';

export default function AboutTourFacilitiesPage() {
  const [category, setCategory] = useState<FacilityCategoryId>('all');
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  const [selectedFacility, setSelectedFacility] = useState<FacilityType | null>(
    null,
  );

  const openModal = (facility: FacilityType) => {
    setSelectedFacility(facility);
  };

  const closeModal = () => {
    setSelectedFacility(null);
  };

  const keyword = search.trim().toLowerCase();

  const filteredFacilities = facilities.filter((facility) => {
    const matchesCategory =
      category === 'all' || facility.category === category;

    const categoryLabel =
      facilityCategories.find((item) => item.id === facility.category)?.label ??
      '';

    const searchText = [
      facility.name,
      facility.floor.code,
      facility.floor.label,
      categoryLabel,
      ...(facility.searchKeywords ?? []),
    ]
      .join(' ')
      .toLowerCase();

    const matchesSearch = keyword === '' || searchText.includes(keyword);

    return matchesCategory && matchesSearch;
  });

  const visibleFacilities = filteredFacilities.slice(0, visibleCount);

  return (
    <section id="about-tour-facilities">
      <Inner usePaddingHorizontalInMobile={false}>
        <div
          className="mt-3 mb-16
          xl:mt-20 xl:mb-32"
        >
          <div className="xl:px-5 xl:flex xl:justify-between xl:items-center">
            <ul
              className="pl-5 pr-10 flex gap-2 w-full overflow-x-auto whitespace-nowrap
              xl:p-0 xl:gap-2.5"
            >
              {facilityCategories.map((item) => {
                const isActive = category === item.id;

                return (
                  <li key={item.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setCategory(item.id);
                        setVisibleCount(6);
                      }}
                      aria-pressed={isActive}
                      className={`
                        relative pl-4 py-2 font-bold text-[15px]
                        xl:pl-5 xl:text-[18px]
                        ${
                          isActive
                            ? `text-brand
                          before:absolute before:top-1/2 before:left-1 before:size-1 before:-translate-y-1/2 before:rounded-full before:bg-brand
                          xl:before:left-2 xl:before:size-1.5`
                            : 'text-tertiary'
                        }
                        `}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div
              className="px-5
              xl:px-0"
            >
              <div
                className="relative mt-3 flex justify-between gap-4 items-center rounded-full border border-default
                xl:m-0"
              >
                <input
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(6);
                  }}
                  className="pl-4 py-3.5 text-[13px] placeholder:text-tertiary
                  xl:pl-7 xl:py-4 xl:min-w-75 xl:text-[16px]"
                  placeholder="찾으시는 시설을 검색하세요."
                  aria-label="시설 검색"
                />

                <Search
                  className="mr-3.5 size-5 text-gray-800
                  xl:mr-5"
                />
              </div>
            </div>
          </div>

          <ul
            className="mt-5 px-5 grid grid-cols-2 gap-2
            xl:grid-cols-3 xl:gap-6"
          >
            {visibleFacilities.map((facility) => (
              <li
                key={facility.id}
                className="rounded-lg border border-default overflow-clip"
              >
                <button
                  type="button"
                  onClick={() => openModal(facility)}
                  data-selected={selectedFacility?.id === facility.id}
                  className="block w-full text-left"
                  aria-label={`${facility.name} 상세 보기`}
                >
                  <div className="relative w-full aspect-16/12">
                    <Image
                      src={facility.thumbnail}
                      alt={facility.name}
                      fill
                      sizes="(min-width: 1280px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  <div
                    className="px-3 py-2 flex items-center gap-1
                    xl:px-6 xl:py-5 xl:gap-4"
                  >
                    <span
                      className="shrink-0 px-2 py-[6.5px] rounded-full font-semibold bg-subtle text-brand text-[12px]
                      xl:px-3 xl:py-2 xl:font-bold xl:text-[18px]"
                    >
                      {facility.floor.label}
                    </span>
                    <h4
                      className="font-medium text-[14px]
                      xl:text-[20px]"
                    >
                      {facility.name}
                    </h4>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          {filteredFacilities.length === 0 && (
            <p
              role="status"
              className="mt-16 pb-5 text-center text-mo-body-2 text-tertiary"
            >
              검색 결과가 없습니다.
            </p>
          )}

          {visibleCount < filteredFacilities.length && (
            <div
              className="mt-8 mb-14 flex justify-center
              xl:mt-20"
            >
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-6 py-3 flex justify-center items-center gap-2 rounded-full bg-subtle
                xl:pl-7.5 xl:pr-5 xl:gap-5"
              >
                <span
                  className="text-mo-label
                  xl:font-bold xl:text-[16px]"
                >
                  더보기
                </span>
                <ChevronDown
                  className="size-4
                  xl:size-6"
                />
              </button>
            </div>
          )}
        </div>
      </Inner>

      {selectedFacility && (
        <FacilityModal facility={selectedFacility} onClose={closeModal} />
      )}
    </section>
  );
}
