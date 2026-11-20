'use client';

import type { ClinicSpecialistData } from '@/app/_types/clinic/specialists';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ClinicSpecialistProfile from './profile';

type ClinicSpecialistsCarouselProps = {
  id: string;
  doctors: readonly ClinicSpecialistData[];
};

/** 인원수와 관계없이 사용: 1명은 1장, 여러 명은 모바일 1.3장·PC 2.3장 노출. */
export default function ClinicSpecialistsCarousel({
  id,
  doctors,
}: ClinicSpecialistsCarouselProps) {
  if (doctors.length === 0) return null;

  const isSingle = doctors.length === 1;

  return (
    <div
      id={`${id}-carousel`}
      className="w-full"
      role="region"
      aria-label="진료분야 전문 의료진 슬라이드"
    >
      <Swiper
        className="w-full"
        slidesPerView={isSingle ? 1 : 1.3}
        spaceBetween={16}
        grabCursor={doctors.length > 1}
        watchOverflow
        breakpoints={{
          1280: {
            slidesPerView: isSingle ? 1 : 2.3,
            spaceBetween: 28,
          },
        }}
      >
        {doctors.map((doctor) => (
          <SwiperSlide key={doctor.id}>
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
