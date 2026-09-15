'use client';

import CollectionAdminEditButton from '@/app/_components/inline-editor/collection-admin-edit-button';
import EditablePageCopyRegion from '@/app/_components/inline-editor/editable-page-copy-region';
import ManagedItemEditButton from '@/app/_components/inline-editor/managed-item-edit-button';
import { openMacGptSearch } from '@/app/_components/mac-gpt-search';
import {
  H1 as TypographyH1,
  H2 as TypographyH2,
  P as TypographyP,
} from '@/app/_components/ui/typography';
import { useViewport } from '@/app/_providers/viewport-provider';
import type {
  HomeCoverPopup,
  HomeCoverSlide,
} from '@/_lib/home-cover-content';
import { HOME_COPY_FIELD_KEYS } from '@/_lib/home-page-copy';
import type { InlineContentData } from '@/_lib/inline-content-shared';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const HOME_POPUP_HIDE_KEY = 'home-cover-popups-hidden';

const MOBILE_CARD_GAP = 16;
const MOBILE_STACK_OFFSET = 14;
const MOBILE_STACK_SCALE_STEP = 0.07;
const MOBILE_POPUP_COUNTDOWN_SECONDS = 3;
const MOBILE_STACK_BOTTOM_OFFSET = 8;

const mobileStackTransition = {
  type: 'spring',
  stiffness: 170,
  damping: 24,
  mass: 0.9,
} as const;

function getLocalDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${date}`;
}

function getOrderedPopups(
  popups: HomeCoverPopup[],
  dismissedIds: string[],
  mode: 'desktop' | 'mobile',
) {
  const dismissedSet = new Set(dismissedIds);
  const orderKey = mode === 'desktop' ? 'desktopOrder' : 'mobileOrder';

  return [...popups]
    .filter((popup) => !dismissedSet.has(popup.id))
    .sort((a, b) => a[orderKey] - b[orderKey])
    .slice(0, 3);
}

function PopupCard({
  popup,
  onClose,
}: {
  popup: HomeCoverPopup;
  onClose: () => void;
}) {
  return (
    <div
      className="relative rounded-[20px]"
      style={{ backgroundColor: popup.backgroundColor || '#3270C3' }}
    >
      <Link
        href={popup.href || '/'}
        target={popup.openInNewTab ? '_blank' : undefined}
        rel={popup.openInNewTab ? 'noopener noreferrer' : undefined}
        className="flex items-center gap-5 rounded-[20px] py-3.5 pl-3.5 pr-12 xl:gap-8 xl:py-5 xl:pl-5 xl:pr-16"
      >
        <span className="text-5xl xl:text-6xl">{popup.icon}</span>

        <div className="min-w-0 space-y-1 text-white xl:space-y-1.25">
          <TypographyP
            managed={false}
            className="truncate text-xl font-bold xl:text-2xl"
          >
            {popup.title}
          </TypographyP>

          <div className="text-xs font-medium xl:text-lg">
            {popup.lines.map((line, index) => (
              <TypographyP
                managed={false}
                key={`${popup.itemKey}-${index}`}
              >
                {line}
              </TypographyP>
            ))}
          </div>
        </div>
      </Link>

      <button
        type="button"
        aria-label={`${popup.title} 닫기`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onClose();
        }}
        className="absolute right-3.5 top-3.5 z-20 size-10 text-3xl text-white"
      >
        ×
      </button>

      <ManagedItemEditButton
        pageKey="home"
        itemKey={popup.itemKey}
        label={popup.title}
        className="left-2 right-auto top-2"
      />
    </div>
  );
}

function HomeCoverPopups({
  isMobile,
  onMobilePopupsClosed,
  copy,
  popups,
}: {
  isMobile: boolean;
  onMobilePopupsClosed: () => void;
  copy: InlineContentData;
  popups: HomeCoverPopup[];
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

  const coverPopups = useMemo(() => popups, [popups]);

  const desktopPopups = useMemo(
    () => getOrderedPopups(coverPopups, dismissedIds, 'desktop'),
    [coverPopups, dismissedIds],
  );

  const mobilePopups = useMemo(
    () => getOrderedPopups(coverPopups, dismissedIds, 'mobile'),
    [coverPopups, dismissedIds],
  );

  useEffect(() => {
    if (!isMobile || mobilePopups.length > 0) return;
    onMobilePopupsClosed();
  }, [isMobile, mobilePopups.length, onMobilePopupsClosed]);

  const getMobileCardHeight = (id: string) => mobileCardHeights[id] ?? 0;

  const mobileExpandedHeight = mobilePopups.reduce(
    (total, popup, index) =>
      total +
      getMobileCardHeight(popup.id) +
      (index > 0 ? MOBILE_CARD_GAP : 0),
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
      ? mobileLayerHeight / 2 -
        MOBILE_STACK_BOTTOM_OFFSET -
        mobileStackedHeight
      : mobileCenteredY;

  useEffect(() => {
    const hiddenDate = window.localStorage.getItem(HOME_POPUP_HIDE_KEY);

    if (hiddenDate === getLocalDateKey()) {
      setDismissedIds(coverPopups.map((popup) => popup.id));
    }
  }, [coverPopups]);

  useEffect(() => {
    if (
      !isMobile ||
      mobilePopups.length === 0 ||
      !isInitialMobileLayoutReady ||
      isStacked
    ) {
      hasStartedMobileTimerRef.current = false;
      setCountdown(MOBILE_POPUP_COUNTDOWN_SECONDS);
      return;
    }

    if (hasStartedMobileTimerRef.current) return;

    hasStartedMobileTimerRef.current = true;
    setCountdown(MOBILE_POPUP_COUNTDOWN_SECONDS);

    const countdownTimer = window.setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 1 : prev - 1));
    }, 1000);

    const closeTimer = window.setTimeout(() => {
      setIsStacked(true);
      onMobilePopupsClosed();
    }, MOBILE_POPUP_COUNTDOWN_SECONDS * 1000);

    return () => {
      hasStartedMobileTimerRef.current = false;
      window.clearInterval(countdownTimer);
      window.clearTimeout(closeTimer);
    };
  }, [
    isMobile,
    mobilePopups.length,
    isInitialMobileLayoutReady,
    isStacked,
    onMobilePopupsClosed,
  ]);

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
          acc[popup.id] =
            mobileCardRefs.current[popup.id]?.offsetHeight ?? 0;
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

      if (
        hasMeasuredAllCards &&
        !hasPreparedInitialMobileLayoutRef.current
      ) {
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
      if (node) resizeObserver.observe(node);
    });

    window.addEventListener('resize', measureCardHeights);

    return () => {
      hasPreparedInitialMobileLayoutRef.current = false;
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(readyFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', measureCardHeights);
    };
  }, [isMobile, mobilePopups]);

  const handleClose = (id: string) => {
    setDismissedIds((prev) =>
      prev.includes(id) ? prev : [...prev, id],
    );
  };

  const handleCloseMobilePopups = () => {
    setIsStacked(true);
    onMobilePopupsClosed();
  };

  const handleHideToday = () => {
    window.localStorage.setItem(HOME_POPUP_HIDE_KEY, getLocalDateKey());
    setDismissedIds(coverPopups.map((popup) => popup.id));
    onMobilePopupsClosed();
  };

  if (desktopPopups.length === 0 && mobilePopups.length === 0) {
    return null;
  }

  return (
    <>
      <CollectionAdminEditButton
        href="/admin/home/popups"
        label="메인 팝업"
        className="right-3 top-3"
      />

      {desktopPopups.length > 0 ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-36 z-20 hidden justify-center px-5 xl:flex">
          <motion.div className="flex w-full justify-center gap-4">
            <AnimatePresence initial={false}>
              {desktopPopups.map((popup) => (
                <motion.div
                  key={popup.id}
                  layout
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.92 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="pointer-events-auto"
                >
                  <PopupCard
                    popup={popup}
                    onClose={() => handleClose(popup.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      ) : null}

      <AnimatePresence>
        {isMobile && mobilePopups.length > 0 && !isStacked ? (
          <motion.div
            key="mobile-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-0 left-1/2 z-20 w-[calc(100vw-var(--spacing)-var(--spacing)-var(--spacing)-var(--spacing))] -translate-x-1/2 rounded-[20px] bg-black/50 xl:hidden"
          />
        ) : null}
      </AnimatePresence>

      {mobilePopups.length > 0 ? (
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
                  const stackedScale =
                    1 - index * MOBILE_STACK_SCALE_STEP;
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
                        opacity: isStacked
                          ? stackedOpacity
                          : 1,
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
                        onClose={() => handleClose(popup.id)}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <AnimatePresence initial={false}>
                {!isStacked ? (
                  <motion.div
                    key="mobile-popup-countdown-area"
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{
                      duration: 0.25,
                      ease: 'easeOut',
                    }}
                    className="absolute inset-x-0 flex flex-col items-center gap-3 text-white"
                    style={{
                      top: mobileExpandedHeight + 20,
                    }}
                  >
                    <TypographyP
                      managed={false}
                      className="text-[15px] font-medium text-white/80"
                    >
                      {countdown}
                      {copy.coverPopupCountdownSuffix}
                    </TypographyP>

                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={handleCloseMobilePopups}
                        className="rounded-full bg-white px-4 py-2 text-[14px] font-bold text-neutral-900"
                      >
                        {copy.coverPopupCloseNow}
                      </button>

                      <button
                        type="button"
                        onClick={handleHideToday}
                        className="rounded-full bg-white/15 px-4 py-2 text-[14px] font-semibold text-white backdrop-blur-sm"
                      >
                        {copy.coverPopupHideToday}
                      </button>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function SlideAction({ slide }: { slide: HomeCoverSlide }) {
  if (!slide.buttonLabel) return null;

  if (slide.actionType === 'macgpt') {
    return (
      <button
        type="button"
        onClick={() => openMacGptSearch()}
        className="order-3 mt-5 flex items-center gap-1.5 rounded-full border border-white bg-white px-3 py-[4.5px] text-[15px] font-semibold text-black shadow-[0_0_20px_2px_#FF7740] xl:order-1 xl:mt-0 xl:text-lg"
      >
        <Image
          src="/assets/effects/sparkle.gif"
          alt=""
          aria-hidden="true"
          width={22}
          height={22}
          unoptimized
        />
        <span>{slide.buttonLabel}</span>
      </button>
    );
  }

  return (
    <Link
      href={slide.href || '/'}
      target={slide.openInNewTab ? '_blank' : undefined}
      rel={slide.openInNewTab ? 'noopener noreferrer' : undefined}
      className="order-3 mt-5 rounded-full border border-white px-4 py-1 text-[15px] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)] xl:order-1 xl:mt-0 xl:text-lg"
    >
      {slide.buttonLabel}
    </Link>
  );
}

function CoverSlide({
  slide,
  index,
}: {
  slide: HomeCoverSlide;
  index: number;
}) {
  const headingClassName =
    'order-1 flex flex-col items-center text-4xl leading-[125%] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)] xl:order-2 xl:mt-14 xl:flex-row xl:gap-1.75 xl:text-6xl';

  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[20px] bg-[#4E6875] px-5 pb-[5%] xl:rounded-none ${
        slide.actionType === 'macgpt'
          ? 'xl:pb-[6%]'
          : 'xl:pb-[3%]'
      }`}
    >
      {slide.mobileImage ? (
        <Image
          src={slide.mobileImage}
          alt={slide.alt}
          fill
          priority={index === 0}
          className="object-cover xl:hidden"
          sizes="100vw"
        />
      ) : null}

      {slide.desktopImage ? (
        <Image
          src={slide.desktopImage}
          alt={slide.alt}
          fill
          priority={index === 0}
          className="hidden object-cover xl:block"
          sizes="100vw"
        />
      ) : null}

      <div className="relative z-[2] flex flex-col items-center">
        {index === 0 ? (
          <TypographyH1
            managed={false}
            id="home-primary-heading"
            className={headingClassName}
          >
            <span>{slide.titleLead}</span>
            <span className="font-extrabold">
              {slide.titleStrong}
            </span>
          </TypographyH1>
        ) : (
          <TypographyH2
            managed={false}
            className={headingClassName}
          >
            <span>{slide.titleLead}</span>
            <span className="font-extrabold">
              {slide.titleStrong}
            </span>
          </TypographyH2>
        )}

        <div className="order-2 mt-5 flex flex-col items-center break-keep text-center text-[15px] leading-[150%] text-white [text-shadow:0_1px_5px_rgba(25,39,66,0.6)] xl:order-3 xl:gap-1 xl:text-2xl">
          <TypographyP managed={false}>
            {slide.description1}
          </TypographyP>
          <TypographyP managed={false}>
            {slide.description2}
          </TypographyP>
        </div>

        <SlideAction slide={slide} />
      </div>

      <ManagedItemEditButton
        pageKey="home"
        itemKey={slide.itemKey}
        label={`${slide.titleLead} ${slide.titleStrong}`}
        className="right-4 top-16"
      />
    </div>
  );
}

export default function HomeCover({
  copy,
  persisted,
  slides,
  popups,
}: {
  copy: InlineContentData;
  persisted: boolean;
  slides: HomeCoverSlide[];
  popups: HomeCoverPopup[];
}) {
  const { isMobile } = useViewport();
  const swiperRef = useRef<SwiperType | null>(null);
  const [canStartSwiperAutoplay, setCanStartSwiperAutoplay] =
    useState(false);
  const [initialCoverHeight, setInitialCoverHeight] = useState<
    number | null
  >(null);

  const handleMobilePopupsClosed = useCallback(() => {
    setCanStartSwiperAutoplay(true);
  }, []);

  useLayoutEffect(() => {
    const initialViewportHeight = window.innerHeight;
    setInitialCoverHeight(Math.round(initialViewportHeight * 0.78));
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setCanStartSwiperAutoplay(true);
      return;
    }

    setCanStartSwiperAutoplay(popups.length === 0);
  }, [isMobile, popups.length]);

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
    <EditablePageCopyRegion
      path="/"
      copy={copy}
      persisted={persisted}
      label="메인 팝업 공통 문구"
      fieldKeys={HOME_COPY_FIELD_KEYS.cover}
    >
      <section
        className="group/cms-collection relative overflow-hidden px-2 xl:px-0"
        style={{
          height:
            initialCoverHeight === null
              ? '78vh'
              : `${initialCoverHeight}px`,
        }}
      >
        <CollectionAdminEditButton
          href="/admin/home/cover-slides"
          label="커버 슬라이드"
          className="left-3 right-auto"
        />

        {slides.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={isMobile ? 8 : 0}
            slidesPerView={1}
            loop={slides.length > 1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 500000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;

              if (isMobile && popups.length > 0) {
                swiper.autoplay.stop();
              }
            }}
            className="h-full w-full [&_.swiper-pagination]:absolute! [&_.swiper-pagination]:bottom-15! [&_.swiper-pagination]:top-auto! [&_.swiper-pagination]:z-10! [&_.swiper-pagination-bullet]:mx-1.5! [&_.swiper-pagination-bullet]:size-3! [&_.swiper-pagination-bullet]:bg-white! [&_.swiper-pagination-bullet]:opacity-40! [&_.swiper-pagination-bullet-active]:opacity-100!"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.itemKey}>
                <CoverSlide slide={slide} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid h-full place-items-center rounded-[20px] bg-[#4E6875] px-6 text-center text-sm text-white/80 xl:rounded-none">
            메인페이지에 노출할 커버 슬라이드를 관리자에서 활성화해주세요.
          </div>
        )}

        <HomeCoverPopups
          isMobile={isMobile}
          onMobilePopupsClosed={handleMobilePopupsClosed}
          copy={copy}
          popups={popups}
        />
      </section>
    </EditablePageCopyRegion>
  );
}
