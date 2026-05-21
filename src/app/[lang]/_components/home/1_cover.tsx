'use client';

import { useHome } from '@/app/_providers/home-provider';
import { useViewport } from '@/app/_providers/viewport-provider';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const TOTAL_SLIDES = 3;

export default function HomeCover() {
  const { lang, home } = useHome();
  const { isMobile } = useViewport();
  const [activeIndex, setActiveIndex] = useState(0);

  const progress = ((activeIndex + 1) / TOTAL_SLIDES) * 100;

  return (
    <>
      <section className="relative px-2 h-[78vh] xl:px-0">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={isMobile ? 8 : 0}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 500000,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper: SwiperType) => {
            setActiveIndex(swiper.realIndex);
          }}
          className="w-full h-[78vh]"
        >
          <SwiperSlide>
            <div
              className="relative px-5 w-full h-full flex flex-col items-center justify-center rounded-[20px] bg-[url('/images/home/cover/m-slide-bg-1.png')] bg-cover bg-center bg-no-repeat xl:bg-[url('/images/home/cover/pc-slide-bg-1.png')]
              xl:rounded-none"
            >
              <div
                className="flex flex-col items-center text-4xl leading-[125%] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)]
                xl:flex-row xl:gap-1.75 xl:text-6xl"
              >
                <p>혈관의 모든 정답,</p>
                <p className="font-extrabold">청맥에 있습니다</p>
              </div>

              <div
                className="mt-5 flex flex-col items-center text-[15px] leading-[150%] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)]
                xl:flex-row xl:gap-1 xl:text-2xl"
              >
                <p>더 스마트해진 혈관 특화 의료 혁신의 시작.</p>
                <p>증상부터 치료까지 AI가 빠르고 정확한 길을 안내합니다.</p>
              </div>

              <div
                className="mt-11 flex w-full flex-col items-center
                xl:mx-auto xl:max-w-180"
              >
                <button
                  className="relative w-full
                  xl:w-148"
                >
                  <div className="relative p-1 pl-4 w-full h-13.5 flex items-center justify-between rounded-xl bg-white text-[15px] font-semibold text-[#CCCCCC] z-2">
                    <p>어떤 증상이 있으신가요?</p>

                    <Image
                      src="/images/home/cover/search.svg"
                      alt="search"
                      width={46}
                      height={46}
                    />
                  </div>

                  <div className="home-cover-input-gradient-glow pointer-events-none absolute -inset-0.75 rounded-xl bg-[linear-gradient(90deg,#FA6805_0%,#FFFFFF_25%,#FA6805_50%,#FFFFFF_75%,#FA6805_100%)] blur-[5px] z-1" />
                </button>

                <div
                  className="mt-2 w-full flex gap-5 overflow-x-scroll text-xs font-semibold text-white
                  xl:mt-5 xl:justify-center xl:items-center xl:gap-x-2 xl:gap-y-1 xl:flex-wrap xl:text-[15px] xl:[&>button:nth-of-type(1)]:bg-[#FD753E]"
                >
                  <button className="whitespace-nowrap rounded-full bg-[#111111]/50 px-3 py-1">
                    #하지정맥류 수술 비용이 궁금해요
                  </button>
                  <button className="whitespace-nowrap rounded-full bg-[#111111]/50 px-3 py-1">
                    #걸을 때 다리 통증과 발가락 저림
                  </button>
                  <button className="whitespace-nowrap rounded-full bg-[#111111]/50 px-3 py-1">
                    #생리통이 심한데, 골반울혈증후군인가?
                  </button>
                  <button className="whitespace-nowrap rounded-full bg-[#111111]/50 px-3 py-1">
                    #왼쪽 고환 열감 증상
                  </button>
                  <button className="whitespace-nowrap rounded-full bg-[#111111]/50 px-3 py-1">
                    #하지정맥류 치료 의료보험 적용 여부
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="relative px-5 w-full h-full flex flex-col items-center justify-center rounded-[20px] bg-[url('/images/home/cover/m-slide-bg-2.png')] bg-cover bg-center bg-no-repeat xl:bg-[url('/images/home/cover/pc-slide-bg-2.png')]
              xl:rounded-none"
            >
              <div
                className="flex flex-col items-center text-4xl leading-[125%] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)]
                xl:flex-row xl:gap-1.75 xl:text-6xl"
              >
                <p>혈관을 잘 아는 의사,</p>
                <p className="font-extrabold">청맥에 있습니다</p>
              </div>

              <div
                className="mt-6 flex flex-col items-center text-[15px] leading-[150%] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)]
                xl:text-2xl"
              >
                <p>오직 혈관질환에 집중한 전문의 협진으로</p>
                <p>깊이 있는 진료, 정밀한 치료를 약속드립니다.</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="relative px-5 w-full h-full flex flex-col items-center justify-center rounded-[20px] bg-[url('/images/home/cover/m-slide-bg-3.png')] bg-cover bg-center bg-no-repeat xl:bg-[url('/images/home/cover/pc-slide-bg-3.png')]
              xl:rounded-none"
            >
              <div
                className="flex flex-col items-center text-4xl leading-[125%] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)]
                xl:flex-row xl:gap-1.75 xl:text-6xl"
              >
                <p>대한정맥학회도</p>
                <p className="font-extrabold">인정한 청맥의 전문성</p>
              </div>

              <div
                className="mt-6 flex flex-col items-center text-[15px] leading-[150%] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)]
                xl:text-2xl"
              >
                <p>2026 대한정맥학회 학술연구비 지원 대상 선정!</p>
                <p>차별화된 전문성으로 혈관 진료의 발전을 선도합니다.</p>
              </div>

              <Link
                target="_blank"
                href={`/`}
                className="mt-3 px-4 py-1 rounded-full border border-white text-white text-[15px] [text-shadow:0_1px_5px_rgba(25,39,66,0.6)]
                xl:mt-6 xl:text-lg"
              >
                자세히 보기→
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>

        <div
          className="absolute left-1/2 bottom-10 -translate-x-1/2 flex flex-col gap-4 items-center pointer-events-none z-20
          xl:bottom-37.5 xl:gap-8"
        >
          <div
            className="w-37.5 flex items-center gap-2.5 font-extrabold text-white text-xs
            xl:w-58.75 xl:text-sm"
          >
            <span>{String(activeIndex + 1).padStart(2, '0')}</span>

            <div className="w-full h-0.75 overflow-hidden bg-white/50">
              <div
                className="h-full bg-white transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span>{String(TOTAL_SLIDES).padStart(2, '0')}</span>
          </div>

          <div
            className="w-4 h-6 flex justify-center rounded-full border-2 border-white
            xl:w-6.25 xl:h-10"
          >
            <span
              className="mt-1 h-1.5 w-0.5 rounded-full bg-white
              xl:mt-2 xl:w-1 xl:h-1.75
              "
            />
          </div>
        </div>
      </section>

      <style>{`
  .home-cover-input-gradient-glow {
    background-size: 200% 100%;
    animation: home-cover-input-gradient-move 5s linear infinite;
  }

  @keyframes home-cover-input-gradient-move {
    0% {
      background-position: 0% 50%;
    }

    100% {
      background-position: 200% 50%;
    }
  }
`}</style>
    </>
  );
}
