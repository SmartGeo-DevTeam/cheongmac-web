import Inner from '@/app/_components/inner';
import PartnerHospitalContent from './_components/partner-hospital-content';
import { ChevronDown, Home } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '의료협약병원 | 청맥병원',
  description:
    '청맥병원과 의료·산학·지원 협약을 맺은 주요 기관과 협약 내용을 안내합니다.',
};

export default function PartnerHospitalPage() {
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
              이용안내
              <ChevronDown className="size-3.5" strokeWidth={1.6} />
            </span>

            <div className="mx-2 h-3.5 w-px bg-[#DDDDDD]" />

            <span className="inline-flex items-center gap-2">
              의료협약병원
              <ChevronDown className="size-3.5" strokeWidth={1.6} />
            </span>
          </nav>

          <header className="mt-10 flex flex-col items-center text-center xl:mt-11">
            <h1 className="text-[26px] font-bold tracking-[-0.04em] text-[#262C35] xl:text-[50px]">
              의료협약병원
            </h1>
            <p className="mt-4 break-keep text-base leading-[1.7] text-[#777D83] xl:mt-5 xl:text-xl xl:leading-[1.75]">
              우수 의료기관 및 다양한 기관과의 긴밀한 협력으로
              <br />
              환자 중심의 통합 의료서비스를 실현합니다.
            </p>
          </header>
        </div>
      </Inner>

      <div className="mt-8 border-t border-[#EEEEEE] xl:mt-12" />

      <PartnerHospitalContent />
    </main>
  );
}
