'use client';

import CarouselControls from '@/app/_components/common/carousel-controls';
import type { PelvicRelatedDisease } from '@/app/_types/vascular/venous/pelvic/related';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import PelvicRelatedSlideContent from './slide-content';

type PelvicRelatedCarouselProps = {
  id: string;
  cardIdPrefix: string;
  items: readonly PelvicRelatedDisease[];
};

export default function PelvicRelatedCarousel({
  id,
  cardIdPrefix,
  items,
}: PelvicRelatedCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // PC에서 4개 이상의 슬라이드가 보이므로 loop에 필요한 수만큼 반복합니다.
  const slides = Array.from({ length: 3 }, (_, repetition) =>
    items.map((disease) => ({ disease, key: `${disease.id}-${repetition}` })),
  ).flat();

  const handleSelect = (index: number) => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const count = items.length;
    const current = swiper.realIndex;
    const forward = (index - (current % count) + count) % count;
    const offset = forward > count / 2 ? forward - count : forward;
    const target = (current + offset + slides.length) % slides.length;
    swiper.slideToLoop(target);
  };

  if (items.length === 0) return null;

  return (
    <div
      id={id}
      role="region"
      aria-label="골반정맥류 연관 질환"
      className={`mt-10
        xl:mt-20`}
    >
      <Swiper
        className={`w-full [&_.swiper-wrapper]:items-stretch`}
        slidesPerView={1.3}
        spaceBetween={8}
        centeredSlides
        loop
        initialSlide={items.length}
        grabCursor
        speed={450}
        breakpoints={{
          1280: {
            slidesPerView: 4.5,
            spaceBetween: 8,
          },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setActiveIndex(swiper.realIndex % items.length);
        }}
        onRealIndexChange={(swiper) => {
          setActiveIndex(swiper.realIndex % items.length);
        }}
      >
        {slides.map(({ disease, key }, index) => (
          <SwiperSlide
            key={key}
            className={`h-auto! flex! flex-col transition-opacity duration-300
              [&:not(.swiper-slide-active)]:opacity-30`}
          >
            {({ isActive }) => (
              <PelvicRelatedSlideContent
                cardId={`${cardIdPrefix}-${key}`}
                disease={disease}
                isActive={isActive}
                onSelect={() => swiperRef.current?.slideToLoop(index)}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <CarouselControls
        id={`${id}-controls`}
        variant="compact"
        items={items.map((item) => ({
          id: item.id,
          ariaLabel: `${item.title} 보기`,
        }))}
        activeIndex={activeIndex}
        previousAriaLabel="이전 연관 질환"
        nextAriaLabel="다음 연관 질환"
        paginationAriaLabel="연관 질환 선택"
        onPrevious={() => swiperRef.current?.slidePrev()}
        onNext={() => swiperRef.current?.slideNext()}
        onSelect={handleSelect}
      />
    </div>
  );
}
