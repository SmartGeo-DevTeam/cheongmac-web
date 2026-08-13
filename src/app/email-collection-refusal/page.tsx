import Inner from '@/app/_components/inner';
import { Home, Mail, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '이메일 무단수집거부 | 청맥병원',
  description: '청맥병원의 이메일 무단수집거부 안내입니다.',
};

export default function EmailCollectionRefusalPage() {
  return (
    <div className="pt-20 xl:pt-5">
      <Inner usePaddingHorizontal>
        <div>
          <div className="flex items-center text-xs text-[#666666] xl:text-sm">
            <Link href="/" className="flex items-center gap-1">
              <Home size={14} strokeWidth={1.8} />
              <span>홈</span>
            </Link>

            <div className="mx-2 h-3.5 w-px bg-[#DDDDDD]" />

            <label className="relative pr-5">
              <span className="sr-only">현재 페이지</span>
              <select
                aria-label="현재 페이지"
                defaultValue="이메일무단수집거부"
                className="appearance-none bg-transparent pr-1 text-xs outline-none xl:text-sm"
              >
                <option>이메일무단수집거부</option>
              </select>
              <span className="pointer-events-none absolute right-1 top-1/2 h-1.5 w-1.5 -translate-y-[65%] rotate-45 border-b border-r border-[#777777]" />
            </label>
          </div>

          <header className="mt-10 flex flex-col items-center text-center xl:mt-11">
            <h1 className="font-bold text-[26px] tracking-[-0.04em] text-[#262C35] xl:text-[50px]">
              이메일 무단수집거부
            </h1>
          </header>
        </div>
      </Inner>

      <div className="mt-8 border-t border-[#EEEEEE] xl:mt-12" />

      <Inner usePaddingHorizontal>
        <article className="mx-auto max-w-[1080px] pb-14 pt-16 xl:pb-24 xl:pt-20">
          <div
            className="flex flex-col items-center gap-10
            xl:flex-row xl:justify-center xl:gap-12"
          >
            <div
              className="relative h-[112px] w-[112px] shrink-0
              xl:h-[120px] xl:w-[120px]"
              aria-hidden="true"
            >
              <Mail
                className="absolute left-0 top-0 h-[88px] w-[88px] text-[#DADDE1]
                xl:h-[96px] xl:w-[96px]"
                strokeWidth={1.7}
              />
              <ShieldCheck
                className="absolute bottom-0 right-0 h-[58px] w-[58px] fill-white text-[#FF7448]
                xl:h-[62px] xl:w-[62px]"
                strokeWidth={2.5}
              />
            </div>

            <div className="w-full max-w-[690px] text-[#262C35]">
              <p
                className="break-keep text-lg font-bold leading-[1.55]
                xl:text-[22px]"
              >
                청맥병원은 본 서비스 내 이메일 주소의 무단 수집을 거부합니다.
              </p>

              <p
                className="mt-7 break-keep text-sm leading-[1.85]
                xl:mt-2 xl:text-lg xl:leading-[1.7]"
              >
                자동 수집 장치를 이용한 이메일 추출 등 부당한 방법으로 이메일
                주소를 획득하거나 광고성 정보를 전송할 경우 관련 법령에 따라
                처벌될 수 있습니다.
              </p>

              <p
                className="mt-7 text-sm text-[#969AA3]
                xl:mt-6 xl:text-base"
              >
                게시일: 2026년 MM월 DD일
              </p>
            </div>
          </div>
        </article>
      </Inner>
    </div>
  );
}
