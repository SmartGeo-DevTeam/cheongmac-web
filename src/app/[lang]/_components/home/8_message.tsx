'use client';

import { useHome } from '@/app/_providers/home-provider';
import Link from 'next/link';

export default function HomeMessage() {
  const { lang } = useHome();

  return (
    <section
      className="relative px-5 pt-25 pb-3 bg-[url('/images/home/message/m-bg.png')] bg-cover bg-no-repeat text-white
      xl:pb-20"
    >
      <div className="xl:mx-auto xl:max-w-7xl xl:w-full xl:flex xl:flex-col xl:items-center">
        <div className="font-semibold">
          <p className="text-xl">나이테가 한 나무의 세월을 기록하듯,</p>
          <div
            className="mt-8 text-[26px]
            xl:mt-12 xl:font-bold xl:text-center xl:text-[44px]"
          >
            <p>
              <b className="font-semibold text-[#FF7740]">혈관</b> 역시
            </p>
            <p>우리가 살아온 삶의 습관을</p>
            <p>고스란히 투영합니다.</p>
          </div>
        </div>
        <p
          className="mt-10 break-keep
          xl:text-center xl:text-[22px]"
        >
          혈관에 축적된 미세한 변화와 이상까지 면밀하게 바로잡음으로써
          <br className="hidden xl:block" /> 삶의 흐름을 원활하게 이어주는
          최적의 치료를 약속합니다.
        </p>

        <div
          className="mt-15 flex flex-col gap-2
          xl:w-full xl:flex-row xl:justify-between xl:gap-5"
        >
          <Link
            target="_blank"
            href={`/`}
            className="flex-1 pt-13 pb-8 flex flex-col justify-center items-center rounded-[20px] bg-[url('/images/home/message/bg-1.png')] bg-cover bg-no-repeat space-y-0.5"
          >
            <p
              className="font-semibold text-xl
              xl:text-center xl:text-2xl"
            >
              누적 수술{' '}
              <b className="hidden xl:block xl:text-[34px]">50,083례 +</b>
            </p>
            <span
              className="text-xs
              xl:text-sm"
            >
              2026.05.20. 기준
            </span>
          </Link>

          <Link
            target="_blank"
            href={`/`}
            className="flex-1 pt-13 pb-8 flex flex-col justify-center items-center rounded-[20px] bg-[url('/images/home/message/bg-2.png')] bg-cover bg-no-repeat space-y-0.5"
          >
            <p
              className="font-semibold text-xl
              xl:text-center xl:text-2xl"
            >
              누적 환자수{' '}
              <b className="hidden xl:block xl:text-[34px]">90,923명 +</b>
            </p>
            <span
              className="text-xs
              xl:text-sm"
            >
              2026.05.20. 기준
            </span>
          </Link>

          <Link
            target="_blank"
            href={`/`}
            className="flex-1 pt-13 pb-8 flex flex-col justify-center items-center rounded-[20px] bg-[url('/images/home/message/bg-3.png')] bg-cover bg-no-repeat space-y-0.5"
          >
            <p
              className="font-semibold text-xl
              xl:text-center xl:text-2xl"
            >
              논문 개제{' '}
              <b className="hidden xl:block xl:text-[34px]">500건 +</b>
            </p>
            <span
              className="text-xs
              xl:text-sm"
            >
              2026.05.20. 기준
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
