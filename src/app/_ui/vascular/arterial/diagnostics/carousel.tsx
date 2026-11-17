'use client';

import { arterialDiagnosticMethods } from '@/app/_data/vascular/arterial/diagnostics/methods';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ArterialDiagnosticItem from './item';

export default function ArterialDiagnosticCarousel() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className="mt-10
      xl:mt-25"
    >
      <Swiper
        className="w-full [&_.swiper-wrapper]:items-stretch"
        slidesPerView={1.1}
        spaceBetween={20}
        slidesOffsetBefore={20}
        slidesOffsetAfter={20}
        grabCursor
        breakpoints={{
          1280: {
            slidesPerView: 4,
            spaceBetween: 80,
            centeredSlides: true,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
          },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setActiveIndex(swiper.realIndex);
        }}
        onRealIndexChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
      >
        {arterialDiagnosticMethods.map((item) => (
          <SwiperSlide key={item.id} className="h-auto! flex!">
            <ArterialDiagnosticItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="mt-10 flex items-center justify-center gap-5
        xl:mt-15 xl:gap-15"
      >
        <button
          type="button"
          aria-label="이전 진단방법 보기"
          onClick={() => swiperRef.current?.slidePrev()}
          className="size-9 flex justify-center items-center rounded-full shadow-[0_0_10px_0_rgba(0,0,0,0.06)]
          xl:size-15"
        >
          <ChevronLeft
            className="size-5
            xl:size-8"
          />
        </button>

        <div
          role="group"
          aria-label="진단방법 슬라이드 선택"
          className="flex items-center gap-2"
        >
          {arterialDiagnosticMethods.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`${index + 1}번째 진단방법 ${item.title} 보기`}
              aria-current={activeIndex === index ? 'true' : undefined}
              onClick={() => swiperRef.current?.slideToLoop(index)}
              className={`h-2 rounded-full
                xl:h-2.5
                ${
                  activeIndex === index
                    ? `w-6 bg-accent-ai
                    xl:w-8`
                    : `w-2 bg-gray-150
                    xl:w-2.5`
                }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="다음 진단방법 보기"
          onClick={() => swiperRef.current?.slideNext()}
          className="size-9 flex justify-center items-center rounded-full shadow-[0_0_10px_0_rgba(0,0,0,0.06)]
          xl:size-15"
        >
          <ChevronRight
            className="size-5
            xl:size-8"
          />
        </button>
      </div>
    </div>
  );
}
