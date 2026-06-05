'use client';

import { withLocale } from '@/_lib/navigation';
import { useHome } from '@/app/_providers/home-provider';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type Shorts = {
  id: string;
  title: string;
  thumbanilUrl: string;
  alt: string;
  link: string;
};

const SHORTS_VIDEOS: Shorts[] = [
  {
    id: '1',
    title: '다리 쥐 99% 이것 때문! 콜레스테롤 약 드시면 필수 시청!',
    thumbanilUrl: '/images/home/shorts/temp-bg.png',
    alt: '다리 쥐 관련 혈관 질환 쇼츠',
    link: '/',
  },
  {
    id: '2',
    title: '이 질병으로 귀신 굿까지?? 원인 못찾은 골반통, 배뇨통!',
    thumbanilUrl: '/images/home/shorts/temp-bg.png',
    alt: '골반통 배뇨통 관련 쇼츠',
    link: '/',
  },
  {
    id: '3',
    title: '흉터, 고통 없는 정계정맥류 치료!! 다음날 일상생활 가능한 색전술',
    thumbanilUrl: '/images/home/shorts/temp-bg.png',
    alt: '정계정맥류 치료 쇼츠',
    link: '/',
  },
  {
    id: '4',
    title: '혈관 질환, 방치하면 위험합니다!',
    thumbanilUrl: '/images/home/shorts/temp-bg.png',
    alt: '혈관 질환 쇼츠',
    link: '/',
  },
  {
    id: '5',
    title: '생활 속 혈관 건강 관리법',
    thumbanilUrl: '/images/home/shorts/temp-bg.png',
    alt: '혈관 건강 관리 쇼츠',
    link: '/',
  },
  {
    id: '6',
    title: '생활 속 혈관 건강 관리법',
    thumbanilUrl: '/images/home/shorts/temp-bg.png',
    alt: '혈관 건강 관리 쇼츠',
    link: '/',
  },
  {
    id: '7',
    title: '생활 속 혈관 건강 관리법',
    thumbanilUrl: '/images/home/shorts/temp-bg.png',
    alt: '혈관 건강 관리 쇼츠',
    link: '/',
  },
];

const STAIR_PADDING_CLASSES = [
  'pt-0',
  'pt-10 xl:pt-[60px]',
  'pt-20 xl:pt-[120px]',
  'pt-10 xl:pt-[60px]',
];

export default function HomeShorts() {
  const { lang } = useHome();

  return (
    <section className="overflow-hidden pt-20 pb-10 xl:pt-30 xl:pb-25">
      <div className="mx-auto xl:max-w-7xl">
        <div className="px-5 flex items-center gap-1">
          <Image
            src="/images/home/shorts/shorts.svg"
            alt="icon-shorts"
            width={18}
            height={18}
          />

          <span className="font-medium text-sm text-[#FF7740]">Shorts</span>
        </div>

        <h2 className="mt-1 px-5 font-extrabold text-[32px] leading-[130%] text-black xl:text-[42px]">
          청맥 쇼츠
        </h2>

        <div className="mt-1 px-5 text-[#555555] leading-[160%] xl:text-lg">
          <p>일상에서도 쉽게 만나보는</p>
          <p>40초로 정리한 혈관 질환 핵심 정보</p>
        </div>

        <div className="mt-15 pl-5 xl:mt-20">
          <Swiper
            slidesPerView={1.5}
            spaceBetween={28}
            slidesOffsetAfter={20}
            scrollbar={{
              draggable: true,
              hide: false,
            }}
            modules={[Scrollbar]}
            breakpoints={{
              1280: {
                slidesPerView: 3.8,
                spaceBetween: 32,
                slidesOffsetAfter: 0,
              },
            }}
            className="
              !overflow-visible !pb-12
              [&_.swiper-scrollbar]:!left-0
              [&_.swiper-scrollbar]:!bottom-0
              [&_.swiper-scrollbar]:!h-[3px]
              [&_.swiper-scrollbar]:!w-[calc(100%-20px)]
              [&_.swiper-scrollbar]:!rounded-none
              [&_.swiper-scrollbar]:!bg-[#E5E5E5]
              [&_.swiper-scrollbar-drag]:!rounded-none
              [&_.swiper-scrollbar-drag]:!bg-[#FF7740]
              xl:[&_.swiper-scrollbar]:!w-full
            "
          >
            {SHORTS_VIDEOS.map((shorts, index) => {
              const stairClass =
                STAIR_PADDING_CLASSES[index % STAIR_PADDING_CLASSES.length];

              return (
                <SwiperSlide
                  key={shorts.id}
                  className={`!h-auto ${stairClass}`}
                >
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={withLocale(lang, shorts.link)}
                    className="group relative block aspect-[211/354] w-full overflow-hidden rounded-[14px] bg-[#222222] xl:aspect-[302/507] xl:rounded-[24px]"
                  >
                    <Image
                      src={shorts.thumbanilUrl}
                      alt={shorts.alt}
                      fill
                      sizes="(min-width: 1280px) 302px, 67vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/20" />

                    <div className="absolute inset-0 flex items-center justify-center px-5 text-center hidden">
                      <p className="whitespace-pre-line break-keep font-extrabold text-[22px] leading-[145%] text-white xl:text-[28px]">
                        {shorts.title}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
