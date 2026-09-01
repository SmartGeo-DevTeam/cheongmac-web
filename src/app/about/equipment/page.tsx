import Inner from '@/app/_components/inner';
import MedicalEquipmentContent from './_components/medical-equipment-content';
import { ChevronDown, Home } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '첨단의료장비 | 청맥병원',
  description:
    '청맥병원의 영상진단, 기능생체검사, 시술·수술, 특수치료 장비를 안내합니다.',
};

export default function MedicalEquipmentPage() {
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
              첨단의료장비
              <ChevronDown className="size-3.5" strokeWidth={1.6} />
            </span>
          </nav>

          <header className="mt-10 flex flex-col items-center text-center xl:mt-11">
            <h1 className="text-[26px] font-bold tracking-[-0.04em] text-[#262C35] xl:text-[50px]">
              첨단의료장비
            </h1>
            <p className="mt-4 break-keep text-base leading-[1.7] text-[#777D83] xl:mt-5 xl:text-xl xl:leading-[1.75]">
              대학병원급 고해상도 진단 장비와 첨단 치료 시스템을 통해
              <br className="hidden xl:block" />
              보이지 않는 혈관 속 미세한 병변까지 놓치지 않고 찾아냅니다.
            </p>
          </header>
        </div>
      </Inner>

      <div className="mt-8 border-t border-[#EEEEEE] xl:mt-12" />

      <MedicalEquipmentContent />
    </main>
  );
}
