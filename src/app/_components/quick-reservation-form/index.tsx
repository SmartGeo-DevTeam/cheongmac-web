'use client';

import { useScrollDirection } from '@/app/_providers/scroll-direction-provider';
import type { Locale } from '@/i18n-config';
import { X } from 'lucide-react';
import { useState } from 'react';

type ReservationText = {
  title: string;
  desc_1: string;
  desc_2: string;
  button_1: string;
  button_2: string;
};

type QuickReservationFormProps = {
  lang: Locale;
  reservationText: ReservationText;
};

export default function QuickReservationForm({
  lang,
  reservationText,
}: QuickReservationFormProps) {
  const { isVisible } = useScrollDirection();
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);

  const labels = {
    ko: {
      title: '가장 빠른 상담',
      content: '상담내용',
      hopeDate: '희망날짜 *',
      birthDate: '생년월일',
      name: '성함',
      phone: '연락처',
      phoneCall: '전화걸기',
      submit: '문의 접수',
    },
    en: {
      title: 'Quick consultation',
      content: 'Consultation details',
      hopeDate: 'Preferred date *',
      birthDate: 'Date of birth',
      name: 'Name',
      phone: 'Phone number',
      phoneCall: 'Call',
      submit: 'Submit',
    },
    ja: {
      title: '最短相談',
      content: '相談内容',
      hopeDate: '希望日 *',
      birthDate: '生年月日',
      name: 'お名前',
      phone: '連絡先',
      phoneCall: '電話する',
      submit: '申し込む',
    },
  }[lang];

  return (
    <div
      className={`fixed left-0 right-0 bottom-0 w-full transition-all duration-300 ease-out will-change-transform z-50
    xl:left-1/2 xl:right-auto xl:bottom-8 xl:w-[calc(100%-40px)] xl:max-w-[1180px] xl:-translate-x-1/2
    ${
      isVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-[calc(100%+40px)] opacity-0 pointer-events-none'
    }
    `}
    >
      {/* Mobile */}
      <div className="px-5 xl:hidden">
        <button
          type="button"
          onClick={() => setIsMobileFormOpen(true)}
          className={`h-[50px] w-full items-center justify-center gap-2 rounded-t-[18px] bg-[#FF9A74] font-bold text-white transition-all duration-300 ease-out
  ${isMobileFormOpen ? 'max-h-0 opacity-0 pointer-events-none' : 'flex max-h-[50px] opacity-100'}
  `}
        >
          <span>{labels.title || reservationText.title}</span>
          <span className="flex size-4 items-center justify-center rounded-full bg-[#5056C9] text-[10px] leading-none text-white">
            •••
          </span>
        </button>

        <form
          className={`relative overflow-hidden rounded-t-[18px] bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.2)] transition-all duration-300 ease-out
  ${isMobileFormOpen ? 'max-h-[360px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
  `}
          onSubmit={(event) => event.preventDefault()}
        >
          <button
            type="button"
            onClick={() => setIsMobileFormOpen(false)}
            className="absolute right-5 top-4 z-10 flex size-6 items-center justify-center text-[#999999]"
            aria-label="상담 폼 닫기"
          >
            <X size={20} strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={() => setIsMobileFormOpen(false)}
            className="mx-auto flex items-center justify-center gap-2 py-4 font-bold text-[#FF7740]"
          >
            <span>{labels.title || reservationText.title}</span>
            <span className="mt-[-4px] size-2 rotate-45 border-b-2 border-r-2 border-[#FF7740]" />
          </button>

          <div className="px-5 pb-5">
            <label className="relative block">
              <span className="sr-only">{labels.content}</span>
              <select
                defaultValue=""
                className="h-10 w-full appearance-none rounded-full border border-[#E8E8E8] bg-white px-5 pr-10 text-sm text-[#333333] outline-none"
              >
                <option value="" disabled>
                  {labels.content}
                </option>
                <option value="reservation">예약 상담</option>
                <option value="treatment">진료 문의</option>
                <option value="result">검사 결과 문의</option>
                <option value="etc">기타 문의</option>
              </select>
              <span className="pointer-events-none absolute right-5 top-1/2 size-2 -translate-y-1/2 rotate-45 border-b border-r border-[#888888]" />
            </label>

            <div className="mt-2 grid grid-cols-2 gap-3">
              <label>
                <span className="sr-only">{labels.name}</span>
                <input
                  type="text"
                  placeholder={labels.name}
                  className="h-10 w-full rounded-full border border-[#E8E8E8] bg-white px-5 text-sm text-[#333333] outline-none placeholder:text-[#999999]"
                />
              </label>

              <label>
                <span className="sr-only">{labels.birthDate}</span>
                <input
                  type="text"
                  placeholder={labels.birthDate}
                  className="h-10 w-full rounded-full border border-[#E8E8E8] bg-white px-5 text-sm text-[#333333] outline-none placeholder:text-[#999999]"
                />
              </label>
            </div>

            <label className="mt-2 block">
              <span className="sr-only">{labels.phone}</span>
              <input
                type="tel"
                inputMode="numeric"
                placeholder={labels.phone}
                className="h-10 w-full rounded-full border border-[#E8E8E8] bg-white px-5 text-sm text-[#333333] outline-none placeholder:text-[#999999]"
              />
            </label>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                className="h-12 rounded-full bg-[#171719] font-bold text-white"
              >
                {labels.phoneCall || reservationText.button_1}
              </button>

              <button
                type="submit"
                className="h-12 rounded-full bg-[#FF7040] font-bold text-white"
              >
                {labels.submit || reservationText.button_2}
                <span className="ml-1">{`>`}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Desktop */}
      <form
        className="hidden overflow-hidden rounded-2xl border border-[#E6E6E6] bg-white shadow-[0_14px_40px_rgba(0,0,0,0.18)] xl:grid xl:h-[76px] xl:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_128px] xl:items-center"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="px-5 py-4 bg-cm-green text-white xl:flex xl:h-full xl:items-center xl:justify-center">
          <p className="tracking-[-5%] font-bold text-lg xl:text-xl">
            {labels.title || reservationText.title}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 px-5 py-4 xl:contents">
          <label className="flex flex-col gap-1 xl:px-4">
            <span className="sr-only">{labels.content}</span>
            <select
              defaultValue=""
              className="h-10 w-full border-b border-b-[#DDDDDD] bg-transparent tracking-[-4%] text-sm text-[#333333] outline-none xl:h-[76px]"
            >
              <option value="" disabled>
                {labels.content} *
              </option>
              <option value="reservation">예약 상담</option>
              <option value="treatment">진료 문의</option>
              <option value="result">검사 결과 문의</option>
              <option value="etc">기타 문의</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 xl:px-4">
            <span className="sr-only">{labels.hopeDate}</span>
            <input
              type="text"
              placeholder={labels.hopeDate}
              className="h-10 w-full border-b border-b-[#DDDDDD] bg-transparent tracking-[-4%] text-sm text-[#333333] outline-none placeholder:text-[#999999] xl:h-[76px]"
            />
          </label>

          <label className="flex flex-col gap-1 xl:px-4">
            <span className="sr-only">{labels.name}</span>
            <input
              type="text"
              placeholder={`${labels.name} *`}
              className="h-10 w-full border-b border-b-[#DDDDDD] bg-transparent tracking-[-4%] text-sm text-[#333333] outline-none placeholder:text-[#999999] xl:h-[76px]"
            />
          </label>

          <label className="flex flex-col gap-1 xl:px-4">
            <span className="sr-only">{labels.phone}</span>
            <input
              type="tel"
              inputMode="numeric"
              placeholder={`${labels.phone}(숫자만) *`}
              className="h-10 w-full border-b border-b-[#DDDDDD] bg-transparent tracking-[-4%] text-sm text-[#333333] outline-none placeholder:text-[#999999] xl:h-[76px]"
            />
          </label>

          <button
            type="submit"
            className="h-12 rounded-xl bg-cm-green tracking-[-5%] font-bold text-white transition hover:brightness-95 xl:mx-4"
          >
            {labels.submit || reservationText.button_2}
          </button>
        </div>
      </form>
    </div>
  );
}
