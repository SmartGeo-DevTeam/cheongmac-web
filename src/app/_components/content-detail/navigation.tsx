import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

type Neighbor = { id: string; title: string } | null;

type Props = {
  previous: Neighbor;
  next: Neighbor;
  basePath: string;
  listHref: string;
  ariaLabel: string;
  /** 목록 검색 상태를 다음/이전 게시글 링크에도 유지합니다. */
  returnTo?: string;
};

/** 상세 콘텐츠의 이전글/다음글 및 목록보기 UI를 공통으로 제공합니다. */
export default function ContentDetailNavigation({
  previous,
  next,
  basePath,
  listHref,
  ariaLabel,
  returnTo,
}: Props) {
  const getHref = (id: string) => {
    const path = `${basePath}/${encodeURIComponent(id)}`;
    return returnTo ? `${path}?returnTo=${encodeURIComponent(returnTo)}` : path;
  };

  return (
    <>
      <nav
        aria-label={ariaLabel}
        className="mt-5 grid border-y border-y-default text-gray-600 text-[12px]
        xl:mt-8 xl:grid-cols-2 xl:text-[16px]"
      >
        <div
          className="flex min-w-0 items-center border-b border-b-default px-2
          xl:border-b-0 xl:border-r xl:border-r-default xl:px-5"
        >
          <div className="flex shrink-0 items-center gap-2">
            <ChevronUp className="size-4" aria-hidden="true" />
            <span className="font-bold">이전글</span>
          </div>
          {previous ? (
            <Link
              href={getHref(previous.id)}
              className="min-w-0 flex-1 truncate py-4 pl-5 font-medium hover:text-brand"
            >
              {previous.title}
            </Link>
          ) : (
            <span className="min-w-0 flex-1 truncate py-4 pl-5 text-tertiary">
              이전글이 없습니다.
            </span>
          )}
        </div>

        <div className="flex min-w-0 items-center px-2 xl:px-5">
          <div className="flex shrink-0 items-center gap-2">
            <ChevronDown className="size-4" aria-hidden="true" />
            <span className="font-bold">다음글</span>
          </div>
          {next ? (
            <Link
              href={getHref(next.id)}
              className="min-w-0 flex-1 truncate py-4 pl-5 font-medium hover:text-brand"
            >
              {next.title}
            </Link>
          ) : (
            <span className="min-w-0 flex-1 truncate py-4 pl-5 text-tertiary">
              다음글이 없습니다.
            </span>
          )}
        </div>
      </nav>

      <div className="mb-20 mt-5 flex justify-center xl:mb-28 xl:mt-10">
        <Link
          href={listHref}
          className="rounded-full border border-green-900 px-7 py-3 font-bold text-green-900 text-[14px]
          xl:px-10 xl:py-4 xl:text-[16px]"
        >
          목록보기
        </Link>
      </div>
    </>
  );
}
