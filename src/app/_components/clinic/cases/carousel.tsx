'use client';

import type { ClinicCasePreview } from '@/app/_types/vascular/clinic-case';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ClinicCaseItem from './item';

type ClinicCasesCarouselProps = {
  id: string;
  items: readonly ClinicCasePreview[];
  categoryLabel: string;
};

/** 모바일 1개, PC 중앙 카드와 양옆 미리보기로 표시합니다. */
export default function ClinicCasesCarousel({
  id,
  items,
  categoryLabel,
}: ClinicCasesCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  // 두 사례만 있는 질환도 중앙 카드의 양옆에 미리보기가 보이도록 반복합니다.
  // 세 사례 이상일 때는 기존 동맥 캐러셀의 3회 반복 및 PC 3.7장 설정을 유지합니다.
  const slides =
    items.length > 1
      ? Array.from({ length: items.length === 2 ? 5 : 3 }, (_, repetition) =>
          items.map((post) => ({ post, key: `${post.id}-${repetition}` })),
        ).flat()
      : items.map((post) => ({ post, key: post.id }));

  if (items.length === 0) return null;

  return (
    <div
      id={`${id}-carousel`}
      className={`relative mt-10
        xl:mt-30`}
      aria-label={`${categoryLabel} 치료 사례 미리보기`}
      role="region"
    >
      <Swiper
        className="[&_.swiper-wrapper]:items-stretch"
        slidesPerView={1}
        centeredSlides
        loop={items.length > 1}
        spaceBetween={28}
        grabCursor={items.length > 1}
        slidesOffsetBefore={28}
        slidesOffsetAfter={28}
        breakpoints={{
          1280: {
            slidesPerView: items.length === 1 ? 1 : items.length === 2 ? 2.3 : 3.7,
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
                <ClinicCaseItem
                  id={`${id}-card-${key}`}
                  post={post}
                  categoryLabel={categoryLabel}
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
