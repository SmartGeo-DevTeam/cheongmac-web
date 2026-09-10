'use client';

import {
  H2 as TypographyH2,
  H3 as TypographyH3,
  P as TypographyP,
  Strong as TypographyStrong,
} from '@/app/_components/ui/typography';
import { buttonClassName } from '@/app/_components/ui/button';
import UiPagination from '@/app/_components/ui/pagination';

import type {
  PublicConsultationItem as ConsultationItem,
} from '@/_lib/consultations';
import {
  ArrowDownLeft,
  Link2,
  LockKeyhole,
  PenLine,
  Search,
  ShieldAlert,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const DESKTOP_PAGE_SIZE = 7;
const MOBILE_PAGE_SIZE = 5;

function parsePage(value: string | null) {
  if (!value) return 1;
  const page = Number.parseInt(value, 10);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function buildListUrl(page: number, query: string) {
  const params = new URLSearchParams();
  if (page > 1) params.set('page', String(page));
  if (query.trim()) params.set('q', query.trim());
  const search = params.toString();
  return search
    ? `/community/consultation?${search}`
    : '/community/consultation';
}

function buildDetailHref(id: number, returnTo: string) {
  return {
    pathname: `/community/consultation/${id}`,
    query: { from: returnTo },
  };
}

function SearchBox({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <form
      className="flex h-10 w-39.5 items-center rounded-full border border-[#E0E4E8] bg-white px-4 xl:h-11 xl:w-60"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const q = String(formData.get('q') ?? '').trim();
        const params = new URLSearchParams(searchParams.toString());
        params.delete('page');
        if (q) params.set('q', q);
        else params.delete('q');
        const qs = params.toString();
        router.push(
          qs ? `/community/consultation?${qs}` : '/community/consultation',
        );
      }}
    >
      <input
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="검색어를 입력하세요"
        className="min-w-0 flex-1 bg-transparent text-[11px] tracking-[-0.03em] text-[#3F454C] placeholder:text-[#A9AFB6] xl:text-[13px]"
      />
      <button type="submit" aria-label="의학상담 검색">
        <Search
          className="size-4.5 text-[#333A43] xl:size-5"
          strokeWidth={1.7}
        />
      </button>
    </form>
  );
}

function NoticeBox() {
  return (
    <section className="mx-auto max-w-7xl rounded-xl bg-[#E7F5F1] px-5 py-5 xl:rounded-[15px] xl:px-14 xl:py-8">
      <TypographyH2 className="flex items-center justify-center gap-2 text-[16px] font-bold tracking-[-0.04em] text-[#167963] xl:text-[20px]">
        <ShieldAlert className="size-5 xl:size-6" strokeWidth={2} />
        확인해 주세요
      </TypographyH2>
      <div className="mt-4 space-y-3 text-[11px] leading-[1.65] tracking-[-0.035em] text-[#4E5D5A] xl:mt-5 xl:text-[13px] xl:leading-[1.7]">
        <TypographyP>
          ① 본 상담은 진료를 돕기 위한 보조적인 수단이며, 의료진의 직접 진료에
          대한 진료를 대신할 수 없습니다. 정확한 진단과 치료 계획은 반드시 병원
          내원을 통해 확인하시기 바랍니다.
        </TypographyP>
        <TypographyP>
          ② 현재 전문의가 진료와 병행해 직접 답변을 작성하므로, 답변 완료까지
          일정 시간이 소요될 수 있습니다. 신속한 답변은 정확하고 깊이 있는
          답변을 드리기 위함이니 너그러운 양해 부탁드립니다.
        </TypographyP>
        <TypographyP>
          ③ 개인정보(성명, 연락처, 환자번호 등)가 포함된 문의나 민감한 상담
          내용은 비공개 게시물로 작성해 주시기 바랍니다.
        </TypographyP>
      </div>
    </section>
  );
}

function CategoryBadge({ item }: { item: ConsultationItem }) {
  const text = item.category.secondary
    ? `${item.category.primary} | ${item.category.secondary}`
    : item.category.primary;

  return (
    <span className="inline-flex h-6 items-center rounded-full bg-[#F3F4F5] px-2.5 text-[10px] font-medium tracking-[-0.03em] text-[#555C64] xl:h-7 xl:px-3 xl:text-[11px]">
      {text}
    </span>
  );
}

function ConsultationCard({
  item,
  returnTo,
}: {
  item: ConsultationItem;
  returnTo: string;
}) {
  return (
    <article className="rounded-[10px] border border-[#E2E6E9] bg-white px-4 py-4 xl:rounded-[13px] xl:px-6 xl:py-5">
      <Link href={buildDetailHref(item.id, returnTo)} className="block">
        <div className="flex items-start justify-between gap-3">
          <CategoryBadge item={item} />
          <time className="shrink-0 pt-1 text-[10px] text-[#A2A8B0] xl:text-[11px]">
            {item.date}
          </time>
        </div>

        <TypographyH3 managed={false} className="mt-2 flex items-start gap-1.5 break-keep text-[15px] font-semibold leading-[1.45] tracking-[-0.04em] text-[#242A31] xl:text-[17px]">
          {item.isPrivate ? (
            <LockKeyhole
              className="mt-0.5 size-3.5 shrink-0"
              strokeWidth={2.2}
            />
          ) : null}
          <span>{item.title}</span>
          {item.hasLinkIcon ? (
            <Link2 className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.7} />
          ) : null}
        </TypographyH3>

        {item.answered && item.doctor ? (
          <div className="mt-3 flex items-center gap-1.5 text-[11px] tracking-[-0.035em] xl:mt-4 xl:text-[12px]">
            <ArrowDownLeft
              className="size-4 shrink-0 text-[#858C94]"
              strokeWidth={1.5}
            />
            <div className="relative size-6 shrink-0 overflow-hidden rounded-full bg-[#F3F4F5] xl:size-7">
              <Image
                src={item.doctor.imageSrc}
                alt={item.doctor.name}
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
            <TypographyStrong className="font-semibold text-[#FF6F3D]">
              {item.doctor.department} {item.doctor.name}
            </TypographyStrong>
            {item.doctors.length > 1 ? (
              <span className="text-[#8E959D]">
                외 {item.doctors.length - 1}명
              </span>
            ) : null}
            <span className="text-[#9AA0A7]">이 답변했어요</span>
          </div>
        ) : null}
      </Link>
    </article>
  );
}

export default function ConsultationBoard({
  items,
}: {
  items: ConsultationItem[];
}) {
  const searchParams = useSearchParams();
  const currentPage = parsePage(searchParams.get('page'));
  const query = searchParams.get('q')?.trim() ?? '';

  const filteredItems = useMemo(() => {
    if (!query) return items;
    const keyword = query.toLocaleLowerCase('ko-KR');
    return items.filter((item) =>
      [
        item.title,
        item.category.primary,
        item.category.secondary,
        ...item.doctors.map((doctor) => doctor.name),
      ]
        .join(' ')
        .toLocaleLowerCase('ko-KR')
        .includes(keyword),
    );
  }, [items, query]);

  const desktopTotalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / DESKTOP_PAGE_SIZE),
  );
  const mobileTotalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / MOBILE_PAGE_SIZE),
  );
  const desktopPage = Math.min(currentPage, desktopTotalPages);
  const mobilePage = Math.min(currentPage, mobileTotalPages);
  const returnTo = buildListUrl(currentPage, query);

  const desktopItems = filteredItems.slice(
    (desktopPage - 1) * DESKTOP_PAGE_SIZE,
    desktopPage * DESKTOP_PAGE_SIZE,
  );
  const mobileItems = filteredItems.slice(
    (mobilePage - 1) * MOBILE_PAGE_SIZE,
    mobilePage * MOBILE_PAGE_SIZE,
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-14 xl:px-0 xl:pb-24">
      <NoticeBox />

      <TypographyH2 id="consultation-list-heading" className="sr-only">
        의학상담 목록
      </TypographyH2>

      <div className="mt-5 flex items-end justify-between xl:mt-7">
        <TypographyP className="text-[10px] tracking-[-0.02em] text-[#8E959D] xl:text-[12px]">
          총{' '}
          <TypographyStrong className="font-medium text-[#FA6A3D]">
            {filteredItems.length.toLocaleString('ko-KR')}
          </TypographyStrong>{' '}
          건
        </TypographyP>
        <SearchBox defaultValue={query} />
      </div>

      <div className="mt-2 space-y-2.5 xl:hidden">
        {mobileItems.map((item) => (
          <ConsultationCard key={item.id} item={item} returnTo={returnTo} />
        ))}
      </div>
      <div className="mt-2 hidden space-y-3 xl:block">
        {desktopItems.map((item) => (
          <ConsultationCard key={item.id} item={item} returnTo={returnTo} />
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-3 xl:mt-9">
        <Link
          id="consultation-write-outline-button"
          href="/community/consultation/write"
          className={buttonClassName({
            variant: 'outline',
            size: 'md',
            className: 'hidden min-w-37.5 text-[13px] xl:inline-flex',
          })}
        >
          <PenLine className="size-4" strokeWidth={1.8} /> 문의글 작성하기
        </Link>
        <Link
          id="consultation-write-primary-button"
          href="/community/consultation/write"
          className={buttonClassName({
            variant: 'primary',
            size: 'md',
            className: 'min-w-35.5 text-[13px] xl:min-w-40',
          })}
        >
          <PenLine className="size-4" strokeWidth={1.8} /> 문의글 작성하기
        </Link>
      </div>

      <div className="xl:hidden">
        <UiPagination
          id="consultation-pagination-mobile"
          currentPage={mobilePage}
          totalPages={mobileTotalPages}
          getPageHref={(page) => buildListUrl(page, query)}
          ariaLabel="의학상담 모바일 페이지"
          variant="compact"
          className="mt-8"
        />
      </div>
      <div className="hidden xl:block">
        <UiPagination
          id="consultation-pagination-desktop"
          currentPage={desktopPage}
          totalPages={desktopTotalPages}
          getPageHref={(page) => buildListUrl(page, query)}
          ariaLabel="의학상담 페이지"
          variant="default"
          className="mt-12"
        />
      </div>
    </div>
  );
}
