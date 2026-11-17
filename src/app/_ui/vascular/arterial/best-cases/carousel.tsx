'use client';

import { arterialBestCases } from '@/app/_data/vascular/arterial/best-cases/cases';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ArterialBestCaseItem from './item';

const carouselCases = Array.from({ length: 3 }, (_, repeat) =>
  arterialBestCases.map((item) => ({
    ...item,
    slideKey: `${item.id}-${repeat}`,
  })),
).flat();

export default function ArterialBestCasesCarousel() {
  return (
    <div
      className="mt-10
      xl:mt-20"
    >
      <Swiper
        slidesPerView={1.2}
        spaceBetween={20}
        grabCursor
        slidesOffsetBefore={20}
        slidesOffsetAfter={40}
        breakpoints={{
          1280: {
            slidesPerView: 6,
            spaceBetween: 24,
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24,
          },
        }}
      >
        {carouselCases.map((item) => (
          <SwiperSlide key={item.slideKey}>
            <ArterialBestCaseItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
