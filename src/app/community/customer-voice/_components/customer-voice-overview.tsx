'use client';

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

const testimonials = [
  {
    title: '박용범 원장님',
    content:
      '수술 전부터 퇴원 후 관리까지 세심하게 설명해주셔서 불안했던 마음이 놓였습니다. 정말 감사하다는 마음을 전하고 싶습니다.',
    author: '한○○님',
  },
  {
    title: '병동 간호사분들 감사합니다',
    content:
      '입원 기간 내내 친절한 선생님들이 사소한 것까지 챙겨주셔서 편안히 회복했습니다.',
    author: '한○○님',
  },
  {
    title: '칭찬합니다',
    content:
      '입원 기간 내내 간호사 선생님들이 사소한 것까지 챙겨주셔서 편안히 회복했습니다.',
    author: '한○○님',
  },
  {
    title: '친절한 안내에 감사드립니다',
    content:
      '검사부터 진료까지 차분하게 안내해주셔서 처음 방문했지만 불편함 없이 진료를 받을 수 있었습니다.',
    author: '이○○님',
  },
] as const;

const receiveMethods = [
  {
    icon: Send,
    title: '온라인 접수',
    description: '현재 페이지에서 작성 (24시간)',
  },
  {
    icon: Phone,
    title: '전화 접수',
    description: '051-804-1119 (병원 운영시간 내)',
  },
  {
    icon: MapPin,
    title: '방문 접수',
    description: '1층 원무과 · 고객상담실 (병원 운영시간 내)',
  },
] as const;

const processSteps = [
  { step: 'STEP 1', text: '고객 의견 접수' },
  { step: 'STEP 2', text: '관련 부서 검토' },
  { step: 'STEP 3', text: '결과 회신 및 개선 활동' },
] as const;

function TestimonialCard({
  item,
}: {
  item: (typeof testimonials)[number];
}) {
  return (
    <article className="flex min-h-[178px] flex-col rounded-[12px] bg-white px-5 py-5 xl:min-h-[238px] xl:rounded-[14px] xl:px-8 xl:py-8">
      <h3 className="text-[14px] font-semibold tracking-[-0.04em] text-[#2E9B82] xl:text-[17px]">
        {item.title}
      </h3>
      <p className="mt-3 break-keep text-[11px] leading-[1.65] tracking-[-0.035em] text-[#394149] xl:mt-4 xl:text-[14px] xl:leading-[1.75]">
        {item.content}
      </p>
      <p className="mt-auto pt-4 text-[10px] tracking-[-0.03em] text-[#9AA0A7] xl:text-[12px]">
        {item.author}
      </p>
    </article>
  );
}

function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
        <h2 className="text-[18px] font-bold tracking-[-0.04em] text-[#2C3239] xl:text-[22px]">
          칭찬합니다
        </h2>

        <div className="relative mt-5 xl:mt-8">
          <button
            type="button"
            aria-label="이전 칭찬"
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
            aria-label="다음 칭찬"
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

function VoiceCtaCards() {
  return (
    <section className="grid gap-2.5 xl:grid-cols-2 xl:gap-5">
      <article className="relative min-h-[132px] overflow-hidden rounded-[10px] bg-[#DFF4EF] px-5 py-5 xl:min-h-[178px] xl:rounded-[8px] xl:px-8 xl:py-8">
        <div className="relative z-10">
          <h2 className="text-[18px] font-bold tracking-[-0.045em] text-[#177B68] xl:text-[22px]">
            감사합니다·칭찬해요
          </h2>
          <p className="mt-1 text-[11px] tracking-[-0.035em] text-[#4A5B57] xl:text-[13px]">
            따뜻한 경험이나 따뜻한 마음을 전해주세요
          </p>
          <Link
            href="/community/customer-voice/write?category=praise"
            className="mt-4 inline-flex h-8 items-center justify-center rounded-full bg-white px-5 text-[11px] font-semibold text-[#39444A] xl:mt-5 xl:h-9 xl:text-[12px]"
          >
            작성하기
          </Link>
        </div>
        <Mail
          className="absolute right-5 top-1/2 size-12 -translate-y-1/2 text-[#87D3C2] xl:right-8 xl:size-16"
          strokeWidth={1.7}
        />
      </article>

      <article className="relative min-h-[132px] overflow-hidden rounded-[10px] bg-[#003F34] px-5 py-5 xl:min-h-[178px] xl:rounded-[8px] xl:px-8 xl:py-8">
        <div className="relative z-10">
          <h2 className="text-[18px] font-bold tracking-[-0.045em] text-white xl:text-[22px]">
            건의합니다·불만/고충
          </h2>
          <p className="mt-1 text-[11px] tracking-[-0.035em] text-white/80 xl:text-[13px]">
            불편했던 점이나 개선 의견을 남겨주세요
          </p>
          <Link
            href="/community/customer-voice/write?category=complaint"
            className="mt-4 inline-flex h-8 items-center justify-center rounded-full bg-white px-5 text-[11px] font-semibold text-[#39444A] xl:mt-5 xl:h-9 xl:text-[12px]"
          >
            작성하기
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

function ReceiveMethods() {
  return (
    <section className="mt-9 xl:mt-16">
      <h2 className="text-[18px] font-bold tracking-[-0.04em] text-[#2F353C] xl:text-[22px]">
        고객의 소리 접수방법
      </h2>
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
                <h3 className="text-[14px] font-semibold tracking-[-0.04em] text-[#343B43] xl:text-[16px]">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-[10px] tracking-[-0.03em] text-[#A0A5AB] xl:text-[12px]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="mt-9 xl:mt-16">
      <h2 className="text-[18px] font-bold tracking-[-0.04em] text-[#2F353C] xl:text-[22px]">
        처리절차
      </h2>
      <div className="mt-4 flex flex-col items-stretch xl:mt-6 xl:flex-row xl:items-center xl:gap-7">
        {processSteps.map((item, index) => (
          <div key={item.step} className="contents">
            <div className="flex min-h-[72px] flex-1 flex-col items-center justify-center rounded-[9px] bg-[#F5F6F7] px-4 text-center xl:min-h-[86px]">
              <strong className="text-[11px] font-semibold text-[#2AA88D] xl:text-[12px]">
                {item.step}
              </strong>
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

export default function CustomerVoiceOverview() {
  return (
    <>
      <TestimonialCarousel />

      <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-8 xl:px-0 xl:pb-24 xl:pt-16">
        <VoiceCtaCards />
        <ReceiveMethods />
        <Process />
      </div>
    </>
  );
}
