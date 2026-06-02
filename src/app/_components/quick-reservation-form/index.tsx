'use client';

import { useScrollDirection } from '@/app/_providers/scroll-direction-provider';
import type { Locale } from '@/i18n-config';

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

  const labels = {
    ko: {
      title: '가장 빠른 상담',
      content: '상담내용 *',
      hopeDate: '희망날짜 *',
      name: '성함 *',
      phone: '연락처(숫자만) *',
      submit: '신청하기',
    },
    en: {
      title: 'Quick consultation',
      content: 'Consultation details *',
      hopeDate: 'Preferred date *',
      name: 'Name *',
      phone: 'Phone number *',
      submit: 'Submit',
    },
    ja: {
      title: '最短相談',
      content: '相談内容 *',
      hopeDate: '希望日 *',
      name: 'お名前 *',
      phone: '連絡先(数字のみ) *',
      submit: '申し込む',
    },
  }[lang];

  return (
    <div
      className={`fixed left-1/2 bottom-5 z-30 w-[calc(100%-40px)] max-w-[1180px] -translate-x-1/2 transition-all duration-300 ease-out will-change-transform xl:bottom-8 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-[calc(100%+40px)] opacity-0 pointer-events-none'
      }`}
    >
      <form
        className="overflow-hidden rounded-2xl border border-[#E6E6E6] bg-white shadow-[0_14px_40px_rgba(0,0,0,0.18)] xl:grid xl:h-[76px] xl:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_128px] xl:items-center"
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
                {labels.content}
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
              placeholder={labels.name}
              className="h-10 w-full border-b border-b-[#DDDDDD] bg-transparent tracking-[-4%] text-sm text-[#333333] outline-none placeholder:text-[#999999] xl:h-[76px]"
            />
          </label>

          <label className="flex flex-col gap-1 xl:px-4">
            <span className="sr-only">{labels.phone}</span>
            <input
              type="tel"
              inputMode="numeric"
              placeholder={labels.phone}
              className="h-10 w-full border-b border-b-[#DDDDDD] bg-transparent tracking-[-4%] text-sm text-[#333333] outline-none placeholder:text-[#999999] xl:h-[76px]"
            />
          </label>

          <button
            type="submit"
            className="h-12 rounded-xl bg-cm-green tracking-[-5%] font-bold text-white transition hover:brightness-95 xl:mx-4"
          >
            {labels.submit}
          </button>
        </div>
      </form>
    </div>
  );
}
