'use client';

import type { BestCase } from '@/app/_types/vascular/best-case';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import BestCaseItem from './item';

type BestCasesCarouselProps = {
  id: string;
  cases: readonly BestCase[];
};

export default function BestCasesCarousel({ id, cases }: BestCasesCarouselProps) {
  if (cases.length === 0) return null;

  // 반복된 고유 key를 사용해 양 끝에서도 앞뒤 사례가 보이도록 배치합니다.
  // 가운데 복제본에서 시작하므로 모바일에서는 한 사례, PC에서는 양옆 카드가 보입니다.
  const slides = Array.from({ length: 3 }, (_, repeat) =>
    cases.map((item) => ({ item, slideKey: `${item.id}-${repeat}` })),
  ).flat();

  return (
    <div
      id={`${id}-carousel`}
      className={`mt-10
        xl:mt-20`}
      role="region"
      aria-label="BEST 치료사례 이미지 슬라이드"
    >
      <Swiper
        className="[&_.swiper-wrapper]:items-stretch"
        slidesPerView="auto"
        centeredSlides
        initialSlide={cases.length + Math.floor(cases.length / 2)}
        spaceBetween={20}
        grabCursor={cases.length > 1}
        breakpoints={{
          1280: {
            spaceBetween: 48,
          },
        }}
      >
        {slides.map(({ item, slideKey }) => (
          <SwiperSlide
            key={slideKey}
            className={`relative h-auto! w-[calc(100vw-40px)]!
              md:w-[420px]!
              xl:w-[396px]! xl:transition-transform xl:duration-300 xl:[&.swiper-slide-active]:z-10 xl:[&.swiper-slide-active]:scale-[1.1]`}
          >
            <BestCaseItem id={`${id}-card-${slideKey}`} item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
