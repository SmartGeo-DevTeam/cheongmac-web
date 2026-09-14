'use client';

import EditablePageCopyRegion from '@/app/_components/inline-editor/editable-page-copy-region';
import type { InlineContentData } from '@/_lib/inline-content-shared';
import {
  H2 as TypographyH2,
  H3 as TypographyH3,
  P as TypographyP,
  Strong as TypographyStrong,
} from '@/app/_components/ui/typography';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

function buildTestimonials(copy: InlineContentData) {
  return [
    { title: copy.testimonial1Title, content: copy.testimonial1Content, author: copy.testimonial1Author },
    { title: copy.testimonial2Title, content: copy.testimonial2Content, author: copy.testimonial2Author },
    { title: copy.testimonial3Title, content: copy.testimonial3Content, author: copy.testimonial3Author },
    { title: copy.testimonial4Title, content: copy.testimonial4Content, author: copy.testimonial4Author },
  ];
}

function buildReceiveMethods(copy: InlineContentData) {
  return [
    { icon: Send, title: copy.onlineTitle, description: copy.onlineDescription },
    { icon: Phone, title: copy.phoneTitle, description: copy.phoneDescription },
    { icon: MapPin, title: copy.visitTitle, description: copy.visitDescription },
  ];
}

function buildProcessSteps(copy: InlineContentData) {
  return [
    { step: copy.step1Label, text: copy.step1 },
    { step: copy.step2Label, text: copy.step2 },
    { step: copy.step3Label, text: copy.step3 },
  ];
}

function TestimonialCard({
  item,
}: {
  item: { title: string; content: string; author: string };
}) {
  return (
    <article className="flex min-h-[178px] flex-col rounded-[12px] bg-white px-5 py-5 xl:min-h-[238px] xl:rounded-[14px] xl:px-8 xl:py-8">
      <TypographyH3 className="text-[14px] font-semibold tracking-[-0.04em] text-[#2E9B82] xl:text-[17px]">
        {item.title}
      </TypographyH3>
      <TypographyP className="mt-3 break-keep text-[11px] leading-[1.65] tracking-[-0.035em] text-[#394149] xl:mt-4 xl:text-[14px] xl:leading-[1.75]">
        {item.content}
      </TypographyP>
      <TypographyP className="mt-auto pt-4 text-[10px] tracking-[-0.03em] text-[#9AA0A7] xl:text-[12px]">
        {item.author}
      </TypographyP>
    </article>
  );
}

function TestimonialCarousel({ copy }: { copy: InlineContentData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = useMemo(() => buildTestimonials(copy), [copy]);

  const desktopItems = useMemo(
    () =>
      Array.from({ length: 3 }, (_, offset) => {
        const index = (currentIndex + offset) % testimonials.length;
        return testimonials[index];
      }),
    [currentIndex],
  );

  const move = (direction: -1 | 1) => {
    setCurrentIndex((previous) => {
      const next = previous + direction;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  return (
    <section className="bg-[#F5F6F7] py-8 xl:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 xl:px-0">
        <TypographyH2 className="text-[18px] font-bold tracking-[-0.04em] text-[#2C3239] xl:text-[22px]">
          {copy.testimonialHeading}
        </TypographyH2>

        <div className="relative mt-5 xl:mt-8">
          <button
            type="button"
            aria-label={copy.testimonialPrevLabel}
            onClick={() => move(-1)}
            className="absolute left-0 top-1/2 z-10 flex size-8 -translate-x-1/4 -translate-y-1/2 items-center justify-center rounded-full border border-[#E0E4E7] bg-white text-[#7B838B] shadow-sm xl:-translate-x-[70%] xl:size-10"
          >
            <ChevronLeft className="size-5" strokeWidth={1.6} />
          </button>

          <div className="mx-auto w-[72%] xl:hidden">
            <TestimonialCard item={testimonials[currentIndex]} />
          </div>

          <div className="hidden grid-cols-3 gap-5 xl:grid">
            {desktopItems.map((item, index) => (
              <TestimonialCard key={`${item.title}-${index}`} item={item} />
            ))}
          </div>

          <button
            type="button"
            aria-label={copy.testimonialNextLabel}
            onClick={() => move(1)}
            className="absolute right-0 top-1/2 z-10 flex size-8 translate-x-1/4 -translate-y-1/2 items-center justify-center rounded-full border border-[#E0E4E7] bg-white text-[#7B838B] shadow-sm xl:translate-x-[70%] xl:size-10"
          >
            <ChevronRight className="size-5" strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </section>
  );
}

function VoiceCtaCards({ copy }: { copy: InlineContentData }) {
  return (
    <section className="grid gap-2.5 xl:grid-cols-2 xl:gap-5">
      <article className="relative min-h-[132px] overflow-hidden rounded-[10px] bg-[#DFF4EF] px-5 py-5 xl:min-h-[178px] xl:rounded-[8px] xl:px-8 xl:py-8">
        <div className="relative z-10">
          <TypographyH2 className="text-[18px] font-bold tracking-[-0.045em] text-[#177B68] xl:text-[22px]">
            {copy.praiseTitle}
          </TypographyH2>
          <TypographyP className="mt-1 text-[11px] tracking-[-0.035em] text-[#4A5B57] xl:text-[13px]">
            {copy.praiseDescription}
          </TypographyP>
          <Link
            href="/community/customer-voice/write?category=praise"
            className="mt-4 inline-flex h-8 items-center justify-center rounded-full bg-white px-5 text-[11px] font-semibold text-[#39444A] xl:mt-5 xl:h-9 xl:text-[12px]"
          >
            {copy.writeLabel}
          </Link>
        </div>
        <Mail
          className="absolute right-5 top-1/2 size-12 -translate-y-1/2 text-[#87D3C2] xl:right-8 xl:size-16"
          strokeWidth={1.7}
        />
      </article>

      <article className="relative min-h-[132px] overflow-hidden rounded-[10px] bg-[#003F34] px-5 py-5 xl:min-h-[178px] xl:rounded-[8px] xl:px-8 xl:py-8">
        <div className="relative z-10">
          <TypographyH2 className="text-[18px] font-bold tracking-[-0.045em] text-white xl:text-[22px]">
            {copy.complaintTitle}
          </TypographyH2>
          <TypographyP className="mt-1 text-[11px] tracking-[-0.035em] text-white/80 xl:text-[13px]">
            {copy.complaintDescription}
          </TypographyP>
          <Link
            href="/community/customer-voice/write?category=complaint"
            className="mt-4 inline-flex h-8 items-center justify-center rounded-full bg-white px-5 text-[11px] font-semibold text-[#39444A] xl:mt-5 xl:h-9 xl:text-[12px]"
          >
            {copy.writeLabel}
          </Link>
        </div>
        <MessageCircle
          className="absolute right-5 top-1/2 size-12 -translate-y-1/2 text-[#86D3C1] xl:right-8 xl:size-16"
          strokeWidth={1.7}
        />
      </article>
    </section>
  );
}

function ReceiveMethods({ copy }: { copy: InlineContentData }) {
  const receiveMethods = buildReceiveMethods(copy);
  return (
    <section className="mt-9 xl:mt-16">
      <TypographyH2 className="text-[18px] font-bold tracking-[-0.04em] text-[#2F353C] xl:text-[22px]">
        {copy.receiveHeading}
      </TypographyH2>
      <div className="mt-4 overflow-hidden rounded-[14px] border border-[#E0E4E7] bg-white px-4 xl:mt-6 xl:rounded-[12px] xl:px-6">
        {receiveMethods.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`flex items-center gap-4 py-4 xl:gap-5 xl:py-5 ${
                index !== receiveMethods.length - 1
                  ? 'border-b border-[#E5E8EA]'
                  : ''
              }`}
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#E8F7F3] text-[#087461] xl:size-12">
                <Icon className="size-5 xl:size-6" strokeWidth={1.8} />
              </span>
              <div>
                <TypographyH3 className="text-[14px] font-semibold tracking-[-0.04em] text-[#343B43] xl:text-[16px]">
                  {item.title}
                </TypographyH3>
                <TypographyP className="mt-0.5 text-[10px] tracking-[-0.03em] text-[#A0A5AB] xl:text-[12px]">
                  {item.description}
                </TypographyP>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Process({ copy }: { copy: InlineContentData }) {
  const processSteps = buildProcessSteps(copy);
  return (
    <section className="mt-9 xl:mt-16">
      <TypographyH2 className="text-[18px] font-bold tracking-[-0.04em] text-[#2F353C] xl:text-[22px]">
        {copy.processHeading}
      </TypographyH2>
      <div className="mt-4 flex flex-col items-stretch xl:mt-6 xl:flex-row xl:items-center xl:gap-7">
        {processSteps.map((item, index) => (
          <div key={item.step} className="contents">
            <div className="flex min-h-[72px] flex-1 flex-col items-center justify-center rounded-[9px] bg-[#F5F6F7] px-4 text-center xl:min-h-[86px]">
              <TypographyStrong className="text-[11px] font-semibold text-[#2AA88D] xl:text-[12px]">
                {item.step}
              </TypographyStrong>
              <span className="mt-1 text-[12px] tracking-[-0.035em] text-[#454D55] xl:text-[14px]">
                {item.text}
              </span>
            </div>
            {index < processSteps.length - 1 ? (
              <div className="flex h-5 items-center justify-center text-[#2AA88D] xl:h-auto xl:w-5">
                <ChevronDown
                  className="size-4 xl:hidden"
                  fill="currentColor"
                  strokeWidth={0}
                />
                <ChevronRight
                  className="hidden size-5 xl:block"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function CustomerVoiceOverview({
  copy,
  persisted,
}: {
  copy: InlineContentData;
  persisted: boolean;
}) {
  return (
    <>
      <EditablePageCopyRegion
        path="/community/customer-voice"
        copy={copy}
        persisted={persisted}
        label="고객의 소리 칭찬 후기 영역"
        fieldKeys={[
          'testimonialHeading',
          'testimonialPrevLabel',
          'testimonialNextLabel',
          'testimonial1Title',
          'testimonial1Content',
          'testimonial1Author',
          'testimonial2Title',
          'testimonial2Content',
          'testimonial2Author',
          'testimonial3Title',
          'testimonial3Content',
          'testimonial3Author',
          'testimonial4Title',
          'testimonial4Content',
          'testimonial4Author',
        ]}
      >
        <TestimonialCarousel copy={copy} />
      </EditablePageCopyRegion>

      <EditablePageCopyRegion
        path="/community/customer-voice"
        copy={copy}
        persisted={persisted}
        label="고객의 소리 접수·처리 안내"
        className="mx-auto w-full max-w-7xl"
        fieldKeys={[
          'praiseTitle',
          'praiseDescription',
          'complaintTitle',
          'complaintDescription',
          'writeLabel',
          'receiveHeading',
          'onlineTitle',
          'onlineDescription',
          'phoneTitle',
          'phoneDescription',
          'visitTitle',
          'visitDescription',
          'processHeading',
          'step1Label',
          'step1',
          'step2Label',
          'step2',
          'step3Label',
          'step3',
        ]}
      >
        <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-8 xl:px-0 xl:pb-24 xl:pt-16">
          <VoiceCtaCards copy={copy} />
          <ReceiveMethods copy={copy} />
          <Process copy={copy} />
        </div>
      </EditablePageCopyRegion>
    </>
  );
}
