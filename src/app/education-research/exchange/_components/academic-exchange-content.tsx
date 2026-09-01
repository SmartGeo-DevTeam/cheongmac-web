'use client';

import {
  ACADEMIC_EXCHANGE_HERO_IMAGES,
  ACADEMIC_EXCHANGE_POSTS,
  ACADEMIC_EXCHANGE_TOTAL_COUNT,
  type AcademicExchangePost,
} from '../_data';
import {
  ChevronRight,
  ChevronsRight,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';

const PAGE_NUMBERS = [1, 2, 3, 4, 5] as const;

function AcademicExchangeIntro() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const activeHero = ACADEMIC_EXCHANGE_HERO_IMAGES[activeHeroIndex];

  return (
    <section className="bg-[#F4F5F5]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 xl:grid-cols-[minmax(0,1fr)_430px] xl:items-center xl:gap-20 xl:px-0 xl:py-24">
        <div>
          <p className="text-sm font-semibold tracking-[-0.015em] text-[#2B9B82] xl:text-base">
            ACADEMIC EXCHANGE
          </p>

          <h2 className="mt-4 break-keep text-[24px] font-bold leading-[1.45] tracking-[-0.045em] text-[#262C35] xl:mt-5 xl:text-[34px] xl:leading-[1.5]">
            혈관 치료의 올바른 기준을 세우기 위해
            <br className="hidden xl:block" />
            <span className="xl:ml-0">
              청맥병원은 끊임없이 연구하고 소통합니다.
            </span>
          </h2>

          <p className="mt-7 break-keep text-base leading-[1.8] text-[#4F565D] xl:mt-9 xl:max-w-[680px] xl:text-xl">
            국내외 의료진과 임상 경험과 치료 노하우를 공유하고,
            <br className="hidden xl:block" />
            술기 연수와 교육 프로그램을 지속적으로 운영하며 혈관의학의
            저변을 함께 넓혀가고 있습니다.
          </p>
        </div>

        <div className="hidden xl:block">
          <div className="relative aspect-[666/453] overflow-hidden rounded-[18px] bg-[#E9EBEC]">
            <Image
              key={activeHero.id}
              src={activeHero.src}
              alt={activeHero.alt}
              fill
              priority
              className="object-cover"
              sizes="430px"
            />
          </div>

          <div
            className="mt-5 flex justify-center gap-3"
            aria-label="학술교류 대표 이미지 선택"
          >
            {ACADEMIC_EXCHANGE_HERO_IMAGES.map((image, index) => {
              const active = activeHeroIndex === index;

              return (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveHeroIndex(index)}
                  aria-label={`${index + 1}번째 학술교류 이미지 보기`}
                  aria-current={active ? 'true' : undefined}
                  className={`size-3 rounded-full transition ${
                    active
                      ? 'bg-[#88D4C5]'
                      : 'bg-[#E3E5E7] hover:bg-[#C7CCCF]'
                  }`}
                />
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 xl:hidden">
          {ACADEMIC_EXCHANGE_HERO_IMAGES.map((image) => (
            <div
              key={image.id}
              className="relative aspect-[1.47/1] overflow-hidden rounded-lg bg-[#E6E8E9]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          ))}
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
    <article className="min-w-0 xl:overflow-hidden xl:rounded-[18px] xl:border xl:border-[#E0E3E5] xl:bg-white">
      <div className="relative hidden aspect-[16/9] overflow-hidden bg-[#F1F2F3] xl:block">
        <Image
          src={post.images[0]}
          alt={post.title}
          fill
          className="object-cover"
          sizes="33vw"
        />
      </div>

      <MobileCardGallery post={post} />

      <div className="pt-5 xl:px-5 xl:pb-6 xl:pt-5">
        <p className="text-sm text-[#A0A5AA] xl:text-base">
          {post.date}(일시) · {post.place}(장소)
        </p>

        <h3 className="mt-3 break-keep text-xl font-bold tracking-[-0.035em] text-[#262C35] xl:text-[24px]">
          {post.title}
        </h3>

        <p className="mt-3 line-clamp-2 break-keep text-base leading-[1.7] text-[#656C73] xl:text-xl xl:leading-[1.65]">
          {post.description}
        </p>
      </div>
    </article>
  );
}

export default function AcademicExchangeContent() {
  const [query, setQuery] = useState('');
  const [activePage, setActivePage] = useState(1);
  const listTopRef = useRef<HTMLDivElement>(null);

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return ACADEMIC_EXCHANGE_POSTS;
    }

    return ACADEMIC_EXCHANGE_POSTS.filter((post) =>
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
  }, [query]);

  const resultCount =
    query.trim().length === 0
      ? ACADEMIC_EXCHANGE_TOTAL_COUNT
      : filteredPosts.length;

  const updateQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
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
      <AcademicExchangeIntro />

      <section className="mx-auto w-full max-w-7xl px-5 pb-20 pt-10 xl:px-0 xl:pb-28 xl:pt-16">
        <div
          ref={listTopRef}
          className="scroll-mt-28"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="shrink-0 text-sm text-[#A0A5AA] xl:text-base">
              총{' '}
              <strong className="font-semibold text-[#FF6B3D]">
                {resultCount.toLocaleString()}
              </strong>{' '}
              건
            </p>

            <label className="relative block w-[190px] xl:w-[260px]">
              <span className="sr-only">학술교류 검색</span>
              <input
                type="search"
                value={query}
                onChange={updateQuery}
                placeholder="검색어를 입력하세요"
                className="h-11 w-full rounded-full border border-[#E1E4E6] bg-white pl-4 pr-11 text-sm text-[#30373D] outline-none placeholder:text-[#A5AAAF] focus:border-[#A9C9C1] xl:h-12 xl:text-base"
              />
              <Search
                className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#545B62]"
                strokeWidth={1.7}
              />
            </label>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-y-14 xl:mt-7 xl:grid-cols-3 xl:gap-x-6 xl:gap-y-10">
              {filteredPosts.map((post) => (
                <AcademicExchangeCard
                  key={post.id}
                  post={post}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 flex min-h-48 items-center justify-center rounded-2xl bg-[#F6F7F7] px-5 text-center text-base text-[#8D9399] xl:text-xl">
              검색 조건에 맞는 학술교류 게시물이 없습니다.
            </div>
          )}

          <nav
            aria-label="학술교류 페이지"
            className="mt-14 flex items-center justify-center gap-5 text-sm text-[#7E848A] xl:mt-20 xl:text-base"
          >
            {PAGE_NUMBERS.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => changePage(page)}
                aria-current={activePage === page ? 'page' : undefined}
                className={`grid size-8 place-items-center rounded-md transition ${
                  activePage === page
                    ? 'bg-[#5A616A] font-semibold text-white'
                    : 'hover:bg-[#F1F2F3] hover:text-[#333A40]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => changePage(Math.min(5, activePage + 1))}
              className="grid size-8 place-items-center rounded-md transition hover:bg-[#F1F2F3]"
              aria-label="다음 페이지"
            >
              <ChevronRight
                className="size-4"
                strokeWidth={1.7}
              />
            </button>

            <button
              type="button"
              onClick={() => changePage(5)}
              className="grid size-8 place-items-center rounded-md transition hover:bg-[#F1F2F3]"
              aria-label="마지막 페이지"
            >
              <ChevronsRight
                className="size-4"
                strokeWidth={1.7}
              />
            </button>
          </nav>
        </div>
      </section>
    </>
  );
}
