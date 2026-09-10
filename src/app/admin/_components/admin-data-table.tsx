import { Search } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

export type AdminDataTableColumn = {
  key: string;
  label: string;
  className?: string;
};

export type AdminDataTableRow = {
  id: string;
  cells: Record<string, ReactNode>;
};

function pageHref(
  basePath: string,
  page: number,
  query: string,
  pageSize: number,
  extraParams: Record<string, string | undefined>,
) {
  const params = new URLSearchParams();

  if (query) params.set('q', query);
  if (page > 1) params.set('page', String(page));
  if (pageSize !== 10) params.set('pageSize', String(pageSize));

  for (const [key, value] of Object.entries(extraParams)) {
    if (value) params.set(key, value);
  }

  const search = params.toString();
  return search ? `${basePath}?${search}` : basePath;
}

function visiblePages(page: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([
    1,
    totalPages,
    page - 2,
    page - 1,
    page,
    page + 1,
    page + 2,
  ]);

  return [...pages]
    .filter((value) => value >= 1 && value <= totalPages)
    .sort((a, b) => a - b);
}

export default function AdminDataTable({
  columns,
  rows,
  basePath,
  query,
  page,
  pageSize,
  total,
  totalPages,
  searchPlaceholder = '검색어를 입력하세요.',
  extraParams = {},
  emptyText = '검색 결과가 없습니다.',
}: {
  columns: AdminDataTableColumn[];
  rows: AdminDataTableRow[];
  basePath: string;
  query: string;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  searchPlaceholder?: string;
  extraParams?: Record<string, string | undefined>;
  emptyText?: string;
}) {
  const pages = visiblePages(page, totalPages);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-[#E4E4E7] bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
        <form
          action={basePath}
          method="get"
          className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:flex-wrap lg:flex-nowrap"
        >
          {Object.entries(extraParams).map(([key, value]) =>
            value ? (
              <input key={key} type="hidden" name={key} value={value} />
            ) : null,
          )}

          <div className="relative min-w-0 flex-1 basis-full sm:basis-auto lg:max-w-xl">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#A1A1AA]"
              aria-hidden="true"
            />
            <input
              id="admin-data-table-search"
              name="q"
              type="search"
              autoComplete="off"
              defaultValue={query}
              placeholder={searchPlaceholder}
              className="h-10 w-full min-w-0 rounded-md border border-[#D4D4D8] bg-white pl-9 pr-3 text-sm text-[#18181B] outline-none placeholder:text-[#A1A1AA] focus:border-[#A1A1AA]"
            />
          </div>

          <select
            id="admin-data-table-page-size"
            name="pageSize"
            defaultValue={String(pageSize)}
            className="h-10 shrink-0 rounded-md border border-[#D4D4D8] bg-white px-3 text-sm text-[#52525B]"
            aria-label="페이지당 표시 개수"
          >
            <option value="10">10개씩</option>
            <option value="20">20개씩</option>
            <option value="50">50개씩</option>
          </select>

          <button
            type="submit"
            className="inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-[#18181B] px-4 text-sm font-medium text-white hover:bg-[#27272A]"
          >
            검색
          </button>

          {query ? (
            <Link
              href={pageHref(basePath, 1, '', pageSize, extraParams)}
              className="inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-md border border-[#E4E4E7] bg-white px-4 text-sm font-medium text-[#52525B] hover:bg-[#F4F4F5]"
            >
              초기화
            </Link>
          ) : null}
        </form>

        <p className="shrink-0 whitespace-nowrap text-xs text-[#71717A]">
          총 <strong className="font-semibold text-[#27272A]">{total}</strong>건
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#E4E4E7] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] table-fixed border-collapse text-left">
            <thead className="bg-[#FAFAFA]">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className={`border-b border-[#ECECEF] px-5 py-3 text-xs font-semibold text-[#71717A] ${column.className ?? ''}`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#ECECEF]">
              {rows.map((row) => (
                <tr key={row.id} className="align-middle hover:bg-[#FCFCFC]">
                  {columns.map((column) => (
                    <td
                      key={`${row.id}-${column.key}`}
                      className={`px-5 py-4 text-sm text-[#52525B] ${column.className ?? ''}`}
                    >
                      {row.cells[column.key] ?? null}
                    </td>
                  ))}
                </tr>
              ))}

              {!rows.length ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-5 py-16 text-center text-sm text-[#A1A1AA]"
                  >
                    {emptyText}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 ? (
        <nav
          aria-label="관리자 데이터 페이지"
          className="flex flex-wrap items-center justify-center gap-1"
        >
          <Link
            href={pageHref(
              basePath,
              Math.max(1, page - 1),
              query,
              pageSize,
              extraParams,
            )}
            aria-disabled={page <= 1}
            className={`inline-flex h-9 items-center whitespace-nowrap rounded-md border px-3 text-xs font-medium ${
              page <= 1
                ? 'pointer-events-none border-[#ECECEF] text-[#C4C4C7]'
                : 'border-[#E4E4E7] bg-white text-[#52525B] hover:bg-[#F4F4F5]'
            }`}
          >
            이전
          </Link>

          {pages.map((pageNumber, index) => {
            const previousPage = pages[index - 1];
            const showGap = previousPage && pageNumber - previousPage > 1;

            return (
              <span key={pageNumber} className="contents">
                {showGap ? (
                  <span className="px-1 text-xs text-[#A1A1AA]">…</span>
                ) : null}
                <Link
                  href={pageHref(
                    basePath,
                    pageNumber,
                    query,
                    pageSize,
                    extraParams,
                  )}
                  aria-current={pageNumber === page ? 'page' : undefined}
                  className={`inline-flex size-9 items-center justify-center rounded-md border text-xs font-semibold ${
                    pageNumber === page
                      ? 'border-[#18181B] bg-[#18181B] text-white'
                      : 'border-[#E4E4E7] bg-white text-[#52525B] hover:bg-[#F4F4F5]'
                  }`}
                >
                  {pageNumber}
                </Link>
              </span>
            );
          })}

          <Link
            href={pageHref(
              basePath,
              Math.min(totalPages, page + 1),
              query,
              pageSize,
              extraParams,
            )}
            aria-disabled={page >= totalPages}
            className={`inline-flex h-9 items-center whitespace-nowrap rounded-md border px-3 text-xs font-medium ${
              page >= totalPages
                ? 'pointer-events-none border-[#ECECEF] text-[#C4C4C7]'
                : 'border-[#E4E4E7] bg-white text-[#52525B] hover:bg-[#F4F4F5]'
            }`}
          >
            다음
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
