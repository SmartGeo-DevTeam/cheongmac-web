'use client';

import AdminEditButton from '@/app/_components/inline-editor/admin-edit-button';
import CollectionAdminEditButton from '@/app/_components/inline-editor/collection-admin-edit-button';
import EditablePageCopyRegion from '@/app/_components/inline-editor/editable-page-copy-region';
import {
  P as TypographyP,
} from '@/app/_components/ui/typography';
import FadeInUp from '@/app/_components/fade-in-up';
import MainSectionHeader from '@/app/_components/main-section-header';
import type { HomeReview } from '@/_lib/home-reviews';
import { HOME_COPY_FIELD_KEYS } from '@/_lib/home-page-copy';
import type { InlineContentData } from '@/_lib/inline-content-shared';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  useMemo,
  useState,
} from 'react';

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function reviewHref(review: HomeReview) {
  if (review.linkUrl?.trim()) return review.linkUrl;

  const doctor = review.doctors[0];
  if (doctor) return `/about/doctors/${doctor.slug}`;

  return '/community/cases';
}

function reviewTitle(review: HomeReview) {
  const firstLine = review.content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find(Boolean);

  const title =
    firstLine ||
    review.treatment ||
    `${review.patientName}님의 치료후기`;

  return title.length > 80
    ? `${title.slice(0, 80)}…`
    : title;
}

function imageForCard(review: HomeReview) {
  return (
    review.imageUrl ??
    review.afterImageUrl ??
    review.beforeImageUrl
  );
}

export default function HomeReviews({
  copy,
  persisted,
  reviews,
}: {
  copy: InlineContentData;
  persisted: boolean;
  reviews: HomeReview[];
}) {
  const categories = useMemo(() => {
    return Array.from(
      new Set(
        reviews
          .map((review) => review.category.trim())
          .filter(Boolean),
      ),
    );
  }, [reviews]);

  const [activeCategory, setActiveCategory] = useState(
    categories[0] ?? '전체',
  );
  const [isAfterVisible, setIsAfterVisible] =
    useState(false);

  const categoryReviews = useMemo(() => {
    if (!reviews.length) return [];

    if (
      activeCategory === '전체' ||
      !categories.includes(activeCategory)
    ) {
      return reviews;
    }

    return reviews.filter(
      (review) => review.category === activeCategory,
    );
  }, [activeCategory, categories, reviews]);

  const mainReview =
    categoryReviews[0] ?? reviews[0] ?? null;

  const smallReviews = useMemo(() => {
    if (!mainReview) return [];

    const preferred = categoryReviews.filter(
      (review) => review.id !== mainReview.id,
    );
    const rest = reviews.filter(
      (review) =>
        review.id !== mainReview.id &&
        !preferred.some(
          (preferredReview) =>
            preferredReview.id === review.id,
        ),
    );

    return [...preferred, ...rest].slice(0, 3);
  }, [categoryReviews, mainReview, reviews]);

  return (
    <EditablePageCopyRegion
      path="/"
      copy={copy}
      persisted={persisted}
      label="메인 치료후기 문구"
      fieldKeys={HOME_COPY_FIELD_KEYS.reviews}
    >
      <FadeInUp>
        <section className="group/cms-collection relative mt-15 max-w-7xl xl:mx-auto">
          <CollectionAdminEditButton
            href="/admin/content-relations/reviews"
            label="메인 치료후기"
          />

          <MainSectionHeader
            usePaddingHorizontal
            eyebrow={copy.reviewsEyebrow}
            title={
              <>
                <span className="block">
                  {copy.reviewsTitle1}
                </span>
                <span className="block">
                  {copy.reviewsTitle2}
                </span>
              </>
            }
            description={
              <>
                <TypographyP managed={false}>
                  {copy.reviewsDescription1}
                </TypographyP>
                <TypographyP managed={false}>
                  {copy.reviewsDescription2}
                </TypographyP>
              </>
            }
          />

          {reviews.length ? (
            <>
              <div className="mt-10 pl-5 xl:mt-8 xl:flex xl:items-center xl:justify-between">
                {categories.length ? (
                  <ul className="flex items-center gap-2 overflow-scroll whitespace-nowrap rounded-[10px] bg-[#F7F7F7] py-1 pr-5">
                    {categories.map((category) => {
                      const isActive =
                        activeCategory === category;

                      return (
                        <li key={category}>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveCategory(category);
                              setIsAfterVisible(false);
                            }}
                            className={`rounded-[10px] px-4 py-2 text-[15px] font-semibold ${
                              isActive
                                ? 'bg-[#1B705B] text-white'
                                : 'bg-transparent text-[#1B705B]'
                            }`}
                          >
                            {category}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div />
                )}

                <div className="hidden xl:flex">
                  <div className="self-end pr-5">
                    <Link
                      href="/community/cases"
                      className="self-end xl:flex xl:items-center"
                    >
                      <div className="hidden xl:flex xl:items-center xl:gap-2 xl:px-5 xl:py-2.5">
                        <span className="font-bold text-[#93755B]">
                          {copy.reviewsMoreCases}
                        </span>
                        <ArrowRight
                          size={20}
                          color="#93755B"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {mainReview ? (
                <div className="mt-4 px-5">
                  <div className="relative flex flex-col overflow-clip rounded-xl xl:grid xl:grid-cols-[6fr_4fr] xl:items-stretch">
                    <AdminEditButton
                      href={`/admin/content-relations/reviews/${mainReview.id}`}
                      label={`${mainReview.patientName} 치료후기`}
                      className="right-3 top-3"
                    />

                    <MainReviewImages
                      review={mainReview}
                      isAfterVisible={isAfterVisible}
                      onToggle={() =>
                        setIsAfterVisible(
                          (visible) => !visible,
                        )
                      }
                      imageHint={copy.reviewsImageHint}
                    />

                    <div className="flex flex-col items-center bg-[#A68E79] px-5 pb-5 xl:justify-center xl:px-10">
                      <TypographyP
                        managed={false}
                        className="mt-8 text-[15px] font-semibold text-white xl:text-2xl"
                      >
                        &quot;
                        {reviewTitle(mainReview)}
                        &quot;
                      </TypographyP>

                      <div className="mt-4 grid w-full grid-cols-[auto_1fr] items-center gap-x-3 gap-y-4 xl:mt-5">
                        <span className="rounded-full bg-white px-5 py-1.5 font-bold text-[#394559]">
                          {copy.reviewsPatientInfoLabel}
                        </span>

                        <div className="flex items-center font-medium text-white">
                          <TypographyP managed={false}>
                            {mainReview.patientName}
                          </TypographyP>
                          {mainReview.age ||
                          mainReview.gender ? (
                            <div className="flex items-center">
                              <span>(</span>
                              {mainReview.age ? (
                                <span>
                                  {mainReview.age}세
                                </span>
                              ) : null}
                              {mainReview.age &&
                              mainReview.gender ? (
                                <span>·</span>
                              ) : null}
                              {mainReview.gender ? (
                                <span>
                                  {mainReview.gender}
                                </span>
                              ) : null}
                              <span>)</span>
                            </div>
                          ) : null}
                        </div>

                        <span className="rounded-full bg-white px-5 py-1.5 font-bold text-[#394559]">
                          {copy.reviewsTreatmentInfoLabel}
                        </span>
                        <TypographyP
                          managed={false}
                          className="font-medium text-white"
                        >
                          {mainReview.treatment || '-'}
                        </TypographyP>

                        <span className="rounded-full bg-white px-5 py-1.5 font-bold text-[#394559]">
                          {copy.reviewsDoctorLabel}
                        </span>

                        <ReviewDoctor
                          review={mainReview}
                        />
                      </div>

                      <div className="mt-5 flex flex-col items-center xl:mt-15">
                        <TypographyP
                          managed={false}
                          className="break-keep text-center text-xs font-medium text-white xl:text-sm"
                        >
                          {copy.reviewsLegalNote}
                        </TypographyP>
                        <Link
                          href="/signin"
                          className="mt-3 inline-block rounded-full bg-[#93755B] px-15 py-2.5 text-[15px] font-bold text-white xl:mt-5 xl:py-3 xl:text-lg"
                        >
                          {copy.reviewsLoginLabel}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="mt-5 px-5">
                <Link
                  href="/community/cases"
                  className="mx-auto flex w-8/10 items-center justify-center gap-1.5 rounded-full border border-[#93755B] py-2.5 text-sm font-semibold text-[#93755B] xl:hidden"
                >
                  <span>{copy.reviewsMoreCases}</span>
                  <ArrowRight size={18} />
                </Link>
              </div>

              {smallReviews.length ? (
                <div className="mt-20 flex gap-4 overflow-x-scroll px-5 xl:justify-center xl:gap-6">
                  {smallReviews.map(
                    (review, index) => (
                      <ReviewCard
                        key={review.id}
                        review={review}
                        offset={index === 1}
                      />
                    ),
                  )}
                </div>
              ) : null}

              {smallReviews.length ? (
                <div className="mt-10 px-5">
                  <Link
                    href="/community/cases"
                    className="mx-auto flex w-8/10 items-center justify-center gap-1.5 rounded-full border border-[#93755B] py-2.5 text-sm font-semibold text-[#93755B] xl:hidden"
                  >
                    <span>{copy.reviewsMoreVideos}</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              ) : null}
            </>
          ) : (
            <div className="mx-5 mt-8 rounded-xl border border-dashed border-[#D9D9DD] bg-[#FAFAFA] px-5 py-10 text-center">
              <p className="text-sm font-medium text-[#52525B]">
                메인페이지에 노출 중인 치료후기가
                없습니다.
              </p>
              <p className="mt-2 text-xs leading-5 text-[#8A8A91]">
                관리자 환자 후기에서 원하는 항목의
                ‘메인페이지 노출’을 체크하면 이 영역에
                표시됩니다.
              </p>
            </div>
          )}
        </section>
      </FadeInUp>
    </EditablePageCopyRegion>
  );
}

function MainReviewImages({
  review,
  isAfterVisible,
  onToggle,
  imageHint,
}: {
  review: HomeReview;
  isAfterVisible: boolean;
  onToggle: () => void;
  imageHint: string;
}) {
  const before =
    review.beforeImageUrl ?? review.imageUrl;
  const after =
    review.afterImageUrl ??
    review.imageUrl ??
    review.beforeImageUrl;

  const hasBeforeAfter =
    Boolean(before) &&
    Boolean(after) &&
    before !== after;

  if (!before && !after) {
    return (
      <div className="grid aspect-square w-full place-items-center bg-[#F3F3F3] text-sm text-[#A1A1AA] xl:aspect-auto xl:h-full">
        후기 이미지를 등록해주세요.
      </div>
    );
  }

  if (!hasBeforeAfter) {
    const source = before ?? after!;

    return (
      <div className="relative aspect-square w-full xl:aspect-auto xl:h-full">
        <Image
          src={source}
          alt={`${review.patientName} 치료후기`}
          fill
          unoptimized={source
            .toLowerCase()
            .includes('.gif')}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-full xl:flex xl:aspect-auto xl:h-full">
      <button
        type="button"
        onClick={onToggle}
        className="relative block h-full w-full xl:hidden"
        aria-label="치료 전후 사진 보기"
      >
        <Image
          src={before!}
          alt={`${review.patientName} 치료 전`}
          fill
          className="object-cover"
        />
        <Image
          src={after!}
          alt={`${review.patientName} 치료 후`}
          fill
          className={`object-cover transition-opacity duration-500 ease-out ${
            isAfterVisible
              ? 'opacity-100'
              : 'opacity-0'
          }`}
        />
        <TypographyP
          managed={false}
          className="absolute left-1/2 top-5 -translate-x-1/2 rounded-sm bg-black px-3 py-1.5 text-sm font-bold text-white"
        >
          {imageHint}
        </TypographyP>
      </button>

      <div className="hidden h-full w-full xl:flex">
        <div className="relative h-full w-1/2">
          <Image
            src={before!}
            alt={`${review.patientName} 치료 전`}
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-full w-1/2">
          <Image
            src={after!}
            alt={`${review.patientName} 치료 후`}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="hidden xl:absolute xl:left-1/2 xl:top-1/2 xl:flex xl:h-12.5 xl:w-12.5 xl:-translate-x-1/2 xl:-translate-y-1/2">
        <Image
          src="/assets/icons/review-more.svg"
          alt=""
          aria-hidden="true"
          fill
        />
      </div>
    </div>
  );
}

function ReviewDoctor({
  review,
}: {
  review: HomeReview;
}) {
  const doctor = review.doctors[0];

  if (!doctor) {
    return (
      <TypographyP
        managed={false}
        className="font-medium text-white"
      >
        -
      </TypographyP>
    );
  }

  return (
    <div className="flex items-center gap-3 font-medium text-white">
      <TypographyP managed={false}>
        {doctor.name} {doctor.position}
      </TypographyP>

      {doctor.avatarUrl ? (
        <div className="relative hidden h-11 w-11 overflow-clip rounded-full xl:block">
          <Image
            src={doctor.avatarUrl}
            alt={`${doctor.name} ${doctor.position}`}
            fill
            className="object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}

function ReviewCard({
  review,
  offset,
}: {
  review: HomeReview;
  offset: boolean;
}) {
  const source = imageForCard(review);
  const href = reviewHref(review);
  const external = isExternalHref(href);

  return (
    <div
      className={`relative shrink-0 ${
        offset ? 'mt-10' : ''
      }`}
    >
      <AdminEditButton
        href={`/admin/content-relations/reviews/${review.id}`}
        label={`${review.patientName} 치료후기`}
      />

      <Link
        href={href}
        target={external ? '_blank' : undefined}
        rel={
          external
            ? 'noopener noreferrer'
            : undefined
        }
      >
        <div className="relative aspect-3/4 w-50 xl:w-[13vw]">
          {source ? (
            <Image
              src={source}
              alt={`${review.patientName} 치료후기`}
              fill
              unoptimized={source
                .toLowerCase()
                .includes('.gif')}
              className="rounded-xl object-cover"
            />
          ) : (
            <div className="grid h-full place-items-center rounded-xl bg-[#F3F3F3] px-4 text-center text-xs text-[#A1A1AA]">
              후기 이미지를 등록해주세요.
            </div>
          )}
        </div>

        {review.keywords.length ? (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 xl:mt-3">
            {review.keywords
              .slice(0, 3)
              .map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-sm bg-[#8BC9B8] px-1 py-0.5 text-xs font-bold text-white xl:px-2 xl:py-1 xl:text-sm"
                >
                  {keyword}
                </span>
              ))}
          </div>
        ) : null}

        <TypographyP
          managed={false}
          className="mt-1.5 line-clamp-2 font-bold xl:mt-3 xl:text-center xl:text-[26px]"
        >
          {reviewTitle(review)}
        </TypographyP>
      </Link>
    </div>
  );
}
