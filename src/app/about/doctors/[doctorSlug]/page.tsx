"use client";

import Inner from "@/app/_components/inner";
import Breadcrumb from "@/app/_components/ui/breadcrumb";
import { ArrowRight, HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Marquee from "react-fast-marquee";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  getDoctorBySlug,
  type Doctor,
  type DoctorScheduleStatus,
} from "../data";

import "swiper/css";

const scheduleDays = [
  { key: "mon", label: "월" },
  { key: "tue", label: "화" },
  { key: "wed", label: "수" },
  { key: "thu", label: "목" },
  { key: "fri", label: "금" },
  { key: "sat", label: "토" },
] as const;

const patientReviews = [
  {
    id: 1,
    imageSrc: "/assets/images/home-review-after-1.png",
    patientName: "김*숙 님",
    age: 34,
    gender: "여성",
    treatment: "레이저 정맥 폐쇄술 + 경화요법",
  },
  {
    id: 2,
    imageSrc: "/assets/images/home-review-before-1.png",
    patientName: "김*숙 님",
    age: 34,
    gender: "여성",
    treatment: "레이저 정맥 폐쇄술 + 경화요법",
  },
  {
    id: 3,
    imageSrc: "/assets/images/home-review-after-1.png",
    patientName: "김*숙 님",
    age: 34,
    gender: "여성",
    treatment: "레이저 정맥 폐쇄술 + 경화요법",
  },
] as const;

const thumbnails = [
  {
    id: 1,
    title: "하지정맥류 관리 말도 안되는 소리!",
    imageUrl: "/assets/doctors/temp-thumbnail-1.png",
    path: "/",
  },
  {
    id: 2,
    title: "일상을 바꾸다",
    imageUrl: "/assets/doctors/temp-thumbnail-2.png",
    path: "/",
  },
  {
    id: 3,
    title: "왜 해?! 자궁적출",
    imageUrl: "/assets/doctors/temp-thumbnail-3.png",
    path: "/",
  },
] as const;

const thesis = [
  {
    id: 1,
    title: "대한정맥학회 학술지 논문 게재",
    imageUrl: "/assets/doctors/temp-thesis.png",
    path: "/",
  },
  {
    id: 2,
    title: "대한정맥학회 학술지 논문 게재",
    imageUrl: "/assets/doctors/temp-thesis.png",
    path: "/",
  },
  {
    id: 3,
    title: "대한정맥학회 학술지 논문 게재",
    imageUrl: "/assets/doctors/temp-thesis.png",
    path: "/",
  },
] as const;

type DoctorDetailRouteParams = {
  doctorSlug: string;
};

export default function DoctorDetailPage(): React.ReactElement {
  const { doctorSlug } = useParams<DoctorDetailRouteParams>();
  const doctor = getDoctorBySlug(doctorSlug);

  if (!doctor) {
    return (
      <div className="mt-20 px-5 text-center xl:mt-5">
        <p className="font-bold text-lg text-[#262C35]">
          의료진 정보를 찾을 수 없습니다.
        </p>

        <Link
          href="/about/doctors"
          className="mt-5 inline-flex rounded-full border border-[#E5E7EB] px-5 py-2 font-bold text-sm text-[#262C35]"
        >
          의료진 전체보기
        </Link>
      </div>
    );
  }

  return (
    <div
      className="mt-20
      xl:mt-5"
    >
      <Inner usePaddingHorizontal>
        <section>
          <Breadcrumb id="doctor-detail-breadcrumb" />

          <div
            className="mt-10 mb-5 flex flex-col items-center justify-center
            xl:my-15"
          >
            <h1
              className="font-bold text-[26px] text-[#333333]
              xl:text-[50px]"
            >
              의료진 상세보기
            </h1>
          </div>
        </section>
      </Inner>

      <DoctorHero doctor={doctor} />

      <section
        className="pt-5 bg-[#F5F5F5]
        xl:pb-15"
      >
        <Inner usePaddingHorizontal>
          <ScheduleTable doctor={doctor} />
        </Inner>

        <PatientReviewSection />

        <MediaSection />
      </section>

      <ResearchSection />
    </div>
  );
}

function DoctorHero({ doctor }: { doctor: Doctor }): React.ReactElement {
  return (
    <div
      className="py-5 bg-[#F5F6F8]
      xl:py-10"
    >
      <Inner usePaddingHorizontal>
        <div
          className="grid grid-cols-1
          xl:grid-cols-[1fr_1fr] xl:gap-x-12"
        >
          {/*  */}
          {/*  */}

          {/* 프로필 이미지 */}
          <div
            className="rounded-xl bg-white
            xl:rounded-[14px]"
          >
            <div className="relative w-full aspect-335/300 flex justify-center items-end">
              <div className="relative h-full aspect-232/382">
                <Image
                  src={doctor.commonProfileImageSrc}
                  alt={`${doctor.name} ${doctor.position}`}
                  fill
                  priority
                  className="object-cover object-bottom"
                />
              </div>
            </div>
          </div>

          {/* 성함, 분야, 좋아요, 진료 예약 */}
          <div className="mt-2.5 flex justify-between items-center">
            <div
              className="flex flex-col
              xl:flex-row-reverse xl:items-center xl:gap-2"
            >
              <span
                className="text-xs text-[#767C88]
                xl:relative xl:top-2 xl:text-lg"
              >
                {doctor.department}
              </span>
              <h3
                className="font-bold text-lg text-[#262C35]
                xl:text-[34px]"
              >
                {doctor.name} {doctor.position}
              </h3>
            </div>

            <div
              className="flex items-center gap-2.5
              xl:gap-5"
            >
              <button>
                <HeartIcon color="#B2AFAC" className="w-5 h-5 xl:w-8 xl:h-8" />
              </button>
              <button
                className="px-5 py-2 rounded-full bg-[#FD7740] font-bold text-sm text-white
              xl:px-10 xl:py-3 xl:text-xl"
              >
                진료 예약하기
              </button>
            </div>
          </div>

          {/* 전문진료분야, 학력·약력 */}
          <div
            className="mt-5 space-y-5
            xl:mt-9 xl:space-y-7 xl:col-start-2 xl:row-start-1"
          >
            <DetailInfoBlock title="전문진료분야">
              <p
                className="text-[#262C35]
                xl:text-xl"
              >
                {doctor.detailSpecialties.join(", ")}
              </p>
            </DetailInfoBlock>

            <DetailInfoBlock title="학력·약력">
              <ul className="list-disc pl-5">
                {doctor.educations.map((education) => (
                  <li key={education} className="xl:leading-[160%] xl:text-xl">
                    {education}
                  </li>
                ))}
              </ul>
            </DetailInfoBlock>
          </div>

          {/*  */}
          {/*  */}
        </div>
      </Inner>
    </div>
  );
}

function DetailInfoBlock({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className={className}>
      <h3
        className="relative mb-2 pb-2 border-b border-b-[#E5E7EB] font-semibold text-sm text-[#FB9A74]
        xl:pl-9 xl:text-[28px] xl:text-[#FD7740]
        xl:before:absolute xl:before:left-0 xl:before:top-2 xl:before:w-7 xl:before:h-7
        xl:before:bg-[url('/assets/brand/symbol.svg')] xl:before:bg-contain xl:before:bg-center xl:before:bg-no-repeat"
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function ScheduleTable({ doctor }: { doctor: Doctor }): React.ReactElement {
  return (
    <div>
      <div
        className="rounded-md border border-[#DCE3E1] bg-white overflow-hidden
        xl:mx-auto"
      >
        <div
          className="grid grid-cols-[44px_repeat(6,minmax(0,1fr))] bg-[#347F6D] text-center text-xs font-bold text-white
          xl:grid-cols-[90px_repeat(6,minmax(0,1fr))] xl:text-lg"
        >
          <div className="py-3 xl:py-4">시간</div>
          {scheduleDays.map((day) => (
            <div key={day.key} className="py-3 xl:py-4">
              {day.label}
            </div>
          ))}
        </div>

        {doctor.schedule.map((row) => (
          <div
            key={row.label}
            className="py-2 grid grid-cols-[44px_repeat(6,minmax(0,1fr))] items-center border-t border-[#EEF0F2] text-center text-xs
            xl:py-4 xl:grid-cols-[90px_repeat(6,minmax(0,1fr))] xl:text-lg"
          >
            <div className="font-bold text-[#222222]">{row.label}</div>
            {scheduleDays.map((day) => (
              <div key={day.key} className="flex justify-center">
                <ScheduleBadge status={row[day.key]} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <p
        className="mt-3 break-keep text-xs leading-5 text-[#999999]
        xl:mx-auto xl:mt-4 xl:leading-[180%] xl:text-sm"
      >
        *진료시간표는 상황에 따라 변경될 수 있으니, 내원 전 꼭 병원에
        문의해주시길 바랍니다.
        <br />
        *토요일 진료는 예약 및 내원 시 확인 부탁드립니다. (일요일, 공휴일은
        휴진입니다.)
      </p>
    </div>
  );
}

function ScheduleBadge({
  status,
}: {
  status: DoctorScheduleStatus;
}): React.ReactElement {
  const className = {
    진료: "bg-[#EEF0F4] text-[#111111]",
    휴진: "bg-transparent text-[#BBBBBB]",
    문의: "bg-transparent text-[#0E705B]",
  }[status];

  return (
    <span
      className={`inline-flex h-6 min-w-10 items-center justify-center rounded-full px-2 font-bold ${className}
      xl:h-8 xl:min-w-20`}
    >
      {status}
    </span>
  );
}

function PatientReviewSection(): React.ReactElement {
  return (
    <section
      className="mt-10
        xl:relative xl:mx-auto xl:mt-15 xl:max-w-7xl"
    >
      <SectionHead title="환자 후기" moreLabel="후기 더보기" />

      <div
        className="mt-5 px-5
  xl:mt-0 xl:ml-80 xl:px-0"
      >
        <Swiper
          slidesPerView={1.2}
          spaceBetween={12}
          breakpoints={{
            1280: {
              slidesPerView: 2.4,
              spaceBetween: 20,
            },
          }}
        >
          {patientReviews.map((review) => (
            <SwiperSlide key={review.id}>
              <article className="w-full">
                <div
                  className="relative aspect-square overflow-hidden rounded-2xl bg-[#EEEEEE]
            xl:rounded-[20px]"
                >
                  <Image
                    src={review.imageSrc}
                    alt={`${review.patientName} 환자 후기`}
                    fill
                    className="object-cover"
                  />

                  <div
                    className="hidden
              xl:absolute xl:inset-0 xl:p-12 xl:flex xl:flex-col xl:gap-3 xl:justify-center xl:items-center xl:bg-black/45"
                  >
                    <p className="font-medium text-center text-xs text-white">
                      * 의료법에 의거하여 치료후기는 로그인 후 열람 가능합니다.
                    </p>

                    <Link
                      target="_blank"
                      href="/"
                      className="px-10 py-2.5 rounded-full bg-[#0E705B] font-bold text-[15px] text-white"
                    >
                      로그인
                    </Link>
                  </div>
                </div>

                <div
                  className="mt-4 grid grid-cols-[auto_1fr] items-start gap-x-2.5 gap-y-4
            xl:mt-[18.5px] xl:gap-x-3"
                >
                  <span
                    className="px-3 py-1 rounded-full bg-[#DEDEE1] font-bold text-xs text-[#394559]
              xl:px-4 xl:text-lg"
                  >
                    환자정보
                  </span>

                  <span className="break-keep font-medium text-[#767C88]">
                    {review.patientName} ({review.age}세 · {review.gender})
                  </span>

                  <span
                    className="px-3 py-1 rounded-full bg-[#DEDEE1] font-bold text-xs text-[#394559]
              xl:px-4 xl:text-lg"
                  >
                    치료정보
                  </span>

                  <span className="break-keep font-medium text-[#767C88]">
                    {review.treatment}
                  </span>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Link
        target="_blank"
        href={`/`}
        className="hidden
        xl:mx-auto xl:mt-9 xl:px-5 xl:flex xl:justify-end xl:items-center xl:gap-2.5"
      >
        <span className="font-bold text-xl text-[#FD7740]">후기 더보기</span>
        <ArrowRight size={20} color="#FD7740" />
      </Link>
    </section>
  );
}

function MediaSection(): React.ReactElement {
  return (
    <section
      className="mt-15
      xl:relative xl:mx-auto xl:mt-15 xl:max-w-7xl"
    >
      <SectionHead title="미디어" moreLabel="영상 더보기" />

      <div
        className="mt-5 px-5 flex flex-col gap-3
          xl:mt-0 xl:ml-80 xl:px-0 xl:gap-6"
      >
        <Link
          target="_blank"
          href={`/`}
          className="relative inline-block w-full aspect-video rounded-lg overflow-clip
          xl:rounded-[20px]"
        >
          <Image
            src={`/assets/doctors/temp-thumbnail-0.png`}
            alt={`temp-thumbnail-0`}
            fill
          />
        </Link>

        <div
          className="grid grid-cols-3 gap-2
          xl:gap-5"
        >
          {thumbnails.map((d) => (
            <Link
              key={d.id}
              target="_blank"
              href={d.path}
              className="relative w-full aspect-video rounded-lg overflow-clip
              xl:rounded-[20px]"
            >
              <Image src={d.imageUrl} alt={d.title} fill />
            </Link>
          ))}
        </div>
      </div>

      <Link
        target="_blank"
        href={`/`}
        className="hidden
        xl:mx-auto xl:mt-9 xl:px-5 xl:flex xl:justify-end xl:items-center xl:gap-2.5"
      >
        <span className="font-bold text-xl text-[#FD7740]">영상 더보기</span>
        <ArrowRight size={20} color="#FD7740" />
      </Link>
    </section>
  );
}

function SectionHead({
  title,
  moreLabel,
}: {
  title: string;
  moreLabel: string;
}): React.ReactElement {
  return (
    <div
      className="px-5 flex justify-between items-center 
      xl:absolute xl:w-76.5 xl:grid xl:grid-cols-[200px_1fr] xl:gap-10"
    >
      <h2
        className="font-bold text-xl text-[#767C88]
        xl:text-[28px] xl:text-[#767C88]"
      >
        {title}
      </h2>

      <Link
        target="_blank"
        href="/"
        className="px-5 py-2 flex items-center gap-4 rounded-full border border-[#105D4E]
        xl:hidden"
      >
        <span className="font-bold font-sm text-[#105D4E]">{moreLabel}</span>
        <ArrowRight size={20} color="#105D4E" />
      </Link>
    </div>
  );
}

function ResearchSection(): React.ReactElement {
  return (
    <section className="pt-20 pb-15 bg-[linear-gradient(to_bottom,#FFFFFF_0%,#FFEAE2_66%,#FFFFFF_100%)]">
      <div className="px-5 text-center text-[#333333]">
        <h2
          className="font-bold text-[26px]
          xl:text-[34px]"
        >
          끊임없이 연구하여 <br className="block xl:hidden" />
          의료계가 인정한 전문성
        </h2>

        <p
          className="mt-3 text-sm
          xl:mt-5 xl:text-xl"
        >
          수많은 SCI급 논문 발표와 전문 서적 집필,{" "}
          <br className="block xl:hidden" />
          국내외 학술 활동 및 수상을 통해 <br className="block xl:hidden" />
          의료계에서도 인정받는 전문성을 이어가고 있습니다.
        </p>
      </div>

      <Marquee className="mt-10 xl:mt-15" gradient={false} speed={35} autoFill>
        {thesis.map((d) => (
          <Link
            key={d.id}
            target="_blank"
            href={d.path}
            className="relative mx-1.5 block w-37.5 shrink-0 aspect-150/186
            xl:mx-3 xl:w-82"
          >
            <Image
              src={d.imageUrl}
              alt={d.title}
              fill
              className="object-cover"
            />
          </Link>
        ))}
      </Marquee>

      <div
        className="mt-10 mb-15 px-5 flex justify-center
        xl:mt-15 xl:mb-20"
      >
        <Link
          href="/about/doctors"
          className="px-5 py-2 rounded-full border border-[#E5E7EB] bg-white font-bold text-sm text-[#262C35]
          xl:px-10 xl:py-3 xl:text-xl"
        >
          의료진 전체보기
        </Link>
      </div>
    </section>
  );
}
