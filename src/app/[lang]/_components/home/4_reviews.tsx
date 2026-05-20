'use client';

import { notoSerifKR } from '@/_lib/fonts';
import { withLocale } from '@/_lib/navigation';
import { useHome } from '@/app/_providers/home-provider';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type ReviewCase = {
  id: string;
  tab: string;
  treatment: string;
  beforeImage: string;
  afterImage: string;
  quote: string;
  patient: string;
  doctor: string;
  doctorImage?: string;
};

type PatientReview = {
  id: string;
  image: string;
  content: string;
  patient: string;
};

const REVIEW_CASES: ReviewCase[] = [
  {
    id: 'varicose-veins',
    tab: '하지정맥류',
    treatment: '레이저 정맥 폐쇄술 + 경화요법',
    beforeImage: '/images/home/reviews/varicose-veins-before.png',
    afterImage: '/images/home/reviews/varicose-veins-after.png',
    quote: '“거짓말처럼 나아서 너무 신기합니다.”',
    patient: '김*숙 님 (34세 ・ 여성)',
    doctor: '박용범 원장',
    doctorImage: '/images/common/doctor/bak.png',
  },
  {
    id: 'uterine-fibroid',
    tab: '자궁근종',
    treatment: '자궁근종 색전술',
    beforeImage: '/images/home/reviews/varicose-veins-before.png',
    afterImage: '/images/home/reviews/varicose-veins-after.png',
    quote: '“수술 걱정이 컸는데 회복이 빨랐어요.”',
    patient: '이*정 님  (42세 ・ 여성)',
    doctor: '박용범 원장',
    doctorImage: '/images/common/doctor/bak.png',
  },
  {
    id: 'diabetic-foot',
    tab: '당뇨발',
    treatment: '혈관 재개통 치료',
    beforeImage: '/images/home/reviews/varicose-veins-before.png',
    afterImage: '/images/home/reviews/varicose-veins-after.png',
    quote: '“상처가 좋아지는 게 눈에 보여 안심됐습니다.”',
    patient: '최*호 님  (61세 ・ 남성)',
    doctor: '박용범 원장',
    doctorImage: '/images/common/doctor/bak.png',
  },
  {
    id: 'pelvic-vein',
    tab: '골반정맥류',
    treatment: '골반정맥 색전술',
    beforeImage: '/images/home/reviews/varicose-veins-before.png',
    afterImage: '/images/home/reviews/varicose-veins-after.png',
    quote: '“오래된 통증의 원인을 찾게 됐어요.”',
    patient: '정*미 님  (39세 ・ 여성)',
    doctor: '박용범 원장',
    doctorImage: '/images/common/doctor/bak.png',
  },
  {
    id: 'varicocele',
    tab: '정계정맥류',
    treatment: '정계정맥류 색전술',
    beforeImage: '/images/home/reviews/varicose-veins-before.png',
    afterImage: '/images/home/reviews/varicose-veins-after.png',
    quote: '“부담 없이 치료받을 수 있어서 좋았습니다.”',
    patient: '강*훈 님  (31세 ・ 남성)',
    doctor: '박용범 원장',
    doctorImage: '/images/common/doctor/bak.png',
  },
  {
    id: 'dialysis-vessel',
    tab: '투석혈관',
    treatment: '투석혈관 조성 및 관리',
    beforeImage: '/images/home/reviews/varicose-veins-before.png',
    afterImage: '/images/home/reviews/varicose-veins-after.png',
    quote: '“투석 일정이 훨씬 안정적으로 이어졌습니다.”',
    patient: '박*자 님  (68세 ・ 여성)',
    doctor: '박용범 원장',
    doctorImage: '/images/common/doctor/bak.png',
  },
];

const PATIENT_REVIEWS: PatientReview[] = [
  {
    id: 'patient-review-1',
    image: '/images/home/reviews/0.png',
    content: '왼쪽만 코끼리 다리처럼 부었었어요..',
    patient: '김O숙 님 / 여성 / 42세',
  },
  {
    id: 'patient-review-2',
    image: '/images/home/reviews/0.png',
    content: '왼쪽만 코끼리 다리처럼 부었었어요..',
    patient: '김O숙 님 / 여성 / 42세',
  },
  {
    id: 'patient-review-3',
    image: '/images/home/reviews/0.png',
    content: '왼쪽만 코끼리 다리처럼 부었었어요..',
    patient: '김O숙 님 / 여성 / 42세',
  },
  {
    id: 'patient-review-4',
    image: '/images/home/reviews/0.png',
    content: '왼쪽만 코끼리 다리처럼 부었었어요..',
    patient: '김O숙 님 / 여성 / 42세',
  },
];

const REVIEW_FADE_DURATION = 0.14;
const IMAGE_TOGGLE_DURATION = 0.12;

export default function HomeReviews() {
  const { lang } = useHome();

  const [activeId, setActiveId] = useState(REVIEW_CASES[0].id);
  const [isAfterVisible, setIsAfterVisible] = useState(false);

  const activeReview = useMemo(() => {
    return (
      REVIEW_CASES.find((review) => review.id === activeId) ?? REVIEW_CASES[0]
    );
  }, [activeId]);

  useEffect(() => {
    setIsAfterVisible(false);
  }, [activeId]);

  const loginHref = withLocale(lang, '/signin');
  const reviewsHref = withLocale(lang, '/reviews');

  return (
    <section
      className="relative mt-25 px-5 pb-20 bg-[linear-gradient(to_bottom,#FFFFFF_0%,#F6F2EF_10%,#F6F2EF_100%)]
      xl:pt-50 xl:pb-25"
    >
      <div className="mx-auto max-w-7xl w-full">
        <div>
          <p
            className="font-semibold text-lg text-cm-orange
            xl:text-2xl"
          >
            치료 후기
          </p>

          <h2
            className="mt-2 leading-[130%] font-extrabold text-[32px] text-[#333333]
            xl:font-bold xl:text-[42px]"
          >
            어떤 치료를 받았을까요?
          </h2>

          <div
            className="mt-6 leading-[150%] text-[#333333]
            xl:flex xl:items-center xl:gap-1 xl:text-lg"
          >
            <p>청맥을 통해 건강한 혈관과 삶의 활력을 되찾은</p>
            <p>이야기를 만나보세요.</p>
          </div>
        </div>

        <div
          className="mt-5 grid grid-cols-2 gap-0.75
          xl:mt-7.5 xl:flex"
        >
          {REVIEW_CASES.map((review) => {
            const isActive = review.id === activeId;

            return (
              <button
                key={review.id}
                aria-pressed={isActive}
                onClick={() => setActiveId(review.id)}
                className={[
                  `py-2.5 rounded-sm transition-colors duration-150 font-semibold text-[15px]
                  xl:px-9 xl:py-3 xl:rounded-lg xl:text-base`,
                  isActive
                    ? `border-[#FD7740] bg-[#FD7740] text-white`
                    : `border-[#DDDDDD] bg-white text-[#999999] hover:border-[#FD7740] hover:text-[#FD7740]`,
                ].join(' ')}
              >
                {review.tab}
              </button>
            );
          })}
        </div>

        <div className="mt-3">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: REVIEW_FADE_DURATION,
                ease: 'easeOut',
              }}
            >
              <DesktopReviewCard review={activeReview} loginHref={loginHref} />
              <MobileReviewCard
                review={activeReview}
                loginHref={loginHref}
                isAfterVisible={isAfterVisible}
                onToggleImage={() => setIsAfterVisible((prev) => !prev)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <PatientReviewsSection reviewsHref={reviewsHref} />
      </div>
    </section>
  );
}

function DesktopReviewCard({
  review,
  loginHref,
}: {
  review: ReviewCase;
  loginHref: string;
}) {
  return (
    <article className="hidden h-120 overflow-hidden rounded-[20px] border border-white bg-[#B29A86] xl:grid xl:grid-cols-[minmax(0,1fr)_480px]">
      <div className="relative grid h-full grid-cols-2 overflow-hidden bg-white">
        <BeforeAfterImage
          src={review.beforeImage}
          alt={`${review.tab} 치료 전 사진`}
          label="치료 전"
        />

        <BeforeAfterImage
          src={review.afterImage}
          alt={`${review.tab} 치료 후 사진`}
          label="치료 후"
        />

        <div className="absolute left-1/2 top-0 z-10 h-full w-px -translate-x-1/2 bg-white/70" />

        <div className="absolute left-1/2 top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-3xl font-light text-cm-orange shadow-[0_6px_18px_rgba(0,0,0,0.14)]">
          <ChevronRight />
        </div>

        <div className="absolute left-1/2 top-0 -translate-x-1/2 px-10 py-1 rounded-b-[18px] bg-[#FD7740]/70 font-medium text-center text-lg text-white z-20">
          {review.treatment}
        </div>
      </div>

      <ReviewInfoPanel review={review} loginHref={loginHref} />
    </article>
  );
}

function BeforeAfterImage({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <div className="relative h-full overflow-hidden bg-[#F3F3F3]">
      <Image src={src} alt={alt} fill sizes="400px" className="object-cover" />

      <span className="absolute bottom-4 left-4 rounded-full bg-black/65 px-4 py-1.5 text-sm font-bold text-white">
        {label}
      </span>
    </div>
  );
}

function MobileReviewCard({
  review,
  loginHref,
  isAfterVisible,
  onToggleImage,
}: {
  review: ReviewCase;
  loginHref: string;
  isAfterVisible: boolean;
  onToggleImage: () => void;
}) {
  const currentImage = isAfterVisible ? review.afterImage : review.beforeImage;
  const currentAlt = `${review.tab} 치료 ${isAfterVisible ? '후' : '전'} 사진`;

  return (
    <article className="overflow-hidden rounded-[10px] bg-[#B29A86] xl:hidden">
      <button
        type="button"
        aria-label={`${review.tab} 치료 전후 사진 바꾸기`}
        aria-pressed={isAfterVisible}
        onClick={onToggleImage}
        className="relative aspect-square w-full overflow-hidden bg-white"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${review.id}-${isAfterVisible ? 'after' : 'before'}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: IMAGE_TOGGLE_DURATION,
              ease: 'easeOut',
            }}
          >
            <Image
              src={currentImage}
              alt={currentAlt}
              fill
              sizes="(max-width: 1279px) calc(100vw - 40px), 0px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <span className="absolute left-1/2 top-5 -translate-x-1/2 px-3 py-1.5 rounded-sm bg-black whitespace-nowrap font-extrabold text-sm text-white z-10">
          {isAfterVisible ? (
            <>
              다시 눌러서 <span className="text-cm-orange">치료 전</span> 보기!
            </>
          ) : (
            <>
              사진 눌러서 <span className="text-cm-orange">치료법</span>{' '}
              확인하기!
            </>
          )}
        </span>

        <span className="absolute bottom-4 left-4 z-10 rounded-full bg-black/65 px-4 py-1.5 text-sm font-bold text-white">
          {isAfterVisible ? '치료 후' : '치료 전'}
        </span>

        <span className="absolute bottom-4 right-4 z-10 max-w-[calc(100%-120px)] truncate rounded-full bg-[#FF7A45]/95 px-4 py-1.5 text-sm font-bold text-white">
          {review.treatment}
        </span>

        {!isAfterVisible && (
          <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-4xl opacity-45">
            ☝
          </span>
        )}
      </button>

      <div className="px-5 pt-7 pb-5 text-white">
        <p
          className={`${notoSerifKR.className} leading-[150%] font-medium text-center text-[15px]`}
        >
          {review.quote}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <span className="px-5 py-1.5 rounded-full bg-white font-extrabold text-center text-sm text-[#2F4050]">
            환자정보
          </span>
          <span className="font-medium">{review.patient}</span>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <span className="px-5 py-1.5 rounded-full bg-white font-extrabold text-center text-sm text-[#2F4050]">
            담당의사
          </span>
          <span className="font-medium">{review.doctor}</span>
        </div>

        <p className="mt-6 leading-[150%] font-semibold text-xs">
          * 의료법에 의거하여 치료후기는 로그인 후 열람 가능합니다.
        </p>

        <Link
          href={loginHref}
          className="justify-self-center mt-5 px-15 py-2.5 flex justify-center items-center rounded-full bg-[#9E8065] font-bold text-[15px] text-white"
        >
          로그인
        </Link>
      </div>
    </article>
  );
}

function ReviewInfoPanel({
  review,
  loginHref,
}: {
  review: ReviewCase;
  loginHref: string;
}) {
  return (
    <div className="px-10 py-15 h-full flex flex-col justify-between text-white">
      <p
        className={`${notoSerifKR.className} leading-[150%] font-medium text-2xl`}
      >
        {review.quote}
      </p>

      <div className="mt-8 flex items-center gap-3">
        <span className="px-5 py-1.5 rounded-full bg-white font-bold text-[#394559]">
          환자정보
        </span>
        <span className="font-medium text-lg">{review.patient}</span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="px-5 py-1.5 rounded-full bg-white font-bold text-[#394559]">
          담당의사
        </span>

        <span className="font-medium text-lg">{review.doctor}</span>

        {review.doctorImage && (
          <div className="relative ml-2 h-14 w-14 overflow-hidden rounded-full bg-white">
            <Image
              src={review.doctorImage}
              alt={review.doctor}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
        )}
      </div>

      <p
        className="mt-10 text-center text-sm font-semibold
        xl:font-medium"
      >
        의료법에 의거하여 치료후기는 로그인 후 열람 가능합니다.
      </p>

      <Link
        href={loginHref}
        className="self-center mt-8 px-15 py-3 flex rounded-full bg-[#9E8065] font-bold text-lg text-white transition-opacity hover:opacity-80"
      >
        로그인
      </Link>
    </div>
  );
}

function PatientReviewsSection({ reviewsHref }: { reviewsHref: string }) {
  return (
    <div className="mt-5 xl:mt-10">
      <div className="hidden xl:grid xl:grid-cols-[240px_repeat(4,minmax(0,1fr))] xl:gap-5">
        <PatientReviewsTitleCard />

        {PATIENT_REVIEWS.slice(0, 4).map((review) => (
          <PatientReviewCard key={review.id} review={review} />
        ))}
      </div>

      <div className="-mx-5 overflow-x-auto px-5 xl:hidden">
        <div className="flex w-max gap-3">
          <PatientReviewsTitleCard />

          {PATIENT_REVIEWS.map((review) => (
            <PatientReviewCard key={review.id} review={review} />
          ))}

          <Link
            href={reviewsHref}
            className="self-center mr-8 w-22.5 h-22.5 flex justify-center items-center rounded-full bg-[#FFDBCD] font-bold text-[15px] text-[#EC6639]"
          >
            <span>후기 더 보기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function PatientReviewsTitleCard() {
  return (
    <div
      className="flex pl-5 pt-20 pb-5 w-40 h-45 items-center rounded-[14px] bg-[#8BC9B8]
      xl:pl-10 xl:pt-25 xl:pb-2.5 xl:w-60 xl:h-62.5"
    >
      <p className="font-bold text-lg text-white xl:text-2xl">
        환자분들이
        <br />
        직접 남겨주신
        <br />
        소중한 후기
      </p>
    </div>
  );
}

function PatientReviewCard({ review }: { review: PatientReview }) {
  return (
    <Link
      target="_blank"
      href={`/`}
      className="w-40 h-45 rounded-[14px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)] overflow-clip
      xl:h-62.5 xl:w-auto xl:flex xl:flex-col xl:rounded-xl"
    >
      <div className="relative h-23 w-full overflow-hidden bg-[#E8E8E8] xl:h-35">
        <Image
          src={review.image}
          alt={`${review.patient} 치료 후기`}
          fill
          sizes="(max-width: 1279px) 160px, 240px"
          className="object-cover"
        />
      </div>

      <div
        className="flex-1 px-3 pt-3 pb-4
        xl:flex-1 xl:px-5 xl:pt-5"
      >
        <p
          className="line-clamp-2 leading-[150%] font-medium text-xs text-[#666666]
          xl:font-semibold xl:text-base"
        >
          {review.content}
        </p>

        <p
          className="mt-0.5 text-xs text-[#00816C]
          xl:mt-1 xl:text-sm
        "
        >
          {review.patient}
        </p>
      </div>
    </Link>
  );
}
