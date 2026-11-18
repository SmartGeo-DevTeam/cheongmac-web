'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { CasePost } from '@/app/_data/community/cases/cases';
import OcclusionCaseItem from './item';

type OcclusionCasesCarouselProps = {
  items: readonly CasePost[];
  categoryLabel: string;
  sampleImage: string;
};

/** 시안: 모바일 1개, PC 중앙 카드 + 흐리게 보이는 양옆 카드. */
export default function OcclusionCasesCarousel({
  items,
  categoryLabel,
  sampleImage,
}: OcclusionCasesCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  // 3개의 고유 사례를 유지하면서 양쪽 미리보기와 무한 순환을 안정적으로 표현합니다.
  const slides = items.length >= 3
    ? Array.from({ length: 3 }, (_, repetition) =>
        items.map((post) => ({ post, key: `${post.id}-${repetition}` })),
      ).flat()
    : items.map((post) => ({ post, key: post.id }));

  if (items.length === 0) return null;

  return (
    <div
      className="relative mt-10 overflow-hidden xl:mt-24"
      aria-label="하지동맥폐색증 치료 사례 미리보기"
      role="region"
    >
      <Swiper
        className="!overflow-visible [&_.swiper-wrapper]:items-stretch"
        slidesPerView="auto"
        centeredSlides
        loop={slides.length >= 6}
        spaceBetween={24}
        grabCursor={items.length > 1}
        breakpoints={{ 1280: { spaceBetween: 44 } }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {slides.map(({ post, key }) => (
          <SwiperSlide
            key={key}
            className="!h-auto !w-[calc(100vw-56px)] transition-opacity duration-300 xl:!w-[625px] xl:[&:not(.swiper-slide-active)]:opacity-30"
          >
            <OcclusionCaseItem
              post={post}
              categoryLabel={categoryLabel}
              sampleImage={sampleImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {items.length > 1 && (
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-10 w-[calc(100vw-56px)] -translate-x-1/2 xl:w-[625px]"
        >
          <div className="relative aspect-319/196 xl:aspect-846/420">
            <button
              type="button"
              aria-label="이전 치료 사례"
              onClick={() => swiperRef.current?.slidePrev()}
              className="pointer-events-auto absolute -bottom-5 -left-4 flex size-10 items-center justify-center rounded-full bg-base text-[#394559] shadow-md hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand xl:-left-6 xl:size-12"
            >
              <ChevronLeft className="size-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="다음 치료 사례"
              onClick={() => swiperRef.current?.slideNext()}
              className="pointer-events-auto absolute -right-4 -bottom-5 flex size-10 items-center justify-center rounded-full bg-base text-[#394559] shadow-md hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand xl:-right-6 xl:size-12"
            >
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
