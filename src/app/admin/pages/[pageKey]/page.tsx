import AdminDataTable, {
  type AdminDataTableColumn,
  type AdminDataTableRow,
} from '@/app/admin/_components/admin-data-table';
import {
  getManagedPageAdminList,
} from '@/_lib/managed-pages';
import {
  getManagedPageConfig,
  isManagedPageKey,
} from '@/_lib/page-management-config';
import { ExternalLink, PencilLine, Plus } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

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

function dateText(value: Date) {
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(value);
}

export default async function AdminManagedPageList({
  params,
  searchParams,
}: {
  params: Promise<{ pageKey: string }>;
  searchParams: Promise<{
    q?: string | string[];
    page?: string | string[];
    pageSize?: string | string[];
    type?: string | string[];
  }>;
}) {
  const [{ pageKey }, queryParams] = await Promise.all([
    params,
    searchParams,
  ]);

  if (!isManagedPageKey(pageKey)) notFound();

  const config = getManagedPageConfig(pageKey);
  const itemType = first(queryParams.type)?.trim() || undefined;
  const query = first(queryParams.q)?.trim() ?? '';

  const result = await getManagedPageAdminList(pageKey, {
    query,
    page: integer(queryParams.page, 1),
    pageSize: integer(queryParams.pageSize, 10),
    itemType,
  });

  const columns: AdminDataTableColumn[] = [
    { key: 'type', label: '유형', className: 'w-[130px] min-w-[130px]' },
    { key: 'title', label: '제목', className: 'w-[28%] min-w-[240px]' },
    { key: 'summary', label: '요약', className: 'w-[32%] min-w-[260px]' },
    { key: 'category', label: '분류', className: 'w-[140px] min-w-[140px]' },
    { key: 'status', label: '상태', className: 'w-[88px] min-w-[88px]' },
    { key: 'updated', label: '수정일', className: 'w-[120px] min-w-[120px]' },
    { key: 'actions', label: '관리', className: 'w-[100px] min-w-[100px] text-right' },
  ];

  const rows: AdminDataTableRow[] = result.items.map((item) => {
    const typeLabel =
      config.itemTypes.find((type) => type.value === item.itemType)?.label ??
      item.itemType;

    return {
      id: item.id,
      cells: {
        type: (
          <span className="whitespace-nowrap text-xs font-medium text-[#52525B]">
            {typeLabel}
          </span>
        ),
        title: (
          <div className="min-w-0">
            <p className="truncate font-semibold text-[#27272A]">{item.title}</p>
            <p className="mt-1 truncate text-[11px] text-[#A1A1AA]">
              {item.itemKey}
            </p>
          </div>
        ),
        summary: (
          <p className="line-clamp-2 break-keep text-xs leading-5 text-[#71717A]">
            {item.summary || '-'}
          </p>
        ),
        category: (
          <span className="line-clamp-2 text-xs text-[#71717A]">
            {item.category || '-'}
          </span>
        ),
        status: (
          <span
            className={`inline-flex whitespace-nowrap rounded-full px-2 py-1 text-[11px] font-medium ${
              item.isVisible
                ? 'bg-[#DCFCE7] text-[#166534]'
                : 'bg-[#F4F4F5] text-[#71717A]'
            }`}
          >
            {item.isVisible ? '노출' : '미노출'}
          </span>
        ),
        updated: (
          <time className="whitespace-nowrap text-xs text-[#8A8A91]">
            {dateText(item.updatedAt)}
          </time>
        ),
        actions: (
          <div className="flex justify-end">
            <Link
              href={`/admin/pages/${pageKey}/${item.id}`}
              className="inline-flex h-9 min-w-[76px] items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-[#E4E4E7] bg-white px-3 text-xs font-semibold text-[#52525B] hover:bg-[#F4F4F5]"
            >
              <PencilLine className="size-3.5 shrink-0" />
              수정
            </Link>
          </div>
        ),
      },
    };
  });

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-medium text-[#A1A1AA]">
            {config.groupLabel}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
            {config.label}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#71717A]">
            {config.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={config.publicHref}
            target="_blank"
            className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md border border-[#E4E4E7] bg-white px-4 text-sm font-medium text-[#52525B] hover:bg-[#F4F4F5]"
          >
            <ExternalLink className="size-4" />
            페이지 보기
          </Link>

          {config.itemTypes.map((type) => (
            <Link
              key={type.value}
              href={`/admin/pages/${pageKey}/new?type=${encodeURIComponent(type.value)}`}
              className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md bg-[#18181B] px-4 text-sm font-medium text-white hover:bg-[#27272A]"
            >
              <Plus className="size-4" />
              {type.label} 추가
            </Link>
          ))}
        </div>
      </div>

      {config.itemTypes.length > 1 ? (
        <nav className="flex flex-wrap gap-2" aria-label={`${config.label} 데이터 유형`}>
          <Link
            href={`/admin/pages/${pageKey}`}
            className={`rounded-full border px-4 py-2 text-xs font-medium ${
              !itemType
                ? 'border-[#18181B] bg-[#18181B] text-white'
                : 'border-[#E4E4E7] bg-white text-[#71717A]'
            }`}
          >
            전체
          </Link>
          {config.itemTypes.map((type) => (
            <Link
              key={type.value}
              href={`/admin/pages/${pageKey}?type=${encodeURIComponent(type.value)}`}
              className={`rounded-full border px-4 py-2 text-xs font-medium ${
                itemType === type.value
                  ? 'border-[#18181B] bg-[#18181B] text-white'
                  : 'border-[#E4E4E7] bg-white text-[#71717A]'
              }`}
            >
              {type.label}
            </Link>
          ))}
        </nav>
      ) : null}

      <AdminDataTable
        columns={columns}
        rows={rows}
        basePath={`/admin/pages/${pageKey}`}
        query={result.query}
        page={result.page}
        pageSize={result.pageSize}
        total={result.total}
        totalPages={result.totalPages}
        searchPlaceholder={`${config.label} 제목, 분류, ID 검색`}
        extraParams={{ type: itemType }}
        emptyText={
          result.query
            ? `"${result.query}" 검색 결과가 없습니다.`
            : `등록된 ${config.label} 데이터가 없습니다.`
        }
      />
    </section>
  );
}
