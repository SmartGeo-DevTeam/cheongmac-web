'use client';

import Inner from '@/app/_components/common/inner';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { recents } from './data';

export default function Recent() {
  return (
    <section
      id="introduction-social-recent"
      className="mt-10
      xl:mt-30"
    >
      <Inner>
        <div className="flex justify-between items-end">
          <h2
            className="text-mo-title-2
            xl:text-pc-title-2"
          >
            최근 소식
          </h2>
          <Link
            href={`/`}
            className="flex items-center text-mo-label text-tertiary
            xl:text-[16px]"
          >
            <span>더보기</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="mt-5">
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            grabCursor
            breakpoints={{
              1280: {
                slidesPerView: 3.3,
                spaceBetween: 40,
              },
            }}
          >
            {recents.map((recent) => (
              <SwiperSlide key={recent.id}>
                <div
                  className="rounded-lg overflow-hidden bg-subtle
                  xl:rounded-xl"
                >
                  <div className="relative aspect-video">
                    <Image src={recent.imgUrl} alt={recent.title} fill />
                  </div>

                  <div
                    className="p-5 space-y-0.5
                    xl:px-6 xl:py-5 xl:space-y-1"
                  >
                    <p
                      className="text-sm
                      xl:text-pc-label"
                    >
                      {recent.date}
                    </p>
                    <h3
                      className="text-mo-heading-2
                      xl:text-pc-heading-2"
                    >
                      {recent.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Inner>
    </section>
  );
}
