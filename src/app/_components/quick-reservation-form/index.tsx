"use client";

import { useScrollDirection } from "@/app/_providers/scroll-direction-provider";
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function QuickReservationForm() {
  const { isVisible } = useScrollDirection();
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState("");

  const labels = {
    title: "가장 빠른 상담",
    content: "상담내용",
    hopeDate: "희망날짜 *",
    birthDate: "생년월일",
    name: "성함",
    phone: "연락처",
    phoneCall: "전화걸기",
    submit: "문의 접수",
  } as const;

  const consultationOptions = [
    { value: "", label: "선택" },
    { value: "varicose-veins", label: "하지정맥류" },
    { value: "pelvic-varicose-veins", label: "골반정맥류" },
    { value: "varicocele", label: "정계정맥류" },
    { value: "uterine-fibroids", label: "자궁근종" },
    { value: "peripheral-arterial-disease", label: "말초동맥폐쇄증" },
    { value: "dialysis-access", label: "투석혈관" },
    { value: "diabetic-foot", label: "당뇨발" },
    { value: "etc", label: "기타" },
  ];

  const selectedConsultationLabel =
    consultationOptions.find((option) => option.value === selectedConsultation)
      ?.label ?? labels.content;

  return (
    <div
      className={`fixed left-0 right-0 bottom-0 w-full transition-all duration-300 ease-out will-change-transform z-50
    xl:left-1/2 xl:right-auto xl:bottom-8 xl:w-[calc(100%-40px)] xl:max-w-[1180px] xl:-translate-x-1/2
    ${
      isVisible
        ? "translate-y-0 opacity-100"
        : "translate-y-[calc(100%+40px)] opacity-0 pointer-events-none"
    }
    `}
    >
      {/* Mobile */}
      <div className="px-5 xl:hidden">
        <button
          type="button"
          onClick={() => setIsMobileFormOpen(true)}
          className={`h-[50px] w-full items-center justify-center gap-2 rounded-t-[18px] bg-[#FF9A74] font-bold text-white transition-all duration-300 ease-out
            ${isMobileFormOpen ? "max-h-0 opacity-0 pointer-events-none" : "flex max-h-[50px] opacity-100"}
            `}
        >
          <span>{labels.title}</span>
          <Image
            src={`/assets/effects/talking.gif`}
            alt="speech-bubble"
            width={18}
            height={18}
        unoptimized
      />
        </button>

        <form
          className={`relative rounded-t-[18px] bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.2)] transition-all duration-300 ease-out
            ${isMobileFormOpen ? "max-h-90 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
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
            className="mx-auto flex items-center justify-center gap-2 pt-5 pb-2"
          >
            <span className="font-bold text-[#FB9A74]">{labels.title}</span>
            <span className="mt-[-4px] size-2 rotate-45 border-b-2 border-r-2 border-[#FF7740]" />
          </button>
          <div className="px-5 pb-5">
            <div className="relative">
              <span className="sr-only">{labels.content}</span>

              <input
                id="quick-reservation-mobile-consultation-type"
                type="hidden"
                name="consultationType"
                value={selectedConsultation}
              />

              <button
                type="button"
                onClick={() => setIsConsultationOpen((prev) => !prev)}
                className={`relative flex h-10 w-full items-center rounded-full border bg-white px-5 pr-11 text-left text-sm font-medium outline-none transition-colors
      ${selectedConsultation ? "text-[#333333]" : "text-[#999999]"}
      ${isConsultationOpen ? "border-[#FD7740]" : "border-[#E8E8E8]"}`}
              >
                <span>
                  {selectedConsultation
                    ? selectedConsultationLabel
                    : labels.content}
                </span>

                <span
                  className={`pointer-events-none absolute right-6 top-1/2 h-2.5 w-2.5 -translate-y-[65%] rotate-45 border-b-2 border-r-2 border-[#999999] transition-transform
        ${isConsultationOpen ? "rotate-[225deg] -translate-y-[20%]" : ""}`}
                />
              </button>

              {isConsultationOpen && (
                <div className="absolute bottom-[calc(100%+8px)] left-0 z-[60] w-full rounded-[14px] border border-[#E8E8E8] bg-white py-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                  {consultationOptions.map((option) => (
                    <button
                      key={option.value || "empty"}
                      type="button"
                      onClick={() => {
                        setSelectedConsultation(option.value);
                        setIsConsultationOpen(false);
                      }}
                      className={`block w-full px-5 py-1.5 text-left text-sm leading-[160%] transition-colors hover:text-[#FD7740]
        ${
          selectedConsultation === option.value
            ? "font-semibold text-[#FD7740]"
            : "font-medium text-[#555555]"
        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-2 grid grid-cols-2 gap-3">
              <label>
                <span className="sr-only">{labels.name}</span>
                <input
                  id="quick-reservation-mobile-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={labels.name}
                  className="h-10 w-full rounded-full border border-[#E8E8E8] bg-white px-5 text-sm text-[#333333] outline-none placeholder:text-[#999999]"
                />
              </label>

              <label>
                <span className="sr-only">{labels.birthDate}</span>
                <input
                  id="quick-reservation-mobile-birth-date"
                  name="birthDate"
                  type="text"
                  inputMode="numeric"
                  autoComplete="bday"
                  placeholder={labels.birthDate}
                  className="h-10 w-full rounded-full border border-[#E8E8E8] bg-white px-5 text-sm text-[#333333] outline-none placeholder:text-[#999999]"
                />
              </label>
            </div>

            <label className="mt-2 block">
              <span className="sr-only">{labels.phone}</span>
              <input
                id="quick-reservation-mobile-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder={labels.phone}
                className="h-10 w-full rounded-full border border-[#E8E8E8] bg-white px-5 text-sm text-[#333333] outline-none placeholder:text-[#999999]"
              />
            </label>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                className="h-12 rounded-full bg-[#171719] font-bold text-white"
              >
                {labels.phoneCall}
              </button>

              <button
                type="submit"
                className="flex h-12 items-center justify-center gap-1 rounded-full bg-[#FF7040] font-bold text-white"
              >
                <span>{labels.submit}</span>
                <ChevronRight size={18} color="white" />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Desktop */}
      <form
        className="hidden
        xl:px-8 xl:h-25 xl:grid xl:grid-cols-[max-content_minmax(0,1fr)_max-content] xl:items-center xl:gap-x-8 xl:rounded-[20px] xl:border xl:border-[#E6E6E6] xl:bg-white xl:shadow-[0_14px_40px_rgba(0,0,0,0.18)]"
        onSubmit={(event) => event.preventDefault()}
      >
        <h4 className="shrink-0 whitespace-nowrap font-bold text-2xl text-[#FD7740]">
          가장 빠른 상담
        </h4>

        <div className="grid min-w-0 grid-cols-[minmax(150px,1.1fr)_minmax(100px,0.7fr)_minmax(120px,0.9fr)_minmax(160px,1.3fr)] items-center gap-2">
          <label className="relative block">
            <span className="sr-only">{labels.content}</span>

            <select
              id="quick-reservation-desktop-consultation-type"
              name="consultationType"
              defaultValue=""
              className="h-12 w-full appearance-none rounded-full border border-[#E8E8E8] bg-white px-8 pr-12 text-center font-medium text-base text-[#999999] outline-none transition-colors focus:border-[#FD7740] focus:text-[#333333]"
            >
              <option value="" disabled>
                {labels.content}
              </option>
              <option value="reservation">예약 상담</option>
              <option value="treatment">진료 문의</option>
              <option value="result">검사 결과 문의</option>
              <option value="etc">기타 문의</option>
            </select>

            <span className="pointer-events-none absolute right-8 top-1/2 h-2.5 w-2.5 -translate-y-[65%] rotate-45 border-b-2 border-r-2 border-[#999999]" />
          </label>

          <label className="block">
            <span className="sr-only">{labels.name}</span>

            <input
              id="quick-reservation-desktop-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={labels.name}
              className="h-12 w-full rounded-full border border-[#E8E8E8] bg-white px-5 text-center font-medium text-base text-[#333333] outline-none transition-colors placeholder:text-[#999999] focus:border-[#FD7740]"
            />
          </label>

          <label className="block">
            <span className="sr-only">{labels.birthDate}</span>

            <input
              id="quick-reservation-desktop-birth-date"
              name="birthDate"
              type="text"
              inputMode="numeric"
              autoComplete="bday"
              placeholder={labels.birthDate}
              className="h-12 w-full rounded-full border border-[#E8E8E8] bg-white px-5 text-center font-medium text-base text-[#333333] outline-none transition-colors placeholder:text-[#999999] focus:border-[#FD7740]"
            />
          </label>

          <label className="block">
            <span className="sr-only">{labels.phone}</span>

            <input
              id="quick-reservation-desktop-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder={labels.phone}
              className="h-12 w-full rounded-full border border-[#E8E8E8] bg-white px-5 text-center font-medium text-base text-[#333333] outline-none transition-colors placeholder:text-[#999999] focus:border-[#FD7740]"
            />
          </label>
        </div>

        <button
          type="submit"
          className="shrink-0 whitespace-nowrap px-8 py-5 flex items-center gap-2 rounded-full bg-[#FD7740] font-semibold text-2xl text-white"
        >
          <span>신청하기</span>
          <ChevronRight color="white" />
        </button>
      </form>
    </div>
  );
}
