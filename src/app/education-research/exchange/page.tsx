import Inner from '@/app/_components/inner';
import AcademicExchangeContent from './_components/academic-exchange-content';
import { ChevronDown, Home } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '학술교류 | 청맥병원',
  description:
    '청맥병원의 국내외 학술교류, 혈관의학 연구 교류와 교육 프로그램 활동을 소개합니다.',
};

export default function AcademicExchangePage() {
  return (
    <main className="pt-20 xl:pt-5">
      <Inner usePaddingHorizontal>
        <div>
          <nav
            aria-label="현재 위치"
            className="flex items-center text-xs text-[#666666] xl:text-sm"
          >
            <Link
              href="/"
              className="flex items-center gap-1 transition hover:text-[#006656]"
            >
              <Home size={14} strokeWidth={1.8} />
              <span>홈</span>
            </Link>

            <div className="mx-2 h-3.5 w-px bg-[#DDDDDD]" />

            <span className="inline-flex items-center gap-2">
              교육·연구
              <ChevronDown className="size-3.5" strokeWidth={1.6} />
            </span>

            <div className="mx-2 h-3.5 w-px bg-[#DDDDDD]" />

            <span className="inline-flex items-center gap-2">
              학술교류
              <ChevronDown className="size-3.5" strokeWidth={1.6} />
            </span>
          </nav>

          <header className="mt-10 flex flex-col items-center text-center xl:mt-11">
            <h1 className="text-[26px] font-bold tracking-[-0.04em] text-[#262C35] xl:text-[50px]">
              학술교류
            </h1>

            <p className="mt-4 break-keep text-base leading-[1.7] text-[#777D83] xl:mt-5 xl:text-xl xl:leading-[1.75]">
              국내외 활발한 학술 교류를 통해 축적된 임상 노하우를 공유하며
              <br className="hidden xl:block" />
              대한민국 혈관의학의 발전을 선도합니다.
            </p>
          </header>
        </div>
      </Inner>

      <div className="mt-8 border-t border-[#EEEEEE] xl:mt-12" />

      <AcademicExchangeContent />
    </main>
  );
}
