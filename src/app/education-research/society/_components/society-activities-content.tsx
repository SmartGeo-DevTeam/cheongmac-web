'use client';

import FilterTabs from '@/app/_components/ui/filter-tabs';

import {
  type SocietyActivity,
  type SocietyFeatured,
  type SocietyYear,
} from '../_data';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

function SocietyIntro() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-12 xl:px-0 xl:pb-20">
      <p className="text-sm font-semibold tracking-[-0.015em] text-[#279A82] xl:text-base">
        SOCIETY ACTIVITIES
      </p>

      <h2 className="mt-4 max-w-[1050px] break-keep text-[24px] font-bold leading-[1.48] tracking-[-0.045em] text-[#262C35] xl:mt-5 xl:text-[34px] xl:leading-[1.5]">
        청맥병원 의료진은 대한혈관외과학회, 대한정맥학회, UIP 세계정맥학회
        등을 비롯한
        <br className="hidden xl:block" />
        국내외 주요 학회의 중심에서 활발히 활동하고 있습니다.
      </h2>

      <p className="mt-7 max-w-[950px] break-keep text-base leading-[1.8] text-[#5B6269] xl:mt-9 xl:text-xl xl:leading-[1.8]">
        정기 학술대회 참여와 치료 지침서 집필, 학술상 수상을 통해 혈관의학
        발전에 기여하고,
        <br className="hidden xl:block" />
        세계 혈관의학의 최신 흐름을 진료에 반영하기 위해 노력합니다.
      </p>
    </section>
  );
}

function FeaturedActivities({
  featured,
}: {
  featured: SocietyFeatured[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#006656]">
      <div className="absolute inset-0">
        <Image
          src="/assets/images/society-activities/spring-conference-2026.png"
          alt=""
          fill
          className="object-cover opacity-15"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,102,86,0.96)_0%,rgba(0,102,86,0.88)_62%,rgba(0,102,86,0.78)_100%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 py-10 xl:px-0 xl:py-14">
        <div className="relative">
          <p className="relative z-10 text-base font-semibold text-white xl:text-xl">
            · 주요 발표 ·
          </p>
          <span
            aria-hidden="true"
            className="absolute left-0 top-7 text-[54px] font-black leading-none tracking-[-0.05em] text-white/5 xl:top-8 xl:text-[82px]"
          >
            FEATURED
          </span>
        </div>

        <div className="mt-10 -mr-5 xl:mt-12 xl:-mr-[10vw]">
          <Swiper
            slidesPerView={1.18}
            spaceBetween={18}
            grabCursor
            breakpoints={{
              1280: {
                slidesPerView: 1.06,
                spaceBetween: 42,
              },
            }}
            className="!overflow-visible pr-5 xl:pr-[10vw]"
          >
            {featured.map((item) => (
              <SwiperSlide key={item.id}>
                <article className="overflow-hidden rounded-[18px] bg-white/0 xl:grid xl:grid-cols-[430px_minmax(0,1fr)] xl:items-center xl:gap-16">
                  <div className="relative aspect-[1.45/1] overflow-hidden rounded-[16px] bg-black/10 xl:aspect-[1.56/1]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 430px, 82vw"
                    />
                  </div>

                  <div className="pt-5 xl:pt-0">
                    <h3 className="break-keep text-[20px] font-bold leading-[1.4] tracking-[-0.035em] text-white xl:text-[28px]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#A9D5CD] xl:text-base">
                      {item.date}
                    </p>

                    <p className="mt-5 break-keep text-base leading-[1.7] text-white/75 xl:mt-7 xl:max-w-[620px] xl:text-lg">
                      {item.description}
                    </p>

                    <p className="mt-2 break-words text-sm leading-[1.65] text-white/55 xl:text-base">
                      {item.english}
                    </p>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

function YearTabs({
  activeYear,
  years,
  onChange,
}: {
  activeYear: SocietyYear;
  years: SocietyYear[];
  onChange: (year: SocietyYear) => void;
}) {
  return (
    <FilterTabs
      id="society-year-tabs"
      items={years.map((year) => ({
        value: year,
        label: year,
      }))}
      value={activeYear}
      onValueChange={onChange}
      ariaLabel="학회활동 연도"
      variant="year"
    />
  );
}

function TimelineItem({
  activity,
}: {
  activity: SocietyActivity;
}) {
  return (
    <article className="relative pl-7 xl:grid xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-14 xl:pl-12">
      <span className="absolute left-[-4px] top-[7px] size-[9px] rounded-full border-2 border-[#188B78] bg-white xl:left-[-5px] xl:top-2 xl:size-[11px]" />

      <div>
        <h3 className="break-keep text-xl font-bold tracking-[-0.035em] text-[#272D35] xl:text-[24px]">
          {activity.society}
        </h3>

        <p className="mt-3 text-base font-semibold text-[#596067] xl:text-lg">
          {activity.title}
        </p>

        <p className="mt-2 max-w-[720px] break-keep text-base leading-[1.7] text-[#92989E] xl:text-lg">
          {activity.description}
        </p>

        {activity.english ? (
          <p className="mt-1 max-w-[720px] break-words text-sm leading-[1.65] text-[#B1B6BA] xl:text-base">
            {activity.english}
          </p>
        ) : null}
      </div>

      <div className="relative mt-5 aspect-[1.62/1] overflow-hidden rounded-xl bg-[#F0F2F2] xl:mt-0">
        <Image
          src={activity.image}
          alt={`${activity.society} ${activity.title}`}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 340px, 100vw"
        />
      </div>
    </article>
  );
}

function SocietyTimeline({
  activities: allActivities,
  years,
}: {
  activities: SocietyActivity[];
  years: SocietyYear[];
}) {
  const [activeYear, setActiveYear] = useState<SocietyYear>(
    years[0] ?? new Date().getFullYear(),
  );

  const activities = useMemo(
    () =>
      allActivities.filter(
        (activity) => activity.year === activeYear,
      ),
    [activeYear, allActivities],
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-20 pt-10 xl:px-0 xl:pb-28 xl:pt-14">
      <YearTabs
        activeYear={activeYear}
        years={years}
        onChange={setActiveYear}
      />

      <div className="mt-10 xl:mt-12">
        <div className="relative ml-2 border-l border-[#D9DEDF] xl:ml-8">
          <div className="relative pl-7 xl:pl-12">
            <span className="absolute left-[-5px] top-[8px] size-[11px] rounded-full bg-[#FF6B3D] xl:left-[-6px] xl:size-[13px]" />
            <h2 className="text-[26px] font-bold tracking-[-0.04em] text-[#FF6B3D] xl:text-[38px]">
              {activeYear}년
            </h2>
          </div>

          {activities.length > 0 ? (
            <div className="mt-9 space-y-12 pb-2 xl:mt-12 xl:space-y-20">
              {activities.map((activity) => (
                <TimelineItem
                  key={activity.id}
                  activity={activity}
                />
              ))}
            </div>
          ) : (
            <div className="ml-7 mt-8 rounded-2xl bg-[#F6F7F7] px-5 py-12 text-center text-base text-[#8D9399] xl:ml-12 xl:text-xl">
              해당 연도의 학회활동 자료를 준비 중입니다.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function SocietyActivitiesContent({
  featured,
  activities,
}: {
  featured: SocietyFeatured[];
  activities: SocietyActivity[];
}) {
  const years = Array.from(
    new Set(activities.map((activity) => activity.year)),
  ).sort((a, b) => b - a);

  return (
    <>
      <SocietyIntro />
      <FeaturedActivities featured={featured} />
      <SocietyTimeline activities={activities} years={years} />
    </>
  );
}
