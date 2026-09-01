import Inner from '@/app/_components/inner';
import SocietyActivitiesContent from './_components/society-activities-content';
import { ChevronDown, Home } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '학회활동 | 청맥병원',
  description:
    '청맥병원 의료진의 국내외 주요 혈관·정맥 관련 학회 발표 및 학술 활동을 소개합니다.',
};

export default function SocietyActivitiesPage() {
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
              학회활동
              <ChevronDown className="size-3.5" strokeWidth={1.6} />
            </span>
          </nav>

          <header className="mt-10 flex flex-col items-center text-center xl:mt-11">
            <h1 className="text-[26px] font-bold tracking-[-0.04em] text-[#262C35] xl:text-[50px]">
              학회활동
            </h1>

            <p className="mt-4 break-keep text-base leading-[1.7] text-[#777D83] xl:mt-5 xl:text-xl xl:leading-[1.75]">
              국내외 주요 학회에서 꾸준히 활동하며
              <br className="xl:hidden" />
              혈관의학 발전에 기여하고 있습니다.
            </p>
          </header>
        </div>
      </Inner>

      <div className="mt-8 border-t border-[#EEEEEE] xl:mt-12" />

      <SocietyActivitiesContent />
    </main>
  );
}
