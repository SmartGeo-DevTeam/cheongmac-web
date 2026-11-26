'use client';

import type { PulmonaryEmbolismSymptom } from '@/app/_types/vascular/venous/thrombosis/pulmonary-embolism';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import PulmonaryEmbolismCard from './card';

type PulmonaryEmbolismCarouselProps = {
  id: string;
  items: readonly PulmonaryEmbolismSymptom[];
};

export default function PulmonaryEmbolismCarousel({
  id,
  items,
}: PulmonaryEmbolismCarouselProps) {
  return (
    <div
      id={id}
      className={`hidden
        xl:mt-25 xl:w-full xl:pl-[max(1.25rem,calc((100%-var(--container-7xl))/2+1.25rem))] xl:block`}
    >
      <Swiper
        className={`w-full`}
        slidesPerView={4.5}
        spaceBetween={40}
        slidesOffsetAfter={160}
        grabCursor
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={item.id}
            id={`${id}-${item.id}`}
            className={`h-auto!`}
          >
            <PulmonaryEmbolismCard item={item} number={index + 1} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
