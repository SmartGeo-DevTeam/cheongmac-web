'use client';

import Inner from '@/app/_components/common/inner';
import MaskedName from '@/app/_components/common/masked-name';
import PageHeader from '@/app/_components/common/page-header';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Send,
  Triangle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

type FeedbackType = {
  id: string;
  writer: string;
  title: string;
  feedback: string;
};

const feedbacks: FeedbackType[] = [
  {
    id: 'feedback-1',
    writer: '김철준',
    title: '박용범 원장님',
    feedback:
      '수술 전부터 퇴원 후 관리까지 세심하게 설명해주셔서 불안했던 마음이 놓였습니다. 정말 감사하다는 마음을 전하고 싶습니다.',
  },
  {
    id: 'feedback-2',
    writer: '강철중',
    title: '김병주 원장님',
    feedback:
      '수술 전부터 퇴원 후 관리까지 세심하게 설명해주셔서 불안했던 마음이 놓였습니다. 정말 감사하다는 마음을 전하고 싶습니다.',
  },
  {
    id: 'feedback-3',
    writer: '윤도현',
    title: '장지란 원장님',
    feedback:
      '수술 전부터 퇴원 후 관리까지 세심하게 설명해주셔서 불안했던 마음이 놓였습니다. 정말 감사하다는 마음을 전하고 싶습니다.',
  },
  {
    id: 'feedback-4',
    writer: '이진성',
    title: '전진원 원장님',
    feedback:
      '수술 전부터 퇴원 후 관리까지 세심하게 설명해주셔서 불안했던 마음이 놓였습니다. 정말 감사하다는 마음을 전하고 싶습니다.',
  },
];

export default function CommunityFeedbackPage() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <PageHeader
        desktopLineBreak
        title="고객의 소리"
        desc={`칭찬도 아쉬움도, 환자분의 모든 목소리에 귀 기울입니다. \n보내주신 의견을 바탕으로 더 나은 청맥병원을 만들어갑니다.`}
      />

      <section id="community-feedback-hero">
        <div
          className="mt-5 py-10 bg-subtle 
          xl:mt-10 xl:py-20"
        >
          <Inner>
            <h2
              className="text-center text-mo-title-2
              xl:text-left xl:text-pc-heading-1"
            >
              칭찬합니다
            </h2>

            <div
              className="relative mt-3.5
              xl:mt-10"
            >
              <button
                type="button"
                aria-label="이전 칭찬 글 보기"
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute top-1/2 left-0 -translate-y-1/2 flex justify-center items-center size-9 rounded-full border border-default bg-white text-primary shadow-md z-10
                xl:size-15"
              >
                <ChevronLeft
                  className="size-5
                  xl:size-8"
                />
              </button>

              {/* Swiper */}
              <div
                className="mx-12.5
                xl:mx-23"
              >
                <Swiper
                  className="w-full [&_.swiper-wrapper]:items-stretch"
                  slidesPerView={1}
                  loop={true}
                  grabCursor
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  onRealIndexChange={(swiper) => {
                    setActiveIndex(swiper.realIndex);
                  }}
                  breakpoints={{
                    1280: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                    },
                  }}
                >
                  {feedbacks.map((item) => (
                    <SwiperSlide key={item.id} className="h-auto!">
                      <article
                        className="px-5 py-6 rounded-xl bg-base
                        xl:px-10 xl:py-12 xl:rounded-[20px]"
                      >
                        <h3
                          className="font-bold text-accent text-[16px]
                          xl:text-[20px]"
                        >
                          {item.title}
                        </h3>

                        <p
                          className="mt-2 text-mo-body-2
                          xl:text-pc-body-2"
                        >
                          {item.feedback}
                        </p>

                        <p
                          className="mt-2 text-tertiary text-mo-caption
                          xl:mt-6 xl:text-mo-body-1"
                        >
                          <MaskedName name={item.writer} />
                        </p>
                      </article>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* 다음 슬라이드 */}
              <button
                type="button"
                aria-label="다음 칭찬 글 보기"
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute top-1/2 right-0 -translate-y-1/2 flex justify-center items-center size-9 rounded-full border border-default bg-white text-primary shadow-md z-10
                xl:size-15"
              >
                <ChevronRight
                  className="size-5
                  xl:size-8"
                />
              </button>
            </div>

            <div
              className="hidden
              xl:mt-8 xl:flex xl:justify-center xl:items-center xl:gap-2.5"
            >
              {feedbacks.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`${index + 1}번째 칭찬 글 보기`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-8 bg-accent-ai-strong'
                        : 'w-2.5 bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                );
              })}
            </div>
          </Inner>
        </div>
      </section>

      <section id="community-feedback-navs">
        <Inner>
          <div
            className="mt-10 grid gap-3
            xl:mt-20 xl:grid-cols-2 xl:gap-6"
          >
            <Link
              href="/community/feedback/write?category=praise"
              className="relative p-6 rounded-xl bg-ai-subtle
              xl:p-10"
            >
              <h2
                className="font-semibold text-brand text-[20px]
                xl:text-pc-heading-1"
              >
                감사합니다·칭찬해요
              </h2>
              <p
                className="text-bg-brand-deep text-[14px]
                xl:mt-1 xl:text-pc-body-2"
              >
                좋았던 경험이나 따뜻한 마음을 전해주세요
              </p>
              <span
                className="inline-block mt-3 px-5 py-1.5 rounded-full bg-base font-bold text-[15px]
                xl:mt-5 xl:px-7 xl:py-2 xl:font-semibold xl:text-[16px]"
              >
                작성하기
              </span>
              <Image
                src={`/feedback/letter.png`}
                alt="icon"
                width={54}
                height={54}
                className="absolute right-6 top-6 size-13.5
                xl:size-18"
              />
            </Link>

            <Link
              href="/community/feedback/write?category=complaint"
              className="relative p-6 rounded-xl bg-green-900
              xl:p-10"
            >
              <h2
                className="font-semibold text-inverse text-[20px]
                xl:text-pc-heading-1"
              >
                건의합니다·불만/고충
              </h2>
              <p
                className="text-inverse text-[14px]
                xl:mt-1 xl:text-pc-body-2"
              >
                불편했던 점이나 개선 의견을 남겨주세요
              </p>
              <span
                className="inline-block mt-3 px-5 py-1.5 rounded-full bg-base font-bold text-[15px]
                xl:mt-5 xl:px-7 xl:py-2 xl:font-semibold xl:text-[16px]"
              >
                작성하기
              </span>
              <Image
                src={`/feedback/message.png`}
                alt="icon"
                width={54}
                height={54}
                className="absolute right-6 top-6 size-13.5
                xl:size-18"
              />
            </Link>
          </div>
        </Inner>
      </section>

      <section id="community-feedback-receipt">
        <Inner>
          <div
            className="mt-10
            xl:mt-20"
          >
            <h2
              className="text-gray-900 text-mo-title-2
              xl:text-pc-heading-1"
            >
              고객의 소리 접수방법
            </h2>

            <ul
              className="mt-3 p-6 rounded-[20px] border border-default space-y-5
              xl:mt-5 xl:p-0 xl:border-0 xl:sp"
            >
              <li
                className="flex items-center gap-4
                xl:p-5 xl:gap-6 xl:rounded-xl xl:border xl:border-default"
              >
                <div
                  className="size-12 flex justify-center items-center rounded-full bg-green-50
                  xl:size-18"
                >
                  <Send className="xl:size-8" />
                </div>
                <div>
                  <h3
                    className="font-bold text-gray-900 text-[18px]
                    xl:text-pc-heading-2"
                  >
                    온라인 접수
                  </h3>
                  <p
                    className="text-tertiary text-mo-body-2
                    xl:mt-1 xl:text-pc-body-2"
                  >
                    현재 페이지에 작성 (24시간)
                  </p>
                </div>
              </li>
              <div
                className="h-px bg-default
                xl:hidden"
              />
              <li
                className="flex items-center gap-4
                xl:p-5 xl:gap-6 xl:rounded-xl xl:border xl:border-default"
              >
                <div
                  className="size-12 flex justify-center items-center rounded-full bg-green-50
                  xl:size-18"
                >
                  <Phone className="xl:size-8" />
                </div>
                <div>
                  <h3
                    className="font-bold text-gray-900 text-[18px]
                    xl:text-pc-heading-2"
                  >
                    전화 접수
                  </h3>
                  <p
                    className="text-tertiary text-mo-body-2
                    xl:mt-1 xl:text-pc-body-2"
                  >
                    051-804-1119 (병원 운영시간 내)
                  </p>
                </div>
              </li>
              <div
                className="h-px bg-default
                xl:hidden"
              />
              <li
                className="flex items-center gap-4
                xl:p-5 xl:gap-6 xl:rounded-xl xl:border xl:border-default"
              >
                <div
                  className="size-12 flex justify-center items-center rounded-full bg-green-50
                  xl:size-18"
                >
                  <MapPin className="xl:size-8" />
                </div>
                <div>
                  <h3
                    className="font-bold text-gray-900 text-[18px]
                    xl:text-pc-heading-2"
                  >
                    방문 접수
                  </h3>
                  <p
                    className="text-tertiary text-mo-body-2
                    xl:mt-1 xl:text-pc-body-2"
                  >
                    · 1층 원무과
                    <br />· 고객상담실 (병원 운영시간 내)
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </Inner>
      </section>

      <section id="community-feedback-procedure">
        <Inner>
          <div
            className="mt-10 mb-20
            xl:mt-20 xl:mb-25"
          >
            <h2
              className="text-gray-900 text-mo-title-2
              xl:text-pc-heading-1"
            >
              처리절차
            </h2>

            <ul
              className="mt-3 flex flex-col justify-center items-center gap-1
              xl:mt-5 xl:flex-row xl:gap-10"
            >
              <li
                className="w-full p-4 flex flex-col justify-center items-center rounded-xl bg-subtle text-[14px]
                xl:p-7"
              >
                <span
                  className="text-accent-ai-strong
                  xl:font-bold text-[15px]"
                >
                  STEP 1
                </span>
                <p
                  className="text-gray-900
                  xl:text-pc-body-1"
                >
                  고객 의견 접수
                </p>
              </li>
              <Triangle
                className="size-3 fill-accent-ai-strong stroke-0 rotate-180
                xl:size-12 xl:rotate-90"
              />
              <li
                className="w-full p-4 flex flex-col justify-center items-center rounded-xl bg-subtle text-[14px]
                xl:p-7"
              >
                <span
                  className="text-accent-ai-strong
                  xl:font-bold text-[15px]"
                >
                  STEP 2
                </span>
                <p
                  className="text-gray-900
                  xl:text-pc-body-1"
                >
                  관련 부서 검토
                </p>
              </li>
              <Triangle
                className="size-3 fill-accent-ai-strong stroke-0 rotate-180
                xl:size-12 xl:rotate-90"
              />
              <li
                className="w-full p-4 flex flex-col justify-center items-center rounded-xl bg-subtle text-[14px]
                xl:p-7"
              >
                <span
                  className="text-accent-ai-strong
                  xl:font-bold text-[15px]"
                >
                  STEP 3
                </span>
                <p
                  className="text-gray-900
                  xl:text-pc-body-1"
                >
                  결과 회신 및 개선 활동
                </p>
              </li>
            </ul>
          </div>
        </Inner>
      </section>
    </>
  );
}
