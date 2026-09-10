import AdminDataTable, {
  type AdminDataTableColumn,
  type AdminDataTableRow,
} from '@/app/admin/_components/admin-data-table';
import {
  getAdminDoctors,
  getRelatedContentPage,
} from '@/_lib/related-content';
import {
  isRelatedContentResource,
  RELATED_CONTENT_META,
} from '@/_lib/related-content-types';
import { PencilLine, Plus } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function numberParam(
  value: string | string[] | undefined,
  fallback: number,
) {
  const parsed = Number.parseInt(firstParam(value) ?? '', 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

const SEARCH_PLACEHOLDERS = {
  specialties: '진료분야명, 설명, 관련 의료진으로 검색',
  schedules: '시간대, 진료/휴진 상태, 관련 의료진으로 검색',
  presentations: '발표 제목, 학회/기관, 설명, 관련 의료진으로 검색',
  reviews: '환자명, 치료정보, 후기 내용, 관련 의료진으로 검색',
  media: '미디어 제목, 종류, 출처, 관련 의료진으로 검색',
  consultations: '상담 제목, 분류, 관련 의료진으로 검색',
} as const;

export default async function RelatedContentListPage({
  params,
  searchParams,
}: {
  params: Promise<{ resource: string }>;
  searchParams: Promise<{
    q?: string | string[];
    page?: string | string[];
    pageSize?: string | string[];
    doctorId?: string | string[];
  }>;
}) {
  const [{ resource }, queryParams] = await Promise.all([
    params,
    searchParams,
  ]);

  if (!isRelatedContentResource(resource)) notFound();

  const query = firstParam(queryParams.q)?.trim() ?? '';
  const requestedPage = numberParam(queryParams.page, 1);
  const requestedPageSize = numberParam(queryParams.pageSize, 10);
  const doctorId = firstParam(queryParams.doctorId)?.trim() || undefined;

  const [result, doctors] = await Promise.all([
    getRelatedContentPage(resource, {
      query,
      page: requestedPage,
      pageSize: requestedPageSize,
      doctorId,
    }),
    doctorId ? getAdminDoctors() : Promise.resolve([]),
  ]);

  const meta = RELATED_CONTENT_META[resource];
  const filteredDoctor = doctorId
    ? doctors.find((doctor) => doctor.id === doctorId)
    : undefined;

  const columns: AdminDataTableColumn[] = [
    { key: 'content', label: '콘텐츠', className: 'min-w-[260px]' },
    { key: 'summary', label: '요약', className: 'min-w-[240px]' },
    {
      key: 'doctors',
      label: '관련 의료진',
      className: 'min-w-[260px]',
    },
    { key: 'status', label: '상태', className: 'w-[90px]' },
    {
      key: 'actions',
      label: '관리',
      className: 'w-[100px] text-right',
    },
  ];

  const rows: AdminDataTableRow[] = result.items.map((item) => ({
    id: item.id,
    cells: {
      content: (
        <div className="min-w-0">
          <p className="truncate font-semibold text-[#27272A]">{item.title}</p>
          <p className="mt-1 text-[11px] text-[#A1A1AA]">ID {item.id}</p>
        </div>
      ),
      summary: (
        <p className="line-clamp-2 text-xs leading-5 text-[#71717A]">
          {item.summary || '-'}
        </p>
      ),
      doctors: (
        <div className="flex flex-wrap gap-1.5">
          {item.doctors.length ? (
            item.doctors.map((doctor) => (
              <span
                key={doctor.id}
                className="rounded-full bg-[#F4F4F5] px-2.5 py-1 text-[11px] font-medium text-[#52525B]"
              >
                {doctor.name} {doctor.position}
              </span>
            ))
          ) : (
            <span className="text-xs text-[#A1A1AA]">연결 의료진 없음</span>
          )}
        </div>
      ),
      status: (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${
            item.isVisible
              ? 'bg-[#DCFCE7] text-[#166534]'
              : 'bg-[#F4F4F5] text-[#71717A]'
          }`}
        >
          {item.isVisible ? '노출' : '미노출'}
        </span>
      ),
      actions: (
        <div className="flex justify-end">
          <Link
            href={`${meta.href}/${item.id}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#E4E4E7] bg-white px-3 text-xs font-semibold text-[#52525B] hover:bg-[#F4F4F5] hover:text-[#18181B]"
          >
            <PencilLine className="size-3.5" />
            수정
          </Link>
        </div>
      ),
    },
  }));

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium text-[#A1A1AA]">관계형 콘텐츠 DB</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
            {meta.label} 관리
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#71717A]">
            {meta.description}
          </p>
        </div>

        <Link
          href={`${meta.href}/new`}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-[#18181B] px-4 text-sm font-medium text-white hover:bg-[#27272A]"
        >
          <Plus className="size-4" />
          {meta.singularLabel} 추가
        </Link>
      </div>

      {filteredDoctor ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#DCE9E5] bg-[#F4FAF8] px-4 py-3 text-sm">
          <span className="font-medium text-[#285E51]">
            {filteredDoctor.name} {filteredDoctor.position}와 연결된 {meta.label}만
            보고 있습니다.
          </span>
          <Link
            href={meta.href}
            className="text-xs font-semibold text-[#006651] underline underline-offset-4"
          >
            전체 보기
          </Link>
        </div>
      ) : null}

      <AdminDataTable
        columns={columns}
        rows={rows}
        basePath={meta.href}
        query={result.query}
        page={result.page}
        pageSize={result.pageSize}
        total={result.total}
        totalPages={result.totalPages}
        searchPlaceholder={SEARCH_PLACEHOLDERS[resource]}
        extraParams={{ doctorId }}
        emptyText={
          result.query
            ? `"${result.query}" 검색 결과가 없습니다.`
            : `등록된 ${meta.label} 데이터가 없습니다.`
        }
      />
    </section>
  );
}
