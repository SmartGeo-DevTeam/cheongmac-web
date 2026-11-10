'use client';

import Inner from '@/app/_components/common/inner';
import IntroductionIntroSectionHeading from '@/app/_ui/about/introduction/intro/section-heading';
import Image from 'next/image';
import { useRef, useState } from 'react';

import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { principleItems } from '@/app/_data/about/introduction/intro/principles';

export default function IntroductionIntroPrinciples() {
  const [activePrinciple, setActivePrinciple] = useState(0);
  const principleSwiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="about-introduction-principle">
      <div
        className="mt-20 pt-30 pb-20 bg-[url('/introduction/intro/principle-m.png')] bg-cover bg-center bg-no-repeat
        xl:mt-50 xl:pb-40 xl:bg-[url('/introduction/intro/principle-pc.png')]"
      >
        <Inner className="text-center">
          <IntroductionIntroSectionHeading
            subTitle="청맥이 지켜온 원칙"
            title="정직한 진료로, 필요한 치료만"
            desc={
              <>
                청맥병원은 의료의 시작이자 중심을 사람에 둔{' '}
                <br className="xl:hidden" />
                이인위본 정신과 의료윤리를 바탕으로 <br className="xl:hidden" />
                다음 7가지 원칙을 고집합니다.
              </>
            }
            subTitleColor="text-accent"
            titleColor="text-white"
            descColor="text-white"
          />
        </Inner>

        <div
          className="mt-10 overflow-hidden
        xl:mt-15"
        >
          <Swiper
            slidesPerView={1.4}
            centeredSlides={true}
            spaceBetween={24}
            breakpoints={{
              1280: {
                slidesPerView: 7.5,
                spaceBetween: 32,
              },
            }}
            watchSlidesProgress={true}
            className="cursor-pointer [&_.swiper-wrapper]:items-stretch"
            onSwiper={(swiper) => {
              principleSwiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActivePrinciple(swiper.activeIndex);
            }}
          >
            {principleItems.map((item, index) => (
              <SwiperSlide key={item.id} className="h-auto! flex!">
                {({ isActive }) => (
                  <div
                    className={`relative flex-1 px-6 pt-7 pb-38.75 shadow-lg transition-all duration-300 ease-out
                    xl:px-10 xl:pt-10 xl:pb-41.5
                    ${
                      isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-70'
                    }
                    `}
                  >
                    <div className="absolute left-0 bottom-0 w-full h-full rounded-[20px] overflow-clip -z-1">
                      <Image src={item.imgUrl} alt={item.imgAlt} fill />
                    </div>

                    <div>
                      <span className="font-semibold text-[15px] text-gray-300">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <h3
                        className="text-mo-title-1 text-action-secondary-hover
                      xl:text-pc-title-2"
                      >
                        {item.title}
                      </h3>

                      <p
                        className="mt-2 text-[14px]
                      xl:text-pc-body-2"
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className="mt-5 flex justify-center items-center gap-1.5
          xl:mt-6"
          >
            {principleItems.map((item, index) => {
              const isActive = activePrinciple === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`${index + 1}번째 원칙 보기`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => principleSwiperRef.current?.slideTo(index)}
                  className={`h-2 rounded-full transition-all duration-300
                  xl:h-2.5
                  ${
                    isActive
                      ? `w-6 bg-accent-ai-strong`
                      : `w-2 bg-white/50 hover:bg-white/80
                        xl:w-2.5`
                  }
                  `}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
