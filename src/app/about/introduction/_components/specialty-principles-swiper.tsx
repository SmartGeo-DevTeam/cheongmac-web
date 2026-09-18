'use client';

import ManagedItemEditButton from '@/app/_components/inline-editor/managed-item-edit-button';
import {
  H3 as TypographyH3,
  P as TypographyP,
} from '@/app/_components/ui/typography';
import { useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type { AboutIntroductionSpecialtyCard } from '../_data';

export default function SpecialtyPrinciplesSwiper({
  items,
}: {
  items: AboutIntroductionSpecialtyCard[];
}) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= items.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, items.length]);

  if (items.length === 0) return null;

  const shouldLoop = items.length >= 5;

  const moveTo = (index: number) => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    if (shouldLoop) {
      swiper.slideToLoop(index);
      return;
    }

    swiper.slideTo(index);
  };

  return (
    <div
      data-specialty-principles-swiper
      className="mx-auto mt-10 w-full max-w-[300px] md:mt-12 md:max-w-[820px] xl:mt-14 xl:max-w-[1180px]"
    >
      <Swiper
        slidesPerView={1}
        centeredSlides
        loop={shouldLoop}
        spaceBetween={18}
        speed={620}
        grabCursor
        watchSlidesProgress
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setActiveIndex(swiper.realIndex);
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        breakpoints={{
          768: {
            slidesPerView: 2.2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.1,
            spaceBetween: 22,
          },
          1280: {
            slidesPerView: 3.6,
            spaceBetween: 26,
          },
        }}
        className="!overflow-visible"
      >
        {items.map((item, index) => {
          const active = index === activeIndex;
          const numberLabel = String(index + 1).padStart(2, '0');

          return (
            <SwiperSlide
              key={item.itemKey}
              className="!h-auto py-3"
            >
              <article
                data-specialty-card
                data-active={active ? 'true' : 'false'}
                onClick={() => moveTo(index)}
                className={`relative mx-auto h-[390px] w-full cursor-pointer overflow-hidden rounded-[24px] bg-white text-[#263039] transition-[transform,opacity,box-shadow] duration-500 ease-out sm:h-[405px] xl:h-[420px] ${
                  active
                    ? 'scale-100 opacity-100 shadow-[0_24px_54px_rgba(0,0,0,0.26)]'
                    : 'scale-[0.94] opacity-80 shadow-[0_14px_32px_rgba(0,0,0,0.14)]'
                }`}
              >
                <div className="relative z-10 px-6 pb-3 pt-7 xl:px-7 xl:pt-8">
                  <TypographyP
                    managed={false}
                    className="text-[13px] font-bold tracking-[0.02em] text-[#CCD1D5] xl:text-sm"
                  >
                    {numberLabel}
                  </TypographyP>

                  <TypographyH3
                    managed={false}
                    className="mt-1 break-keep text-[23px] font-bold leading-[1.2] tracking-[-0.045em] text-[#137D69] xl:text-[25px]"
                  >
                    {item.title}
                  </TypographyH3>

                  <TypographyP
                    managed={false}
                    className="mt-4 break-keep text-[13px] font-medium leading-[1.8] tracking-[-0.025em] text-[#4F565D] xl:text-[14px] xl:leading-[1.85]"
                  >
                    {item.description}
                  </TypographyP>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-[43%] overflow-hidden bg-[#F4F6F7]">
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-14 bg-gradient-to-b from-white to-transparent" />
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>

                <ManagedItemEditButton
                  pageKey="about-introduction"
                  itemKey={item.itemKey}
                  label={item.title}
                />
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div
        data-specialty-pagination
        className="mt-3 flex items-center justify-center gap-2 xl:mt-4"
        aria-label="청맥 진료 원칙 슬라이드 선택"
      >
        {items.map((item, index) => {
          const active = index === activeIndex;

          return (
            <button
              key={item.itemKey}
              type="button"
              aria-label={`${index + 1}번 ${item.title}`}
              aria-current={active ? 'true' : undefined}
              onClick={() => moveTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                active
                  ? 'w-8 bg-[#26A98F]'
                  : 'w-2 bg-white/55 hover:bg-white/80'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
