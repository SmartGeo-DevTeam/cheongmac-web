'use client';

import { withLocale } from '@/_lib/navigation';
import { useHome } from '@/app/_providers/home-provider';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState, type CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

type Equipment = {
  id: string;
  name: string;
  image: string;
  alt: string;
  thumbFit?: 'cover' | 'contain';
  thumbPosition?: CSSProperties['objectPosition'];
};

const EQUIPMENTS: Equipment[] = [
  {
    id: 'ct',
    name: 'PHILIPS Ingenuity Elite CT',
    image: '/images/home/equipment/item-temp.png',
    alt: 'PHILIPS Ingenuity Elite CT 장비',
  },
  {
    id: 'blood-pressure',
    name: 'OMRON HBP-1320',
    image: '/images/home/equipment/item-temp.png',
    alt: '혈압 측정 장비',
  },
  {
    id: 'ultrasound',
    name: '초음파 진단 장비',
    image: '/images/home/equipment/item-temp.png',
    alt: '초음파 진단 장비',
  },
  {
    id: 'c-arm',
    name: '혈관 조영 장비',
    image: '/images/home/equipment/item-temp.png',
    alt: '혈관 조영 장비',
    thumbFit: 'contain',
  },
  {
    id: 'doppler',
    name: '혈관 초음파 장비',
    image: '/images/home/equipment/item-temp.png',
    alt: '혈관 초음파 장비',
  },
];

export default function HomeEquipment() {
  const { lang } = useHome();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeEquipment = useMemo(() => {
    return EQUIPMENTS[activeIndex] ?? EQUIPMENTS[0];
  }, [activeIndex]);

  return (
    <section
      className="relative pt-20 pb-18 w-full grid grid-cols-1 overflow-hidden
      xl:mx-auto xl:pt-40 xl:pb-30 xl:max-w-7xl xl:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] xl:gap-x-6"
    >
      <div className="px-5">
        <span
          className="font-bold text-lg text-[#FF7740]
          xl:text-2xl"
        >
          장비 소개
        </span>

        <h2
          className="font-medium text-[32px]
          xl:mt-1 xl:font-bold xl:text-[42px]
        "
        >
          첨단 의료 장비
        </h2>

        <div
          className="mt-6
          xl:mt-10 xl:text-xl"
        >
          <p>최첨단 의료장비를 통해</p>
          <p>정확하고 안전한 검사와 치료를 시행합니다.</p>
        </div>
      </div>

      <div
        className="mt-10 pl-5 w-full
        xl:col-start-1 xl:col-end-2"
      >
        <Swiper
          slidesPerView={3.2}
          spaceBetween={8}
          freeMode={true}
          slidesOffsetAfter={20}
          className="w-full"
          breakpoints={{
            1280: {
              slidesPerView: 3.2,
              spaceBetween: 12,
            },
          }}
        >
          {EQUIPMENTS.map((equipment, index) => {
            const isActive = activeIndex === index;

            return (
              <SwiperSlide key={equipment.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                  aria-label={`${equipment.name} 선택`}
                  aria-pressed={isActive}
                  className={`relative block aspect-square w-full overflow-hidden rounded-[10px] transition-opacity duration-300
                    ${isActive ? 'opacity-100' : 'opacity-50'}`}
                >
                  <Image
                    src={equipment.image}
                    alt={equipment.alt}
                    fill
                    sizes="(min-width: 1280px) 160px, 30vw"
                    className="transition-transform duration-300 hover:scale-105"
                    style={{
                      objectFit: equipment.thumbFit ?? 'cover',
                      objectPosition: equipment.thumbPosition ?? 'center',
                    }}
                  />
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div
        className="mt-2 px-5
        xl:mt-0
        xl:px-0
        xl:col-start-2
        xl:col-end-3
        xl:row-start-1
        xl:row-end-4"
      >
        <div className="relative aspect-[335/225] overflow-hidden rounded-[10px] bg-[#F3F3F3] xl:aspect-[736/501] xl:rounded-[40px]">
          <Image
            src={activeEquipment.image}
            alt={activeEquipment.alt}
            fill
            sizes="(min-width: 1280px) 736px, 100vw"
            className="object-cover"
            priority
          />

          <div className="absolute left-1/2 top-0 -translate-x-1/2 px-10 py-1 flex justify-center items-center rounded-b-[14px] bg-[#FF9A6F] whitespace-nowrap font-semibold text-center text-white z-10">
            {activeEquipment.name}
          </div>
        </div>
      </div>

      <Link
        target="_blank"
        href={withLocale(lang, '/')}
        className="justify-self-center mt-5 px-10 py-2.5 rounded-full border border-[#FF7740] font-bold text-[15px] text-[#FF7740]
        xl:self-center
        xl:mt-10
        xl:justify-self-start
        xl:col-start-1 xl:col-end-2
        xl:row-start-3 xl:row-end-4"
      >
        전체보기
      </Link>
    </section>
  );
}
