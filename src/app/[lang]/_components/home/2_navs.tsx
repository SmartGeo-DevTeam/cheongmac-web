'use client';

import { useHome } from '@/app/_providers/home-provider';
import Image from 'next/image';
import Link from 'next/link';

export default function HomeNavs() {
  const { lang, home } = useHome();

  return (
    <section
      className="relative mx-auto my-4 grid h-27 w-full grid-cols-2 gap-2 px-5 font-medium text-white z-10
      xl:my-0 xl:h-35 xl:max-w-7xl xl:-translate-y-1/2 xl:grid-cols-4 xl:gap-0 xl:rounded-[20px] xl:bg-white xl:p-0 xl:text-2xl xl:font-bold xl:text-[#666666] xl:shadow-[0_0_12px_rgba(81,81,81,0.2)]
      xl:[&>a:not(:last-child)]:before:absolute
      xl:[&>a:not(:last-child)]:before:right-0
      xl:[&>a:not(:last-child)]:before:top-1/2
      xl:[&>a:not(:last-child)]:before:h-15
      xl:[&>a:not(:last-child)]:before:w-px
      xl:[&>a:not(:last-child)]:before:-translate-y-1/2
      xl:[&>a:not(:last-child)]:before:bg-[#DDDDDD]
      xl:[&>a:not(:last-child)]:before:content-['']"
    >
      <Link
        target="_blank"
        href={`/`}
        className="relative flex items-center justify-center gap-1.5 rounded-[10px] bg-[#FF8A3D]
        xl:gap-2.5 xl:bg-transparent"
      >
        <div className="relative h-7.5 w-7.5 xl:h-15 xl:w-15">
          <Image
            src={`/images/home/navs/m-telephone.png`}
            alt="m-telephone"
            fill
            className="block xl:hidden"
          />
          <Image
            src={`/images/home/navs/pc-telephone.png`}
            alt="pc-telephone"
            fill
            className="hidden xl:block"
          />
        </div>
        <span>전화 문의</span>
      </Link>

      <Link
        target="_blank"
        href={`/`}
        className="relative flex items-center justify-center gap-1.5 rounded-[10px] bg-[#FD7740]
        xl:gap-2.5 xl:bg-transparent"
      >
        <div className="relative h-7.5 w-7.5 xl:h-15 xl:w-15">
          <Image
            src={`/images/home/navs/m-clock.png`}
            alt="m-clock"
            fill
            className="block xl:hidden"
          />
          <Image
            src={`/images/home/navs/pc-calendar.png`}
            alt="pc-calendar"
            fill
            className="hidden xl:block"
          />
        </div>
        <span>간편 예약</span>
      </Link>

      <Link
        target="_blank"
        href={`/`}
        className="relative flex items-center justify-center gap-1.5 rounded-[10px] bg-[#FD7740]
        xl:gap-2.5 xl:bg-transparent"
      >
        <div className="relative h-7.5 w-7.5 xl:h-15 xl:w-15">
          <Image
            src={`/images/home/navs/m-document.png`}
            alt="m-document"
            fill
            className="block xl:hidden"
          />
          <Image
            src={`/images/home/navs/pc-photo.png`}
            alt="pc-photo"
            fill
            className="hidden xl:block"
          />
        </div>
        <span>치료 후기</span>
      </Link>

      <Link
        target="_blank"
        href={`/`}
        className="relative flex items-center justify-center gap-1.5 rounded-[10px] bg-[#FF8A3D]
        xl:gap-2.5 xl:bg-transparent"
      >
        <div className="relative h-7.5 w-7.5 xl:h-15 xl:w-15">
          <Image
            src={`/images/home/navs/m-stethoscope.png`}
            alt="m-stethoscope"
            fill
            className="block xl:hidden"
          />
          <Image
            src={`/images/home/navs/pc-message.png`}
            alt="pc-message"
            fill
            className="hidden xl:block"
          />
        </div>
        <span>의학 상담</span>
      </Link>
    </section>
  );
}
