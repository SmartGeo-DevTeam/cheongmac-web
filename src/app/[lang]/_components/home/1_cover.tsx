'use client';

import { useViewport } from '@/app/_providers/viewport-provider';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const HOME_POPUP_HIDE_KEY = 'home-cover-popups-hidden';

const MOBILE_CARD_GAP = 16;
const MOBILE_STACK_OFFSET = 14;
const MOBILE_STACK_SCALE_STEP = 0.07;
const MOBILE_POPUP_COUNTDOWN_SECONDS = 5;
const MOBILE_STACK_BOTTOM_OFFSET = 32;

const mobileStackTransition = {
  type: 'spring',
  stiffness: 170,
  damping: 24,
  mass: 0.9,
} as const;

type CoverPopup = {
  id: string;
  title: string;
  lines: string[];
  bgClassName: string;
  icon: string;
  desktopOrder: number;
  mobileOrder: number;
};

const COVER_POPUPS: CoverPopup[] = [
  {
    id: 'may-clinic',
    title: '5월 진료 안내',
    lines: ['5월 1일 (금) 노동절 정상진료', '5월 25일 (월) 대체공휴일 휴진'],
    bgClassName: 'bg-[#A81E1E]',
    icon: '➕',
    desktopOrder: 1,
    mobileOrder: 1,
  },
  {
    id: 'same-day-green',
    title: '당일 진료 접수 안내',
    lines: [
      '오전 11시까지 / 오후 4시까지',
      '접수하시면 당일 진료가 가능합니다.',
    ],
    bgClassName: 'bg-[#C6E400]',
    icon: '🗓️',
    desktopOrder: 2,
    mobileOrder: 3,
  },
  {
    id: 'same-day-blue',
    title: '당일 진료 접수 안내',
    lines: [
      '오전 11시까지 / 오후 4시까지',
      '접수하시면 당일 진료가 가능합니다.',
    ],
    bgClassName: 'bg-[#009CE4]',
    icon: '🗓️',
    desktopOrder: 3,
    mobileOrder: 2,
  },
];

function getLocalDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${date}`;
}

function getOrderedPopups(dismissedIds: string[], mode: 'desktop' | 'mobile') {
  const dismissedSet = new Set(dismissedIds);
  const orderKey = mode === 'desktop' ? 'desktopOrder' : 'mobileOrder';

  return [...COVER_POPUPS]
    .filter((popup) => !dismissedSet.has(popup.id))
    .sort((a, b) => a[orderKey] - b[orderKey])
    .slice(0, 3);
}

function PopupCard({
  popup,
  variant,
  onClose,
}: {
  popup: CoverPopup;
  variant: 'desktop' | 'mobile';
  onClose: () => void;
}) {
  return (
    <Link
      target="_blank"
      href={`/`}
      className={[
        'relative pl-3.5 pr-8.5 py-3.5 rounded-[20px] flex items-center gap-5',
        'xl:pl-5 xl:pr-16 xl:py-5 xl:gap-8',
        popup.bgClassName,
      ].join(' ')}
    >
      <span
        className="text-5xl
      xl:text-6xl"
      >
        {popup.icon}
      </span>

      <div
        className="space-y-1 text-white
      xl:space-y-1.25"
      >
        <p
          className={`font-bold text-xl
        xl:text-2xl`}
        >
          {popup.title}
        </p>
        <div
          className={`font-medium text-xs
        xl:text-lg`}
        >
          {popup.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label={`${popup.title} 닫기`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onClose();
        }}
        className="absolute right-3.5 top-3.5 w-10 h-10 text-3xl text-white"
      >
        ×
      </button>
    </Link>
  );
}

function HomeCoverPopups({
  isMobile,
  onMobilePopupsClosed,
}: {
  isMobile: boolean;
  onMobilePopupsClosed: () => void;
}) {
  const mobileLayerRef = useRef<HTMLDivElement | null>(null);
  const mobileCardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const hasStartedMobileTimerRef = useRef(false);
  const hasPreparedInitialMobileLayoutRef = useRef(false);

  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [isStacked, setIsStacked] = useState(false);
  const [countdown, setCountdown] = useState(MOBILE_POPUP_COUNTDOWN_SECONDS);
  const [mobileLayerHeight, setMobileLayerHeight] = useState(0);
  const [mobileCardHeights, setMobileCardHeights] = useState<
    Record<string, number>
  >({});
  const [isInitialMobileLayoutReady, setIsInitialMobileLayoutReady] =
    useState(false);

  const desktopPopups = useMemo(
    () => getOrderedPopups(dismissedIds, 'desktop'),
    [dismissedIds],
  );

  const mobilePopups = useMemo(
    () => getOrderedPopups(dismissedIds, 'mobile'),
    [dismissedIds],
  );

  useEffect(() => {
    if (!isMobile || mobilePopups.length > 0) return;

    onMobilePopupsClosed();
  }, [isMobile, mobilePopups.length, onMobilePopupsClosed]);

  const getMobileCardHeight = (id: string) => mobileCardHeights[id] ?? 0;

  const mobileExpandedHeight = mobilePopups.reduce(
    (total, popup, index) =>
      total + getMobileCardHeight(popup.id) + (index > 0 ? MOBILE_CARD_GAP : 0),
    0,
  );

  const mobileStackedHeight = mobilePopups.reduce(
    (maxHeight, popup, index) =>
      Math.max(
        maxHeight,
        getMobileCardHeight(popup.id) + index * MOBILE_STACK_OFFSET,
      ),
    0,
  );

  const mobileCenteredY = -mobileExpandedHeight / 2;

  const mobileStackedY =
    mobileLayerHeight > 0
      ? mobileLayerHeight / 2 - MOBILE_STACK_BOTTOM_OFFSET - mobileStackedHeight
      : mobileCenteredY;

  useEffect(() => {
    const hiddenDate = window.localStorage.getItem(HOME_POPUP_HIDE_KEY);

    if (hiddenDate === getLocalDateKey()) {
      setDismissedIds(COVER_POPUPS.map((popup) => popup.id));
    }
  }, []);

  useEffect(() => {
    if (!isMobile) {
      hasStartedMobileTimerRef.current = false;
      setIsStacked(false);
      setCountdown(MOBILE_POPUP_COUNTDOWN_SECONDS);
      return;
    }

    if (hasStartedMobileTimerRef.current) {
      return;
    }

    hasStartedMobileTimerRef.current = true;

    setIsStacked(false);
    setCountdown(MOBILE_POPUP_COUNTDOWN_SECONDS);

    const countdownTimer = window.setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1, 1));
    }, 1000);

    const closeTimer = window.setTimeout(() => {
      setIsStacked(true);
      onMobilePopupsClosed();
    }, MOBILE_POPUP_COUNTDOWN_SECONDS * 1000);

    return () => {
      window.clearInterval(countdownTimer);
      window.clearTimeout(closeTimer);
    };
  }, [isMobile, onMobilePopupsClosed]);

  useEffect(() => {
    const node = mobileLayerRef.current;

    if (!node) return;

    const updateHeight = () => {
      setMobileLayerHeight(node.getBoundingClientRect().height);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(node);

    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  useLayoutEffect(() => {
    if (!isMobile || mobilePopups.length === 0) {
      hasPreparedInitialMobileLayoutRef.current = false;
      setIsInitialMobileLayoutReady(false);
      return;
    }

    let frameId = 0;
    let readyFrameId = 0;

    const measureCardHeights = () => {
      const nextHeights = mobilePopups.reduce<Record<string, number>>(
        (acc, popup) => {
          acc[popup.id] = mobileCardRefs.current[popup.id]?.offsetHeight ?? 0;
          return acc;
        },
        {},
      );

      const hasMeasuredAllCards = mobilePopups.every(
        (popup) => nextHeights[popup.id] > 0,
      );

      setMobileCardHeights((prev) => {
        const hasChanged = mobilePopups.some(
          (popup) => prev[popup.id] !== nextHeights[popup.id],
        );

        return hasChanged ? nextHeights : prev;
      });

      if (hasMeasuredAllCards && !hasPreparedInitialMobileLayoutRef.current) {
        hasPreparedInitialMobileLayoutRef.current = true;

        readyFrameId = window.requestAnimationFrame(() => {
          setIsInitialMobileLayoutReady(true);
        });
      }
    };

    measureCardHeights();

    const resizeObserver = new ResizeObserver(() => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(measureCardHeights);
    });

    mobilePopups.forEach((popup) => {
      const node = mobileCardRefs.current[popup.id];

      if (node) {
        resizeObserver.observe(node);
      }
    });

    window.addEventListener('resize', measureCardHeights);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(readyFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', measureCardHeights);
    };
  }, [isMobile, mobilePopups]);

  const handleClose = (id: string) => {
    setDismissedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const handleCloseMobilePopups = () => {
    setIsStacked(true);
    onMobilePopupsClosed();
  };

  const handleHideToday = () => {
    window.localStorage.setItem(HOME_POPUP_HIDE_KEY, getLocalDateKey());
    setDismissedIds(COVER_POPUPS.map((popup) => popup.id));
  };

  if (desktopPopups.length === 0 && mobilePopups.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop popup layer */}
      {desktopPopups.length > 0 && (
        <div
          className={`hidden
          absolute inset-x-0 bottom-20 px-5 pointer-events-none  z-20  justify-center xl:flex`}
        >
          <motion.div className="max-w-7xl w-full flex justify-center gap-4">
            <AnimatePresence initial={false}>
              {desktopPopups.map((popup) => (
                <motion.div
                  key={popup.id}
                  layout
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.92 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-auto"
                >
                  <PopupCard
                    popup={popup}
                    variant="desktop"
                    onClose={() => handleClose(popup.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {/* Mobile dimmed backdrop */}
      <AnimatePresence>
        {isMobile && mobilePopups.length > 0 && !isStacked && (
          <motion.div
            key="mobile-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-0 left-1/2 -translate-x-1/2 w-[calc(100vw-var(--spacing)-var(--spacing)-var(--spacing)-var(--spacing))] rounded-[20px] bg-black/50 z-20
            xl:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile popup layer */}
      {mobilePopups.length > 0 && (
        <div
          ref={mobileLayerRef}
          className="pointer-events-none absolute inset-0 z-30 xl:hidden"
        >
          <div className="absolute left-1/2 top-1/2 w-[calc(100vw-var(--spacing)-var(--spacing)-var(--spacing)-var(--spacing)-var(--spacing)-var(--spacing)-var(--spacing)-var(--spacing)-var(--spacing)-var(--spacing))] -translate-x-1/2">
            <motion.div
              initial={false}
              animate={{
                y: isStacked ? mobileStackedY : mobileCenteredY,
                opacity: isInitialMobileLayoutReady ? 1 : 0,
              }}
              transition={{
                y: isInitialMobileLayoutReady
                  ? mobileStackTransition
                  : { duration: 0 },
                opacity: {
                  duration: 0.25,
                  ease: 'easeOut',
                },
              }}
              className="pointer-events-auto relative overflow-visible"
            >
              <AnimatePresence initial={false}>
                {mobilePopups.map((popup, index) => {
                  const expandedY = mobilePopups
                    .slice(0, index)
                    .reduce(
                      (total, prevPopup) =>
                        total +
                        getMobileCardHeight(prevPopup.id) +
                        MOBILE_CARD_GAP,
                      0,
                    );

                  const stackedY = index * MOBILE_STACK_OFFSET;

                  const stackedScale = 1 - index * MOBILE_STACK_SCALE_STEP;
                  const stackedOpacity = 1 - index * 0.08;

                  return (
                    <motion.div
                      key={popup.id}
                      ref={(node) => {
                        mobileCardRefs.current[popup.id] = node;
                      }}
                      initial={false}
                      animate={{
                        y: isStacked ? stackedY : expandedY,
                        scale: isStacked ? stackedScale : 1,
                        opacity: isStacked ? stackedOpacity : 1,
                      }}
                      exit={{
                        opacity: 0,
                        x: 32,
                        scale: 0.94,
                      }}
                      transition={
                        isInitialMobileLayoutReady
                          ? mobileStackTransition
                          : { duration: 0 }
                      }
                      style={{
                        zIndex: mobilePopups.length - index,
                        transformOrigin: 'center top',
                      }}
                      className="absolute inset-x-0 top-0 will-change-[transform,opacity]"
                    >
                      <PopupCard
                        popup={popup}
                        variant="mobile"
                        onClose={() => handleClose(popup.id)}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <AnimatePresence initial={false}>
                {!isStacked && (
                  <motion.div
                    key="mobile-popup-countdown-area"
                    initial={false}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 8,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: 'easeOut',
                    }}
                    className="absolute inset-x-0 flex flex-col items-center gap-3 text-white"
                    style={{
                      top: mobileExpandedHeight + 20,
                    }}
                  >
                    <p className="text-[15px] font-medium text-white/80">
                      {countdown}초 후 팝업이 닫힙니다.
                    </p>

                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={handleCloseMobilePopups}
                        className="rounded-full bg-white px-4 py-2 text-[14px] font-bold text-neutral-900"
                      >
                        바로 닫기
                      </button>

                      <button
                        type="button"
                        onClick={handleHideToday}
                        className="rounded-full bg-white/15 px-4 py-2 text-[14px] font-semibold text-white backdrop-blur-sm"
                      >
                        오늘 하루 보지 않기
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}

export default function HomeCover() {
  const { isMobile } = useViewport();

  const swiperRef = useRef<SwiperType | null>(null);
  const [canStartSwiperAutoplay, setCanStartSwiperAutoplay] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setCanStartSwiperAutoplay(true);
      return;
    }

    setCanStartSwiperAutoplay(false);
  }, [isMobile]);

  useEffect(() => {
    const swiper = swiperRef.current;

    if (!swiper?.autoplay) return;

    if (canStartSwiperAutoplay) {
      swiper.autoplay.start();
      return;
    }

    swiper.autoplay.stop();
  }, [canStartSwiperAutoplay]);

  return (
    <section className="relative h-[78vh] overflow-hidden px-2 xl:px-0">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={isMobile ? 8 : 0}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;

          if (isMobile) {
            swiper.autoplay.stop();
          }
        }}
        className="h-[78vh] w-full"
      >
        <SwiperSlide>
          <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[20px] bg-[url('/images/home/cover/m-slide-bg-1.png')] bg-cover bg-center bg-no-repeat px-5 xl:rounded-none xl:bg-[url('/images/home/cover/pc-slide-bg-1.png')]">
            <div className="flex flex-col items-center text-4xl leading-[125%] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)] xl:flex-row xl:gap-1.75 xl:text-6xl">
              <p>혈관의 모든 정답,</p>
              <p className="font-extrabold">청맥에 있습니다</p>
            </div>

            <div className="mt-5 flex flex-col items-center leading-[150%] break-keep text-center text-[15px] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)] xl:flex-row xl:gap-1 xl:text-2xl">
              <p>더 스마트해진 혈관 특화 의료 혁신의 시작.</p>
              <p>증상부터 치료까지 AI가 빠르고 정확한 길을 안내합니다.</p>
            </div>

            <Link
              target="_blank"
              href="/"
              className="mt-3 rounded-full border border-white px-4 py-1 text-[15px] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)] xl:mt-6 xl:text-lg"
            >
              맥GPT에게 물어보기→
            </Link>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[20px] bg-[url('/images/home/cover/m-slide-bg-2.png')] bg-cover bg-center bg-no-repeat px-5 xl:rounded-none xl:bg-[url('/images/home/cover/pc-slide-bg-2.png')]">
            <div className="flex flex-col items-center text-4xl leading-[125%] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)] xl:flex-row xl:gap-1.75 xl:text-6xl">
              <p>혈관을 잘 아는 의사,</p>
              <p className="font-extrabold">청맥에 있습니다</p>
            </div>

            <div className="mt-5 flex flex-col items-center leading-[150%] break-keep text-center text-[15px] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)] xl:flex-row xl:gap-1 xl:text-2xl">
              <p>오직 혈관질환에 집중한 전문의 협진으로</p>
              <p>깊이 있는 진료, 정밀한 치료를 약속드립니다.</p>
            </div>

            <Link
              target="_blank"
              href="/"
              className="mt-3 rounded-full border border-white px-4 py-1 text-[15px] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)] xl:mt-6 xl:text-lg"
            >
              맞춤 의료진 찾기→
            </Link>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[20px] bg-[url('/images/home/cover/m-slide-bg-3.png')] bg-cover bg-center bg-no-repeat px-5 xl:rounded-none xl:bg-[url('/images/home/cover/pc-slide-bg-3.png')]">
            <div className="flex flex-col items-center text-4xl leading-[125%] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)] xl:flex-row xl:gap-1.75 xl:text-6xl">
              <p>대한정맥학회도</p>
              <p className="font-extrabold">인정한 청맥의 전문성</p>
            </div>

            <div className="mt-5 flex flex-col items-center leading-[150%] break-keep text-center text-[15px] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)] xl:flex-row xl:gap-1 xl:text-2xl">
              <p>2026 대한정맥학회 학술연구비 지원 대상 선정!</p>
              <p>차별화된 전문성으로 혈관 진료의 발전을 선도합니다.</p>
            </div>

            <Link
              target="_blank"
              href="/"
              className="mt-3 rounded-full border border-white px-4 py-1 text-[15px] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)] xl:mt-6 xl:text-lg"
            >
              자세히 보기→
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>

      <HomeCoverPopups
        isMobile={isMobile}
        onMobilePopupsClosed={() => {
          setCanStartSwiperAutoplay(true);
        }}
      />
    </section>
  );
}
