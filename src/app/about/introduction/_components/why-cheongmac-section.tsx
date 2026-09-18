'use client';

import CollectionAdminEditButton from '@/app/_components/inline-editor/collection-admin-edit-button';
import ManagedItemEditButton from '@/app/_components/inline-editor/managed-item-edit-button';
import {
  H2 as TypographyH2,
  P as TypographyP,
} from '@/app/_components/ui/typography';
import type { InlineContentData } from '@/_lib/inline-content-shared';
import type { AboutIntroductionWhyPoint } from '../_data';

function WhyPointCard({
  item,
}: {
  item: AboutIntroductionWhyPoint;
}) {
  return (
    <article
      data-why-point-card
      className="relative z-10 flex min-h-[116px] w-full flex-col items-center justify-center rounded-[999px] border border-[#EEF0F2] bg-white px-7 py-5 text-center shadow-[0_10px_34px_rgba(40,52,61,0.10)] xl:min-h-[126px] xl:px-8"
    >
      <TypographyP
        managed={false}
        className="break-keep text-[18px] font-bold leading-[1.35] tracking-[-0.045em] text-[#FF7442] xl:text-[19px]"
      >
        {item.title}
      </TypographyP>

      <TypographyP
        managed={false}
        className="mt-2 break-keep text-[13px] font-medium leading-[1.65] tracking-[-0.025em] text-[#3E4650] xl:text-[14px]"
      >
        {item.description}
      </TypographyP>

      <ManagedItemEditButton
        pageKey="about-introduction"
        itemKey={item.itemKey}
        label={item.title}
      />
    </article>
  );
}

export default function WhyCheongmacSection({
  copy,
  whyPoints,
}: {
  copy: InlineContentData;
  whyPoints: AboutIntroductionWhyPoint[];
}) {
  const left = whyPoints.filter((item) => item.side === 'left');
  const right = whyPoints.filter((item) => item.side === 'right');

  return (
    <section
      data-why-cheongmac-section
      className="relative overflow-hidden bg-white px-5 py-20 xl:py-28"
    >
      <CollectionAdminEditButton
        href="/admin/pages/about-introduction?type=why-point"
        label="WHY 청맥 이유"
        className="right-5 top-5"
      />

      <div className="mx-auto w-full max-w-[1380px]">
        <div className="text-center">
          <TypographyP
            managed={false}
            className="text-[14px] font-bold tracking-[-0.035em] text-[#08755E] xl:text-[16px]"
          >
            {copy.whyEyebrow}
          </TypographyP>

          <TypographyH2
            managed={false}
            className="mt-2 text-[38px] font-bold leading-[1.15] tracking-[-0.055em] text-[#27303A] sm:text-[44px] xl:text-[52px]"
          >
            {copy.whyTitle}
          </TypographyH2>

          <TypographyP
            managed={false}
            className="mx-auto mt-8 max-w-[760px] whitespace-pre-line break-keep text-[15px] font-semibold leading-[1.75] tracking-[-0.035em] text-[#3A424B] sm:text-base xl:text-[18px]"
          >
            {copy.whyDescription}
          </TypographyP>
        </div>

        <div
          data-why-cheongmac-desktop
          className="mx-auto mt-16 hidden max-w-[1320px] grid-cols-[minmax(0,1fr)_400px_minmax(0,1fr)] items-center gap-10 xl:grid"
        >
          <div className="space-y-5">
            {left.map((item) => (
              <WhyPointCard
                key={item.itemKey}
                item={item}
              />
            ))}
          </div>

          <div className="relative mx-auto size-[390px]">
            <div
              data-why-rotating-ring
              aria-hidden="true"
              className="absolute inset-0 animate-spin rounded-full motion-reduce:animate-none"
              style={{
                animationDuration: '14s',
                background:
                  'conic-gradient(from 18deg,#FF7442 0deg,#FF7442 308deg,#FF9B73 334deg,#FF7442 360deg)',
              }}
            >
              <span className="absolute left-1/2 top-[-7px] size-[18px] -translate-x-1/2 rounded-full bg-[#FF7442]" />
            </div>

            <div className="absolute inset-[13px] overflow-hidden rounded-full border-[8px] border-white bg-white shadow-[0_16px_44px_rgba(34,49,56,0.14)]">
              <img
                src={copy.whyCenterImage}
                alt={copy.whyCenterAlt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-5">
            {right.map((item) => (
              <WhyPointCard
                key={item.itemKey}
                item={item}
              />
            ))}
          </div>
        </div>

        <div
          data-why-cheongmac-mobile
          className="mx-auto mt-12 w-full max-w-[520px] xl:hidden"
        >
          <div className="relative mx-auto size-[310px] sm:size-[360px]">
            <div
              data-why-rotating-ring
              aria-hidden="true"
              className="absolute inset-0 animate-spin rounded-full motion-reduce:animate-none"
              style={{
                animationDuration: '14s',
                background:
                  'conic-gradient(from 18deg,#FF7442 0deg,#FF7442 308deg,#FF9B73 334deg,#FF7442 360deg)',
              }}
            >
              <span className="absolute left-1/2 top-[-6px] size-4 -translate-x-1/2 rounded-full bg-[#FF7442]" />
            </div>

            <div className="absolute inset-[11px] overflow-hidden rounded-full border-[7px] border-white bg-white shadow-[0_14px_36px_rgba(34,49,56,0.14)]">
              <img
                src={copy.whyCenterImage}
                alt={copy.whyCenterAlt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="relative mt-10 space-y-4 before:absolute before:bottom-0 before:left-1/2 before:top-[-42px] before:w-px before:-translate-x-1/2 before:bg-[#6DB4A7]/35 before:content-['']">
            {whyPoints.map((item) => (
              <WhyPointCard
                key={item.itemKey}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
