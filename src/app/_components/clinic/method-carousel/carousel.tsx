'use client';

import CarouselControls from '@/app/_components/common/carousel-controls';
import type { ClinicMethodSlide } from '@/app/_types/clinic/method-carousel';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

type ClinicMethodCarouselProps = {
  id: string;
  slides: readonly ClinicMethodSlide[];
  itemLabel: string;
};

/** 동맥 진단·정맥 치료가 공유하는 캐러셀 UI/슬라이드 동작. */
export default function ClinicMethodCarousel({
  id,
  slides,
  itemLabel,
}: ClinicMethodCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (slides.length === 0) return null;

  return (
    <div
      id={id}
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
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="h-auto! flex!">
            {slide.content}
          </SwiperSlide>
        ))}
      </Swiper>

      <CarouselControls
        id={`${id}-controls`}
        items={slides.map((slide, index) => ({
          id: slide.id,
          ariaLabel: `${index + 1}번째 ${itemLabel} ${slide.title} 보기`,
        }))}
        activeIndex={activeIndex}
        previousAriaLabel={`이전 ${itemLabel} 보기`}
        nextAriaLabel={`다음 ${itemLabel} 보기`}
        paginationAriaLabel={`${itemLabel} 슬라이드 선택`}
        onPrevious={() => swiperRef.current?.slidePrev()}
        onNext={() => swiperRef.current?.slideNext()}
        onSelect={(index) => swiperRef.current?.slideTo(index)}
      />
    </div>
  );
}
