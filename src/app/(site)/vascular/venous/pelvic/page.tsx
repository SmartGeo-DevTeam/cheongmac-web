'use client';

import SectionHeading from '@/app/_components/clinic/section-heading';
import ClinicSymptoms from '@/app/_components/clinic/symptom-carousel/section';
import ClinicSymptomComparison from '@/app/_components/clinic/symptom-comparison/section';
import Breadcrumb from '@/app/_components/common/breadcrumb';
import Inner from '@/app/_components/common/inner';
import PageHeader from '@/app/_components/common/page-header';
import {
  menstrualPainCondition,
  pelvicVaricesCondition,
} from '@/app/_data/vascular/venous/pelvic/comparison/conditions';
import { pelvicPainPattern } from '@/app/_data/vascular/venous/pelvic/comparison/content';
import { pelvicSymptoms } from '@/app/_data/vascular/venous/pelvic/symptoms/items';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import PelvicPainPattern from '@/app/_ui/vascular/venous/pelvic/comparison/pain-pattern';
import PelvicStatistics from '@/app/_ui/vascular/venous/pelvic/statistics/section';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function VascularVenousPelvicPage() {
  // UI 시안 확인용: 확정 후 데이터 및 Client 캐러셀을 별도 파일로 분리합니다.
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const relatedDiseases = [
    {
      id: 'varicose',
      question: '치료 후에도\n다리가 계속 무겁다면?',
      category: '동반 질환 · 유사 증상',
      title: '하지정맥류',
      description:
        '다리와 골반의 정맥은 하나로 이어져 있기 때문에 골반에서 역류한 혈액이 다리 정맥류의 원인이 되기도 하고, 두 질환이 함께 동반되는 경우도 많습니다.',
      href: '/vascular/venous/varicose',
    },
    {
      id: 'maythurner',
      question: '유독 왼쪽 다리만 퉁퉁 붓고\n불편하다면',
      category: '원인 질환',
      title: '메이터너증후군',
      description:
        '왼쪽 장골정맥이 우측 장골동맥에 눌리면서 왼쪽 다리의 혈액순환이 원활하지 않게 되고, 심한 경우 심부정맥혈전증 원인이 되기도 합니다.',
      href: '/vascular/special/maythurner',
    },
    {
      id: 'nutcracker',
      question: '왼쪽 옆구리가 아프고\n혈뇨·단백뇨가 있다면',
      category: '원인 질환 · 동반 질환',
      title: '호두까기증후군',
      description:
        '왼쪽 신장 정맥이 대동맥과 상장간막동맥 사이에서 눌리면서 혈액이 원활하게 흐르지 못하면서 발생하는 질환입니다.',
      href: '/vascular/special/nutcracker',
    },
    {
      id: 'gynecologic',
      question: '생리 기간 통증이 유독 심하고\n생리량이 많아졌다면',
      category: '동반 질환 · 유사 증상',
      title: '자궁·난소 질환',
      description:
        '자궁내막증·자궁근종도 골반통, 생리통, 성교통을 일으켜 골반정맥류와 구별이 어렵습니다. 두 질환이 함께 있는 경우도 있습니다.',
      href: null,
    },
  ];

  // PC에서 4개 이상의 슬라이드가 보이므로 loop에 필요한 수만큼 반복합니다.
  const relatedSlides = Array.from({ length: 3 }, () => relatedDiseases).flat();
  const goToRelatedSlide = (index: number) => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const count = relatedDiseases.length;
    const current = swiper.realIndex;
    const forward = (index - (current % count) + count) % count;
    const offset = forward > count / 2 ? forward - count : forward;
    const target = (current + offset + relatedSlides.length) % relatedSlides.length;
    swiper.slideToLoop(target);
  };

  if (!isPublishedNavigationPath('/vascular/venous/pelvic')) notFound();

  return (
    <>
      <Breadcrumb />

      <PageHeader
        title="골반정맥류"
        englishTitle="Pelvic Congestion Syndrome / Pelvic Varices"
        desc="여성에게 흔히 나타나는 만성 골반통의 원인 중 하나로, 골반 내 정맥 혈류가 원활하지 못해 울혈이 생기는 질환"
      />

      {/* 공통 - 증상 */}
      <ClinicSymptoms
        id="vascular-venous-pelvic-symptoms"
        carouselId="vascular-venous-pelvic-symptoms-carousel"
        items={pelvicSymptoms}
        tabsAriaLabel="골반정맥류 증상 선택"
      />

      {/* 공통 - 일반 생리통과 골반정맥류 비교 */}
      <ClinicSymptomComparison
        id="vascular-venous-pelvic-comparison"
        heading={{
          label: '언제 어떻게 아픈지가 중요 단서',
          title: (
            <>
              <b>단순 생리통</b>과는 {` `}
              <br className="xl:hidden" />
              이렇게 다릅니다
            </>
          ),
        }}
        leftCondition={menstrualPainCondition}
        rightCondition={pelvicVaricesCondition}
      >
        <PelvicPainPattern
          id="vascular-venous-pelvic-comparison-pain-pattern"
          content={pelvicPainPattern}
        />
      </ClinicSymptomComparison>

      {/* 골반정맥류 - 질환 통계 */}
      <PelvicStatistics id="vascular-venous-pelvic-statistics" />

      {/* 새롭게 추가된 부분-> 추후 내 아키텍쳐에 맞게끔 정리 필요 */}
      <section id="vascular-venous-pelvic-related">
        <Inner>
          <SectionHeading
            mtVariant="lg"
            label={`Related Check · 연관 질환`}
            labelVariant="disabled"
            title={
              <>
                이런 경우라면?
                <br />
                <b>함께 살펴봐야 할 질환들</b>
              </>
            }
            description={`골반 정맥은 다리·신장·자궁 주변 혈관과 이어져 있어 
서로 원인이 되거나 비슷한 증상을 보이기도 합니다.`}
          />
        </Inner>

        <div
          id="vascular-venous-pelvic-related-carousel"
          role="region"
          aria-label="골반정맥류 연관 질환"
          className={`mt-10 pb-10
            xl:mt-25 xl:pb-25`}
        >
          <Swiper
            className={`w-full [&_.swiper-wrapper]:items-stretch`}
            slidesPerView={1.3}
            spaceBetween={8}
            centeredSlides
            loop
            initialSlide={relatedDiseases.length}
            grabCursor
            speed={450}
            breakpoints={{
              1280: {
                slidesPerView: 4.6,
                spaceBetween: 8,
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActiveIndex(swiper.realIndex % relatedDiseases.length);
            }}
            onRealIndexChange={(swiper) => {
              setActiveIndex(swiper.realIndex % relatedDiseases.length);
            }}
          >
            {relatedSlides.map((disease, index) => (
              <SwiperSlide
                key={`${disease.id}-${Math.floor(index / relatedDiseases.length)}`}
                className={`h-auto! flex! flex-col transition-opacity duration-300
                  xl:[&:not(.swiper-slide-active)]:opacity-30`}
              >
                {({ isActive }) => (
                  <>
                    {/* 증상 말풍선 */}
                    <button
                      type="button"
                      onClick={() => swiperRef.current?.slideToLoop(index)}
                      className={`relative min-h-19 w-full px-3 py-3 flex justify-center items-center rounded-xl bg-base break-keep whitespace-pre-line font-bold text-[15px] leading-[140%] text-center text-[#4B5262] shadow-[0_1px_4px_0_#00000012]
                        after:absolute after:left-1/2 after:-bottom-2 after:size-4 after:rotate-45 after:bg-base after:shadow-[2px_2px_3px_0_#0000000A] after:-translate-x-1/2 after:content-['']
                        xl:min-h-22 xl:px-5 xl:text-[24px]`}
                    >
                      {disease.question}
                    </button>

                    {/* PC 연결선 및 체크 아이콘 */}
                    <div
                      aria-hidden="true"
                      className={`hidden
                        xl:relative xl:mt-10 xl:h-9.5 xl:flex xl:justify-center xl:items-center`}
                    >
                      <span
                        className={`absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 ${isActive ? 'bg-cm-green-600' : 'bg-cm-gray-200'}`}
                      />
                      <span
                        className={`relative size-9.5 flex justify-center items-center rounded-full text-inverse ${isActive ? 'bg-cm-green-600' : 'bg-cm-gray-200'}`}
                      >
                        <Check className={`size-5`} />
                      </span>
                    </div>

                    {/* PC 질환 유형 배지 */}
                    <div className={`hidden
                      xl:mt-5 xl:flex xl:justify-center`}>
                      <span className={`px-3 py-1 rounded-md bg-cm-green-600 font-medium text-[14px] leading-[150%] text-inverse`}>
                        {disease.category}
                      </span>
                    </div>

                    {/* 질환 설명 카드 */}
                    <article
                      id={`vascular-venous-pelvic-related-${disease.id}-${Math.floor(index / relatedDiseases.length)}`}
                      className={`mx-0 mt-9 min-h-46.5 px-5 py-6 flex flex-1 flex-col rounded-xl border border-cm-green-500 bg-base
                        xl:mx-4 xl:mt-5 xl:min-h-61 xl:px-10 xl:py-8`}
                    >
                      <div className={`flex flex-wrap justify-between items-start gap-2`}>
                        <h3 className={`break-keep font-bold text-[20px] leading-[140%]
                          xl:text-[24px]`}>
                          {disease.title}
                        </h3>
                        {/* 모바일 질환 유형 배지 */}
                        <span className={`shrink-0 px-2 py-1 rounded-md bg-cm-green-600 font-medium text-[10px] leading-[150%] text-inverse
                          xl:hidden`}>
                          {disease.category}
                        </span>
                      </div>
                      <p className={`mt-3 break-keep text-[14px] leading-[160%]
                        xl:text-[16px]`}>
                        {disease.description}
                      </p>
                      {disease.href && isPublishedNavigationPath(disease.href) ? (
                        <Link
                          href={disease.href}
                          className={`mt-auto pt-4 flex self-start items-center font-medium text-[12px] text-disabled
                            hover:text-cm-green-600
                            xl:pt-6 xl:text-[14px]`}
                        >
                          자세히 보기 <ChevronRight className={`size-3`} aria-hidden="true" />
                        </Link>
                      ) : (
                        <span
                          aria-disabled="true"
                          className={`mt-auto pt-4 flex self-start items-center font-medium text-[12px] text-disabled
                            xl:pt-6 xl:text-[14px]`}
                        >
                          자세히 보기 <ChevronRight className={`size-3`} aria-hidden="true" />
                        </span>
                      )}
                    </article>
                  </>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 모바일 이전·다음 버튼 및 4개 질환 페이지네이션 */}
          <div className={`mt-10 flex justify-center items-center gap-5
            xl:hidden`}>
            <button
              type="button"
              aria-label="이전 연관 질환"
              onClick={() => swiperRef.current?.slidePrev()}
              className={`size-9 flex justify-center items-center rounded-full bg-base shadow-[0_0_10px_0_#0000000F]`}
            >
              <ChevronLeft className={`size-5`} aria-hidden="true" />
            </button>
            <div role="group" aria-label="연관 질환 선택" className={`flex items-center gap-2`}>
              {relatedDiseases.map((disease, index) => (
                <button
                  key={disease.id}
                  type="button"
                  aria-label={`${disease.title} 보기`}
                  aria-current={activeIndex === index ? 'true' : undefined}
                  onClick={() => goToRelatedSlide(index)}
                  className={`h-2 rounded-full transition-[width,background-color] duration-300 ${activeIndex === index ? 'w-6 bg-accent-ai' : 'w-2 bg-gray-150'}`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="다음 연관 질환"
              onClick={() => swiperRef.current?.slideNext()}
              className={`size-9 flex justify-center items-center rounded-full bg-base shadow-[0_0_10px_0_#0000000F]`}
            >
              <ChevronRight className={`size-5`} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
