import Inner from '@/app/_components/inner';
import TreatmentCaseToaster from './treatment-case-toaster';
import { ChevronDown, Home } from 'lucide-react';
import Link from 'next/link';

export default function TreatmentCasePageHeader() {
  return (
    <>
      <TreatmentCaseToaster />
      <Inner usePaddingHorizontal>
        <div className="pt-5 xl:pt-5">
          <div className="flex items-center gap-2 text-xs text-[#666666] xl:text-sm">
            <Link href="/" className="flex items-center gap-1 hover:text-cm-green">
              <Home size={14} strokeWidth={1.8} />
              <span>홈</span>
            </Link>

            <span className="text-[#BBBBBB]">|</span>

            <Link
              href="/community/cases"
              className="flex items-center gap-6 hover:text-cm-green"
            >
              <span>소통공간</span>
              <ChevronDown size={14} strokeWidth={1.6} />
            </Link>

            <span className="text-[#BBBBBB]">|</span>

            <Link
              href="/community/cases"
              className="flex items-center gap-6 hover:text-cm-green"
            >
              <span>치료사례</span>
              <ChevronDown size={14} strokeWidth={1.6} />
            </Link>
          </div>

          <header className="mt-10 flex flex-col items-center text-center xl:mt-11">
            <h1 className="text-[26px] font-bold tracking-[-0.04em] text-[#262C35] xl:text-[50px]">
              치료 사례
            </h1>
            <p className="mt-3 max-w-[720px] break-keep text-base leading-[1.65] text-[#777777] xl:mt-5 xl:text-xl">
              수만 건의 데이터가 증명하는 것은 단순한 숫자가 아닌,
              환자분의 되찾은 일상입니다.
            </p>
          </header>
        </div>
      </Inner>

      <div className="mt-8 border-t border-[#EEEEEE] xl:mt-12" />
    </>
  );
}
