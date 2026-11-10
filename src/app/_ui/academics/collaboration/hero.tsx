'use client';

import AcademicsMessage, {
  AcademicsHighlight,
} from '@/app/_components/academics/message';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { collaborations } from '@/app/_data/academics/collaboration/collaborations';

const heroCollaborations = collaborations.filter((item) => item.isHero);

const handleAutoplay = (swiper: SwiperType) => {
  const isDesktop = window.matchMedia('(min-width: 1280px)').matches;

  if (isDesktop) {
    if (!swiper.autoplay.running) {
      swiper.autoplay.start();
    }
  } else {
    if (swiper.autoplay.running) {
      swiper.autoplay.stop();
    }
  }
};

export default function CollaborationHero() {
  return (
    <section id="academics-collaboration-hero">
      <div className="bg-subtle">
        <div
          className="grid min-w-0 grid-cols-1
          xl:mx-auto xl:max-w-7xl xl:w-full xl:px-5 xl:py-20 xl:grid-cols-2 xl:items-center xl:gap-6"
        >
          <AcademicsMessage
            label="ACADEMIC EXCHANGE"
            className="px-5 pt-10 xl:p-0"
            title={
              <>
                혈관 치료의 <AcademicsHighlight>올바른 기준</AcademicsHighlight>
                을 세우기 위해, <br />
                청맥병원은 끊임없이 연구하고 소통합니다.
              </>
            }
            description={
              <>
                국내외 의료진과 임상 경험과 치료 노하우를 공유하고,{' '}
                <br className="hidden xl:block" />
                술기 연수와 교육 프로그램을 지속적으로 운영하며{' '}
                <br className="hidden xl:block" />
                혈관의학의 저변을 함께 넓혀가고 있습니다.
              </>
            }
          />

          <div
            className="mt-10 mb-25
            xl:m-0"
          >
            <Swiper
              modules={[Pagination, Autoplay]}
              className="w-full
              [--swiper-pagination-color:#8BC9B8]
              [--swiper-pagination-bullet-inactive-color:#CDD1D6]
              [--swiper-pagination-bullet-inactive-opacity:1]
              [--swiper-pagination-bullet-size:8px]
              [--swiper-pagination-bullet-horizontal-gap:3px]
              [&_.swiper-pagination]:static!
              [&_.swiper-pagination]:mt-2
              xl:[&_.swiper-pagination]:mt-5
              xl:[--swiper-pagination-bullet-size:10px]
              xl:[--swiper-pagination-bullet-horizontal-gap:4px]
              "
              slidesPerView={1.2}
              centeredSlides={true}
              spaceBetween={10}
              grabCursor
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              onSwiper={handleAutoplay}
              onResize={handleAutoplay}
              breakpoints={{
                1280: {
                  slidesPerView: 1,
                  centeredSlides: false,
                  spaceBetween: 0,
                },
              }}
            >
              {heroCollaborations.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="relative w-full aspect-410/260 overflow-hidden rounded-xl">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
