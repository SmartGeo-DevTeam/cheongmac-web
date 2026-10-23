'use client';

import Inner from '@/app/_components/common/inner';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import DoctorItem from './_components/doctor-item';
import type { FieldId } from './data';
import { doctors, fields } from './data';

type FilterId = FieldId | 'all';

const fieldFilters: {
  id: FilterId;
  name: string;
}[] = [
  { id: 'all', name: '전체' },
  ...fields.map(({ id, name }) => ({ id, name })),
];

export default function Doctors() {
  const [selectedFieldId, setSelectedFieldId] = useState<FilterId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesField =
      selectedFieldId === 'all' || doctor.fieldIds.includes(selectedFieldId);

    if (!matchesField) return false;
    if (!normalizedQuery) return true;

    const searchableText = [doctor.name, ...doctor.expertise]
      .join(' ')
      .toLocaleLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  return (
    <>
      <section id="about-doctors-doctors">
        <div className="xl:mt-15">
          <Inner usePaddingHorizontalInMobile={false}>
            <div
              className="px-3.5 pt-5 pb-7 space-y-3 text-center bg-[#FBFBFB]
              xl:px-45 xl:py-14 xl:flex xl:justify-center xl:gap-5 xl:items-center xl:space-y-0 xl:rounded-xl xl:border xl:border-default"
            >
              <h3
                className="text-mo-title-2 text-[#767C88]
                xl:text-[28px]"
              >
                의료진 검색
              </h3>
              <div
                className="pr-4 flex justify-between items-center gap-2 rounded-full border border-default bg-base
                xl:flex-1 xl:border-0 xl:bg-transparent"
              >
                <input
                  type="search"
                  name="doctor-search"
                  aria-label="의료진 검색"
                  autoComplete="off"
                  placeholder="의료진 성명 및 전문분야로 검색해보세요."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="min-w-0 flex-1 pl-5 py-3.5 font-medium placeholder-disabled
                  xl:h-15 xl:rounded-lg xl:border xl:border-[#CCCCCC] xl:bg-base xl:text-[18px]"
                />
                <div className="xl:w-15 xl:h-15 xl:flex xl:justify-center xl:items-center xl:rounded-lg xl:bg-accent">
                  <SearchIcon
                    aria-hidden="true"
                    className="size-6 text-gray-800
                    xl:size-9 xl:text-white"
                  />
                </div>
              </div>
            </div>
          </Inner>
        </div>

        <Inner usePaddingHorizontalInMobile={false}>
          <div
            className="mt-5 px-6.5 flex items-center gap-2 overflow-x-scroll 
            xl:mt-10 xl:px-0 xl:justify-center xl:gap-3"
          >
            {fieldFilters.map((field) => {
              const isActive = selectedFieldId === field.id;

              return (
                <button
                  key={field.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedFieldId(field.id)}
                  className={`shrink-0 px-4 py-2 rounded-full border font-medium text-[14px]
                    xl:px-8 xl:py-3 xl:text-[18px]
                    ${
                      isActive
                        ? 'border-brand bg-brand font-bold text-white'
                        : 'border-[#EBEBEB] text-[#555555]'
                    }`}
                >
                  {field.name}
                </button>
              );
            })}
          </div>
        </Inner>

        <Inner>
          {filteredDoctors.length > 0 ? (
            <ul
              className="mt-5 space-y-10
              xl:mt-10 xl:grid xl:grid-cols-2 xl:gap-x-6 xl:gap-y-10"
            >
              {filteredDoctors.map((doctor) => (
                <DoctorItem key={doctor.id} doctor={doctor} />
              ))}
            </ul>
          ) : (
            <p
              role="status"
              className="mt-10 px-5 py-10 text-center text-[#777777]"
            >
              {normalizedQuery
                ? '검색 결과가 없습니다. 검색어나 진료 분야를 변경해 주세요.'
                : '해당 진료분야의 의료진이 없습니다.'}
            </p>
          )}
        </Inner>
      </section>
    </>
  );
}
