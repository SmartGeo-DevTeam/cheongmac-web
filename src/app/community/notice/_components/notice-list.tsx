'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { doctorLeaves, notices, type NoticeKind } from '../_data';

type FilterValue = 'all' | NoticeKind;

const PAGE_SIZE = 10;

function Badge({ kind, pinned = false }: { kind: NoticeKind; pinned?: boolean }) {
  if (kind === 'holiday') {
    return (
      <span className="inline-flex h-[20px] items-center rounded-[4px] bg-[#FFF0F0] px-1.5 text-[10px] font-semibold text-[#FF625E] xl:h-[22px] xl:px-2 xl:text-[11px]">
        휴진
      </span>
    );
  }

  return (
    <span
      className={`inline-flex h-[20px] items-center rounded-[4px] px-1.5 text-[10px] font-semibold xl:h-[22px] xl:px-2 xl:text-[11px] ${
        pinned
          ? 'bg-[#FF7048] text-white'
          : 'bg-[#F0F7F5] text-[#317C6A]'
      }`}
    >
      공지
    </span>
  );
}

function CalendarCard() {
  return (
    <div className="relative mx-auto w-[152px] pt-3 xl:mx-0 xl:w-[150px]">
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
          <p className="text-[12px] font-bold text-[#E84237]">• 추석연휴 •</p>
          <p className="mt-2 whitespace-nowrap text-[11px] font-medium text-[#252A30]">
            9월 24일(목) ~ 9월 26일(토)
          </p>
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
  return (
    <Link
      href={href}
      className="w-[202px] overflow-hidden rounded-[8px] border border-[#E6E7E9] bg-white transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <Image
        src={image}
        alt=""
        width={202}
        height={121}
        className="block h-[121px] w-full object-cover"
      />
      <div className="flex h-[43px] items-center px-3 text-[12px] font-medium text-[#3B3F44]">
        <span className="truncate">{title}</span>
      </div>
    </Link>
  );
}

function MobileHangingCard({ second = false }: { second?: boolean }) {
  return (
    <div className="relative h-[86px] rounded-[7px] bg-[#FFF4F5] pt-[20px]">
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
      <div className="mx-auto flex h-[48px] w-[calc(100%-22px)] flex-col items-center justify-center rounded-[7px] bg-white">
        <p className="text-[10px] font-semibold text-[#E63D38]">• 추석연휴 •</p>
        <p className="mt-1.5 text-[9px] text-[#2F3337]">8월 15일(토) ~ 8월 17일(월)</p>
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
    <div className="flex min-h-[45px] overflow-hidden rounded-[5px] border border-[#E1E3E5] bg-white">
      {image ? (
        <div className="relative w-[48px] shrink-0 bg-[#F7F7F7]">
          <Image src={image} alt="" fill sizes="48px" className="object-cover" />
        </div>
      ) : (
        <div
          className={`grid w-[48px] shrink-0 place-items-center text-[9px] font-bold text-white ${
            type === 'dark' ? 'bg-[#272B31]' : 'bg-white'
          }`}
        >
          <span
            className={
              type === 'dark'
                ? ''
                : 'grid h-[31px] w-[31px] place-items-center rounded-full bg-[#EE3B31]'
            }
          >
            휴진
          </span>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col justify-center px-2.5 py-1.5">
        <p className="truncate text-[9px] font-medium text-[#787D82]">{title}</p>
        <p className="mt-0.5 truncate text-[9px] font-semibold text-[#2E3338]">{schedule}</p>
      </div>
    </div>
  );
}

export default function NoticeList() {
  const pathname = usePathname();
  const [filter, setFilter] = useState<FilterValue>('all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return notices.filter((notice) => {
      const matchesFilter = filter === 'all' || notice.kind === filter;
      const matchesQuery = !normalized || notice.title.toLowerCase().includes(normalized);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

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
    <div className="mx-auto w-full max-w-[860px] pb-20 pt-4 xl:pb-28 xl:pt-11">
      <section>
        <h2 className="text-[13px] font-bold tracking-[-0.035em] text-[#272C31] xl:text-[18px]">
          휴진 및 주요 공지
        </h2>

        <div className="mt-3 xl:hidden">
          <div className="grid grid-cols-1 gap-2">
            <MobileHangingCard />
            <MobileHangingCard second />
          </div>

          <div className="py-7 text-center">
            <p className="text-[11px] font-bold text-[#E64236]">• 추석연휴 •</p>
            <p className="mt-2 text-[11px] font-semibold text-[#292E33]">
              9월 24일(목) ~ 9월 26일(토)
            </p>
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
            <MobileQuickCard
              image={doctorLeaves[0].image}
              title="혈관외과 박용범 원장"
              schedule="8월 15일(토)"
            />
            <MobileQuickCard
              image={doctorLeaves[1].image}
              title="혈관외과 전진원 원장"
              schedule="8월 26일(수) 오후 휴진"
            />
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
              <div className="px-2 py-2 text-[9px] font-medium text-[#3C4145]">
                네이버예약 OPEN
              </div>
            </Link>
            <button
              type="button"
              aria-label="이전 주요 공지"
              className="absolute left-[-9px] top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-[#DDE0E3] bg-white text-[#555A61]"
            >
              <ChevronLeft size={13} />
            </button>
            <button
              type="button"
              aria-label="다음 주요 공지"
              className="absolute right-[-9px] top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-[#DDE0E3] bg-white text-[#555A61]"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

        <div className="hidden xl:block">
          <div className="mt-5 flex items-start justify-center gap-4">
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

          <h3 className="mt-8 text-[16px] font-bold tracking-[-0.03em] text-[#30353A]">
            의료진별 휴진
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {doctorLeaves.map((doctor) => (
              <div
                key={doctor.name}
                className="flex h-[92px] overflow-hidden rounded-[8px] border border-[#E4E6E8] bg-white"
              >
                <div className="relative w-[88px] shrink-0 bg-[#F6F7F7]">
                  <Image
                    src={doctor.image}
                    alt={`${doctor.name} 프로필`}
                    fill
                    sizes="88px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center px-5">
                  <p className="text-[11px] font-medium text-[#8B9096]">
                    {doctor.department} {doctor.name}
                  </p>
                  <p className="mt-1 text-[13px] font-semibold tracking-[-0.02em] text-[#30353A]">
                    {doctor.schedule}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 xl:mt-14">
        <div className="flex justify-center gap-2">
          {([
            ['all', '전체'],
            ['notice', '공지사항'],
            ['holiday', '휴진안내'],
          ] as const).map(([value, label]) => {
            const active = filter === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => changeFilter(value)}
                className={`h-[29px] min-w-[58px] rounded-full border px-3 text-[10px] font-medium transition xl:h-[37px] xl:min-w-[72px] xl:px-5 xl:text-[12px] ${
                  active
                    ? 'border-[#006651] bg-[#006651] text-white'
                    : 'border-[#E4E6E8] bg-white text-[#6A7076]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between xl:mt-7">
          <p className="text-[9px] text-[#A2A7AC] xl:text-[11px]">
            총 <span className="text-[#FF7048]">{filtered.length}</span> 건
          </p>

          <label className="flex h-[29px] w-[118px] items-center rounded-full border border-[#E0E3E5] bg-white px-3 xl:h-[36px] xl:w-[205px]">
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="검색어를 입력하세요"
              className="min-w-0 flex-1 bg-transparent text-[9px] text-[#454A4F] outline-none placeholder:text-[#B5B8BC] xl:text-[11px]"
            />
            <Search size={13} strokeWidth={1.6} className="shrink-0 text-[#5E646B] xl:size-4" />
          </label>
        </div>

        <div className="mt-2 hidden bg-[#F5F6F7] text-[11px] font-semibold text-[#4A4F55] xl:grid xl:grid-cols-[1fr_120px]">
          <div className="px-5 py-3.5 text-center">제목</div>
          <div className="px-5 py-3.5 text-center">등록일</div>
        </div>

        <div className="border-b border-[#E9EBED] xl:border-b-0">
          {pageItems.map((notice) => (
            <Link
              key={notice.id}
              href={noticeHref(notice.id)}
              className="grid min-h-[56px] border-t border-[#ECEEF0] py-2.5 transition hover:bg-[#FAFAFA] xl:min-h-[58px] xl:grid-cols-[1fr_120px] xl:items-center xl:px-5 xl:py-0"
            >
              <div className="flex min-w-0 flex-col items-start gap-1 xl:flex-row xl:items-center xl:gap-3">
                <Badge kind={notice.kind} pinned={notice.pinned} />
                <span
                  className={`truncate text-[10px] font-medium tracking-[-0.02em] xl:text-[12px] ${
                    notice.pinned ? 'text-[#FF7048]' : 'text-[#34393E]'
                  }`}
                >
                  {notice.title}
                  {notice.hasLink ? <span className="ml-1 text-[#51565C]">↗</span> : null}
                </span>
                <span className="text-[9px] text-[#B1B5B9] xl:hidden">{notice.date}</span>
              </div>
              <div className="hidden text-center text-[11px] text-[#B1B5B9] xl:block">
                {notice.date}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-center gap-1.5 xl:mt-8 xl:gap-2">
          <button
            type="button"
            aria-label="첫 페이지"
            onClick={() => setPage(1)}
            className="grid h-7 w-7 place-items-center text-[#959AA0]"
          >
            <ChevronsLeft size={14} />
          </button>
          <button
            type="button"
            aria-label="이전 페이지"
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            className="grid h-7 w-7 place-items-center text-[#959AA0]"
          >
            <ChevronLeft size={14} />
          </button>

          {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => setPage(number)}
              className={`grid h-7 min-w-7 place-items-center rounded-[5px] px-1 text-[10px] font-medium ${
                currentPage === number
                  ? 'bg-[#535761] text-white'
                  : 'text-[#90959A]'
              }`}
            >
              {number}
            </button>
          ))}

          <button
            type="button"
            aria-label="다음 페이지"
            onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
            className="grid h-7 w-7 place-items-center text-[#959AA0]"
          >
            <ChevronRight size={14} />
          </button>
          <button
            type="button"
            aria-label="마지막 페이지"
            onClick={() => setPage(pageCount)}
            className="grid h-7 w-7 place-items-center text-[#959AA0]"
          >
            <ChevronsRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
}
