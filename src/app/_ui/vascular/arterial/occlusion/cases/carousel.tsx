'use client';

import type { CasePost } from '@/app/_data/community/cases/cases';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
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
  const slides =
    items.length >= 3
      ? Array.from({ length: 3 }, (_, repetition) =>
          items.map((post) => ({ post, key: `${post.id}-${repetition}` })),
        ).flat()
      : items.map((post) => ({ post, key: post.id }));

  if (items.length === 0) return null;

  return (
    <div
      className="relative mt-10
      xl:mt-30"
      aria-label="하지동맥폐색증 치료 사례 미리보기"
      role="region"
    >
      <Swiper
        className="[&_.swiper-wrapper]:items-stretch"
        slidesPerView={1}
        centeredSlides
        loop={slides.length >= 6}
        spaceBetween={28}
        grabCursor={items.length > 1}
        slidesOffsetBefore={28}
        slidesOffsetAfter={28}
        breakpoints={{
          1280: {
            slidesPerView: 3.7,
            spaceBetween: 60,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
          },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {slides.map(({ post, key }) => (
          <SwiperSlide
            key={key}
            className="relative h-auto! transition-opacity duration-300 [&:not(.swiper-slide-active)]:opacity-30"
          >
            {({ isActive }) => (
              <>
                <OcclusionCaseItem
                  post={post}
                  categoryLabel={categoryLabel}
                  sampleImage={sampleImage}
                />
                {/* PC: 활성 슬라이드의 실제 너비·높이를 기준으로 화살표 배치 */}
                {items.length > 1 && isActive && (
                  <div className="pointer-events-none absolute inset-0 z-2 hidden xl:block">
                    <button
                      type="button"
                      aria-label="이전 치료 사례"
                      onClick={() => swiperRef.current?.slidePrev()}
                      className="pointer-events-auto absolute left-0 top-1/2 z-1 flex size-15 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-base shadow-[0_0_10px_0_#0000001a]"
                    >
                      <ChevronLeft className="size-8" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label="다음 치료 사례"
                      onClick={() => swiperRef.current?.slideNext()}
                      className="pointer-events-auto absolute right-0 top-1/2 z-1 flex size-15 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-base shadow-[0_0_10px_0_#0000001a]"
                    >
                      <ChevronRight className="size-8" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 모바일: 기존 화살표 위치와 크기 유지 */}
      {items.length > 1 && (
        <div className="pointer-events-none absolute left-0 top-0 z-2 h-full w-full xl:hidden">
          <button
            type="button"
            aria-label="이전 치료 사례"
            onClick={() => swiperRef.current?.slidePrev()}
            className="pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 size-9 flex justify-center items-center rounded-full bg-base shadow-[0_0_10px_0_#0000001a] z-1"
          >
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="다음 치료 사례"
            onClick={() => swiperRef.current?.slideNext()}
            className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 size-9 flex justify-center items-center rounded-full bg-base shadow-[0_0_10px_0_#0000001a] z-1"
          >
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
