import Inner from '@/app/_components/common/inner';
import AboutIntroductionSectionHeader from '@/app/about/introduction/_components/_section-header';
import Image from 'next/image';
import { CardItem } from './_components/card-item';
import { leftItems, rightItems } from './data';

export default function Reason() {
  return (
    <section
      id="introduction-intro-reason"
      className="mt-20 mb-10 overflow-hidden
      xl:my-30"
    >
      <Inner className="text-center">
        <AboutIntroductionSectionHeader
          subTitle="믿음을 증명하는 실력"
          title="WHY 청맥"
          desc={
            <>
              깊이 있는 전문성과 체계적인 의료 시스템부터{' '}
              <br className="xl:hidden" />
              결과로 증명해온 경험까지,
              <br />
              청맥이 <b>자신 있는 이유는 분명</b>합니다.
            </>
          }
          subTitleColor="text-brand"
        />
      </Inner>

      <div
        className="relative isolate mx-auto mt-12 grid w-full max-w-7xl grid-cols-1 items-center gap-y-3 px-7 pb-20
        xl:mt-20 xl:pb-0 xl:grid-cols-[minmax(0,1fr)_minmax(280px,1.05fr)_minmax(0,1fr)] xl:gap-5"
      >
        {/* 모바일 세로 연결선 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[min(70vw,420px)] bottom-6 left-1/2 z-0 w-px -translate-x-1/2 bg-linear-to-b from-bg-base to-[#125C4F]
          xl:hidden"
        >
          {/* 연결선 하단 원형 */}
          <span className="absolute bottom-0 left-1/2 size-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#125C4F]" />
        </div>

        {/* 왼쪽 카드 그룹 */}
        <ul
          className="order-2 relative z-10 flex min-w-0 flex-col gap-3
          xl:order-1 xl:gap-6 xl:[&>li:nth-child(2)]:-translate-x-7.5"
        >
          {leftItems.map((item) => (
            <CardItem key={item.title} title={item.title} desc={item.desc} />
          ))}
        </ul>

        <div className="order-1 relative">
          <div className="relative p-5">
            <div className="relative w-full aspect-square">
              <Image
                src={'/introduction/intro/why-badge.png'}
                alt="why-badge"
                fill
              />
            </div>

            <div
              aria-hidden="true"
              className="absolute left-0 top-0 w-full aspect-square animate-[spin_18s_linear_infinite] motion-reduce:animate-none"
            >
              <span className="absolute top-4.5 left-1/2 size-4 -translate-x-1/2 rounded-full bg-[#FF824F]" />
            </div>
          </div>
        </div>

        {/* 오른쪽 카드 그룹 */}
        <ul
          className="order-3 relative z-10 flex min-w-0 flex-col gap-3
          xl:gap-6 xl:[&>li:nth-child(2)]:translate-x-7.5"
        >
          {rightItems.map((item) => (
            <CardItem key={item.title} title={item.title} desc={item.desc} />
          ))}
        </ul>
      </div>
    </section>
  );
}
