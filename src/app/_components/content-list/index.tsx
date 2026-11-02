import type { ReactNode } from 'react';
import ContentListToolbar from './toolbar';

/**
 * full: 모바일에서 이미지/리스트를 화면 양끝까지 확장합니다.
 * card: 모바일에서도 좌우 여백과 카드 테두리를 유지합니다.
 * PC에서는 두 variant 모두 동일하게 3열 카드 그리드를 사용합니다.
 */
export type ContentListVariant = 'full' | 'card';

export type PaginationInfo = {
  currentPage: number;
  totalPages: number;
};

type ContentListProps<T> = {
  id: string;
  items: readonly T[];
  getKey: (item: T) => string | number;
  getSearchText?: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  variant?: ContentListVariant;
  query?: string;
  currentPage?: number;
  pageSize?: number;
  search?: ReactNode;
  renderPagination?: (info: PaginationInfo) => ReactNode;
  emptyMessage?: string;
  className?: string;
  desktopMarginTop?: 10 | 20;
};

/** UI/검색/건수/페이지 나누기만 공통화하고 게시글 데이터·카드 본문은 외부에서 받습니다. */
export default function ContentList<T>({
  id,
  items,
  getKey,
  getSearchText,
  renderItem,
  variant = 'card',
  query = '',
  currentPage = 1,
  pageSize = 9,
  search,
  renderPagination,
  emptyMessage = '검색 결과가 없습니다.',
  className = '',
  desktopMarginTop = 20,
}: ContentListProps<T>) {
  const normalizedQuery = query.trim().toLocaleLowerCase('ko-KR');
  const filteredItems =
    normalizedQuery && getSearchText
      ? items.filter((item) =>
          getSearchText(item)
            .toLocaleLowerCase('ko-KR')
            .includes(normalizedQuery),
        )
      : items;

  const safePageSize = Math.max(1, Math.floor(pageSize));
  const totalPages = Math.ceil(filteredItems.length / safePageSize);
  const activePage = Math.min(
    Math.max(1, Math.floor(Number.isFinite(currentPage) ? currentPage : 1)),
    Math.max(1, totalPages),
  );
  const visibleItems = filteredItems.slice(
    (activePage - 1) * safePageSize,
    activePage * safePageSize,
  );

  return (
    <section id={id} className={`min-w-0 ${className}`}>
      <div
        className={`mx-auto mt-5 w-full max-w-7xl
          ${desktopMarginTop === 10 ? 'xl:mt-10' : 'xl:mt-20'}`}
      >
        <ContentListToolbar count={filteredItems.length} search={search} />

        {visibleItems.length > 0 ? (
          <ul
            className={`mt-5 mb-20 grid grid-cols-1
              xl:mb-28 xl:px-5 xl:grid-cols-3 xl:gap-x-6 xl:gap-y-12
              ${variant === `card` ? `px-5 gap-y-5` : `px-0 gap-y-10`}`}
          >
            {visibleItems.map((item) => (
              <li
                key={getKey(item)}
                className={`bg-base overflow-hidden
                  xl:rounded-[20px]
                  ${
                    variant === `card`
                      ? `rounded-xl border border-default`
                      : `xl:border xl:border-default`
                  }`}
              >
                {renderItem(item)}
              </li>
            ))}
          </ul>
        ) : (
          <p role="status" className="my-20 px-5 text-center text-secondary">
            {emptyMessage}
          </p>
        )}

        {renderPagination?.({
          currentPage: activePage,
          totalPages,
        })}
      </div>
    </section>
  );
}
