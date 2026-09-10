'use client';

import BoardToolbar from '@/app/_components/ui/board-toolbar';
import {
  ContentCard,
  ContentCardBody,
  ContentCardDescription,
  ContentCardMedia,
  ContentCardMeta,
  ContentCardTitle,
} from '@/app/_components/ui/content-card';
import EmptyState from '@/app/_components/ui/empty-state';
import UiPagination from '@/app/_components/ui/pagination';
import SearchField from '@/app/_components/ui/search-field';

import {
  type AcademicExchangePost,
} from '../_data';
import Image from 'next/image';
import {
  useMemo,
  useRef,
  useState,
} from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function AcademicExchangeIntro({
  heroImages,
}: {
  heroImages: Array<{ id: string; src: string; alt: string }>;
}) {
  return (
    <section className="overflow-hidden bg-[#F4F5F5]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 xl:grid-cols-[minmax(0,1fr)_430px] xl:items-center xl:gap-20 xl:px-0 xl:py-24">
        <div>
          <p className="text-sm font-semibold tracking-[-0.015em] text-[#2B9B82] xl:text-base">
            ACADEMIC EXCHANGE
          </p>

          <h2 className="mt-4 break-keep text-[24px] font-bold leading-[1.45] tracking-[-0.045em] text-[#262C35] xl:mt-5 xl:text-[34px] xl:leading-[1.5]">
            혈관 치료의{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">올바른 기준</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[0.08em] h-[0.34em] bg-[#91CDBF]"
              />
            </span>
            을 세우기 위해
            <br className="hidden xl:block" />
            청맥병원은 끊임없이 연구하고 소통합니다.
          </h2>

          <p className="mt-7 break-keep text-base leading-[1.8] text-[#4F565D] xl:mt-9 xl:max-w-[680px] xl:text-xl">
            국내외 의료진과 임상 경험과 치료 노하우를 공유하고,
            <br className="hidden xl:block" />
            술기 연수와 교육 프로그램을 지속적으로 운영하며 혈관의학의
            저변을 함께 넓혀가고 있습니다.
          </p>
        </div>

        <div className="hidden min-w-0 xl:block">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={16}
            grabCursor
            pagination={{ clickable: true }}
            className="!pb-10 [&_.swiper-pagination]:!bottom-0 [&_.swiper-pagination-bullet]:!mx-1.5 [&_.swiper-pagination-bullet]:!size-3 [&_.swiper-pagination-bullet]:!bg-[#DDE1E3] [&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet-active]:!bg-[#88D4C5]"
          >
            {heroImages.map((image) => (
              <SwiperSlide key={image.id}>
                <div className="relative aspect-[666/453] overflow-hidden rounded-[18px] bg-[#E9EBEC]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={image.id === 'japan-exchange'}
                    className="object-cover"
                    sizes="430px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="-mr-5 min-w-0 xl:hidden">
          <Swiper
            slidesPerView={1.48}
            spaceBetween={12}
            grabCursor
            className="!overflow-visible pr-5"
          >
            {heroImages.map((image) => (
              <SwiperSlide key={image.id}>
                <div className="relative aspect-[1.47/1] overflow-hidden rounded-xl bg-[#E6E8E9]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="68vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

function MobileCardGallery({
  post,
}: {
  post: AcademicExchangePost;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#F1F2F3] xl:hidden">
        <Image
          src={post.images[activeIndex]}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div
        className="mt-3 flex justify-center gap-2 xl:hidden"
        aria-label={`${post.title} 이미지 선택`}
      >
        {post.images.map((image, index) => {
          const active = activeIndex === index;

          return (
            <button
              key={`${post.id}-${image}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`size-2 rounded-full transition ${
                active ? 'bg-[#83CDBF]' : 'bg-[#DFE3E4]'
              }`}
              aria-label={`${index + 1}번째 이미지 보기`}
              aria-current={active ? 'true' : undefined}
            />
          );
        })}
      </div>
    </>
  );
}

function AcademicExchangeCard({
  post,
}: {
  post: AcademicExchangePost;
}) {
  return (
    <ContentCard
      id={`academic-exchange-card-${post.id}`}
      variant="academic"
    >
      <ContentCardMedia variant="academic">
        <Image
          src={post.images[0]}
          alt={post.title}
          fill
          className="object-cover"
          sizes="33vw"
        />
      </ContentCardMedia>

      <MobileCardGallery post={post} />

      <ContentCardBody variant="academic">
        <ContentCardMeta as="p" variant="academic">
          {post.date}(일시) · {post.place}(장소)
        </ContentCardMeta>

        <ContentCardTitle variant="academic">
          {post.title}
        </ContentCardTitle>

        <ContentCardDescription variant="academic">
          {post.description}
        </ContentCardDescription>
      </ContentCardBody>
    </ContentCard>
  );
}

const PAGE_SIZE = 6;

export default function AcademicExchangeContent({
  heroImages,
  posts,
}: {
  heroImages: Array<{ id: string; src: string; alt: string }>;
  posts: AcademicExchangePost[];
}) {
  const [query, setQuery] = useState('');
  const [activePage, setActivePage] = useState(1);
  const listTopRef = useRef<HTMLDivElement>(null);

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return posts;
    }

    return posts.filter((post) =>
      [
        post.date,
        post.place,
        post.title,
        post.description,
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    );
  }, [posts, query]);

  const resultCount = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const safePage = Math.min(activePage, totalPages);
  const visiblePosts = filteredPosts.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const updateQuery = (value: string) => {
    setQuery(value);
    setActivePage(1);
  };

  const changePage = (next: number) => {
    setActivePage(next);
    listTopRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <AcademicExchangeIntro heroImages={heroImages} />

      <section className="mx-auto w-full max-w-7xl px-5 pb-20 pt-10 xl:px-0 xl:pb-28 xl:pt-16">
        <div
          ref={listTopRef}
          className="scroll-mt-28"
        >
          <BoardToolbar count={resultCount} size="md">
            <SearchField
              ariaLabel="학술교류 검색"
              size="md"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="검색어를 입력하세요"
              className="max-w-[190px] xl:max-w-[260px]"
            />
          </BoardToolbar>

          {filteredPosts.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-y-14 xl:mt-7 xl:grid-cols-3 xl:gap-x-6 xl:gap-y-10">
              {visiblePosts.map((post) => (
                <AcademicExchangeCard
                  key={post.id}
                  post={post}
                />
              ))}
            </div>
          ) : (
            <EmptyState variant="soft" className="mt-8 xl:text-xl">
              검색 조건에 맞는 학술교류 게시물이 없습니다.
            </EmptyState>
          )}

          <UiPagination
            id="academic-exchange-pagination"
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={changePage}
            ariaLabel="학술교류 페이지"
            variant="default"
            showFirst={false}
            className="mt-14 xl:mt-20"
          />
        </div>
      </section>
    </>
  );
}
