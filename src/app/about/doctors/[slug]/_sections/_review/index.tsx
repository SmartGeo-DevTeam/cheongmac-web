'use client';

import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import DoctorDesktopMoreLink from '../../_components/doctor-desktop-more-link';
import DoctorSectionHeader from './_components/doctor-section-header';
import ReviewItem from './_components/review-item';
import { reviews } from './data';

export default function Review() {
  return (
    <section id="about-doctor-review">
      <div
        className="mt-5 grid grid-cols-1
          xl:mx-auto xl:mt-20 xl:max-w-7xl xl:w-full xl:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] xl:gap-5"
      >
        <DoctorSectionHeader type={'review'} />

        <div
          className="my-5 min-w-0
            xl:my-0 xl:pl-5 xl:mr-[calc((80rem-100vw)/2)]"
        >
          <Swiper
            className="w-full"
            slidesPerView={1.1}
            slidesOffsetBefore={20}
            slidesOffsetAfter={20}
            spaceBetween={28}
            breakpoints={{
              1280: {
                slidesPerView: 4.5,
                spaceBetween: 20,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 100,
              },
            }}
            grabCursor
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <Link href={`/`}>
                  <div
                    className="relative w-full aspect-square rounded-2xl overflow-clip
                      xl:rounded-[20px]"
                  >
                    <Image
                      src={review.image}
                      alt={`${review.name} 환자 후기`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="mt-4 flex flex-col gap-4">
                    <ReviewItem label="환자정보">
                      <span>{review.name}</span>
                      <span>
                        ({review.age}세 · {review.gender})
                      </span>
                    </ReviewItem>

                    <ReviewItem label="치료정보">{review.treatment}</ReviewItem>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <DoctorDesktopMoreLink type="review" />
    </section>
  );
}
