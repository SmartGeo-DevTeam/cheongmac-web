'use client';

import { withLocale } from '@/_lib/navigation';
import { useHome } from '@/app/_providers/home-provider';
import { ChevronLeft, ChevronRight, Pause } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type DepartmentId = 'vascular' | 'imaging' | 'pain';

type DoctorDepartment = {
  id: DepartmentId;
  label: string;
};

type Doctor = {
  id: string;
  departmentId: DepartmentId;
  name: string;
  specialty: string;
  quote: string;
  mobileImage: string;
  desktopImage: string;
  href: string;
  careers: string[];
};

const DOCTOR_DEPARTMENTS: DoctorDepartment[] = [
  {
    id: 'vascular',
    label: '혈관외과',
  },
  {
    id: 'imaging',
    label: '영상의학과',
  },
  {
    id: 'pain',
    label: '마취통증의학과',
  },
];

const DOCTORS: Doctor[] = [
  {
    id: 'bak-yongbeom',
    departmentId: 'vascular',
    name: '박용범 원장',
    specialty: '혈관외과 전문의',
    quote: '“끊임없는 연구를 통해 환자분들의 치유에 앞장서겠습니다”',
    mobileImage: '/images/home/doctors/m-bak.png',
    desktopImage: '/images/home/doctors/pc-bak.png',
    href: '/about/doctors-departments',
    careers: [
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
    id: 'jeon-jinwon',
    departmentId: 'vascular',
    name: '전진원 원장',
    specialty: '혈관외과 전문의',
    quote: '“정확한 진단과 세심한 치료로 건강한 일상을 돕겠습니다”',
    mobileImage: '/images/home/doctors/m-jeon.png',
    desktopImage: '/images/home/doctors/pc-jeon.png',
    href: '/about/doctors-departments',
    careers: [
      '부산대학교 의과대학 졸업',
      '국군 부산병원 외과',
      '한림의신기독병원 외과 과장',
      '대한외과학회 평생회원',
      '대한정맥학회 정회원',
      '대한혈관외과학회 회원',
      '대한외과초음파학회 정회원',
      '미국정맥학회 회원',
    ],
  },
  {
    id: 'jang-jiran',
    departmentId: 'imaging',
    name: '장지란 원장',
    specialty: '영상의학과 전문의',
    quote: '“정밀한 영상 진단으로 치료의 시작을 정확하게 열겠습니다”',
    mobileImage: '/images/home/doctors/m-jang.png',
    desktopImage: '/images/home/doctors/pc-jang.png',
    href: '/about/doctors-departments',
    careers: [
      '부산대학교 의과대학 졸업',
      '메리놀병원 영상의학과',
      '대자인병원 영상의학과',
      '대한영상의학회 정회원',
      '대한초음파의학회 정회원',
      '대한혈관인터벤션영상의학회 회원',
    ],
  },
  {
    id: 'byun-seungjae',
    departmentId: 'pain',
    name: '변승재 원장',
    specialty: '마취통증의학과 전문의',
    quote: '“통증의 원인을 세심하게 살피고 편안한 회복을 돕겠습니다”',
    mobileImage: '/images/home/doctors/m-byun.png',
    desktopImage: '/images/home/doctors/pc-bak.png',
    href: '/about/doctors-departments',
    careers: [
      '원광대학교 의과대학 학·석사 졸업',
      '전북대학교 의학 박사',
      '전 원광대학교병원 마취통증의학과 정교수',
      '전 미국 캔섭베니아대학 교환교수',
      '전 건강보험심사평가원 비상근 위원',
      '전 유한덱스솜재코마의원 원장',
      '현 대한통증의학회 상임이사',
      '현 대한정맥학회 상임이사',
    ],
  },
];

const DEPARTMENT_DEFAULT_DOCTOR_ID: Record<DepartmentId, string> = {
  vascular: 'bak-yongbeom',
  imaging: 'jang-jiran',
  pain: 'byun-seungjae',
};

const AUTO_PLAY_DELAY = 4500;

export default function HomeDoctors() {
  const { lang } = useHome();

  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeDoctorId, setActiveDoctorId] = useState(
    DEPARTMENT_DEFAULT_DOCTOR_ID.vascular,
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const activeDoctor = useMemo(() => {
    return DOCTORS.find((doctor) => doctor.id === activeDoctorId) ?? DOCTORS[0];
  }, [activeDoctorId]);

  const activeDepartmentId = activeDoctor.departmentId;

  const activeDoctorHref = withLocale(lang, activeDoctor.href);

  const activeDoctorIndex = useMemo(() => {
    const index = DOCTORS.findIndex((doctor) => doctor.id === activeDoctor.id);

    return index < 0 ? 0 : index;
  }, [activeDoctor.id]);

  const slideToDoctor = useCallback(
    (doctorId: string) => {
      const nextIndex = DOCTORS.findIndex((doctor) => doctor.id === doctorId);

      if (nextIndex < 0) return;

      setActiveDoctorId(doctorId);

      if (swiper) {
        swiper.slideToLoop(nextIndex);
      }
    },
    [swiper],
  );

  const moveActiveDoctor = useCallback(
    (direction: 1 | -1) => {
      if (!swiper) return;

      if (direction === 1) {
        swiper.slideNext();
        return;
      }

      swiper.slidePrev();
    },
    [swiper],
  );

  const handleDepartmentChange = (departmentId: DepartmentId) => {
    const doctorId = DEPARTMENT_DEFAULT_DOCTOR_ID[departmentId];

    slideToDoctor(doctorId);
  };

  const handleSelectDoctor = (doctorId: string) => {
    slideToDoctor(doctorId);
  };

  const handleToggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (!swiper?.autoplay) return;

    if (isAutoPlaying) {
      swiper.autoplay.start();
      return;
    }

    swiper.autoplay.stop();
  }, [isAutoPlaying, swiper]);

  return (
    <section
      className="relative isolate overflow-hidden px-5 py-15 bg-white
     xl:bg-[linear-gradient(to_bottom,#F6F2EF_0%,#F4F4F4_20%,#F4F4F4_100%)] xl:pt-20 xl:pb-0
  "
    >
      <SwiperController
        activeDoctorIndex={activeDoctorIndex}
        onSwiper={setSwiper}
        onChangeActiveDoctor={setActiveDoctorId}
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="text-center xl:text-left">
          <p
            className="font-bold text-lg text-[#FF7740]
            xl:font-semibold xl:text-2xl"
          >
            의료진 소개
          </p>

          <div
            className="mt-3 leading-[140%] font-bold text-[28px] text-[#333333]
            xl:text-[42px] xl:text-[#252B33]"
          >
            <p className="xl:inline">대학병원 20년 경험의</p>
            <p className="xl:ml-2 xl:inline">혈관 특화 전문의</p>
          </div>
        </div>

        <div
          className="mt-10 flex flex-col
          xl:mt-2 xl:items-start"
        >
          <DepartmentTabs
            departments={DOCTOR_DEPARTMENTS}
            activeDepartmentId={activeDepartmentId}
            onChange={handleDepartmentChange}
          />

          <DoctorControlButtons
            isAutoPlaying={isAutoPlaying}
            total={DOCTORS.length}
            onPrev={() => moveActiveDoctor(-1)}
            onNext={() => moveActiveDoctor(1)}
            onToggleAutoPlay={handleToggleAutoPlay}
          />
        </div>

        <DesktopDoctorsStage
          doctors={DOCTORS}
          activeDoctor={activeDoctor}
          activeDoctorHref={activeDoctorHref}
          onSelectDoctor={handleSelectDoctor}
        />

        <MobileDoctorCard doctor={activeDoctor} href={activeDoctorHref} />
      </div>
    </section>
  );
}

function SwiperController({
  activeDoctorIndex,
  onSwiper,
  onChangeActiveDoctor,
}: {
  activeDoctorIndex: number;
  onSwiper: (swiper: SwiperType) => void;
  onChangeActiveDoctor: (doctorId: string) => void;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
    >
      <Swiper
        modules={[Autoplay]}
        loop={DOCTORS.length > 1}
        slidesPerView={1}
        initialSlide={activeDoctorIndex}
        allowTouchMove={false}
        speed={600}
        autoplay={{
          delay: AUTO_PLAY_DELAY,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        onSwiper={onSwiper}
        onSlideChange={(swiper) => {
          const nextDoctor = DOCTORS[swiper.realIndex];

          if (!nextDoctor) return;

          onChangeActiveDoctor(nextDoctor.id);
        }}
      >
        {DOCTORS.map((doctor) => (
          <SwiperSlide key={doctor.id}>
            <div>{doctor.name}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function getVisibleDesktopDoctors(doctors: Doctor[], activeDoctorId: string) {
  if (doctors.length === 0) return [];

  const activeIndex = Math.max(
    doctors.findIndex((doctor) => doctor.id === activeDoctorId),
    0,
  );

  const visibleCount = Math.min(3, doctors.length);

  return Array.from({ length: visibleCount }, (_, index) => {
    const offset = visibleCount - 1 - index;
    const doctorIndex = (activeIndex + offset) % doctors.length;

    return doctors[doctorIndex];
  });
}

function DepartmentTabs({
  departments,
  activeDepartmentId,
  onChange,
}: {
  departments: DoctorDepartment[];
  activeDepartmentId: DepartmentId;
  onChange: (departmentId: DepartmentId) => void;
}) {
  return (
    <div className="flex items-center gap-3 xl:gap-5">
      {departments.map((department) => {
        const isActive = department.id === activeDepartmentId;

        return (
          <button
            key={department.id}
            type="button"
            onClick={() => onChange(department.id)}
            className={[
              `font-bold transition-colors
              xl:text-xl`,
              isActive
                ? 'text-[#FF7740]'
                : 'text-[#CCCCCC] hover:text-[#FF7740] xl:text-[#CCCCCC]',
            ].join(' ')}
          >
            {department.label}
          </button>
        );
      })}
    </div>
  );
}

function DoctorControlButtons({
  isAutoPlaying,
  total,
  onPrev,
  onNext,
  onToggleAutoPlay,
}: {
  isAutoPlaying: boolean;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onToggleAutoPlay: () => void;
}) {
  const disabled = total <= 1;

  return (
    <div
      className="mt-2 self-end flex items-center gap-2 text-[#FF7740]
      xl:self-start"
    >
      <button
        type="button"
        aria-label="이전 의료진 보기"
        disabled={disabled}
        onClick={onPrev}
        className="flex h-7 w-7 items-center justify-center disabled:opacity-30"
      >
        <ChevronLeft size={22} strokeWidth={2.2} />
      </button>

      <button
        type="button"
        aria-label={isAutoPlaying ? '자동 전환 정지' : '자동 전환 시작'}
        onClick={onToggleAutoPlay}
        className={[
          'flex h-7 w-7 items-center justify-center transition-opacity',
          isAutoPlaying ? 'opacity-100' : 'opacity-55',
        ].join(' ')}
      >
        <Pause size={18} strokeWidth={2.4} />
      </button>

      <button
        type="button"
        aria-label="다음 의료진 보기"
        disabled={disabled}
        onClick={onNext}
        className="flex h-7 w-7 items-center justify-center disabled:opacity-30"
      >
        <ChevronRight size={22} strokeWidth={2.2} />
      </button>
    </div>
  );
}

function DesktopDoctorsStage({
  doctors,
  activeDoctor,
  activeDoctorHref,
  onSelectDoctor,
}: {
  doctors: Doctor[];
  activeDoctor: Doctor;
  activeDoctorHref: string;
  onSelectDoctor: (doctorId: string) => void;
}) {
  const visibleDoctors = getVisibleDesktopDoctors(doctors, activeDoctor.id);

  return (
    <div className="flex">
      <div
        className="hidden mt-5 w-full items-end z-10
        xl:grid xl:grid-cols-[6fr_4fr]"
      >
        <div
          className="relative flex pr-8
          after:absolute
          after:right-0
          after:bottom-0
          after:w-25
          after:h-25
          after:bg-[url('/images/home/doctors/pc-rect-bottom.svg')]
          "
        >
          {visibleDoctors.map((doctor) => {
            const isActive = doctor.id === activeDoctor.id;

            return (
              <button
                key={doctor.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelectDoctor(doctor.id)}
                className={[
                  'relative flex-1 w-full aspect-[1/1.2] shrink-0 transition-all duration-300 origin-bottom z-2',
                  !isActive ? 'opacity-40 scale-85' : '',
                ].join(' ')}
              >
                <div>
                  <Image
                    src={doctor.desktopImage}
                    alt={doctor.name}
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
              </button>
            );
          })}
        </div>
        <DesktopDoctorInfo doctor={activeDoctor} href={activeDoctorHref} />
      </div>
    </div>
  );
}

function DesktopDoctorInfo({ doctor, href }: { doctor: Doctor; href: string }) {
  return (
    <div
      className="relative px-12 py-16 flex flex-col items-center bg-white
      before:absolute
      before:left-full
      before:top-0
      before:w-screen
      before:h-full
      before:bg-white
      before:z-10
      after:absolute
      after:left-0
      after:top-0
      after:w-25
      after:h-25
      after:bg-[url('/images/home/doctors/pc-rect-top.svg')]
      "
    >
      <div className="relative flex items-center gap-2.5 z-2">
        <h3 className="font-bold text-[28px] text-[#262C35]">{doctor.name}</h3>
        <span className="font-bold text-[18px] text-[#A0A0A0]">
          {doctor.specialty}
        </span>
      </div>

      <div className="mt-3 w-12 h-0.75 bg-[#767C88]" />

      <p className="mt-2.5 break-keep font-semibold text-center text-[28px] text-[#767C88]">
        {doctor.quote}
      </p>

      <Link
        href={href}
        className="mt-17 px-10 py-2.5 flex justify-center items-center rounded-full bg-[#333333] font-bold text-[18px] text-white transition-opacity hover:opacity-80"
      >
        자세히 보기
      </Link>
    </div>
  );
}

function MobileDoctorCard({ doctor, href }: { doctor: Doctor; href: string }) {
  return (
    <div className="flex flex-col items-center xl:hidden">
      <div className="relative w-full aspect-60/49">
        <Image
          src={doctor.mobileImage}
          alt={doctor.name}
          fill
          sizes="calc(100vw - 40px)"
          className="object-cover object-top"
        />
      </div>

      <div className="mt-6 flex items-center gap-2">
        <h3 className="font-bold text-xl text-[#333333]">{doctor.name}</h3>
        <span className="font-semibold text-sm text-[#A0A0A0]">
          {doctor.specialty}
        </span>
      </div>

      <div className="mt-3 w-12 h-0.75 bg-[#767C88]" />

      <p className="mt-5 leading-[150%] break-keep font-semibold text-center text-lg text-[#767C88]">
        {doctor.quote}
      </p>

      <Link
        href={href}
        className="mt-10 px-10 py-2.5 flex justify-center items-center rounded-full bg-[#333333] font-bold text-white"
      >
        자세히 보기
      </Link>
    </div>
  );
}
