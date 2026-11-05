'use client';

import { ChevronDown, Link2, X } from 'lucide-react';
import { useRef, useState, type ComponentProps, type ReactNode } from 'react';

// 의학상담과 고객의 소리에서 함께 사용하는 입력 필드 스타일입니다.
export const inputClass = `p-4 w-full rounded-md border border-default bg-base font-medium text-[14px] text-gray-900
  placeholder:text-gray-500 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent-ai-strong
  xl:p-5 xl:text-[15px]`;

export function FormTextInput({
  className = '',
  ...props
}: ComponentProps<'input'>) {
  return <input {...props} className={`${inputClass} ${className}`} />;
}

export function FormSelect({
  children,
  className = '',
  ...props
}: ComponentProps<'select'>) {
  return (
    <div className="relative min-w-0">
      <select
        {...props}
        className={`${inputClass} appearance-none bg-white pr-11 text-gray-900 has-[option[value='']:checked]:text-gray-500 [&>option]:text-gray-900 ${className}`}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-gray-800 xl:right-5 xl:size-5"
      />
    </div>
  );
}

export function FormSectionHeading({
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
      className={`flex items-end justify-between border-b pb-3
        ${showRequiredNotice ? 'border-gray-900' : 'border-gray-800'}`}
    >
      <h2 id={id} className="text-mo-heading-1 xl:text-pc-heading-1">
        {title}
      </h2>
      {showRequiredNotice ? (
        <p className="shrink-0 font-medium text-gray-600 text-[11px] xl:text-[14px]">
          <span className="text-accent">*</span> 은 필수 입력 항목입니다.
        </p>
      ) : null}
    </div>
  );
}

export function FormField({
  label,
  htmlFor,
  required = false,
  children,
  alignStart = false,
  className = '',
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  alignStart?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`grid gap-2
        xl:grid-cols-[160px_minmax(0,1fr)] xl:gap-16
        ${alignStart ? 'xl:items-start' : 'xl:items-center'} ${className}`}
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
      <div className="min-w-0 text-[15px]">{children}</div>
    </div>
  );
}

export function FormHint({ children }: { children: ReactNode }) {
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

export function FormTextarea({
  value,
  maxLength = 2000,
  className = '',
  ...props
}: Omit<ComponentProps<'textarea'>, 'maxLength'> & {
  value: string;
  maxLength?: number;
}) {
  return (
    <div className="relative">
      <textarea
        {...props}
        value={value}
        maxLength={maxLength}
        className={`${inputClass} h-45 resize-y py-3 pb-10
        xl:h-52 ${className}`}
      />
      <span className="pointer-events-none absolute right-3 bottom-3 text-[11px] text-tertiary">
        {value.length.toLocaleString('ko-KR')}/
        {maxLength.toLocaleString('ko-KR')}
      </span>
    </div>
  );
}

export function FormAttachment({
  id,
  onErrorChange,
}: {
  id: string;
  onErrorChange?: (message: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const clear = () => {
    setFileName('');
    setError('');
    onErrorChange?.('');
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
        <div className={`${inputClass} flex min-w-0 items-center gap-2`}>
          <label
            htmlFor={id}
            className="flex min-w-0 flex-1 cursor-pointer items-center"
          >
            <span
              className={`block min-w-0 truncate ${fileName ? 'text-gray-900' : 'text-gray-500'}`}
            >
              {fileName || '첨부된 파일이 없습니다.'}
            </span>
          </label>
          {fileName ? (
            <button
              type="button"
              aria-label="선택한 첨부파일 제거"
              onClick={clear}
              className="flex size-5 shrink-0 items-center justify-center rounded-full bg-gray-800 text-white"
            >
              <X aria-hidden="true" className="size-3.5" />
            </button>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex shrink-0 items-center gap-2 rounded-md border border-default px-3 py-4 font-semibold text-[14px]
          xl:px-5 xl:py-5 xl:text-[15px]"
        >
          <Link2 aria-hidden="true" className="size-4" /> 파일 선택
        </button>
        <input
          ref={fileRef}
          id={id}
          name="attachment"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="sr-only"
          tabIndex={-1}
          onChange={(event) => {
            const file = event.currentTarget.files?.[0];
            const nextError =
              file && file.size > 5 * 1024 * 1024
                ? '5MB 이하의 파일을 선택해 주세요.'
                : file &&
                    ![
                      'image/png',
                      'image/jpeg',
                      'image/webp',
                      'image/gif',
                    ].includes(file.type)
                  ? 'PNG, JPG, WEBP, GIF 이미지 파일만 첨부할 수 있습니다.'
                  : '';
            setError(nextError);
            onErrorChange?.(nextError);
            if (nextError) {
              setFileName('');
              event.currentTarget.value = '';
            } else {
              setFileName(file?.name ?? '');
            }
          }}
        />
      </div>
      <FormHint>첨부파일은 최대 5MB로 제한됩니다.</FormHint>
      {error ? (
        <p role="alert" className="mt-1 text-[12px] text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FormPhoneInputs({
  idPrefix,
  className = '',
}: {
  idPrefix: string;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 ${className}`}
    >
      <FormSelect
        name="phonePrefix"
        aria-label="휴대전화 앞자리"
        defaultValue="010"
      >
        <option value="010">010</option>
        <option value="011">011</option>
        <option value="016">016</option>
      </FormSelect>
      <span aria-hidden="true">-</span>
      <FormTextInput
        id={`${idPrefix}-phone-middle`}
        name="phoneMiddle"
        aria-label="휴대전화 가운데 자리"
        autoComplete="tel-local-prefix"
        inputMode="numeric"
        pattern="[0-9]{3,4}"
        maxLength={4}
        required
      />
      <span aria-hidden="true">-</span>
      <FormTextInput
        name="phoneLast"
        aria-label="휴대전화 끝자리"
        autoComplete="tel-local-suffix"
        inputMode="numeric"
        pattern="[0-9]{4}"
        maxLength={4}
        required
      />
    </div>
  );
}

export function FormOptions({
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
            className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 bg-white
            after:size-3 after:rounded-full after:bg-accent after:opacity-0 after:content-[''] peer-checked:after:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-orange-500"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
