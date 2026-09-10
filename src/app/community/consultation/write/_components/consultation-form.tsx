'use client';

import {
  H2 as TypographyH2,
  P as TypographyP,
} from '@/app/_components/ui/typography';
import { submitMedicalConsultation } from '@/app/community/consultation/_actions';
import { Link2, RefreshCw, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState, useTransition, type ReactNode } from 'react';

const fieldClass =
  'h-11 rounded-[6px] border border-[#DFE3E7] bg-white px-3 text-[12px] tracking-[-0.03em] text-[#424951] placeholder:text-[#ADB3BA] xl:h-12 xl:text-[13px]';

function RadioOption({
  name,
  value,
  label,
  defaultChecked = false,
}: {
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-[12px] text-[#555C64] xl:text-[13px]">
      <input
        id={`consultation-${name}-${value}`}
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className="flex size-4 items-center justify-center rounded-full border border-[#D6DCE1] bg-white peer-checked:border-[#FF7344] after:content-[''] peer-checked:after:size-2 peer-checked:after:rounded-full peer-checked:after:bg-[#FF7344]" />
      {label}
    </label>
  );
}

function RequiredLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-[12px] font-semibold tracking-[-0.035em] text-[#4A5159] xl:text-[13px]">
      {children}
      <span className="ml-0.5 text-[#FF7040]">*</span>
    </span>
  );
}

export default function ConsultationForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [content, setContent] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isPending, startTransition] = useTransition();

  return (
    <form
      id="consultation-write-form"
      className="mx-auto w-full max-w-7xl px-4 pb-14 xl:px-0 xl:pb-24"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitError('');
        const formData = new FormData(event.currentTarget);

        startTransition(async () => {
          const result = await submitMedicalConsultation(formData);

          if (!result.ok || !result.id) {
            setSubmitError(result.error ?? '상담 등록에 실패했습니다.');
            return;
          }

          router.push(
            result.isPrivate
              ? '/community/consultation?submitted=private'
              : `/community/consultation/${result.id}`,
          );
        });
      }}
    >
      <div className="rounded-[10px] bg-[#F5F6F7] px-5 py-5 text-[10px] leading-[1.75] tracking-[-0.03em] text-[#6A7179] xl:px-12 xl:py-7 xl:text-[12px]">
        <TypographyP managed={false}>· 공개글 등록 시 이름은 일부 가림 처리되어 노출됩니다.</TypographyP>
        <TypographyP managed={false}>
          · 검사 결과·판독 등 병원 분석이 필요한 문의는 답변이 제한될 수
          있습니다.
        </TypographyP>
        <TypographyP managed={false}>· 광고성 글·비방·중복 게시물은 사전 고지 없이 삭제될 수 있습니다.</TypographyP>
        <TypographyP managed={false}>· 게시글 수정·삭제 시 비밀번호 입력이 필요합니다.</TypographyP>
        <TypographyP managed={false}>
          · 상담 내용의 저작권은 본원에 귀속되며, 네이버 지식iN 등 외부 채널에
          공유될 수 있습니다.
        </TypographyP>
      </div>

      <section className="mt-7 xl:mt-10">
        <div className="flex items-end justify-between border-b border-[#363C43] pb-2">
          <TypographyH2 managed={false} className="text-[18px] font-bold tracking-[-0.04em] text-[#2E343B] xl:text-[22px]">
            상담 내용
          </TypographyH2>
          <TypographyP managed={false} className="text-[9px] text-[#8D949C] xl:text-[11px]">
            <span className="text-[#FF7040]">*</span> 은 필수 입력 항목입니다.
          </TypographyP>
        </div>

        <div className="mt-5 space-y-5 xl:mt-6 xl:space-y-6">
          <div className="grid gap-2 xl:grid-cols-[150px_1fr] xl:items-center">
            <RequiredLabel>게시글 공개 여부</RequiredLabel>
            <div className="flex gap-10">
              <RadioOption
                name="visibility"
                value="public"
                label="공개"
                defaultChecked
              />
              <RadioOption name="visibility" value="private" label="비공개" />
            </div>
          </div>

          <div className="grid gap-2 xl:grid-cols-[150px_1fr] xl:items-center">
            <RequiredLabel>상담 분야</RequiredLabel>
            <div className="grid grid-cols-2 gap-2 xl:max-w-[360px]">
              <select
                id="consultation-area"
                name="consultationArea"
                required
                className={fieldClass}
                defaultValue=""
              >
                <option value="" disabled>
                  진료 영역
                </option>
                <option>정맥</option>
                <option>동맥</option>
                <option>부인과</option>
                <option>기타</option>
              </select>
              <select
                id="consultation-disease"
                name="consultationDisease"
                className={fieldClass}
                defaultValue=""
              >
                <option value="">세부 질환 (선택)</option>
                <option>하지정맥류</option>
                <option>정계정맥류</option>
                <option>골반정맥류</option>
                <option>심부정맥혈전증</option>
                <option>자궁근종</option>
              </select>
            </div>
          </div>

          <div className="grid gap-2 xl:grid-cols-[150px_1fr] xl:items-center">
            <RequiredLabel>제목</RequiredLabel>
            <input
              id="consultation-title"
              name="title"
              required
              type="text"
              placeholder="제목을 입력하세요"
              className={fieldClass}
            />
          </div>

          <div className="grid gap-2 xl:grid-cols-[150px_1fr] xl:items-start">
            <RequiredLabel>내용</RequiredLabel>
            <div className="relative">
              <textarea
                id="consultation-content"
                name="content"
                required
                maxLength={2000}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="문의 내용을 입력하세요"
                className="h-[160px] w-full resize-none rounded-[6px] border border-[#DFE3E7] bg-white p-3 pb-8 text-[12px] leading-[1.7] tracking-[-0.03em] text-[#424951] placeholder:text-[#ADB3BA] xl:h-[150px] xl:text-[13px]"
              />
              <span className="absolute bottom-3 right-3 text-[9px] text-[#A7ADB5] xl:text-[10px]">
                {content.length}/2,000
              </span>
            </div>
          </div>

          <div className="grid gap-2 xl:grid-cols-[150px_1fr] xl:items-start">
            <span className="text-[12px] font-semibold text-[#4A5159] xl:text-[13px]">
              파일 첨부
            </span>
            <div>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <div className="flex h-11 min-w-0 items-center rounded-[6px] border border-[#DFE3E7] bg-white px-3 xl:h-12">
                  <span className="min-w-0 flex-1 truncate text-[11px] text-[#999FA6] xl:text-[12px]">
                    {fileName}
                  </span>
                  <button
                    type="button"
                    aria-label="첨부파일 제거"
                    onClick={() => {
                      setFileName('');
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                  >
                    <XCircle className="size-4 text-[#4C535B]" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-11 items-center gap-2 rounded-[6px] border border-[#DFE3E7] px-4 text-[11px] font-semibold text-[#434A52] xl:h-12 xl:text-[12px]"
                >
                  <Link2 className="size-4" /> 파일 선택
                </button>
                <input
                  id="consultation-attachment"
                  name="attachment"
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp,.gif,.pdf"
                  className="hidden"
                  onChange={(event) =>
                    setFileName(event.target.files?.[0]?.name ?? '')
                  }
                />
              </div>
              <TypographyP managed={false} className="mt-1.5 text-[9px] text-[#9EA4AB] xl:text-[10px]">
                · 첨부파일은 최대 5MB로 제한됩니다.
              </TypographyP>
            </div>
          </div>

          <div className="grid gap-2 xl:grid-cols-[150px_1fr] xl:items-center">
            <RequiredLabel>유선 상담 희망 여부</RequiredLabel>
            <div className="flex gap-10">
              <RadioOption
                name="phoneConsult"
                value="yes"
                label="희망"
                defaultChecked
              />
              <RadioOption name="phoneConsult" value="no" label="비희망" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-9 xl:mt-12">
        <div className="border-b border-[#363C43] pb-2">
          <TypographyH2 managed={false} className="text-[18px] font-bold tracking-[-0.04em] text-[#2E343B] xl:text-[22px]">
            환자 정보
          </TypographyH2>
        </div>
        <div className="mt-5 space-y-5 xl:mt-6 xl:space-y-6">
          <div className="grid gap-2 xl:grid-cols-[150px_1fr] xl:items-center">
            <RequiredLabel>이름</RequiredLabel>
            <input
              id="consultation-patient-name"
              name="patientName"
              required
              type="text"
              autoComplete="name"
              placeholder="이름을 입력하세요"
              className={`${fieldClass} xl:max-w-[168px]`}
            />
          </div>
          <div className="grid gap-2 xl:grid-cols-[150px_1fr] xl:items-center">
            <RequiredLabel>연락처</RequiredLabel>
            <div className="grid grid-cols-[82px_1fr_1fr] items-center gap-2 xl:max-w-[360px]">
              <select
                id="consultation-phone-prefix"
                name="phonePrefix"
                className={fieldClass}
                defaultValue="010"
              >
                <option>010</option>
                <option>011</option>
                <option>016</option>
              </select>
              <input
                id="consultation-phone-middle"
                name="phoneMiddle"
                required
                inputMode="numeric"
                autoComplete="tel-local-prefix"
                maxLength={4}
                className={fieldClass}
              />
              <input
                id="consultation-phone-last"
                name="phoneLast"
                required
                inputMode="numeric"
                autoComplete="tel-local-suffix"
                maxLength={4}
                className={fieldClass}
              />
            </div>
          </div>
          <div className="grid gap-2 xl:grid-cols-[150px_1fr] xl:items-center">
            <RequiredLabel>생년월일 6자리</RequiredLabel>
            <input
              id="consultation-birth-date"
              name="birthDate"
              required
              inputMode="numeric"
              autoComplete="bday"
              maxLength={6}
              placeholder="예) 950312"
              className={`${fieldClass} xl:max-w-[168px]`}
            />
          </div>
          <div className="grid gap-2 xl:grid-cols-[150px_1fr] xl:items-center">
            <RequiredLabel>자동입력방지</RequiredLabel>
            <div className="grid grid-cols-[145px_1fr] gap-2 xl:max-w-[360px]">
              <div className="flex h-11 items-center justify-between rounded-[5px] bg-[#EEF0F3] px-3 xl:h-12">
                <span className="select-none font-mono text-[18px] font-bold tracking-[0.35em]">
                  <i className="not-italic text-[#A279FF]">4</i>
                  <i className="not-italic text-[#4B8DD7]">9</i>
                  <i className="not-italic text-[#FF7758]">1</i>
                  <i className="not-italic text-[#44A9E9]">8</i>
                  <i className="not-italic text-[#4B8DD7]">0</i>
                </span>
                <RefreshCw className="size-4 text-[#555C64]" />
              </div>
              <input
                id="consultation-captcha"
                name="captcha"
                required
                inputMode="numeric"
                autoComplete="off"
                placeholder="숫자를 순서대로 입력하세요"
                className={fieldClass}
              />
            </div>
          </div>
          <div className="grid gap-2 xl:grid-cols-[150px_1fr] xl:items-start">
            <RequiredLabel>비밀번호 설정</RequiredLabel>
            <div>
              <input
                id="consultation-post-password"
                name="postPassword"
                required
                type="password"
                inputMode="numeric"
                autoComplete="new-password"
                minLength={4}
                maxLength={4}
                placeholder="4자리 숫자"
                className={`${fieldClass} w-full xl:max-w-[215px]`}
              />
              <TypographyP managed={false} className="mt-1.5 text-[9px] text-[#9EA4AB] xl:text-[10px]">
                · 작성하신 글 확인/수정 시 필요한 비밀번호입니다.
              </TypographyP>
            </div>
          </div>
        </div>
      </section>

      {submitError ? (
        <TypographyP managed={false}
          role="alert"
          className="mt-6 text-center text-[11px] font-medium text-red-600 xl:text-[12px]"
        >
          {submitError}
        </TypographyP>
      ) : null}

      <div className="mt-8 flex justify-center xl:mt-10">
        <button
          type="submit"
          disabled={isPending}
          className="h-11 min-w-[105px] rounded-full bg-[#064E40] px-6 text-[12px] font-semibold text-white disabled:opacity-50 xl:h-12 xl:min-w-[120px] xl:text-[13px]"
        >
          {isPending ? '등록 중...' : '작성완료'}
        </button>
      </div>
    </form>
  );
}
