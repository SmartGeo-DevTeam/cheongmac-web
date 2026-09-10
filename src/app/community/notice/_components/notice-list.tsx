'use client';

import {
  H2 as TypographyH2,
  H3 as TypographyH3,
  P as TypographyP,
} from '@/app/_components/ui/typography';
import Badge from '@/app/_components/ui/badge';
import {
  ContentCard,
  ContentCardBody,
  ContentCardMedia,
  ContentCardTitle,
} from '@/app/_components/ui/content-card';
import BoardToolbar from '@/app/_components/ui/board-toolbar';
import FilterTabs from '@/app/_components/ui/filter-tabs';
import Pagination from '@/app/_components/ui/pagination';
import SearchField from '@/app/_components/ui/search-field';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import type { NoticeDetail, NoticeKind } from '../_data';

type ManagedDoctorLeave = {
  name: string;
  department: string;
  schedule: string;
  image: string;
};

type FilterValue = 'all' | NoticeKind;

const PAGE_SIZE = 10;

function NoticeBadge({
  kind,
  pinned = false,
}: {
  kind: NoticeKind;
  pinned?: boolean;
}) {
  if (kind === 'holiday') {
    return (
      <Badge variant="red" size="lg">
        휴진
      </Badge>
    );
  }

  return (
    <Badge variant={pinned ? 'orange' : 'green'} size="lg">
      공지
    </Badge>
  );
}

function CalendarCard() {
  return (
    <div className="relative mx-auto w-[220px] pt-3 xl:mx-0 xl:w-[240px]">
      <div className="absolute left-[19px] right-[19px] top-0 z-10 flex justify-between px-2">
        {[0, 1, 2, 3].map((item) => (
          <span
            key={item}
            className="block h-7 w-[5px] rounded-full border border-[#989C9F] bg-white shadow-sm"
          />
        ))}
      </div>
      <div className="overflow-hidden rounded-[12px] border border-[#E5E7E9] bg-white shadow-[0_3px_8px_rgba(0,0,0,0.06)]">
        <div className="h-[37px] bg-[#FF4238]" />
        <div className="px-3 py-6 text-center">
          <TypographyP className="text-base font-bold text-[#E84237] xl:text-xl">• 추석연휴 •</TypographyP>
          <TypographyP managed={false} className="mt-2 whitespace-nowrap text-sm font-medium text-[#252A30] xl:text-xl">
            9월 24일(목) ~ 9월 26일(토)
          </TypographyP>
        </div>
      </div>
    </div>
  );
}

function DesktopBannerCard({
  href,
  image,
  title,
}: {
  href: string;
  image: string;
  title: string;
}) {
  const cardId = `notice-feature-card-${href.split('/').filter(Boolean).at(-1) ?? 'item'}`;

  return (
    <ContentCard id={cardId} variant="notice">
      <Link href={href} className="block">
        <ContentCardMedia variant="notice">
          <Image
            src={image}
            alt=""
            fill
            sizes="280px"
            className="object-cover"
          />
        </ContentCardMedia>
        <ContentCardBody variant="notice">
          <ContentCardTitle as="span" variant="notice">
            {title}
          </ContentCardTitle>
        </ContentCardBody>
      </Link>
    </ContentCard>
  );
}

function MobileHangingCard({ second = false }: { second?: boolean }) {
  return (
    <div className="relative h-[112px] rounded-[7px] bg-[#FFF4F5] pt-[24px]">
      <div className="absolute left-1/2 top-0 h-[18px] w-[42px] -translate-x-1/2">
        <span
          className={`absolute left-1/2 top-[7px] block h-px w-[31px] -translate-x-1/2 bg-[#30343A] ${
            second ? 'rotate-[28deg]' : ''
          }`}
        />
        {second ? (
          <span className="absolute left-1/2 top-[7px] block h-px w-[31px] -translate-x-1/2 -rotate-[28deg] bg-[#30343A]" />
        ) : null}
      </div>
      <div className="mx-auto flex h-[68px] w-[calc(100%-22px)] flex-col items-center justify-center rounded-[7px] bg-white">
        <TypographyP className="text-base font-semibold text-[#E63D38]">• 추석연휴 •</TypographyP>
        <TypographyP managed={false} className="mt-1.5 text-sm text-[#2F3337]">8월 15일(토) ~ 8월 17일(월)</TypographyP>
      </div>
    </div>
  );
}

function MobileQuickCard({
  type,
  image,
  title,
  schedule,
}: {
  type?: 'red' | 'dark';
  image?: string;
  title: string;
  schedule: string;
}) {
  return (
    <div className="flex min-h-[72px] overflow-hidden rounded-[5px] border border-[#E1E3E5] bg-white">
      {image ? (
        <div className="relative w-[68px] shrink-0 bg-[#F7F7F7]">
          <Image src={image} alt="" fill sizes="68px" className="object-cover" />
        </div>
      ) : (
        <div
          className={`grid w-[68px] shrink-0 place-items-center text-base font-bold text-white ${
            type === 'dark' ? 'bg-[#272B31]' : 'bg-white'
          }`}
        >
          <span
            className={
              type === 'dark'
                ? ''
                : 'grid h-[44px] w-[44px] place-items-center rounded-full bg-[#EE3B31]'
            }
          >
            휴진
          </span>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col justify-center px-3 py-2">
        <TypographyP managed={false} className="truncate text-base font-medium text-[#787D82]">{title}</TypographyP>
        <TypographyP managed={false} className="mt-1 truncate text-sm font-semibold text-[#2E3338]">{schedule}</TypographyP>
      </div>
    </div>
  );
}

export default function NoticeList({
  items,
  doctorLeaves,
}: {
  items: NoticeDetail[];
  doctorLeaves: ManagedDoctorLeave[];
}) {
  const pathname = usePathname();
  const [filter, setFilter] = useState<FilterValue>('all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return items.filter((notice) => {
      const matchesFilter = filter === 'all' || notice.kind === filter;
      const matchesQuery = !normalized || notice.title.toLowerCase().includes(normalized);
      return matchesFilter && matchesQuery;
    });
  }, [filter, items, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const changeFilter = (nextFilter: FilterValue) => {
    setFilter(nextFilter);
    setPage(1);
  };

  const noticeHref = (id: string) => `${pathname.replace(/\/$/, '')}/${id}`;

  return (
    <div className="mx-auto w-full max-w-7xl pb-20 xl:pb-28">
      <section>
        <TypographyH2 className="text-base font-bold tracking-[-0.035em] text-[#272C31] xl:text-2xl">
          휴진 및 주요 공지
        </TypographyH2>

        <div className="mt-3 xl:hidden">
          <div className="grid grid-cols-1 gap-2">
            <MobileHangingCard />
            <MobileHangingCard second />
          </div>

          <div className="py-7 text-center">
            <TypographyP className="text-base font-bold text-[#E64236]">• 추석연휴 •</TypographyP>
            <TypographyP managed={false} className="mt-2 text-sm font-semibold text-[#292E33]">
              9월 24일(목) ~ 9월 26일(토)
            </TypographyP>
          </div>

          <div className="grid gap-[5px]">
            <MobileQuickCard
              type="red"
              title="추석 연휴"
              schedule="9월 15일(토) ~ 9월 17일(월)"
            />
            <MobileQuickCard
              type="dark"
              title="추석 연휴"
              schedule="9월 15일(토) ~ 9월 17일(월)"
            />
            {doctorLeaves.slice(0, 2).map((doctor) => (
              <MobileQuickCard
                key={doctor.name + '-' + doctor.schedule}
                image={doctor.image}
                title={doctor.department + ' ' + doctor.name}
                schedule={doctor.schedule}
              />
            ))}
          </div>

          <div className="relative mt-2 overflow-hidden rounded-[6px] border border-[#E1E3E5] bg-white">
            <Link href={noticeHref('naver-reservation-open')}>
              <Image
                src="/assets/images/notice/naver-detail.png"
                alt="청맥병원 네이버 예약 OPEN"
                width={264}
                height={297}
                className="block h-auto w-full"
              />
              <div className="px-3 py-3 text-base font-medium text-[#3C4145]">
                네이버예약 OPEN
              </div>
            </Link>
            <button
              type="button"
              aria-label="이전 주요 공지"
              className="absolute left-[-9px] top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-[#DDE0E3] bg-white text-[#555A61]"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="다음 주요 공지"
              className="absolute right-[-9px] top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-[#DDE0E3] bg-white text-[#555A61]"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="hidden xl:block">
          <div className="mt-7 flex items-start justify-center gap-6">
            <CalendarCard />
            <DesktopBannerCard
              href={noticeHref('naver-reservation-open')}
              image="/assets/images/notice/naver-card.png"
              title="네이버예약 서비스 OPEN"
            />
            <DesktopBannerCard
              href={noticeHref('seomyeon-medical-center-move')}
              image="/assets/images/notice/move-card.png"
              title="서면 메디컬센터 확장 이전 안내"
            />
          </div>

          <TypographyH3 className="mt-10 text-2xl font-bold tracking-[-0.03em] text-[#30353A]">
            의료진별 휴진
          </TypographyH3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {doctorLeaves.map((doctor) => (
              <div
                key={doctor.name}
                className="flex h-[120px] overflow-hidden rounded-[8px] border border-[#E4E6E8] bg-white"
              >
                <div className="relative w-[112px] shrink-0 bg-[#F6F7F7]">
                  <Image
                    src={doctor.image}
                    alt={`${doctor.name} 프로필`}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center px-6">
                  <TypographyP className="text-xl font-medium text-[#8B9096]">
                    {doctor.department} {doctor.name}
                  </TypographyP>
                  <TypographyP className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[#30353A]">
                    {doctor.schedule}
                  </TypographyP>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 xl:mt-14">
        <FilterTabs
          id="notice-filter-tabs"
          items={[
            { value: 'all' as const, label: '전체' },
            { value: 'notice' as const, label: '공지사항' },
            { value: 'holiday' as const, label: '휴진안내' },
          ]}
          value={filter}
          onValueChange={changeFilter}
          ariaLabel="공지사항 분류"
          variant="notice"
        />

        <BoardToolbar
          count={filtered.length}
          size="lg"
          className="mt-4 xl:mt-7"
        >
          <SearchField
            ariaLabel="공지사항 검색"
            size="lg"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="검색어를 입력하세요"
            className="max-w-[220px] xl:max-w-[320px]"
          />
        </BoardToolbar>

        <div className="mt-2 hidden bg-[#F5F6F7] text-xl font-semibold text-[#4A4F55] xl:grid xl:grid-cols-[1fr_180px]">
          <div className="px-6 py-3.5 text-center">제목</div>
          <div className="px-6 py-3.5 text-center">등록일</div>
        </div>

        <div className="border-b border-[#E9EBED] xl:border-b-0">
          {pageItems.map((notice) => (
            <Link
              key={notice.id}
              href={noticeHref(notice.id)}
              className="grid min-h-[72px] border-t border-[#ECEEF0] py-2.5 transition hover:bg-[#FAFAFA] xl:min-h-[80px] xl:grid-cols-[1fr_180px] xl:items-center xl:px-6 xl:py-0"
            >
              <div className="flex min-w-0 flex-col items-start gap-1 xl:flex-row xl:items-center xl:gap-3">
                <NoticeBadge kind={notice.kind} pinned={notice.pinned} />
                <span
                  className={`truncate text-base font-medium tracking-[-0.02em] xl:text-xl ${
                    notice.pinned ? 'text-[#FF7048]' : 'text-[#34393E]'
                  }`}
                >
                  {notice.title}
                  {notice.hasLink ? <span className="ml-1 text-[#51565C]">↗</span> : null}
                </span>
                <span className="text-sm text-[#B1B5B9] xl:hidden">{notice.date}</span>
              </div>
              <div className="hidden text-center text-xl text-[#B1B5B9] xl:block">
                {notice.date}
              </div>
            </Link>
          ))}
        </div>

        <Pagination
          id="notice-pagination"
          currentPage={currentPage}
          totalPages={pageCount}
          onPageChange={setPage}
          ariaLabel="공지사항 페이지"
          variant="large"
          className="mt-7 xl:mt-8"
        />
      </section>
    </div>
  );
}
