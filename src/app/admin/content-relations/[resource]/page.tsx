import {
  getAdminDoctors,
  getRelatedContentList,
} from '@/_lib/related-content';
import {
  isRelatedContentResource,
  RELATED_CONTENT_META,
} from '@/_lib/related-content-types';
import { ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function RelatedContentListPage({
  params,
  searchParams,
}: {
  params: Promise<{ resource: string }>;
  searchParams: Promise<{ doctorId?: string | string[] }>;
}) {
  const [{ resource }, query] = await Promise.all([
    params,
    searchParams,
  ]);

  if (!isRelatedContentResource(resource)) notFound();

  const rawDoctorId = Array.isArray(query.doctorId)
    ? query.doctorId[0]
    : query.doctorId;
  const doctorId = rawDoctorId?.trim() || undefined;

  const [items, doctors] = await Promise.all([
    getRelatedContentList(resource, doctorId),
    doctorId ? getAdminDoctors() : Promise.resolve([]),
  ]);

  const meta = RELATED_CONTENT_META[resource];
  const filteredDoctor = doctorId
    ? doctors.find((doctor) => doctor.id === doctorId)
    : undefined;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium text-[#A1A1AA]">
            관계형 콘텐츠 DB
          </p>
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
            {filteredDoctor.name} {filteredDoctor.position}와 연결된{' '}
            {meta.label}만 보고 있습니다.
          </span>
          <Link
            href={meta.href}
            className="text-xs font-semibold text-[#006651] underline underline-offset-4"
          >
            전체 보기
          </Link>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-[#E4E4E7] bg-white">
        <div className="hidden grid-cols-[minmax(240px,1.4fr)_minmax(220px,1fr)_minmax(240px,1fr)_88px_82px] gap-4 border-b border-[#ECECEF] bg-[#FAFAFA] px-5 py-3 text-xs font-semibold text-[#71717A] lg:grid">
          <span>콘텐츠</span>
          <span>요약</span>
          <span>관련 의료진</span>
          <span>상태</span>
          <span className="text-right">관리</span>
        </div>

        <div className="divide-y divide-[#ECECEF]">
          {items.map((item) => (
            <article
              key={item.id}
              className="grid gap-3 px-5 py-4 lg:grid-cols-[minmax(240px,1.4fr)_minmax(220px,1fr)_minmax(240px,1fr)_88px_82px] lg:items-center lg:gap-4"
            >
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-[#27272A]">
                  {item.title}
                </h2>
                <p className="mt-1 text-[11px] text-[#A1A1AA]">
                  ID {item.id}
                </p>
              </div>

              <p className="line-clamp-2 text-xs leading-5 text-[#71717A]">
                {item.summary || '-'}
              </p>

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
                  <span className="text-xs text-[#A1A1AA]">
                    연결 의료진 없음
                  </span>
                )}
              </div>

              <span
                className={`w-fit rounded-full px-2 py-1 text-[11px] font-medium ${
                  item.isVisible
                    ? 'bg-[#DCFCE7] text-[#166534]'
                    : 'bg-[#F4F4F5] text-[#71717A]'
                }`}
              >
                {item.isVisible ? '노출' : '미노출'}
              </span>

              <Link
                href={`${meta.href}/${item.id}`}
                className="inline-flex h-9 items-center justify-end gap-1 text-xs font-semibold text-[#52525B] hover:text-[#18181B]"
              >
                수정
                <ArrowRight className="size-3.5" />
              </Link>
            </article>
          ))}

          {!items.length ? (
            <div className="px-5 py-16 text-center text-sm text-[#A1A1AA]">
              등록된 {meta.label} 데이터가 없습니다.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
