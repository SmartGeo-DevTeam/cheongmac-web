'use client';

import CollectionAdminEditButton from '@/app/_components/inline-editor/collection-admin-edit-button';
import EditablePageCopyRegion from '@/app/_components/inline-editor/editable-page-copy-region';
import ManagedItemEditButton from '@/app/_components/inline-editor/managed-item-edit-button';
import {
  H3 as TypographyH3,
  P as TypographyP,
} from '@/app/_components/ui/typography';
import FadeInUp from '@/app/_components/fade-in-up';
import MainSectionHeader from '@/app/_components/main-section-header';
import type { HomeSpecialtyCard } from '@/_lib/home-section-content';
import { HOME_COPY_FIELD_KEYS } from '@/_lib/home-page-copy';
import type { InlineContentData } from '@/_lib/inline-content-shared';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

function SpecialtiesItem({
  item,
  index,
  containerRef,
  progress,
}: {
  item: HomeSpecialtyCard;
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
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

      const start = Math.max(
        0,
        Math.min(1, topInCont / contHeight - 0.15),
      );
      const end = Math.max(
        0,
        Math.min(1, bottomInCont / contHeight - 0.05),
      );

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

  const isLeft = useMemo(() => index % 2 === 0, [index]);

  const opacity = useTransform(
    progress,
    [range.start, range.end],
    [0, 1],
  );

  const x = useTransform(
    progress,
    [range.start, range.end],
    [isLeft ? -50 : 50, 0],
  );

  const y = useTransform(
    progress,
    [range.start, range.end],
    [50, 0],
  );

  return (
    <motion.li
      ref={itemRef}
      className="will-change-transform"
      style={{ opacity, x, y }}
    >
      <Link
        href={item.href || '/'}
        target={item.openInNewTab ? '_blank' : undefined}
        rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
        className="relative block size-full"
      >
        <TypographyH3 managed={false}>{item.title}</TypographyH3>
        <Image src={item.imageSrc} alt={item.alt} fill />
      </Link>

      <ManagedItemEditButton
        pageKey="home"
        itemKey={item.itemKey}
        label={item.title}
      />
    </motion.li>
  );
}

export default function HomeSpecialties({
  copy,
  persisted,
  items,
}: {
  copy: InlineContentData;
  persisted: boolean;
  items: HomeSpecialtyCard[];
}): React.ReactNode {
  const contRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: contRef,
    offset: ['start 70%', 'end center'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const dotOpacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.82, 0.95],
    [0, 1, 1, 0],
  );

  return (
    <EditablePageCopyRegion
      path="/"
      copy={copy}
      persisted={persisted}
      label="메인 진료분야 문구"
      fieldKeys={HOME_COPY_FIELD_KEYS.specialties}
    >
      <FadeInUp>
        <section className="bg-[linear-gradient(to_bottom,#FFFFFF_0%,#F6F2EF_100%)]">
          <div
            className="
              overflow-x-hidden
              px-5
              pt-20
              pb-15
              text-[#262C35]
              xl:mx-auto
              xl:w-full
              xl:max-w-240
              xl:overflow-visible
              xl:pt-32
              xl:pb-20
            "
          >
            <MainSectionHeader
              eyebrow={copy.specialtiesEyebrow}
              title={
                <>
                  <span className="block">{copy.specialtiesTitle1}</span>
                  <span className="block">{copy.specialtiesTitle2}</span>
                </>
              }
              description={
                <>
                  <TypographyP managed={false}>
                    {copy.specialtiesDescription1}
                  </TypographyP>
                  <TypographyP managed={false}>
                    {copy.specialtiesDescription2}
                  </TypographyP>
                </>
              }
            />

            <div
              ref={contRef}
              className="
                group/cms-collection
                relative
                mt-5
                xl:mt-36
              "
            >
              <CollectionAdminEditButton
                href="/admin/home/specialties"
                label="메인 진료분야 카드"
              />

              <div className="absolute left-1/2 top-0 h-full w-0.75 -translate-x-1/2 overflow-visible">
                <motion.div
                  className="
                    absolute
                    left-0
                    top-0
                    h-full
                    w-full
                    origin-top
                    bg-[linear-gradient(180deg,#D9D9D900_0%,#FD77404D_97%,#DECCC500_100%)]
                    will-change-transform
                  "
                  style={{ scaleY: lineScaleY }}
                />

                <motion.div
                  className="
                    absolute
                    left-1/2
                    w-3
                    aspect-square
                    will-change-transform
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
                    src="/assets/brand/symbol.svg"
                    alt=""
                    aria-hidden="true"
                    className="size-3 xl:size-6"
                  />
                </motion.div>
              </div>

              <ul
                className="
                  flex
                  flex-wrap
                  gap-x-5
                  pb-15

                  [&>li]:relative
                  [&>li]:aspect-square
                  [&>li]:w-[calc((100%-1.25rem)/2)]
                  [&>li]:overflow-clip
                  [&>li]:rounded-2xl
                  [&>li]:even:top-15
                  [&>li:nth-child(n+3)]:mt-4

                  [&>li>a>h3]:absolute
                  [&>li>a>h3]:bottom-2.5
                  [&>li>a>h3]:left-4
                  [&>li>a>h3]:z-10
                  [&>li>a>h3]:text-sm
                  [&>li>a>h3]:font-extrabold
                  [&>li>a>h3]:text-white

                  [&>li>a>img]:object-cover

                  xl:gap-x-21
                  xl:[&>li]:w-[calc((100%-5.25rem)/2)]
                  xl:[&>li>a>h3]:bottom-8
                  xl:[&>li>a>h3]:left-10
                  xl:[&>li>a>h3]:text-3xl
                "
              >
                {items.map((item, index) => (
                  <SpecialtiesItem
                    key={item.itemKey}
                    item={item}
                    index={index}
                    containerRef={contRef}
                    progress={scrollYProgress}
                  />
                ))}
              </ul>

              {!items.length ? (
                <div className="rounded-2xl border border-dashed border-[#D8D8D8] bg-white/60 px-5 py-10 text-center text-sm text-[#7A7A7A]">
                  관리자에서 메인페이지에 노출할 진료분야 카드를 활성화해주세요.
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </FadeInUp>
    </EditablePageCopyRegion>
  );
}
