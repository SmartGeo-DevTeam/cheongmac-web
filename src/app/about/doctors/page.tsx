import BottomBanner from "@/app/_components/bottom-banners";
import Inner from "@/app/_components/inner";
import { HeartIcon, Home, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { DOCTORS, type Doctor } from "./data";

function DoctorCard({ doctor }: { doctor: Doctor }): React.ReactNode {
  return (
    <li
      className="relative grid grid-cols-[145px_1fr] gap-x-5 gap-y-10
      xl:grid-cols-[302px_1fr]"
    >
      <button
        type="button"
        aria-label={`${doctor.name} ${doctor.position} 관심 의료진`}
        className="absolute right-0 top-0.5 z-10
        xl:left-6 xl:top-6"
      >
        <HeartIcon size={20} color="#B2AFAC" />
      </button>

      <div
        className="shrink-0 relative w-full aspect-145/200 rounded-[14px] bg-[#F7F4F2] overflow-clip
        xl:aspect-[302/360]"
      >
        <Image
          src={doctor.mobileImageSrc}
          alt={`${doctor.name} ${doctor.position}`}
          fill
          className="object-cover xl:hidden"
        />

        <Image
          src={doctor.desktopImageSrc}
          alt={`${doctor.name} ${doctor.position}`}
          fill
          className="hidden object-cover xl:block"
        />
      </div>

      <div className="flex flex-col">
        <span
          className="font-medium text-sm text-[#C8AFA4]
          xl:mt-10 xl:text-lg"
        >
          {doctor.department}
        </span>

        <div className="flex items-end gap-0.5">
          <h3
            className="font-bold text-[22px] text-[#262C35]
            xl:text-[32px]"
          >
            {doctor.name}
          </h3>

          <span
            className="relative font-bold text-[22px] text-[#262C35]
            xl:bottom-0.5 xl:text-[26px]"
          >
            {doctor.position}
          </span>
        </div>

        <span
          className="block mt-4 font-semibold text-sm text-[#BBBBBB]
          xl:mt-6 xl:text-base"
        >
          전문분야
        </span>

        <p
          className="break-keep text-[#262C35]
          xl:flex-1 xl:mt-2 xl:text-xl"
        >
          {doctor.specialties.join(", ")}
        </p>

        <div
          className="mt-8 grid grid-cols-2 gap-x-1 font-bold text-sm text-white
          xl:mb-6 xl:gap-x-2 xl:text-base"
        >
          <Link
            href={`/about/doctors/${doctor.slug}`}
            className="py-2 rounded-full bg-[#8BC9B8] text-center
            xl:py-3"
          >
            상세보기
          </Link>

          <Link
            target="_blank"
            href={doctor.reservationHref}
            className="py-2 rounded-full bg-[#FD7740] text-center
            xl:py-3"
          >
            예약하기
          </Link>
        </div>
      </div>
    </li>
  );
}

export default function AboutDoctors(): React.ReactNode {
  return (
    <div
      className="mt-20
      xl:mt-5"
    >
      <Inner usePaddingHorizontal>
        <section>
          <div
            className="flex items-center text-xs
            xl:text-base"
          >
            <Link href="/" className="flex items-center gap-1">
              <Home size={16} />
              <span>홈</span>
            </Link>

            <div className="mx-1.5 w-px h-4 bg-[#DDDDDD]" />

            <select defaultValue="병원소개">
              <option>병원소개</option>
            </select>

            <div className="mx-1.5 w-px h-4 bg-[#DDDDDD]" />

            <select defaultValue="의료진/진료과">
              <option>의료진/진료과</option>
            </select>
          </div>

          <div
            className="mt-10 mb-5 flex flex-col items-center justify-center
            xl:mt-15"
          >
            <h1
              className="font-bold text-[26px] text-[#333333]
              xl:text-[50px]"
            >
              의료진/진료과
            </h1>

            <p
              className="mt-2 break-keep text-center text-sm text-[#555555]
              xl:mt-2.5 xl:text-xl"
            >
              환자의 삶에 흐르는 건강을 최고의 전문성으로 지켜내며{" "}
              <br className="hidden xl:block" />
              대한민국 혈관 치료의 표준을 만드는 청맥의 의료진을 소개합니다.
            </p>
          </div>
        </section>
      </Inner>

      <section>
        <Inner usePaddingHorizontal>
          <div
            className="grid grid-cols-2 font-semibold text-[15px]
            xl:mt-15 xl:text-[23px]"
          >
            <button
              type="button"
              className="py-1 border border-[#FD7740] border-b-transparent rounded-tl-2xl rounded-tr-2xl text-[#FD7740]
              xl:py-4"
            >
              의료진
            </button>

            <button
              type="button"
              className="py-1 border-b border-b-[#FD7740] bg-[#FBFBFB] text-[#999999]
              xl:py-4"
            >
              진료과
            </button>
          </div>
        </Inner>

        <Inner usePaddingHorizontal>
          <div
            className="mt-2 py-7 bg-[#FBFBFB]
            xl:mt-10 xl:py-0 xl:bg-transparent"
          >
            <div
              className="flex items-center gap-2
              xl:py-10 xl:justify-center xl:gap-5 xl:rounded-xl xl:border xl:border-[#E5E7EB] xl:bg-[#FBFBFB]"
            >
              <span
                className="hidden
                xl:block xl:font-bold xl:text-[28px] xl:text-[#767C88]"
              >
                의료진 검색
              </span>

              <input
                placeholder="의료진 성명 및 전문분야로 검색해보세요."
                className="pl-5 w-full h-10.5 rounded-lg border border-[#CCCCCC] font-medium text-sm
                xl:h-15 xl:px-5 xl:w-3/5 xl:text-lg"
              />

              <button
                type="button"
                aria-label="의료진 검색"
                className="shrink-0 w-10.5 h-10.5 flex justify-center items-center rounded-lg bg-[#FD7740]
                xl:w-15 xl:h-15"
              >
                <Search
                  color="#FFFFFF"
                  className="w-8 h-8
                  xl:w-8 xl:h-9"
                />
              </button>
            </div>

            <div
              className="mt-3 grid grid-cols-3 gap-x-2 justify-items-center
              xl:mx-auto xl:mt-5 xl:w-4/5 xl:gap-x-6"
            >
              <button
                type="button"
                className="py-2 w-full rounded-lg bg-[#045545] font-bold text-white
                xl:py-3 xl:text-xl"
              >
                혈관외과
              </button>

              <button
                type="button"
                className="py-2 w-full rounded-lg bg-white text-[#767C88] font-bold
                xl:py-3 xl:text-xl xl:border xl:border-[#E5E7EB] xl:bg-transparent"
              >
                영상의학과
              </button>

              <button
                type="button"
                className="py-2 w-full rounded-lg bg-white text-[#767C88] font-bold
                xl:py-3 xl:text-xl xl:border xl:border-[#E5E7EB] xl:bg-transparent"
              >
                마취통증의학과
              </button>
            </div>
          </div>
        </Inner>

        <Inner usePaddingHorizontal>
          <ul
            className="mt-12 grid grid-cols-1 gap-10
            xl:mt-15 xl:grid-cols-2 xl:gap-6"
          >
            {DOCTORS.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </ul>
        </Inner>

        <Inner usePaddingHorizontal>
          <Link
            target="_blank"
            href="/"
            className="mt-10 px-5 relative block w-full aspect-335/180 rounded-[14px] overflow-clip
            xl:aspect-1280/360"
          >
            <Image
              src="/assets/doctors/section-matching-mobile.png"
              alt="지금 나에게 필요한 청맥 의료진은 누구일까?"
              fill
              className="block xl:hidden"
            />

            <Image
              src="/assets/doctors/section-matching-desktop.png"
              alt="지금 나에게 필요한 청맥 의료진은 누구일까?"
              fill
              className="hidden xl:block"
            />
          </Link>
        </Inner>

        <Inner>
          <Link
            target="_blank"
            href="/"
            className="mt-5 relative block w-full aspect-375/250
            xl:mt-10 xl:px-5 xl:aspect-1320/715"
          >
            <Image
              src="/assets/doctors/section-message-mobile.png"
              alt="환자의 아픔을 먼저 듣고, 가장 안전한 길을 제시하겠습니다."
              fill
              className="block xl:hidden"
            />

            <div className="relative w-full h-full z-10">
              <Image
                src="/assets/doctors/section-message-desktop.png"
                alt="환자의 아픔을 먼저 듣고, 가장 안전한 길을 제시하겠습니다."
                fill
                className="hidden xl:block"
              />
            </div>
          </Link>
        </Inner>

        <BottomBanner />
      </section>
    </div>
  );
}
