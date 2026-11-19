'use client';
import type { DoctorType } from '@/app/_data/about/doctors/doctors';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ClinicSpecialistProfile from './profile';
/** 한 명은 기존 카드로, 두 명 이상이면 모바일 1.2장 · PC 전체 인원 표시. */
export default function ClinicSpecialistProfiles({ doctors }: { doctors: DoctorType[] }) {
  if (doctors.length === 0) return null;
  if (doctors.length === 1) return <ClinicSpecialistProfile doctor={doctors[0]} />;
  return (
    <div className="min-w-0 xl:w-full">
      <Swiper slidesPerView={1.2} spaceBetween={16} slidesOffsetAfter={24}
        breakpoints={{ 1280: { slidesPerView: doctors.length, spaceBetween: 24, slidesOffsetAfter: 0 } }}
        className="w-full">
        {doctors.map((doctor) => (
          <SwiperSlide key={doctor.id} className="h-auto!">
            <ClinicSpecialistProfile doctor={doctor} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
