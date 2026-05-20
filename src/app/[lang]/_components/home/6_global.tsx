'use client';

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import Image from 'next/image';
import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

type GlobalCase = {
  id: string;
  country: string;
  flag: string;
  image: string;
  alt: string;
};

type MarqueeSize = {
  containerWidth: number;
  trackWidth: number;
  cardWidth: number;
};

const GLOBAL_CASES: GlobalCase[] = [
  {
    id: 'spain',
    country: '스페인',
    flag: '🇪🇸',
    image: '/images/home/global/item-bg.png',
    alt: '스페인 의료진 교육 현장',
  },
  {
    id: 'korea',
    country: '대한민국',
    flag: '🇰🇷',
    image: '/images/home/global/item-bg.png',
    alt: '대한민국 의료진 교육 현장',
  },
  {
    id: 'japan',
    country: '일본',
    flag: '🇯🇵',
    image: '/images/home/global/item-bg.png',
    alt: '일본 의료진 교육 현장',
  },
  {
    id: 'vietnam',
    country: '베트남',
    flag: '🇻🇳',
    image: '/images/home/global/item-bg.png',
    alt: '베트남 의료진 교육 현장',
  },
  {
    id: 'usa',
    country: '미국',
    flag: '🇺🇸',
    image: '/images/home/global/item-bg.png',
    alt: '미국 의료진 교육 현장',
  },
  {
    id: 'uae',
    country: '아랍에미리트',
    flag: '🇦🇪',
    image: '/images/home/global/item-bg.png',
    alt: '아랍에미리트 의료진 교육 현장',
  },
];

const FIRST_ROW_ITEMS = [
  GLOBAL_CASES[2],
  GLOBAL_CASES[3],
  GLOBAL_CASES[0],
  GLOBAL_CASES[1],
];

const SECOND_ROW_ITEMS = [
  GLOBAL_CASES[4],
  GLOBAL_CASES[5],
  GLOBAL_CASES[1],
  GLOBAL_CASES[3],
];

const OUTSIDE_BUFFER = 32;
const MOBILE_MARQUEE_BREAKPOINT = 768;

const MARQUEE_MASK_STYLE: CSSProperties = {
  WebkitMaskImage:
    'linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%)',
  maskImage:
    'linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%)',
};

export default function HomeGlobal() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [baseMarqueeSize, setBaseMarqueeSize] = useState<MarqueeSize>({
    containerWidth: 0,
    trackWidth: 0,
    cardWidth: 0,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sharedTravelDistance = useMemo(() => {
    const { containerWidth, trackWidth, cardWidth } = baseMarqueeSize;

    if (!containerWidth || !trackWidth || !cardWidth) return 0;

    const isMobile = containerWidth < MOBILE_MARQUEE_BREAKPOINT;

    /**
     * PC:
     * 현재 PC에서 원하는 범위가 맞기 때문에 기존 이동 거리 유지.
     */
    if (!isMobile) {
      return containerWidth + OUTSIDE_BUFFER;
    }

    /**
     * Mobile:
     * containerWidth만큼만 움직이면 화면 폭이 좁아서
     * 1~2개 아이템만 보이고 끝납니다.
     *
     * 모바일에서는 trackWidth를 포함해 전체 트랙이 화면을 지나가도록
     * 이동 거리를 확장합니다.
     */
    return trackWidth + containerWidth - cardWidth + OUTSIDE_BUFFER * 2;
  }, [
    baseMarqueeSize.containerWidth,
    baseMarqueeSize.trackWidth,
    baseMarqueeSize.cardWidth,
  ]);

  return (
    <section
      ref={sectionRef}
      className="
        relative py-15 overflow-hidden
        bg-[url('/images/home/global/m-bg.png')] bg-cover bg-no-repeat
        xl:pt-40 xl:pb-15 xl:bg-[url('/images/home/global/pc-bg.png')]
      "
    >
      <div className="text-center text-white">
        <p className="font-bold text-lg text-[#FF8A3D]">글로벌 청맥</p>

        <h2 className="mt-3 font-extrabold text-[32px]">
          세계 혈관 치료의 표준
        </h2>

        <div className="mx-auto mt-8 w-4/5 break-keep text-white">
          <p>부산에서 세계로, 혈관 치료의 기준을 세우다!</p>
          <p>
            세계 각국 의료기관에서 혈관 치료 술기를 배우기 위해 방문하고
            있습니다.
          </p>
        </div>
      </div>

      <div
        className="mt-20
        xl:mt-20"
      >
        <MarqueeRow
          items={FIRST_ROW_ITEMS}
          rowNumber={1}
          scrollYProgress={scrollYProgress}
          sharedTravelDistance={sharedTravelDistance}
          onMeasure={setBaseMarqueeSize}
        />

        <MarqueeRow
          items={SECOND_ROW_ITEMS}
          rowNumber={2}
          scrollYProgress={scrollYProgress}
          sharedTravelDistance={sharedTravelDistance}
          className="mt-4 xl:mt-10"
        />
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  rowNumber,
  scrollYProgress,
  sharedTravelDistance,
  onMeasure,
  className = '',
}: {
  items: GlobalCase[];
  rowNumber: number;
  scrollYProgress: MotionValue<number>;
  sharedTravelDistance: number;
  onMeasure?: (size: MarqueeSize) => void;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstItemRef = useRef<HTMLElement | null>(null);

  const [localSize, setLocalSize] = useState<MarqueeSize>({
    containerWidth: 0,
    trackWidth: 0,
    cardWidth: 0,
  });

  const isOddRow = rowNumber % 2 === 1;

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const firstItem = firstItemRef.current;

    if (!container || !track || !firstItem) return;

    const updateSize = () => {
      const nextSize = {
        containerWidth: container.offsetWidth,
        trackWidth: track.scrollWidth,
        cardWidth: firstItem.offsetWidth,
      };

      setLocalSize(nextSize);
      onMeasure?.(nextSize);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);

    resizeObserver.observe(container);
    resizeObserver.observe(track);
    resizeObserver.observe(firstItem);

    return () => {
      resizeObserver.disconnect();
    };
  }, [items, onMeasure]);

  const x = useTransform(scrollYProgress, (progress) => {
    const { containerWidth, trackWidth } = localSize;

    if (!containerWidth || !trackWidth || !sharedTravelDistance) {
      return 0;
    }

    if (isOddRow) {
      /**
       * 홀수 row:
       * 왼쪽 화면 밖에서 시작해서 오른쪽 방향으로 이동합니다.
       *
       * PC에서는 기존처럼 짧게 이동하고,
       * 모바일에서는 sharedTravelDistance가 더 길어져 전체 아이템이 지나갑니다.
       */
      const startX = -trackWidth - OUTSIDE_BUFFER;
      const endX = startX + sharedTravelDistance;

      return startX + (endX - startX) * progress;
    }

    /**
     * 짝수 row:
     * 오른쪽 화면 밖에서 시작해서 왼쪽 방향으로 이동합니다.
     *
     * PC에서는 기존처럼 짧게 이동하고,
     * 모바일에서는 sharedTravelDistance가 더 길어져 전체 아이템이 지나갑니다.
     */
    const startX = containerWidth + OUTSIDE_BUFFER;
    const endX = startX - sharedTravelDistance;

    return startX + (endX - startX) * progress;
  });

  return (
    <div
      ref={containerRef}
      style={MARQUEE_MASK_STYLE}
      className={`w-full overflow-hidden ${className}`}
    >
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex w-max gap-4 pt-4 will-change-transform xl:gap-7 xl:pt-6"
      >
        {items.map((item, index) => (
          <GlobalImageCard
            key={`${item.id}-${rowNumber}-${index}`}
            item={item}
            ref={index === 0 ? firstItemRef : undefined}
          />
        ))}
      </motion.div>
    </div>
  );
}

const GlobalImageCard = forwardRef<HTMLElement, { item: GlobalCase }>(
  function GlobalImageCard({ item }, ref) {
    return (
      <article
        ref={ref}
        className="relative w-52 h-28 shrink-0 overflow-visible
        xl:w-80 xl:h-48"
      >
        <div
          className="relative w-full h-full rounded-[10px] overflow-hidden
          xl:rounded-[20px]"
        >
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 1279px) 208px, 320px"
            className="object-cover"
          />
        </div>

        <div
          aria-label={item.country}
          className="absolute left-1/2 -top-4 -translate-x-1/2 w-6 h-6 flex justify-center items-center rounded-full bg-white text-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)] z-10
          xl:-top-6 xl:w-10 xl:h-10 xl:text-2xl"
        >
          {item.flag}
        </div>
      </article>
    );
  },
);
