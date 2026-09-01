import Inner from '@/app/_components/inner';
import HospitalTourContent from './_components/hospital-tour-content';
import { ChevronDown, Home } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '병원 둘러보기 | 청맥병원',
  description:
    '청맥병원의 층별 안내와 주요 진료·검사·입원·편의시설을 확인해보세요.',
};

export default function HospitalTourPage() {
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
              병원 소개
              <ChevronDown className="size-3.5" strokeWidth={1.6} />
            </span>

            <div className="mx-2 h-3.5 w-px bg-[#DDDDDD]" />

            <span className="inline-flex items-center gap-2">
              병원 둘러보기
              <ChevronDown className="size-3.5" strokeWidth={1.6} />
            </span>
          </nav>

          <header className="mt-10 flex flex-col items-center text-center xl:mt-11">
            <h1 className="text-[26px] font-bold tracking-[-0.04em] text-[#262C35] xl:text-[50px]">
              병원 둘러보기
            </h1>
            <p className="mt-4 break-keep text-base leading-[1.7] text-[#777D83] xl:mt-5 xl:text-xl xl:leading-[1.75]">
              좋은 의료는 편안하고 쾌적한 공간에서 시작됩니다.
              <br />
              오직 치료와 회복에 집중할 수 있는 최적의 환경을 제공합니다.
            </p>
          </header>
        </div>
      </Inner>

      <div className="mt-8 border-t border-[#EEEEEE] xl:mt-12" />

      <HospitalTourContent />
    </main>
  );
}
