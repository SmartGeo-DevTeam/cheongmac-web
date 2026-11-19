'use client';

import type { ClinicBestCase } from '@/app/_types/clinic/best-cases';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ClinicBestCaseItem from './item';


export default function ClinicBestCasesCarousel({ items }: { items: readonly ClinicBestCase[] }) {
  const carouselCases = Array.from({ length: 3 }, (_, repeat) =>
    items.map((item) => ({ ...item, slideKey: `${item.id}-${repeat}` })),
  ).flat();
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
            <ClinicBestCaseItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
