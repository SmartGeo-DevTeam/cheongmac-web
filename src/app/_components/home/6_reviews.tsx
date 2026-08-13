'use client';

import FadeInUp from '@/app/_components/fade-in-up';
import MainSectionHeader from '@/app/_components/main-section-header';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const reviewCategories = [
  '골반정맥류',
  '정계정맥류',
  '하지정맥류',
  '자궁근종',
  '투석혈관',
  '당뇨발',
] as const;

const mainReview = {
  beforeImageSrc: '/assets/home/reviews/1-before.png',
  afterImageSrc: '/assets/home/reviews/1-after.png',
  beforeImageAlt: 'beforeImage',
  afterImageAlt: 'afterImage',
  quote: '거짓말처럼 나아서 너무 신기합니다.',
  patientName: '김*숙 님',
  age: 34,
  gender: '여성',
  treatment: '레이저 정맥 폐쇄술 + 경화요법',
  doctorName: '박용범 원장',
  doctorImageSrc: '/assets/common/doctors/bak.png',
  doctorImageAlt: 'bak',
};

const videoReviews = [
  {
    id: 1,
    imageSrc: '/assets/home/reviews/patient-1.gif',
    imageAlt: 'patient-1',
    patientName: 'ㅇㅇㅇ님',
    gender: '남성',
    age: 42,
    keywords: ['만성신부전증', '동맥경화', '관련키워드'],
    title: '50m도 걷기 힘들었었습니다..',
  },
  {
    id: 2,
    imageSrc: '/assets/home/reviews/patient-2.gif',
    imageAlt: 'patient-2',
    patientName: 'ㅇㅇㅇ님',
    gender: '남성',
    age: 42,
    keywords: ['만성신부전증', '동맥경화', '관련키워드'],
    title: '50m도 걷기 힘들었었습니다..',
  },
  {
    id: 3,
    imageSrc: '/assets/home/reviews/patient-3.gif',
    imageAlt: 'patient-3',
    patientName: 'ㅇㅇㅇ님',
    gender: '남성',
    age: 42,
    keywords: ['만성신부전증', '동맥경화', '관련키워드'],
    title: '50m도 걷기 힘들었었습니다..',
  },
] as const;

export default function HomeReviews() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof reviewCategories)[number]>('골반정맥류');

  const [isAfterVisible, setIsAfterVisible] = useState(false);

  return (
    <FadeInUp>
      <section
        className="mt-15 max-w-7xl
    xl:mx-auto"
      >
        <MainSectionHeader
          usePaddingHorizontal
          eyebrow="치료후기"
          title={
            <>
              <p>치료 후 마주할 놀라운 변화,</p>
              <p>먼저 경험한 분들의 이야기</p>
            </>
          }
          description={
            <>
              <p>청맥을 만나고 혈관 건강과 삶의 활력을 되찾은 분들.</p>
              <p>
                전문의의 정확한 진단과 치료가 어떤 변화를 만드는지 직접 확인해
                보세요.
              </p>
            </>
          }
        />

        <div
          className="mt-10 pl-5
        xl:mt-8 xl:flex xl:justify-between xl:items-center"
        >
          <ul
            className="pr-5 py-1 flex items-center gap-2 rounded-[10px] bg-[#F7F7F7] whitespace-nowrap overflow-scroll
            "
          >
            {reviewCategories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-[10px] font-semibold text-[15px]
                      ${isActive ? 'bg-[#1B705B] text-white' : 'bg-transparent text-[#1B705B]'}
                      `}
                  >
                    {category}
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            className="hidden
          xl:flex"
          >
            <div className="pr-5 self-end">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={`/`}
                className="self-end
              xl:flex xl:items-center"
              >
                <span
                  className="font-semibold text-[15px] text-[#D3BBA2]
                xl:hidden"
                >
                  + 전체보기
                </span>
                <div
                  className="hidden
                  xl:px-5 xl:py-2.5 xl:flex xl:items-center xl:gap-2"
                >
                  <span className="font-bold text-[#93755B]">
                    더 많은 사례 보기
                  </span>
                  <ArrowRight size={20} color="#93755B" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-4 px-5">
          <div
            className="flex flex-col rounded-xl overflow-clip
          xl:grid xl:grid-cols-[6fr_4fr] xl:items-stretch"
          >
            <div
              className="relative w-full aspect-square
            xl:flex xl:aspect-auto xl:h-full"
            >
              {/* Mobile: 터치 시 after 이미지 fade toggle */}
              <button
                type="button"
                onClick={() => setIsAfterVisible((prev) => !prev)}
                className="relative block w-full h-full xl:hidden"
                aria-label="치료 전후 사진 보기"
              >
                <Image
                  src={mainReview.beforeImageSrc}
                  alt={mainReview.beforeImageAlt}
                  fill
                  className="object-cover"
                />

                <Image
                  src={mainReview.afterImageSrc}
                  alt={mainReview.afterImageAlt}
                  fill
                  className={`object-cover transition-opacity duration-500 ease-out
                  ${isAfterVisible ? 'opacity-100' : 'opacity-0'}
                  `}
                />

                <p className="absolute left-1/2 top-5 -translate-x-1/2 px-3 py-1.5 rounded-sm bg-black font-bold text-sm text-white">
                  사진을 눌러보세요!
                </p>
              </button>

              {/* Desktop: before / after 둘 다 항상 노출 */}
              <div className="hidden w-full h-full xl:flex">
                <div className="relative w-1/2 h-full">
                  <Image
                    src={mainReview.beforeImageSrc}
                    alt={mainReview.beforeImageAlt}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative w-1/2 h-full">
                  <Image
                    src={mainReview.afterImageSrc}
                    alt={mainReview.afterImageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div
                className="hidden
              xl:flex xl:absolute xl:left-1/2 xl:top-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2 xl:w-12.5 xl:h-12.5"
              >
                <Image
                  src="/assets/home/reviews/more.svg"
                  alt="more-btn"
                  fill
                />
              </div>
            </div>

            <div
              className="px-5 pb-5 flex flex-col items-center bg-[#A68E79]
            xl:px-10 xl:justify-center"
            >
              <p
                className="mt-8 font-semibold text-[15px] text-white
              xl:text-2xl"
              >
                "{mainReview.quote}"
              </p>

              <div
                className="mt-4 w-full grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-4
              xl:mt-5"
              >
                <span className="px-5 py-1.5 rounded-full bg-white font-bold font-sm text-[#394559]">
                  환자정보
                </span>

                <div className="flex items-center font-medium text-white">
                  <p>{mainReview.patientName}</p>
                  <div className="flex items-center">
                    <span>{`(`}</span>
                    <span>{mainReview.age}세</span>
                    <span>·</span>
                    <span>{mainReview.gender}</span>
                    <span>{`)`}</span>
                  </div>
                </div>

                <span className="px-5 py-1.5 rounded-full bg-white font-bold font-sm text-[#394559]">
                  치료정보
                </span>
                <p className="font-medium text-white">{mainReview.treatment}</p>

                <span className="px-5 py-1.5 rounded-full bg-white font-bold font-sm text-[#394559]">
                  담당의사
                </span>
                <div className="flex items-center gap-3 font-medium text-white">
                  <p>{mainReview.doctorName}</p>
                  <div
                    className="hidden relative w-11 h-11 rounded-full overflow-clip
                  xl:block"
                  >
                    <Image
                      src={mainReview.doctorImageSrc}
                      alt={mainReview.doctorImageAlt}
                      fill
                    />
                  </div>
                </div>
              </div>

              <div
                className="mt-5 flex flex-col items-center
              xl:mt-15"
              >
                <p
                  className="break-keep text-center font-medium text-xs text-white
                xl:text-sm
              "
                >
                  * 의료법에 의거하여 치료후기는 로그인 후 열람 가능합니다.
                </p>
                <Link
                  target="_blank"
                  href={`/`}
                  className="mt-3 px-15 py-2.5 inline-block rounded-full bg-[#93755B] font-bold text-white text-[15px]
                xl:mt-5 xl:py-3 xl:text-lg"
                >
                  로그인
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 px-5">
          <Link
            target="_blank"
            href={`/`}
            className="mx-auto py-2.5 w-8/10 flex justify-center items-center gap-1.5 rounded-full border border-[#93755B] font-semibold text-sm text-[#93755B]
          xl:hidden"
          >
            <span>더 많은 사례 보기</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        <div
          className="mt-20 px-5 flex gap-4 overflow-x-scroll
        xl:justify-center xl:gap-6"
        >
          {videoReviews.map((review, index) => (
            <Link
              target="_blank"
              href={`/`}
              key={review.id}
              className={index === 1 ? 'mt-10' : undefined}
            >
              <div
                className="relative w-50 aspect-3/4
              xl:w-[13vw]"
              >
                <Image
                  src={review.imageSrc}
                  alt={review.imageAlt}
                  fill
                  unoptimized
                  className="rounded-xl object-cover"
                />
                <div className="hidden! absolute left-1/2 bottom-3 -translate-x-1/2 items-center whitespace-nowrap font-bold text-sm text-white">
                  <span>{review.patientName}</span>
                  <span>{review.gender}</span>
                  <span>{review.age}세</span>
                </div>
              </div>

              <div
                className="mt-2 flex justify-center items-center gap-1.5
              xl:mt-3"
              >
                {review.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-1 py-0.5 rounded-sm bg-[#8BC9B8] font-bold text-xs text-white
                  xl:px-2 xl:py-1 xl:text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <p
                className="mt-1.5 font-bold
              xl:mt-3 xl:text-center xl:text-[26px]"
              >
                {review.title}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 px-5">
          <Link
            target="_blank"
            href={`/`}
            className="mx-auto py-2.5 w-8/10 flex justify-center items-center gap-1.5 rounded-full border border-[#93755B] font-semibold text-sm text-[#93755B]
          xl:hidden"
          >
            <span>더 많은 영상 보기</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </FadeInUp>
  );
}
