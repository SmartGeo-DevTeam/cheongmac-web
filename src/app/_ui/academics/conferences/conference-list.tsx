'use client';

import Inner from '@/app/_components/common/inner';
import { useState } from 'react';
import ConferencesYear from './conference-year';
import { conferenceYears } from '@/app/_data/academics/conferences/conference-years';

export default function ConferencesList() {
  const [selectedYear, setSelectedYear] = useState(conferenceYears[0].year);

  return (
    <section id="academics-conferences-list">
      <ul
        className="mt-5 pl-5 pr-12 flex items-center overflow-x-scroll
        xl:mt-20 xl:mx-auto xl:px-5 xl:max-w-7xl xl:gap-2 xl:w-full"
      >
        {conferenceYears.map(({ year }) => {
          const isSelected = year === selectedYear;

          return (
            <li key={year}>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedYear(year)}
                className={`px-5 py-2 rounded-full text-[18px]
                  xl:px-7 xl:text-[18px]
                  ${
                    isSelected
                      ? 'font-bold bg-brand text-base'
                      : 'text-[#555555]'
                  }`}
              >
                {year}
              </button>
            </li>
          );
        })}
      </ul>

      <Inner>
        <ul className="mt-5">
          {conferenceYears
            .filter(({ year }) => year === selectedYear)
            .map((group) => (
              <ConferencesYear key={group.year} group={group} />
            ))}
        </ul>
      </Inner>
    </section>
  );
}
