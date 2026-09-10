'use client';

import {
  H2 as TypographyH2,
  P as TypographyP,
} from '@/app/_components/ui/typography';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export type DoctorReviewView = {
  id: string;
  imageUrl: string | null;
  patientName: string;
  age: number | null;
  gender: string | null;
  treatment: string | null;
};

export type DoctorPresentationView = {
  id: string;
  title: string;
  imageUrl: string | null;
  linkUrl: string | null;
};

export function DoctorReviewCarousel({
  reviews,
}: {
  reviews: DoctorReviewView[];
}) {
  if (!reviews.length) {
    return (
      <div className="mt-5 px-5 xl:ml-80 xl:mt-0 xl:px-0">
        <div className="rounded-2xl border border-dashed border-[#D9DDE1] bg-white px-5 py-12 text-center text-sm text-[#9AA0A7] xl:text-base">
          등록된 환자 후기가 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 px-5 xl:ml-80 xl:mt-0 xl:px-0">
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
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <article className="w-full">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#EEEEEE] xl:rounded-[20px]">
                {review.imageUrl ? (
                  <Image
                    src={review.imageUrl}
                    alt={`${review.patientName} 환자 후기`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 360px, 82vw"
                  />
                ) : null}

                <div className="hidden xl:absolute xl:inset-0 xl:flex xl:flex-col xl:items-center xl:justify-center xl:gap-3 xl:bg-black/45 xl:p-12">
                  <TypographyP managed={false} className="text-center text-xs font-medium text-white">
                    * 의료법에 의거하여 치료후기는 로그인 후 열람 가능합니다.
                  </TypographyP>
                  <Link
                    href="/signin"
                    className="rounded-full bg-[#0E705B] px-10 py-2.5 text-[15px] font-bold text-white"
                  >
                    로그인
                  </Link>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-[auto_1fr] items-start gap-x-2.5 gap-y-4 xl:mt-[18.5px] xl:gap-x-3">
                <span className="rounded-full bg-[#DEDEE1] px-3 py-1 text-xs font-bold text-[#394559] xl:px-4 xl:text-lg">
                  환자정보
                </span>
                <span className="break-keep font-medium text-[#767C88]">
                  {review.patientName}
                  {review.age ? ` (${review.age}세` : ''}
                  {review.age && review.gender ? ` · ${review.gender})` : ''}
                </span>

                <span className="rounded-full bg-[#DEDEE1] px-3 py-1 text-xs font-bold text-[#394559] xl:px-4 xl:text-lg">
                  치료정보
                </span>
                <span className="break-keep font-medium text-[#767C88]">
                  {review.treatment || '-'}
                </span>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export function DoctorPresentationMarquee({
  items,
}: {
  items: DoctorPresentationView[];
}) {
  if (!items.length) return null;

  return (
    <Marquee className="mt-10 xl:mt-15" gradient={false} speed={35} autoFill>
      {items.map((item) => {
        const content = item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 328px, 150px"
          />
        ) : (
          <span className="grid h-full place-items-center rounded-xl border border-[#E6E7E9] bg-white px-4 text-center text-sm font-semibold text-[#555B63]">
            {item.title}
          </span>
        );

        return item.linkUrl ? (
          <Link
            key={item.id}
            href={item.linkUrl}
            target="_blank"
            rel="noreferrer"
            className="relative mx-1.5 block aspect-150/186 w-37.5 shrink-0 xl:mx-3 xl:w-82"
          >
            {content}
          </Link>
        ) : (
          <div
            key={item.id}
            className="relative mx-1.5 block aspect-150/186 w-37.5 shrink-0 xl:mx-3 xl:w-82"
          >
            {content}
          </div>
        );
      })}
    </Marquee>
  );
}

export function DoctorSectionHead({
  title,
  moreHref,
  moreLabel,
}: {
  title: string;
  moreHref?: string;
  moreLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between px-5 xl:absolute xl:grid xl:w-76.5 xl:grid-cols-[200px_1fr] xl:gap-10">
      <TypographyH2 className="text-xl font-bold text-[#767C88] xl:text-[28px]">
        {title}
      </TypographyH2>

      {moreHref && moreLabel ? (
        <Link
          href={moreHref}
          className="flex items-center gap-4 rounded-full border border-[#105D4E] px-5 py-2 xl:hidden"
        >
          <span className="text-sm font-bold text-[#105D4E]">{moreLabel}</span>
          <ArrowRight size={20} color="#105D4E" />
        </Link>
      ) : null}
    </div>
  );
}
