import Inner from '@/app/_components/inner';
import NoticeBoard from '@/app/community/notice/_components/notice-board';
import { Home } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '공지사항 | 청맥병원',
  description: '청맥병원의 주요 공지와 휴진 일정을 확인해보세요.',
};

export default function CommunityNoticePage() {
  return (
    <div className="pt-22 xl:pt-5">
      <Inner usePaddingHorizontal>
        <section>
          <div className="flex items-center text-[11px] text-[#555B63] xl:text-sm">
            <Link href="/" className="flex items-center gap-1">
              <Home className="size-3.5 xl:size-4" strokeWidth={1.8} />
              <span>홈</span>
            </Link>

            <div className="mx-2 h-3.5 w-px bg-[#DDDDDD]" />

            <label className="relative pr-5">
              <span className="sr-only">1차 메뉴</span>
              <select
                aria-label="1차 메뉴"
                defaultValue="소통공간"
                className="appearance-none bg-transparent pr-1 outline-none"
              >
                <option>소통공간</option>
              </select>
              <span className="pointer-events-none absolute right-1 top-1/2 size-1.5 -translate-y-[65%] rotate-45 border-b border-r border-[#777777]" />
            </label>

            <div className="mx-2 h-3.5 w-px bg-[#DDDDDD]" />

            <label className="relative pr-5">
              <span className="sr-only">2차 메뉴</span>
              <select
                aria-label="2차 메뉴"
                defaultValue="공지사항"
                className="appearance-none bg-transparent pr-1 outline-none"
              >
                <option>공지사항</option>
                <option>청맥뉴스</option>
                <option>의학상담</option>
                <option>고객의 소리</option>
              </select>
              <span className="pointer-events-none absolute right-1 top-1/2 size-1.5 -translate-y-[65%] rotate-45 border-b border-r border-[#777777]" />
            </label>
          </div>

          <header className="mt-10 flex justify-center text-center xl:mt-10">
            <h1 className="text-[26px] font-bold tracking-[-0.04em] text-[#252B33] xl:text-[42px]">
              공지사항
            </h1>
          </header>
        </section>
      </Inner>

      <div className="mt-10 hidden border-t border-[#E8EAED] xl:block" />

      <div className="mt-8 pb-14 xl:mt-14 xl:pb-24">
        <Suspense
          fallback={
            <div className="mx-auto min-h-[760px] w-full max-w-7xl px-5" />
          }
        >
          <NoticeBoard />
        </Suspense>
      </div>
    </div>
  );
}
