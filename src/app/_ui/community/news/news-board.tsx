'use client';

import Inner from '@/app/_components/common/inner';
import PageHeader from '@/app/_components/common/page-header';
import ContentPagination from '@/app/_components/content-list/pagination';
import ContentListToolbar from '@/app/_components/content-list/toolbar';
import PageTabs from '@/app/_components/common/page-tabs';
import { useViewport } from '@/app/_providers/viewport-provider';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { NEWS_ITEMS, type NewsCategory } from '@/app/_data/community/news/news';

type NewsTabId = 'all' | NewsCategory;

type NewsFilters = {
  category: NewsTabId;
  query: string;
  page: number;
};

const NEWS_TABS: { id: NewsTabId; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'inside', label: '원내소식' },
  { id: 'press', label: '언론보도' },
];

const LIST_PATH = '/community/news';
const DESKTOP_PAGE_SIZE = 12;
const MOBILE_PAGE_SIZE: Record<NewsTabId, number> = {
  all: 10,
  inside: 6,
  press: 5,
};

function readFilters(params: URLSearchParams): NewsFilters {
  const category = params.get('category');
  const parsedPage = Number(params.get('page') ?? 1);

  return {
    category: category === 'inside' || category === 'press' ? category : 'all',
    query: params.get('q') ?? '',
    page: Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1,
  };
}

function buildListUrl(filters: NewsFilters): string {
  const params = new URLSearchParams();

  if (filters.category !== 'all') {
    params.set('category', filters.category);
  }
  if (filters.query.trim()) {
    params.set('q', filters.query.trim());
  }
  if (filters.page > 1) {
    params.set('page', String(filters.page));
  }

  const search = params.toString();
  return search ? `${LIST_PATH}?${search}` : LIST_PATH;
}

function NewsContent() {
  const searchParams = useSearchParams();
  const { isDesktop } = useViewport();

  const [filters, setFilters] = useState<NewsFilters>(() =>
    readFilters(new URLSearchParams(searchParams.toString())),
  );

  useEffect(() => {
    const onPopState = () => {
      setFilters(readFilters(new URLSearchParams(window.location.search)));
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const updateFilters = (next: NewsFilters) => {
    setFilters(next);
    window.history.replaceState(window.history.state, '', buildListUrl(next));
  };

  // 카테고리/검색어를 한 번에 적용합니다. 검색은 입력할 때마다 즉시 반영됩니다.
  const filteredItems = useMemo(() => {
    const keyword = filters.query.trim().toLocaleLowerCase('ko-KR');

    return NEWS_ITEMS.filter((item) => {
      if (filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }

      if (!keyword) return true;

      return [item.title, item.excerpt, item.source ?? '']
        .join(' ')
        .toLocaleLowerCase('ko-KR')
        .includes(keyword);
    });
  }, [filters.category, filters.query]);

  const pageSize = isDesktop
    ? DESKTOP_PAGE_SIZE
    : MOBILE_PAGE_SIZE[filters.category];
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const currentPage = Math.min(filters.page, totalPages);
  const visibleItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // 상세 페이지 구현 시 목록으로 돌아올 위치를 유지할 수 있도록 남겨 둡니다.
  const returnTo = buildListUrl({ ...filters, page: currentPage });

  const changePage = (page: number) => {
    updateFilters({ ...filters, page });

    document.getElementById('community-news-results')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <PageTabs
        id="community-news-tabs"
        ariaLabel="청맥뉴스 분류"
        tabs={NEWS_TABS}
        activeId={filters.category}
        onChange={(id) => {
          if (id !== 'all' && id !== 'inside' && id !== 'press') return;
          updateFilters({ ...filters, category: id, page: 1 });
        }}
        align="center"
      />

      <section id="community-news-results">
        <div className="mt-10">
          <Inner
            usePaddingHorizontalInMobile={false}
            usePaddingHorizontalInDesktop={false}
          >
            <ContentListToolbar
              count={filteredItems.length}
              searchClassName={`w-[58%] max-w-62.5 [&>label]:max-w-full
              xl:w-100 xl:max-w-none`}
              searchProps={{
                ariaLabel: '청맥뉴스 검색',
                value: filters.query,
                onChange: (query) =>
                  updateFilters({ ...filters, query, page: 1 }),
              }}
            />
          </Inner>

          <Inner>
            {visibleItems.length > 0 ? (
              <>
                {/* PC: 모든 탭에서 공통으로 사용하는 4열 그리드 */}
                <div
                  className="hidden
                  xl:block"
                >
                  <ul
                    aria-label="청맥뉴스 게시글 목록"
                    className="xl:mt-5 xl:grid xl:grid-cols-4 xl:gap-6"
                  >
                    {visibleItems.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={{
                            pathname: `/community/news/${item.id}`,
                            query: { returnTo },
                          }}
                          className="xl:group xl:block xl:leading-[160%]"
                        >
                          <div className="xl:relative xl:aspect-square xl:rounded-xl xl:overflow-hidden">
                            <Image
                              src={item.imageSrc}
                              alt=""
                              fill
                              className="xl:object-cover"
                            />
                          </div>
                          <h2 className="xl:mt-4 xl:break-keep xl:font-semibold xl:text-black xl:text-[20px]">
                            {item.title}
                          </h2>
                          <time
                            dateTime={item.date.replaceAll('.', '-')}
                            className="xl:inline-block xl:mt-2 xl:font-bold xl:text-gray-400 xl:text-[16px]"
                          >
                            {item.date}
                          </time>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="leading-[140%] break-keep
                  xl:hidden"
                >
                  {/* 모바일: 전체 - 2열 그리드 */}
                  {filters.category === 'all' && (
                    <ul
                      aria-label="청맥뉴스 전체 게시글 목록"
                      className="mt-5 grid grid-cols-2 gap-5"
                    >
                      {visibleItems.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={{
                              pathname: `/community/news/${item.id}`,
                              query: { returnTo },
                            }}
                          >
                            <div className="relative aspect-square rounded-xl overflow-hidden">
                              <Image
                                src={item.imageSrc}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            </div>
                            <h2 className="mt-2 min-h-[2lh] font-medium text-black text-[14px]">
                              {item.title}
                            </h2>
                            <time
                              dateTime={item.date.replaceAll('.', '-')}
                              className="mt-2 inline-block font-medium text-gray-400 text-[12px]"
                            >
                              {item.date}
                            </time>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* 모바일: 원내소식 - 1열 이미지/제목/요약 */}
                  {filters.category === 'inside' && (
                    <ul
                      aria-label="청맥뉴스 원내소식 목록"
                      className="mt-5 space-y-5"
                    >
                      {visibleItems.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={{
                              pathname: `/community/news/${item.id}`,
                              query: { returnTo },
                            }}
                          >
                            <div className="relative aspect-335/180 rounded-xl overflow-hidden">
                              <Image
                                src={item.imageSrc}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            </div>
                            <h2 className="mt-3 font-semibold text-black text-[15px]">
                              {item.title}
                            </h2>
                            <p className="mt-1 text-black text-[13px]">
                              {item.excerpt}
                            </p>
                            <time
                              dateTime={item.date.replaceAll('.', '-')}
                              className="mt-1 inline-block font-medium text-gray-400 text-[12px]"
                            >
                              {item.date}
                            </time>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* 모바일: 언론보도 - 가로형 이미지/내용/언론사/날짜 */}
                  {filters.category === 'press' && (
                    <ul
                      aria-label="청맥뉴스 언론보도 목록"
                      className="mt-5 space-y-6"
                    >
                      {visibleItems.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={{
                              pathname: `/community/news/${item.id}`,
                              query: { returnTo },
                            }}
                            className="flex gap-2"
                          >
                            <div className="relative aspect-square w-[33.3vw] rounded-lg overflow-clip">
                              <Image
                                src={item.imageSrc}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 flex flex-col">
                              <h2 className="font-medium text-black text-[14px]">
                                {item.title}
                              </h2>
                              <p className="mt-1 font-light text-gray-600 text-[12px]">
                                {item.excerpt}
                              </p>
                              <div className="mt-auto pt-1.5 flex justify-between items-end">
                                <div className="relative w-20 aspect-201/48 shrink-0 flex items-end">
                                  {item.sourceLogoSrc && (
                                    <Image
                                      src={item.sourceLogoSrc}
                                      alt={`${item.source ?? '언론사'} 로고`}
                                      fill
                                      className="object-contain object-bottom-left"
                                    />
                                  )}
                                </div>
                                <time
                                  dateTime={item.date.replaceAll('.', '-')}
                                  className="font-medium text-gray-400 text-[12px]"
                                >
                                  {item.date}
                                </time>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <p role="status" className="py-24 text-center text-secondary">
                검색 결과가 없습니다.
              </p>
            )}

            <div className="mt-12">
              <ContentPagination
                ariaLabel="청맥뉴스 페이지 이동"
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={changePage}
              />
            </div>

            <div
              className="mt-4 mb-20 space-y-2
              xl:grid xl:grid-cols-3 xl:gap-3"
            >
              <Link
                href={`/`}
                className="px-6 py-5 flex justify-between items-center rounded-xl border border-default"
              >
                <div>
                  <h3 className="font-semibold text-[24px]">유튜브</h3>
                  <span className="text-secondary text-[14px]">바로가기</span>
                </div>
                <div
                  className="relative size-10
                  xl:size-15"
                >
                  <Image src={`/news/youtube.png`} alt="" fill />
                </div>
              </Link>

              <Link
                href={`/`}
                className="px-6 py-5 flex justify-between items-center rounded-xl border border-default"
              >
                <div>
                  <h3 className="font-semibold text-[24px]">블로그</h3>
                  <span className="text-secondary text-[14px]">바로가기</span>
                </div>
                <div
                  className="relative size-10
                  xl:size-15"
                >
                  <Image src={`/news/blog.png`} alt="" fill />
                </div>
              </Link>

              <Link
                href={`/`}
                className="px-6 py-5 flex justify-between items-center rounded-xl border border-default"
              >
                <div>
                  <h3 className="font-semibold text-[24px]">인스타그램</h3>
                  <span className="text-secondary text-[14px]">바로가기</span>
                </div>
                <div
                  className="relative size-10
                  xl:size-15"
                >
                  <Image src={`/news/instagram.png`} alt="" fill />
                </div>
              </Link>
            </div>
          </Inner>
        </div>
      </section>
    </>
  );
}

export default function NewsBoard() {
  return (
    <>
      <PageHeader title="청맥뉴스" />

      <Suspense fallback={null}>
        <NewsContent />
      </Suspense>
    </>
  );
}
