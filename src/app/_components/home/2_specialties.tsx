'use client';

import FadeInUp from '@/app/_components/fade-in-up';
import MainSectionHeader from '@/app/_components/main-section-header';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

const specialties = [
  {
    title: '하지정맥류',
    href: '/specialties/leg-varicose-veins',
    imageSrc: '/assets/home/specialties/leg-varicose-veins.png',
    alt: 'leg-varicose-veins-bg',
  },
  {
    title: '동맥경화',
    href: '/specialties/arteriosclerosis',
    imageSrc: '/assets/home/specialties/arteriosclerosis.png',
    alt: 'arteriosclerosis-bg',
  },
  {
    title: '골반정맥류',
    href: '/specialties/pelvic-varicose-veins',
    imageSrc: '/assets/home/specialties/pelvic-varicose-veins.png',
    alt: 'pelvic-varicose-veins-bg',
  },
  {
    title: '정계정맥류',
    href: '/specialties/varicocele',
    imageSrc: '/assets/home/specialties/varicocele.png',
    alt: 'varicocele-bg',
  },
  {
    title: '희귀특수질환',
    href: '/specialties/rare-special-diseases',
    imageSrc: '/assets/home/specialties/rare-special-diseases.png',
    alt: 'rare-special-diseases-bg',
  },
  {
    title: '투석혈관',
    href: '/specialties/dialysis-access',
    imageSrc: '/assets/home/specialties/dialysis-access.png',
    alt: 'dialysis-access-bg',
  },
  {
    title: '고압산소치료',
    href: '/specialties/hyperbaric-oxygen-therapy',
    imageSrc: '/assets/home/specialties/hyperbaric-oxygen-therapy.png',
    alt: 'hyperbaric-oxygen-therapy-bg',
  },
  {
    title: '혈관검진',
    href: '/specialties/vascular-screening',
    imageSrc: '/assets/home/specialties/vascular-screening.png',
    alt: 'vascular-screening-bg',
  },
] as const;

function SpecialtiesItem({
  index,
  containerRef,
  progress,
  href,
  children,
}: {
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
  href: string;
  children: React.ReactNode;
}): React.ReactNode {
  const itemRef = useRef<HTMLLIElement | null>(null);
  const [range, setRange] = useState<{ start: number; end: number }>({
    start: 0,
    end: 1,
  });

  useEffect(() => {
    const contEl = containerRef.current;
    const itemEl = itemRef.current;

    if (!contEl || !itemEl) return;

    const calc = (): void => {
      const contRect = contEl.getBoundingClientRect();
      const itemRect = itemEl.getBoundingClientRect();

      const topInCont = itemRect.top - contRect.top;
      const bottomInCont = itemRect.bottom - contRect.top;

      const contHeight = contRect.height || 1;

      const start = Math.max(0, Math.min(1, topInCont / contHeight - 0.15));
      const end = Math.max(0, Math.min(1, bottomInCont / contHeight - 0.05));

      setRange({ start, end: Math.max(start + 0.01, end) });
    };

    calc();

    const ro = new ResizeObserver(() => calc());
    ro.observe(contEl);
    ro.observe(itemEl);

    window.addEventListener('resize', calc);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', calc);
    };
  }, [containerRef]);

  const isLeft = useMemo(() => {
    switch (index % 2) {
      case 0:
        return true;
      default:
        return false;
    }
  }, [index]);

  const opacity = useTransform(progress, [range.start, range.end], [0, 1]);
  const x = useTransform(
    progress,
    [range.start, range.end],
    [isLeft ? -50 : 50, 0],
  );
  const y = useTransform(progress, [range.start, range.end], [50, 0]);

  return (
    <motion.li
      ref={itemRef}
      className="will-change-transform"
      style={{ opacity, x, y }}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block size-full"
      >
        {children}
      </Link>
    </motion.li>
  );
}

export default function HomeSpecialties(): React.ReactNode {
  const contRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: contRef,
    offset: ['start center', 'end center'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const dotTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const dotOpacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.82, 0.95],
    [0, 1, 1, 0],
  );

  return (
    <FadeInUp>
      <section className="bg-[linear-gradient(to_bottom,#FFFFFF_0%,#F6F2EF_100%)]">
        <div
          className="px-5 pt-20 pb-15 text-[#262C35] overflow-x-hidden
        xl:mx-auto xl:pt-32 xl:pb-20 xl:max-w-240 xl:w-full xl:overflow-visible
      "
        >
          <MainSectionHeader
            eyebrow="진료분야"
            title={
              <>
                <p>혈관 질환 전 영역을</p>
                <p>책임집니다</p>
              </>
            }
            description={
              <>
                <p>
                  우리 몸 구석구석 닿지 않는 곳 없는 혈관, {` `}
                  <br className="block xl:hidden" />
                  건강의 시작과 끝은 결국 혈관입니다.
                </p>
                <p>청맥은 숨은 근본 문제까지 찾아 해결해드립니다.</p>
              </>
            }
          />

          <div
            ref={contRef}
            className="relative mt-5
          xl:mt-36
          "
          >
            <div className="absolute left-1/2 top-0 h-full w-0.75 -translate-x-1/2 overflow-visible">
              <motion.div
                className="absolute left-0 top-0 h-full w-full origin-top bg-[linear-gradient(180deg,#D9D9D900_0%,#FD77404D_97%,#DECCC500_100%)] will-change-transform"
                style={{
                  scaleY: lineScaleY,
                }}
              />

              <motion.div
                className="absolute left-1/2 w-3 aspect-square will-change-transform
            xl:w-6
            "
                style={{
                  top: dotTop,
                  x: '-50%',
                  y: '-50%',
                  opacity: dotOpacity,
                }}
              >
                <img
                  src="/assets/common/brand/symbol.svg"
                  alt=""
                  aria-hidden="true"
                  className="size-3
              xl:size-6"
                />
              </motion.div>
            </div>

            <ul
              className="pb-15 flex flex-wrap gap-x-5
          xl:gap-x-21
          [&>li]:relative
          [&>li]:even:top-15
          [&>li:nth-child(n+3)]:mt-4
          [&>li]:w-[calc((100%-1.25rem)/2)]
          xl:[&>li]:w-[calc((100%-5.25rem)/2)]
          [&>li]:aspect-square
          [&>li]:rounded-2xl
          [&>li]:overflow-clip
          [&>li>a>span]:absolute
          [&>li>a>span]:left-4
          [&>li>a>span]:bottom-2.5
          [&>li>a>span]:font-extrabold
          [&>li>a>span]:text-sm
          [&>li>a>span]:text-white
          [&>li>a>span]:z-10
          [&>li>a>img]:object-cover
          xl:[&>li>a>span]:left-10
          xl:[&>li>a>span]:bottom-8
          xl:[&>li>a>span]:text-3xl
          "
            >
              {specialties.map((item, index) => (
                <SpecialtiesItem
                  key={item.title}
                  index={index}
                  href={item.href}
                  containerRef={contRef}
                  progress={scrollYProgress}
                >
                  <span>{item.title}</span>
                  <Image src={item.imageSrc} alt={item.alt} fill />
                </SpecialtiesItem>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </FadeInUp>
  );
}
