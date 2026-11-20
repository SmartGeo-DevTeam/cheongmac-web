'use client';

import type { ClinicSpecialistData } from '@/app/_types/clinic/specialists';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ClinicSpecialistProfile from './profile';

type ClinicSpecialistsCarouselProps = {
  id: string;
  doctors: readonly ClinicSpecialistData[];
};

/** 2명 이상일 때 사용: 모바일 1.3명, PC 2.3명 슬라이드 노출. */
export default function ClinicSpecialistsCarousel({
  id,
  doctors,
}: ClinicSpecialistsCarouselProps) {
  if (doctors.length === 0) return null;

  return (
    <div
      id={`${id}-carousel`}
      className="min-w-0 w-full"
      role="region"
      aria-label="진료분야 전문 의료진 슬라이드"
    >
      <Swiper
        className="w-full"
        slidesPerView={1.3}
        spaceBetween={16}
        grabCursor={doctors.length > 1}
        watchOverflow
        breakpoints={{
          1280: {
            slidesPerView: 2.3,
            spaceBetween: 28,
          },
        }}
      >
        {doctors.map((doctor) => (
          <SwiperSlide key={doctor.id} className="min-w-0!">
            <ClinicSpecialistProfile
              id={`${id}-doctor-${doctor.id}`}
              doctor={doctor}
              isCarousel
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
