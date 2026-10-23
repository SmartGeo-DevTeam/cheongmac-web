'use client';

import Inner from '@/app/_components/common/inner';
import Image from 'next/image';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { presentations } from './data';

export default function Presentation() {
  return (
    <section id="about-doctor-presentation">
      <div
        className="pt-20 bg-linear-to-b from-white from-0% via-[#FFEAE2] via-66% to-white to-100%
        xl:pt-40"
      >
        <Inner>
          <div className="text-center">
            <h2
              className="text-mo-title-1
              xl:text-pc-title-1"
            >
              끊임없이 연구하여 <br className="xl:hidden" />
              의료계가 인정한 전문성
            </h2>
            <p
              className="mt-3 text-mo-body-2
              xl:mt-5 xl:text-pc-body-1"
            >
              수많은 SCI급 논문 발표와 전문 서적 번역, 국내외 학술 활동을 통해
              의료계에서도 인정받는 전문성을 이어가고 있습니다.
            </p>
          </div>
        </Inner>

        <div
          className="mt-10 w-full overflow-hidden
          xl:mt-15"
        >
          <Marquee
            autoFill
            speed={50}
            direction="left"
            pauseOnHover
            gradient={false}
          >
            {presentations.map((presentation) => (
              <Link
                key={presentation.id}
                href={`/`}
                className="inline-block mr-5 w-42.5 shrink-0
                xl:w-85"
              >
                <div className="relative w-full aspect-170/180">
                  <Image
                    src={presentation.image}
                    alt={presentation.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div
                  className="p-4 min-h-17 bg-base
                  shadow-[0_0_5px_0_rgba(0,0,0,0.1)]"
                >
                  <p className="font-bold leading-[1.4] text-[13px]">
                    {presentation.title}
                  </p>
                </div>
              </Link>
            ))}
          </Marquee>
        </div>

        <div
          className="mt-10 mb-15 text-center
          xl:mt-15 xl:mb-30"
        >
          <Link
            href="/about/doctors"
            className="px-5 py-2 rounded-full border border-default bg-base font-bold text-[14px]
            xl:px-10 xl:py-3 xl:text-[20px]"
          >
            발표이력 전체보기
          </Link>
        </div>
      </div>
    </section>
  );
}
