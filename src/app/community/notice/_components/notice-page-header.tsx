import Inner from '@/app/_components/inner';
import { ChevronDown, Home } from 'lucide-react';
import Link from 'next/link';

export default function NoticePageHeader() {
  return (
    <>
      <Inner usePaddingHorizontal>
        <div>
          <div className="flex items-center text-[10px] text-[#666666] xl:text-xs">
            <Link href="/" className="flex items-center gap-1">
              <Home size={12} strokeWidth={1.7} />
              <span>홈</span>
            </Link>
            <span className="mx-2 h-3 w-px bg-[#DDDDDD]" />
            <span className="flex items-center gap-4">
              소통공간
              <ChevronDown size={12} strokeWidth={1.5} />
            </span>
            <span className="mx-2 h-3 w-px bg-[#DDDDDD]" />
            <span className="flex items-center gap-4">
              공지사항
              <ChevronDown size={12} strokeWidth={1.5} />
            </span>
          </div>

          <header className="mt-10 flex flex-col items-center text-center xl:mt-9">
            <h1 className="text-[26px] font-bold tracking-[-0.045em] text-[#262C35] xl:text-[42px]">
              공지사항
            </h1>
          </header>
        </div>
      </Inner>

      <div className="mt-10 border-t border-[#ECEDEF] xl:mt-11" />
    </>
  );
}
