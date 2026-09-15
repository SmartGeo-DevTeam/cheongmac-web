'use client';

import AdminEditButton from '@/app/_components/inline-editor/admin-edit-button';
import CollectionAdminEditButton from '@/app/_components/inline-editor/collection-admin-edit-button';
import EditablePageCopyRegion from '@/app/_components/inline-editor/editable-page-copy-region';
import {
  H2 as TypographyH2,
  P as TypographyP,
} from '@/app/_components/ui/typography';
import FadeInUp from '@/app/_components/fade-in-up';
import MainSectionHeader from '@/app/_components/main-section-header';
import { jejuMyeongjo } from '@/_lib/fonts';
import type { HomeDoctor } from '@/_lib/home-doctors';
import { HOME_COPY_FIELD_KEYS } from '@/_lib/home-page-copy';
import type { InlineContentData } from '@/_lib/inline-content-shared';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';

function specialistLabel(
  department: string,
  suffix: string,
) {
  const cleanDepartment = department.trim();
  if (!cleanDepartment) return suffix;

  return cleanDepartment.includes(suffix)
    ? cleanDepartment
    : `${cleanDepartment} ${suffix}`;
}

export default function HomeDoctors({
  copy,
  persisted,
  doctors,
}: {
  copy: InlineContentData;
  persisted: boolean;
  doctors: HomeDoctor[];
}): React.ReactNode {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const safeActiveIndex =
    doctors.length === 0
      ? 0
      : Math.min(activeIndex, doctors.length - 1);

  const activeDoctor = doctors[safeActiveIndex] ?? doctors[0];

  const stackedDoctors = useMemo(() => {
    if (doctors.length <= 1) return [];

    return Array.from({ length: doctors.length - 1 }, (_, index) => {
      const nextIndex =
        (safeActiveIndex + index + 1) % doctors.length;

      return doctors[nextIndex];
    });
  }, [doctors, safeActiveIndex]);

  const canGoPrev = safeActiveIndex > 0;
  const canGoNext = safeActiveIndex < doctors.length - 1;

  const goToIndex = useCallback(
    (targetIndex: number): void => {
      if (!doctors.length) return;

      const nextIndex = Math.max(
        0,
        Math.min(targetIndex, doctors.length - 1),
      );

      setActiveIndex(nextIndex);
    },
    [doctors.length],
  );

  useEffect(() => {
    const swiper = swiperRef.current;

    if (!swiper) return;
    if (swiper.destroyed) return;
    if (swiper.activeIndex === safeActiveIndex) return;

    swiper.slideTo(safeActiveIndex);
  }, [safeActiveIndex]);

  useEffect(() => {
    if (doctors.length <= 1) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((prev) =>
        prev >= doctors.length - 1 ? 0 : prev + 1,
      );
    }, 6000);

    return () => window.clearTimeout(timer);
  }, [doctors.length, safeActiveIndex]);

  const handlePrev = (): void => {
    if (!canGoPrev) return;
    goToIndex(safeActiveIndex - 1);
  };

  const handleNext = (): void => {
    if (!canGoNext) return;
    goToIndex(safeActiveIndex + 1);
  };

  if (!activeDoctor) {
    return (
      <EditablePageCopyRegion
        path="/"
        copy={copy}
        persisted={persisted}
        label="메인 의료진 문구"
        fieldKeys={HOME_COPY_FIELD_KEYS.doctors}
      >
        <section className="relative bg-[#F6F2EF] py-20 xl:py-25">
          <div className="mx-auto max-w-7xl px-5 text-center text-sm text-[#7A7A7A]">
            관리자에서 사용자 페이지에 노출할 의료진을 등록해주세요.
          </div>
        </section>
      </EditablePageCopyRegion>
    );
  }

  return (
    <EditablePageCopyRegion
      path="/"
      copy={copy}
      persisted={persisted}
      label="메인 의료진 문구"
      fieldKeys={HOME_COPY_FIELD_KEYS.doctors}
    >
      <section className="group/cms-collection relative bg-[#F6F2EF] py-20 xl:py-25">
        <CollectionAdminEditButton
          href="/admin/doctors"
          label="메인 의료진"
        />

        <FadeInUp>
          <div className="mx-auto w-full max-w-7xl">
            <MainSectionHeader
              usePaddingHorizontal
              eyebrow={copy.doctorsEyebrow}
              title={
                <>
                  <TypographyP managed={false}>
                    {copy.doctorsTitle1}
                  </TypographyP>
                  <TypographyP managed={false}>
                    {copy.doctorsTitle2}
                  </TypographyP>
                </>
              }
            />

            <div className="flex flex-col xl:mt-15 xl:flex-row-reverse xl:items-center xl:justify-between">
              <div className="self-end pr-5">
                <Link
                  href="/about/doctors"
                  className="mt-5 inline-block self-end rounded-lg border border-[#FD7740] px-2.5 py-1.5 xl:mt-0 xl:rounded-full xl:px-7 xl:py-2.5"
                >
                  <div className="flex items-center gap-1">
                    <span className="text-[15px] font-semibold text-[#FD7740] xl:text-lg">
                      {copy.doctorsViewAll}
                    </span>
                    <ArrowRight size={20} color="#FD7740" />
                  </div>
                </Link>
              </div>

              <ul className="mt-5 grid grid-cols-3 justify-items-center gap-0.5 px-5 xl:mt-0 xl:flex xl:items-center">
                {doctors.map((doctor, index) => {
                  const isActive =
                    activeDoctor.id === doctor.id;

                  return (
                    <li key={doctor.id} className="w-full">
                      <button
                        type="button"
                        onClick={() => goToIndex(index)}
                        className={`flex h-full w-full items-center justify-center py-2 font-semibold xl:px-5 xl:py-2.5 ${
                          isActive
                            ? 'rounded-[10px] bg-[#171719] text-white'
                            : 'text-[#A39B96]'
                        }`}
                      >
                        {doctor.name} {doctor.position}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-3 xl:mt-5">
              <div className="xl:grid xl:grid-cols-[7fr_3fr] xl:gap-20">
                <div className="relative w-full overflow-hidden px-5 xl:grid xl:grid-cols-[5.25fr_4.75fr] xl:gap-x-10 xl:pl-5 xl:pr-0">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) =>
                      setActiveIndex(swiper.activeIndex)
                    }
                    className="w-full overflow-hidden"
                  >
                    {doctors.map((doctor, index) => (
                      <SwiperSlide key={doctor.id}>
                        <DoctorPhotoCard
                          doctor={doctor}
                          isActive={
                            index === safeActiveIndex
                          }
                          copy={copy}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <div className="relative mt-5 xl:mt-0 xl:flex xl:flex-col xl:items-start xl:justify-center">
                    <AdminEditButton
                      href={`/admin/doctors/${activeDoctor.id}#admin-doctor-basic`}
                      label={`${activeDoctor.name} ${activeDoctor.position}`}
                      className="right-0 top-0"
                    />

                    <TypographyP
                      managed={false}
                      className={`mx-auto w-9/10 break-keep text-center text-lg text-[#164534] ${jejuMyeongjo.className} xl:w-full xl:text-left xl:text-2xl`}
                    >
                      “{activeDoctor.homeQuote}”
                    </TypographyP>

                    <div className="mt-3 flex items-center justify-center gap-2.5 font-bold xl:mt-10 xl:gap-2">
                      <div className="flex items-center gap-1 xl:gap-1.5">
                        <TypographyH2
                          managed={false}
                          className="text-xl text-[#262C35] xl:text-[32px]"
                        >
                          {activeDoctor.name}
                        </TypographyH2>
                        <span className="text-xl text-[#262C35] xl:relative xl:top-0.5 xl:text-2xl">
                          {activeDoctor.position}
                        </span>
                      </div>

                      <span className="rounded-full bg-[#AE8F82] px-2.5 py-0.5 text-sm text-white xl:text-[15px]">
                        {specialistLabel(
                          activeDoctor.department,
                          copy.doctorsSpecialistSuffix,
                        )}
                      </span>
                    </div>

                    <ul className="hidden xl:mt-5 xl:block xl:space-y-1 xl:text-lg xl:font-medium xl:text-[#555555]">
                      {activeDoctor.histories.map((history) => (
                        <li
                          key={history}
                          className="flex gap-3"
                        >
                          <span aria-hidden="true">•</span>
                          <span>{history}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="hidden xl:relative xl:flex xl:opacity-50">
                  {stackedDoctors
                    .slice(0, 5)
                    .map((doctor, index) => {
                      const targetIndex =
                        doctors.findIndex(
                          (item) =>
                            item.id === doctor.id,
                        );

                      const image =
                        doctor.profileImageUrl ??
                        doctor.motionImageUrl;

                      if (!image) return null;

                      return (
                        <button
                          key={doctor.id}
                          type="button"
                          onClick={() =>
                            goToIndex(targetIndex)
                          }
                          className="absolute left-1/2 top-1/2 aspect-[0.95/1] w-75 overflow-hidden rounded-3xl bg-white shadow-[0_16px_45px_rgba(0,0,0,0.08)] transition-transform duration-300"
                          style={{
                            zIndex:
                              stackedDoctors.length -
                              index,
                            transform: `translate(calc(-50% + ${
                              index * 10
                            }px), calc(-50% + ${
                              index * 3
                            }px))`,
                            opacity: 1 - index * 0.08,
                          }}
                          aria-label={`${doctor.name} ${doctor.position} 보기`}
                        >
                          <Image
                            src={image}
                            alt={`${doctor.name} ${doctor.position}`}
                            fill
                            unoptimized={image
                              .toLowerCase()
                              .includes('.gif')}
                            className="object-contain object-bottom"
                          />
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3.5 xl:mt-5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={!canGoPrev}
                aria-label={copy.doctorsPrevAria}
                className={
                  canGoPrev
                    ? 'text-[#666666]'
                    : 'text-[#D0D0D0]'
                }
              >
                <ArrowLeft />
              </button>

              <div className="flex items-center gap-2.5 font-semibold">
                <span className="text-[#D0D0D0]">
                  {safeActiveIndex + 1}
                </span>
                <span className="text-[#D0D0D0]">/</span>
                <span className="text-[#666666]">
                  {doctors.length}
                </span>
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={!canGoNext}
                aria-label={copy.doctorsNextAria}
                className={
                  canGoNext
                    ? 'text-[#666666]'
                    : 'text-[#D0D0D0]'
                }
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </FadeInUp>
      </section>
    </EditablePageCopyRegion>
  );
}

function DoctorPhotoCard({
  doctor,
  isActive,
  copy,
}: {
  doctor: HomeDoctor;
  isActive: boolean;
  copy: InlineContentData;
}): React.ReactNode {
  const [gifRestartKey, setGifRestartKey] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    setGifRestartKey((prev) => prev + 1);
  }, [isActive]);

  const motionImage =
    doctor.motionImageUrl ?? doctor.profileImageUrl;
  const profileImage =
    doctor.profileImageUrl ?? doctor.motionImageUrl;
  const image = isActive ? motionImage : profileImage;

  return (
    <div className="relative overflow-clip rounded-xl border border-gray-200 bg-white xl:rounded-[20px]">
      <AdminEditButton
        href={`/admin/doctors/${doctor.id}#admin-doctor-images`}
        label={`${doctor.name} ${doctor.position} 이미지`}
      />

      <div className="relative aspect-[1/1.197] w-full">
        {image ? (
          <Image
            key={
              isActive
                ? `${doctor.id}-${gifRestartKey}`
                : doctor.id
            }
            src={
              isActive &&
              doctor.motionImageUrl &&
              doctor.motionImageUrl
                .toLowerCase()
                .includes('.gif')
                ? `${doctor.motionImageUrl}?restart=${gifRestartKey}`
                : image
            }
            alt={`${doctor.name} ${doctor.position}`}
            fill
            unoptimized={image
              .toLowerCase()
              .includes('.gif')}
            className={
              isActive && doctor.motionImageUrl
                ? 'object-cover'
                : 'object-contain object-bottom'
            }
          />
        ) : (
          <div className="grid h-full place-items-center bg-[#F5F5F5] text-sm text-[#A1A1AA]">
            의료진 이미지를 등록해주세요.
          </div>
        )}

        <div className="absolute bottom-0 left-0 grid w-full grid-cols-2 text-center font-bold text-white xl:text-[22px]">
          <Link
            href={doctor.detailHref}
            className="bg-[#319681] py-3 xl:py-5"
          >
            {copy.doctorsSchedule}
          </Link>

          <Link
            href={doctor.reservationHref || '/reservation'}
            className="bg-[#045545] py-3 xl:py-5"
          >
            {copy.doctorsReservation}
          </Link>
        </div>
      </div>
    </div>
  );
}
