'use client';

import { ChevronDown, Link2, X } from 'lucide-react';
import {
  useRef,
  useState,
  type ComponentProps,
  type FormEvent,
  type ReactNode,
} from 'react';
import { consultationCategories } from '../data';
import TurnstileCaptcha from './turnstile-captcha';

const inputClass = `p-4 w-full rounded-md border border-default font-medium text-[14px]
  placeholder:text-gray-500
  xl:p-5 xl:text-[15px]
  `;

const selectClass = `${inputClass} appearance-none bg-white pr-11 text-gray-900
  has-[option[value='']:checked]:text-gray-500
  [&>option]:text-gray-900`;

function SelectField({
  children,
  className = '',
  ...props
}: ComponentProps<'select'>) {
  return (
    <div className="relative min-w-0">
      <select {...props} className={`${selectClass} ${className}`}>
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-gray-800 xl:right-5 xl:size-5"
      />
    </div>
  );
}

function SectionHeading({
  title,
  id,
  showRequiredNotice = false,
}: {
  title: string;
  id?: string;
  showRequiredNotice?: boolean;
}) {
  return (
    <div
      className={`flex items-end justify-between border-b
        ${showRequiredNotice ? 'pb-2 border-gray-900' : 'pb-3 border-gray-800'}`}
    >
      <h2
        id={id}
        className="text-mo-heading-1
        xl:text-pc-heading-1"
      >
        {title}
      </h2>
      {showRequiredNotice ? (
        <p
          className="shrink-0 font-medium text-gray-600 text-[12px]
          xl:text-[14px]"
        >
          <span className="text-accent">*</span> 은 필수 입력 항목입니다.
        </p>
      ) : null}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required = false,
  children,
  alignStart = false,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  alignStart?: boolean;
}) {
  return (
    <div
      className={`grid gap-1
        xl:grid-cols-[160px_minmax(0,1fr)] xl:gap-16
        ${alignStart ? 'xl:items-start' : 'xl:items-center'}`}
    >
      <label
        htmlFor={htmlFor}
        className="font-semibold text-gray-900 text-[15px]
        xl:text-[18px]"
      >
        {label}
        {required ? (
          <span className="ml-0.5 text-accent" aria-label="필수">
            *
          </span>
        ) : null}
      </label>
      <div className="text-[15px]">{children}</div>
    </div>
  );
}

function FieldHint({ children }: { children: ReactNode }) {
  return (
    <p
      className="mt-1 text-gray-500 text-[12px]
      xl:mt-2 xl:font-medium"
    >
      <span aria-hidden="true">· </span>
      {children}
    </p>
  );
}

function Options({
  name,
  yesLabel,
  noLabel,
  defaultValue,
}: {
  name: string;
  yesLabel: string;
  noLabel: string;
  defaultValue: string;
}) {
  return (
    <div
      className="grid grid-cols-2
      xl:flex xl:w-fit xl:gap-11"
    >
      {[
        { label: yesLabel, value: 'yes' },
        { label: noLabel, value: 'no' },
      ].map((option) => (
        <label
          key={option.value}
          className="flex cursor-pointer items-center gap-3"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            defaultChecked={option.value === defaultValue}
            className="peer sr-only"
          />

          <span
            aria-hidden="true"
            className="
              flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-[#E2E5E9] bg-white
              after:size-3 after:rounded-full after:bg-[#FF783E] after:opacity-0 after:content-['']
              peer-checked:after:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-orange-400 peer-focus-visible:ring-offset-2
            "
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}

/** CAPTCHA는 서버에서 실제 검증합니다. 상담 DB 저장은 추후 연결해야 합니다. */
export default function ConsultationForm() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [content, setContent] = useState('');
  const [attachmentError, setAttachmentError] = useState('');
  const [notice, setNotice] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaVersion, setCaptchaVersion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('');

    if (attachmentError) {
      setNotice(attachmentError);
      return;
    }
    if (!siteKey) {
      setNotice(
        '자동입력방지 서비스 키가 설정되지 않았습니다. 관리자에게 문의해 주세요.',
      );
      return;
    }
    if (!captchaToken) {
      setNotice('자동입력방지 확인을 완료해 주세요.');
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.set('cf-turnstile-response', captchaToken);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/community/consultation', {
        method: 'POST',
        body: formData,
      });
      const result: { success?: boolean; saved?: boolean; message?: string } =
        await response.json();
      setNotice(result.message ?? '요청 처리 중 문제가 발생했습니다.');
    } catch {
      setNotice('서버 연결을 확인해 주세요. 상담 내용은 저장되지 않았습니다.');
    } finally {
      setIsSubmitting(false);
      setCaptchaToken('');
      setCaptchaVersion((value) => value + 1);
    }
  }

  return (
    <form id="community-consultation-form" onSubmit={handleSubmit}>
      <section
        className="mt-5
        xl:mt-10 xl:px-50"
      >
        <SectionHeading title="상담 내용" showRequiredNotice />

        <div
          className="mt-5 space-y-5
          xl:mt-6 xl:space-y-10"
        >
          <Field label="게시글 공개 여부" required>
            <Options
              name="isPublic"
              yesLabel="공개"
              noLabel="비공개"
              defaultValue="yes"
            />
          </Field>

          <Field label="상담 분야" required htmlFor="consultation-field">
            <div
              className="grid grid-cols-2 gap-1
              xl:gap-6"
            >
              <SelectField
                id="consultation-field"
                name="field"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  진료 영역
                </option>
                <option value="vein">정맥</option>
                <option value="artery">동맥</option>
                <option value="women">여성질환</option>
                <option value="other">기타</option>
              </SelectField>
              <SelectField
                name="category"
                defaultValue=""
                aria-label="세부 질환"
              >
                <option value="">세부 질환 (선택)</option>
                {consultationCategories
                  .filter((item) => item.id !== 'all')
                  .map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
              </SelectField>
            </div>
          </Field>

          <Field label="제목" htmlFor="consultation-title" required>
            <input
              id="consultation-title"
              name="title"
              required
              maxLength={120}
              placeholder="제목을 입력하세요"
              className={inputClass}
            />
          </Field>

          <Field
            label="내용"
            htmlFor="consultation-content"
            required
            alignStart
          >
            <div className="relative">
              <textarea
                id="consultation-content"
                name="content"
                required
                maxLength={2000}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="문의 내용을 입력하세요"
                className={`${inputClass} h-45 resize-y py-3 pb-10 xl:h-52`}
              />
              <span className="absolute right-3 bottom-3 text-[11px] text-tertiary">
                {content.length.toLocaleString('ko-KR')}/2,000
              </span>
            </div>
          </Field>

          <Field label="파일 첨부" htmlFor="consultation-attachment" alignStart>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
              <div className={`${inputClass} flex min-w-0 items-center gap-2`}>
                <label
                  htmlFor="consultation-attachment"
                  className="flex min-w-0 flex-1 cursor-pointer items-center"
                >
                  <span
                    className={`block min-w-0 truncate
                      ${fileName ? 'text-gray-900' : 'text-gray-500'}`}
                  >
                    {fileName || '첨부된 파일이 없습니다.'}
                  </span>
                </label>
                {fileName ? (
                  <button
                    type="button"
                    aria-label="선택한 첨부파일 제거"
                    onClick={() => {
                      setFileName('');
                      setAttachmentError('');
                      if (fileRef.current) fileRef.current.value = '';
                    }}
                    className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#383F4A] text-white transition-colors hover:bg-gray-900"
                  >
                    <X aria-hidden="true" className="size-3.5 stroke-2" />
                  </button>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex shrink-0 items-center gap-2 rounded-md border border-default px-4 py-4 font-semibold text-[14px]
                xl:px-5 xl:py-5 xl:text-[15px]"
              >
                <Link2 aria-hidden="true" className="size-4" /> 파일 선택
              </button>
              <input
                ref={fileRef}
                id="consultation-attachment"
                name="attachment"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="sr-only"
                tabIndex={-1}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file && file.size > 5 * 1024 * 1024) {
                    setAttachmentError('5MB 이하의 파일을 선택해 주세요.');
                    setFileName('');
                    event.target.value = '';
                  } else {
                    setAttachmentError('');
                    setFileName(file?.name ?? '');
                  }
                }}
              />
            </div>
            <FieldHint>이미지 파일은 최대 5MB로 제한됩니다.</FieldHint>
            {attachmentError ? (
              <p role="alert" className="mt-1 text-[12px] text-danger">
                {attachmentError}
              </p>
            ) : null}
          </Field>

          <Field label="유선 상담 희망 여부" required>
            <Options
              name="wantsCall"
              yesLabel="희망"
              noLabel="비희망"
              defaultValue="yes"
            />
          </Field>
        </div>
      </section>

      <section
        className="mt-12
        xl:mt-20 xl:px-50"
      >
        <SectionHeading id="consultation-patient-title" title="환자 정보" />

        <div
          className="mt-6 space-y-6
          xl:mt-8 xl:space-y-8"
        >
          <Field label="이름" htmlFor="consultation-name" required>
            <input
              id="consultation-name"
              name="name"
              required
              autoComplete="name"
              placeholder="이름을 입력하세요"
              className={`${inputClass} xl:max-w-[320px]`}
            />
          </Field>

          <Field label="연락처" required htmlFor="consultation-phone-middle">
            <div
              className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2
              xl:w-2/3"
            >
              <SelectField
                name="phonePrefix"
                aria-label="휴대전화 앞자리"
                defaultValue="010"
              >
                <option value="010">010</option>
                <option value="011">011</option>
                <option value="016">016</option>
              </SelectField>
              <span aria-hidden="true">-</span>
              <input
                id="consultation-phone-middle"
                name="phoneMiddle"
                aria-label="휴대전화 가운데 자리"
                inputMode="numeric"
                pattern="[0-9]{3,4}"
                maxLength={4}
                required
                className={inputClass}
              />
              <span aria-hidden="true">-</span>
              <input
                name="phoneLast"
                aria-label="휴대전화 끝자리"
                inputMode="numeric"
                pattern="[0-9]{4}"
                maxLength={4}
                required
                className={inputClass}
              />
            </div>
          </Field>

          <Field label="생년월일 6자리" required htmlFor="consultation-birth">
            <input
              id="consultation-birth"
              name="birth"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              placeholder="예) 1985년 3월 12일 → 850312"
              className={`${inputClass} xl:max-w-[320px]`}
            />
          </Field>

          <Field label="자동입력방지" required>
            <div
              id="consultation-captcha"
              role="group"
              aria-label="자동입력방지"
            >
              {siteKey ? (
                <TurnstileCaptcha
                  key={captchaVersion}
                  siteKey={siteKey}
                  onTokenChange={setCaptchaToken}
                />
              ) : (
                <p role="alert" className="text-[12px] text-danger">
                  Cloudflare Turnstile 키 설정이 필요합니다.
                </p>
              )}
              <FieldHint>
                자동입력방지 확인 후 작성완료를 눌러 주세요.
              </FieldHint>
            </div>
          </Field>

          <Field label="비밀번호 설정" required htmlFor="consultation-password">
            <input
              id="consultation-password"
              type="password"
              autoComplete="new-password"
              name="password"
              minLength={4}
              maxLength={20}
              required
              placeholder="4자리 이상 입력하세요"
              className={`${inputClass} xl:max-w-[320px]`}
            />
            <FieldHint>
              작성하신 글 확인/수정 시 필요한 비밀번호입니다.
            </FieldHint>
          </Field>
        </div>
      </section>

      <div className="mt-10 mb-16 flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-7 py-3 rounded-full bg-green-900 font-bold text-white text-[14px]
          xl:px-15 xl:text-[16px]"
        >
          {isSubmitting ? '확인 중...' : '작성완료'}
        </button>
      </div>
    </form>
  );
}
