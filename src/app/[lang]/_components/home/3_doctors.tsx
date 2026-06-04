'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-cards';

type DoctorCategory = '전체' | '혈관외과' | '영상의학과' | '마취통증의학과';

type Doctor = {
  id: number;
  name: string;
  position: string;
  category: Exclude<DoctorCategory, '전체'>;
  quote: string;
  imageSrc: string;
  profileImageSrc: string;
  histories: string[];
  scheduleHref: string;
  reservationHref: string;
};

const categories: DoctorCategory[] = [
  '전체',
  '혈관외과',
  '영상의학과',
  '마취통증의학과',
];

const doctors: Doctor[] = [
  {
    id: 1,
    name: '박용범',
    position: '원장',
    category: '혈관외과',
    quote: '끊임없는 연구를 통해 환자분들의 치유에 앞장서겠습니다',
    imageSrc: '/images/home/doctors/bak.png',
    profileImageSrc: '/images/home/doctors/bak.png',
    scheduleHref: '/doctors/park-yong-beom/schedule',
    reservationHref: '/reservation',
    histories: [
      '부산대학교 의과대학 졸업',
      '양산부산대학교병원 혈관외과',
      '부산 메리놀병원 외과 및 혈관외과',
      '국군 수도병원 혈관외과',
      '미국정맥학회 회원',
      '대한혈관외과학회 학술위원/기획위원/정회원',
      '대한정맥학회 정회원/이사',
      '대한외과학회 평생회원',
    ],
  },
  {
    id: 2,
    name: '전진원',
    position: '원장',
    category: '혈관외과',
    quote: '정확한 진단과 섬세한 치료로 혈관 건강을 지키겠습니다',
    imageSrc: '/images/home/doctors/jeon.png',
    profileImageSrc: '/images/home/doctors/jeon.png',
    scheduleHref: '/doctors/kim-cheong-maek/schedule',
    reservationHref: '/reservation',
    histories: [
      '혈관외과 전문의',
      '하지정맥류 및 말초혈관질환 진료',
      '대한혈관외과학회 정회원',
      '대한정맥학회 정회원',
    ],
  },
  {
    id: 3,
    name: '장지란',
    position: '원장',
    category: '영상의학과',
    quote: '영상 진단의 정확도를 높여 치료의 방향을 세우겠습니다',
    imageSrc: '/images/home/doctors/jang.png',
    profileImageSrc: '/images/home/doctors/jang.png',
    scheduleHref: '/doctors/lee-cheong-maek/schedule',
    reservationHref: '/reservation',
    histories: [
      '영상의학과 전문의',
      '초음파 및 혈관 영상 진단',
      '대한영상의학회 정회원',
      '대한초음파의학회 정회원',
    ],
  },
  {
    id: 4,
    name: '변승재',
    position: '원장',
    category: '마취통증의학과',
    quote: '환자분의 통증과 회복 과정을 세심하게 살피겠습니다',
    imageSrc: '/images/home/doctors/byun.png',
    profileImageSrc: '/images/home/doctors/byun.png',
    scheduleHref: '/doctors/jung-cheong-maek/schedule',
    reservationHref: '/reservation',
    histories: [
      '마취통증의학과 전문의',
      '통증 관리 및 시술 마취',
      '대한마취통증의학회 정회원',
      '대한통증학회 정회원',
    ],
  },
  {
    id: 5,
    name: '배병호',
    position: '원장',
    category: '혈관외과',
    quote: '환자에게 꼭 필요한 치료만 정직하게 제안하겠습니다',
    imageSrc: '/images/home/doctors/bae.png',
    profileImageSrc: '/images/home/doctors/bae.png',
    scheduleHref: '/doctors/choi-cheong-maek/schedule',
    reservationHref: '/reservation',
    histories: [
      '혈관외과 전문의',
      '동맥경화 및 투석혈관 진료',
      '대한혈관외과학회 정회원',
      '대한외과학회 정회원',
    ],
  },
  {
    id: 6,
    name: '김병주',
    position: '원장',
    category: '영상의학과',
    quote: '작은 이상도 놓치지 않는 진단으로 함께하겠습니다',
    imageSrc: '/images/home/doctors/kim.png',
    profileImageSrc: '/images/home/doctors/kim.png',
    scheduleHref: '/doctors/han-cheong-maek/schedule',
    reservationHref: '/reservation',
    histories: [
      '영상의학과 전문의',
      '혈관 초음파 및 정밀 영상 판독',
      '대한영상의학회 정회원',
      '대한인터벤션영상의학회 정회원',
    ],
  },
];

export default function HomeDoctors(): React.ReactNode {
  const swiperRef = useRef<SwiperType | null>(null);

  const [activeCategory, setActiveCategory] = useState<DoctorCategory>('전체');
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredDoctors = useMemo(() => {
    switch (activeCategory) {
      case '전체':
        return doctors;
      default:
        return doctors.filter((doctor) => doctor.category === activeCategory);
    }
  }, [activeCategory]);

  const safeActiveIndex =
    filteredDoctors.length === 0
      ? 0
      : Math.min(activeIndex, filteredDoctors.length - 1);

  const activeDoctor = filteredDoctors[safeActiveIndex] ?? filteredDoctors[0];

  const stackedDoctors = useMemo(() => {
    if (filteredDoctors.length <= 1) return [];

    return Array.from({ length: filteredDoctors.length - 1 }, (_, index) => {
      const nextIndex = (safeActiveIndex + index + 1) % filteredDoctors.length;

      return filteredDoctors[nextIndex];
    });
  }, [filteredDoctors, safeActiveIndex]);

  const canGoPrev = safeActiveIndex > 0;
  const canGoNext = safeActiveIndex < filteredDoctors.length - 1;

  const goToIndex = useCallback(
    (targetIndex: number): void => {
      if (filteredDoctors.length === 0) return;

      const nextIndex = Math.max(
        0,
        Math.min(targetIndex, filteredDoctors.length - 1),
      );

      setActiveIndex(nextIndex);
    },
    [filteredDoctors.length],
  );

  useEffect(() => {
    const swiper = swiperRef.current;

    if (!swiper) return;
    if (swiper.destroyed) return;
    if (swiper.activeIndex === safeActiveIndex) return;

    swiper.slideTo(safeActiveIndex);
  }, [safeActiveIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    if (filteredDoctors.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => {
        return prev >= filteredDoctors.length - 1 ? 0 : prev + 1;
      });
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [activeCategory, filteredDoctors.length]);

  const handlePrev = (): void => {
    if (!canGoPrev) return;

    goToIndex(safeActiveIndex - 1);
  };

  const handleNext = (): void => {
    if (!canGoNext) return;

    goToIndex(safeActiveIndex + 1);
  };

  if (!activeDoctor) return null;

  return (
    <section className="py-20 bg-[#F6F2EF] xl:py-25">
      <div className="mx-auto max-w-7xl w-full">
        <div
          className="px-5 flex flex-col
          xl:items-center"
        >
          <span
            className="font-bold text-lg text-[#AFAFAF]
            xl:hidden"
          >
            의료진 소개
          </span>
          <p
            className="hidden
            xl:block xl:font-semibold xl:text-2xl text-[#262C35]"
          >
            당신의 혈관을 지키는 사람들
          </p>
          <h3
            className="font-extrabold text-[32px] text-[#333333]
            xl:mt-2 xl:text-[50px]"
          >
            대학병원 20년 경험의 <br className="block xl:hidden" />
            혈관 특화 전문의
          </h3>
        </div>

        <div
          className="flex flex-col
          xl:mt-15 xl:flex-row-reverse xl:justify-between xl:items-center"
        >
          <div className="pr-5 self-end">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`/`}
              className="self-end
              xl:flex xl:items-center"
            >
              <span
                className="font-semibold text-[15px] text-[#D3BBA2]
                xl:hidden"
              >
                + 전체보기
              </span>
              <span
                className="hidden px-5 py-2.5 rounded-xl border border-[#D3BBA2] font-semibold text-[#D3BBA2]
              xl:block"
              >{`의료진 전체보기 >`}</span>
            </Link>
          </div>

          <ul
            className="mt-5 pl-5 flex gap-3
            xl:gap-0"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`font-bold
                        xl:px-5 xl:py-2.5 
                        ${isActive ? `text-[#FF7740] xl:rounded-xl xl:bg-[#171719] xl:text-white` : `text-[#CCCCCC] xl:text-[#999999]`}
                        `}
                  >
                    {category}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-5">
          <div className="xl:grid xl:grid-cols-[7fr_3fr] xl:gap-20">
            <div
              className="relative px-14 w-full overflow-hidden
              xl:pl-5 xl:pr-0 xl:grid xl:grid-cols-[5.25fr_4.75fr] xl:gap-x-15"
            >
              <Swiper
                key={activeCategory}
                effect="cards"
                grabCursor
                modules={[EffectCards]}
                cardsEffect={{
                  perSlideOffset: 8,
                  perSlideRotate: 2,
                  slideShadows: false,
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="w-full xl:overflow-hidden!"
              >
                {filteredDoctors.map((doctor) => (
                  <SwiperSlide key={doctor.id}>
                    <DoctorPhotoCard doctor={doctor} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div
                className="mt-2
                xl:mt-0 xl:flex xl:flex-col xl:justify-center xl:items-start"
              >
                <p
                  className="mx-auto w-9/10 break-keep font-semibold text-center text-lg text-[#164534]
                  xl:w-full xl:text-left xl:text-2xl"
                >
                  “{activeDoctor.quote}”
                </p>

                <div
                  className="mt-3 flex justify-center items-center font-bold gap-2.5
                  xl:mt-10 xl:gap-2"
                >
                  <h2
                    className="text-xl text-[#262C35]
                    xl:text-3xl"
                  >
                    {activeDoctor.name} {activeDoctor.position}
                  </h2>
                  <span
                    className="text-sm text-[#C8AFA4]
                    xl:text-lg"
                  >
                    {activeDoctor.category} 전문의
                  </span>
                </div>

                <ul
                  className="hidden
                  xl:block xl:mt-5 xl:space-y-1 xl:font-medium xl:text-lg xl:text-[#555555]"
                >
                  {activeDoctor.histories.map((history) => (
                    <li key={history} className="flex gap-3">
                      <span aria-hidden="true">•</span>
                      <span>{history}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="hidden
              xl:relative xl:flex xl:opacity-50"
            >
              {stackedDoctors.slice(0, 5).map((doctor, index) => (
                <button
                  key={doctor.id}
                  type="button"
                  onClick={() => {
                    const targetIndex = filteredDoctors.findIndex(
                      (item) => item.id === doctor.id,
                    );

                    if (targetIndex >= 0) {
                      goToIndex(targetIndex);
                    }
                  }}
                  className="absolute left-1/2 top-1/2 aspect-[0.95/1] w-75 overflow-hidden rounded-3xl bg-white shadow-[0_16px_45px_rgba(0,0,0,0.08)] transition-transform duration-300"
                  style={{
                    zIndex: stackedDoctors.length - index,
                    transform: `translate(calc(-50% + ${
                      index * 10
                    }px), calc(-50% + ${index * 3}px))`,
                    opacity: 1 - index * 0.08,
                  }}
                  aria-label={`${doctor.name} ${doctor.position} 보기`}
                >
                  <Image
                    src={doctor.profileImageSrc}
                    alt={`${doctor.name} ${doctor.position}`}
                    fill
                    className="object-contain object-bottom"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-8 flex justify-center items-center gap-3.5
          xl:mt-5"
        >
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canGoPrev}
            aria-label="이전 의료진"
            className={canGoPrev ? 'text-[#666666]' : 'text-[#D0D0D0]'}
          >
            <ArrowLeft />
          </button>

          <div className="flex items-center gap-2.5 font-semibold">
            <span className="text-[#D0D0D0]">{safeActiveIndex + 1}</span>
            <span className="text-[#D0D0D0]">/</span>
            <span className="text-[#666666]">{filteredDoctors.length}</span>
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label="다음 의료진"
            className={canGoNext ? 'text-[#666666]' : 'text-[#D0D0D0]'}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

function DoctorPhotoCard({ doctor }: { doctor: Doctor }): React.ReactNode {
  return (
    <div
      className="rounded-xl border border-gray-200 bg-white overflow-clip
      xl:rounded-[40px]"
    >
      <div className="relative w-full aspect-[1/1.197]">
        <Image
          src={doctor.imageSrc}
          alt={`${doctor.name} ${doctor.position}`}
          fill
          className="object-cover"
          priority={doctor.id === 1}
        />
        <div
          className="absolute left-0 bottom-0 w-full grid grid-cols-2 text-center font-bold text-white
          xl:text-[22px]"
        >
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={doctor.scheduleHref}
            className="py-3 bg-[#21886C]/70
          xl:py-5 xl:bg-[#133C2B]/70"
          >
            휴진일정
          </Link>

          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={doctor.reservationHref}
            className="py-3 bg-[#FD7740]
          xl:py-5"
          >
            예약하기
          </Link>
        </div>
      </div>
    </div>
  );
}
