'use client';

import type { VaricoceleInformationItem } from '@/app/_types/vascular/venous/varicocele/information-item';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import VaricoceleTreatmentCandidateCard from './card';

type VaricoceleTreatmentCandidatesCarouselProps = {
  id: string;
  items: readonly VaricoceleInformationItem[];
};

export default function VaricoceleTreatmentCandidatesCarousel({
  id,
  items,
}: VaricoceleTreatmentCandidatesCarouselProps) {
  return (
    <div
      id={id}
      className={`mt-5 w-full
        xl:mt-15 xl:pl-[max(1.25rem,calc((100%-var(--container-7xl))/2+1.25rem))]`}
    >
      <Swiper
        className={`w-full`}
        slidesPerView={1.2}
        spaceBetween={40}
        grabCursor
        slidesOffsetBefore={20}
        slidesOffsetAfter={20}
        breakpoints={{
          1280: {
            slidesPerView: 3.2,
            spaceBetween: 80,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 160,
          },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={item.id}
            id={`${id}-${item.id}`}
            className={`h-auto!`}
          >
            <VaricoceleTreatmentCandidateCard item={item} number={index + 1} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
