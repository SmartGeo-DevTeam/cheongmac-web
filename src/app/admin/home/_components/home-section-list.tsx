import {
  getHomeAdminSection,
  type HomeAdminSectionKey,
} from '@/_lib/home-admin-sections';
import { getManagedPageAdminList } from '@/_lib/managed-pages';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function integer(
  value: string | string[] | undefined,
  fallback: number,
) {
  const parsed = Number.parseInt(first(value) ?? '', 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function pageHref(
  basePath: string,
  query: string,
  page: number,
  pageSize: number,
) {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (page > 1) params.set('page', String(page));
  if (pageSize !== 10) params.set('pageSize', String(pageSize));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export default async function HomeSectionList({
  sectionKey,
  searchParams,
}: {
  sectionKey: HomeAdminSectionKey;
  searchParams: Promise<{
    q?: string | string[];
    page?: string | string[];
    pageSize?: string | string[];
  }>;
}) {
  const section = getHomeAdminSection(sectionKey);
  if (!section) notFound();

  const params = await searchParams;
  const query = first(params.q)?.trim().slice(0, 120) ?? '';
  const page = Math.max(1, integer(params.page, 1));
  const pageSizeCandidate = integer(params.pageSize, 10);
  const pageSize = [10, 20, 50].includes(pageSizeCandidate)
    ? pageSizeCandidate
    : 10;

  const result = await getManagedPageAdminList('home', {
    query,
    page,
    pageSize,
    itemType: section.itemType,
  });

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs font-medium text-[#A1A1AA]">
            메인페이지
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
            {section.label}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#71717A]">
            {section.description}
          </p>
        </div>

        <Link
          href={`${section.href}/new`}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#18181B] px-4 text-sm font-semibold text-white hover:bg-[#27272A]"
        >
          <Plus className="size-4" />
          {section.singularLabel} 추가
        </Link>
      </div>

      <div className="rounded-xl border border-[#E4E4E7] bg-white">
        <form
          method="get"
          className="flex flex-col gap-3 border-b border-[#E4E4E7] p-4 md:flex-row md:items-center md:justify-between"
        >
          <div className="relative w-full md:max-w-[360px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#A1A1AA]" />
            <input
              type="search"
              name="q"
              defaultValue={result.query}
              placeholder="제목 / 설명 / 분류 검색"
              className="h-10 w-full rounded-md border border-[#D4D4D8] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#A1A1AA]"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              name="pageSize"
              defaultValue={String(result.pageSize)}
              className="h-10 rounded-md border border-[#D4D4D8] bg-white px-3 text-sm text-[#52525B]"
            >
              <option value="10">10개</option>
              <option value="20">20개</option>
              <option value="50">50개</option>
            </select>
            <button
              type="submit"
              className="h-10 rounded-md border border-[#D4D4D8] bg-white px-4 text-sm font-medium text-[#52525B] hover:bg-[#F4F4F5]"
            >
              검색
            </button>
          </div>
        </form>

        <div className="divide-y divide-[#E4E4E7]">
          {result.items.length ? (
            result.items.map((item) => (
              <div
                key={item.id}
                className="grid gap-3 px-4 py-4 md:grid-cols-[minmax(0,1fr)_100px_110px_90px] md:items-center"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[#27272A]">
                    {item.title}
                  </p>
                  {item.summary ? (
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#71717A]">
                      {item.summary}
                    </p>
                  ) : null}
                  {item.category ? (
                    <p className="mt-1 text-[11px] text-[#A1A1AA]">
                      {item.category}
                    </p>
                  ) : null}
                </div>

                <div className="text-xs text-[#71717A]">
                  순서 {item.sortOrder}
                </div>

                <div>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${
                      item.isVisible
                        ? 'bg-[#DCFCE7] text-[#166534]'
                        : 'bg-[#F4F4F5] text-[#71717A]'
                    }`}
                  >
                    {item.isVisible ? '노출' : '미노출'}
                  </span>
                </div>

                <div className="md:text-right">
                  <Link
                    href={`${section.href}/${encodeURIComponent(item.id)}`}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-[#D4D4D8] bg-white px-3 text-xs font-semibold text-[#52525B] hover:bg-[#F4F4F5]"
                  >
                    수정
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="px-5 py-16 text-center text-sm text-[#A1A1AA]">
              등록된 {section.label} 데이터가 없습니다.
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-[#E4E4E7] p-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[#71717A]">
            총 {result.total.toLocaleString('ko-KR')}건
          </p>

          <div className="flex items-center gap-2">
            <Link
              aria-disabled={result.page <= 1}
              href={pageHref(
                section.href,
                result.query,
                Math.max(1, result.page - 1),
                result.pageSize,
              )}
              className={`rounded-md border px-3 py-2 text-xs ${
                result.page <= 1
                  ? 'pointer-events-none border-[#E4E4E7] text-[#D4D4D8]'
                  : 'border-[#D4D4D8] text-[#52525B] hover:bg-[#F4F4F5]'
              }`}
            >
              이전
            </Link>
            <span className="px-2 text-xs text-[#71717A]">
              {result.page} / {result.totalPages}
            </span>
            <Link
              aria-disabled={result.page >= result.totalPages}
              href={pageHref(
                section.href,
                result.query,
                Math.min(result.totalPages, result.page + 1),
                result.pageSize,
              )}
              className={`rounded-md border px-3 py-2 text-xs ${
                result.page >= result.totalPages
                  ? 'pointer-events-none border-[#E4E4E7] text-[#D4D4D8]'
                  : 'border-[#D4D4D8] text-[#52525B] hover:bg-[#F4F4F5]'
              }`}
            >
              다음
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
