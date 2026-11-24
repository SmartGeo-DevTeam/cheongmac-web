'use client';

import type { SymptomCarouselItem } from '@/app/_types/vascular/symptom-carousel';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SymptomCarouselItemView from './item';
import SymptomCarouselTabs from './tabs';

type ClinicSymptomCarouselProps = {
  id: string;
  items: readonly SymptomCarouselItem[];
  tabsAriaLabel: string;
};

/** 여러 진료 상세 페이지의 증상 탭·이미지·주의 문구를 동일한 UI로 표시합니다. */
export default function ClinicSymptomCarousel({
  id,
  items,
  tabsAriaLabel,
}: ClinicSymptomCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [desktopTabHeight, setDesktopTabHeight] = useState(0);

  const goToSlide = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  if (items.length === 0) return null;

  return (
    <div
      id={id}
      className="relative xl:mt-20"
    >
      {/* 탭은 Swiper 바깥에 하나만 렌더링합니다. PC에서는 오른쪽 상단에 고정합니다. */}
      <div className="xl:pointer-events-none xl:absolute xl:inset-x-0 xl:top-0 xl:z-10">
        <div
          className="xl:mx-auto xl:grid xl:max-w-7xl
          xl:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] xl:gap-x-20"
        >
          <SymptomCarouselTabs
            items={items}
            ariaLabel={tabsAriaLabel}
            activeIndex={activeIndex}
            onTabChange={goToSlide}
            onHeightChange={setDesktopTabHeight}
          />
        </div>
      </div>

      {/* 이미지·증상·주의사항만 슬라이드됩니다. */}
      <Swiper
        className="[&_.swiper-wrapper]:items-stretch"
        modules={[EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={450}
        slidesPerView={1}
        spaceBetween={0}
        grabCursor={items.length > 1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setActiveIndex(swiper.activeIndex);
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="h-auto! flex!">
            <SymptomCarouselItemView
              id={`${id}-${item.id}`}
              item={item}
              items={items}
              activeIndex={activeIndex}
              desktopTabHeight={desktopTabHeight}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
