'use client';

import { submitCustomerVoice } from '@/app/community/customer-voice/_actions';
import { Link2, RefreshCw, XCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState, useTransition, type ReactNode } from 'react';

const categories = [
  { value: 'praise', label: '칭찬/감사' },
  { value: 'suggestion', label: '건의사항' },
  { value: 'complaint', label: '불만/고충' },
] as const;

type CategoryValue = (typeof categories)[number]['value'];

const fieldClass =
  'h-11 w-full rounded-[6px] border border-[#DFE3E7] bg-white px-3 text-[12px] tracking-[-0.03em] text-[#424951] outline-none placeholder:text-[#ADB3BA] focus:border-[#AEB6BE] xl:h-12 xl:text-[13px]';

function RequiredLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-[12px] font-semibold tracking-[-0.035em] text-[#4A5159] xl:text-[13px]">
      {children}
      <span className="ml-0.5 text-[#FF7040]">*</span>
    </span>
  );
}

function CategoryButton({
  value,
  label,
  selected,
  onSelect,
}: {
  value: CategoryValue;
  label: string;
  selected: boolean;
  onSelect: (value: CategoryValue) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={selected}
      className={`h-9 rounded-full border px-5 text-[11px] font-semibold tracking-[-0.035em] transition xl:h-10 xl:px-6 xl:text-[12px] ${
        selected
          ? 'border-[#FF7040] bg-[#FF7040] text-white'
          : 'border-[#DDE1E5] bg-white text-[#8C939A]'
      }`}
    >
      {label}
    </button>
  );
}

export default function CustomerVoiceForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initialCategory = searchParams.get('category');
  const [category, setCategory] = useState<CategoryValue>(
    initialCategory === 'suggestion' || initialCategory === 'complaint'
      ? initialCategory
      : 'praise',
  );
  const [fileName, setFileName] = useState('');
  const [content, setContent] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isPending, startTransition] = useTransition();

  return (
    <form
      id="customer-voice-write-form"
      className="mx-auto w-full max-w-7xl px-4 pb-14 xl:px-0 xl:pb-24"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitError('');
        const formData = new FormData(event.currentTarget);

        startTransition(async () => {
          const result = await submitCustomerVoice(formData);

          if (!result.ok) {
            setSubmitError(result.error ?? '접수에 실패했습니다.');
            return;
          }

          router.push('/community/customer-voice');
        });
      }}
    >
      <div className="rounded-[10px] bg-[#F5F6F7] px-5 py-5 text-[10px] leading-[1.75] tracking-[-0.03em] text-[#6A7179] xl:px-12 xl:py-7 xl:text-[12px]">
        <p>· 병원 이용 중 느끼신 불편 사항이나 좋았던 경험을 공유해 주세요.</p>
        <p>
          · 인적사항이 불분명하거나 비방·욕설·광고글은 접수가 제한되며, 임의
          삭제될 수 있습니다.
        </p>
        <p>· 최대 2주 이내 회신드리기 위해 노력하고 있습니다.</p>
      </div>

      <section className="mt-7 xl:mt-10">
        <div className="flex items-end justify-between border-b border-[#363C43] pb-2">
          <h2 className="text-[18px] font-bold tracking-[-0.04em] text-[#2E343B] xl:text-[22px]">
            작성하기
          </h2>
          <p className="text-[9px] text-[#8D949C] xl:text-[11px]">
            <span className="text-[#FF7040]">*</span> 은 필수 입력 항목입니다.
          </p>
        </div>

        <div className="mt-5 space-y-5 xl:mt-6 xl:space-y-6">
          <div className="grid gap-2 xl:grid-cols-[150px_1fr] xl:items-center">
            <RequiredLabel>분류</RequiredLabel>
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <CategoryButton
                  key={item.value}
                  value={item.value}
                  label={item.label}
                  selected={category === item.value}
                  onSelect={setCategory}
                />
              ))}
              <input
                id="customer-voice-category"
                type="hidden"
                name="category"
                value={category}
              />
            </div>
          </div>

          <div className="grid gap-2 xl:grid-cols-[150px_1fr] xl:items-center">
            <RequiredLabel>제목</RequiredLabel>
            <input
              id="customer-voice-title"
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
                id="customer-voice-content"
                name="content"
                required
                maxLength={2000}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="내용을 입력하세요"
                className="h-[160px] w-full resize-none rounded-[6px] border border-[#DFE3E7] bg-white p-3 pb-8 text-[12px] leading-[1.7] tracking-[-0.03em] text-[#424951] outline-none placeholder:text-[#ADB3BA] focus:border-[#AEB6BE] xl:h-[150px] xl:text-[13px]"
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
                  {fileName ? (
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
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-11 items-center gap-2 rounded-[6px] border border-[#DFE3E7] px-4 text-[11px] font-semibold text-[#434A52] xl:h-12 xl:text-[12px]"
                >
                  <Link2 className="size-4" /> 파일 선택
                </button>
                <input
                  id="customer-voice-attachment"
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
              <p className="mt-1.5 text-[9px] text-[#9EA4AB] xl:text-[10px]">
                · 첨부파일은 최대 5MB로 제한됩니다.
              </p>
            </div>
          </div>

          <div className="grid gap-2 xl:grid-cols-[150px_1fr] xl:items-center">
            <RequiredLabel>이름</RequiredLabel>
            <input
              id="customer-voice-name"
              name="name"
              required
              type="text"
              autoComplete="name"
              placeholder="이름을 입력하세요"
              className={`${fieldClass} xl:max-w-[280px]`}
            />
          </div>

          <div className="grid gap-2 xl:grid-cols-[150px_1fr] xl:items-center">
            <RequiredLabel>연락처</RequiredLabel>
            <div className="grid grid-cols-[82px_1fr_1fr] items-center gap-2 xl:max-w-[460px]">
              <select
                id="customer-voice-phone-prefix"
                name="phonePrefix"
                className={fieldClass}
                defaultValue="010"
              >
                <option>010</option>
                <option>011</option>
                <option>016</option>
              </select>
              <input
                id="customer-voice-phone-middle"
                name="phoneMiddle"
                required
                inputMode="numeric"
                autoComplete="tel-local-prefix"
                maxLength={4}
                className={fieldClass}
              />
              <input
                id="customer-voice-phone-last"
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
            <RequiredLabel>자동입력방지</RequiredLabel>
            <div className="grid grid-cols-[145px_1fr] gap-2 xl:max-w-[430px]">
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
                id="customer-voice-captcha"
                name="captcha"
                required
                inputMode="numeric"
                autoComplete="off"
                placeholder="숫자를 순서대로 입력하세요"
                className={fieldClass}
              />
            </div>
          </div>
        </div>
      </section>

      {submitError ? (
        <p
          role="alert"
          className="mt-6 text-center text-[11px] font-medium text-red-600 xl:text-[12px]"
        >
          {submitError}
        </p>
      ) : null}

      <div className="mt-8 flex justify-center gap-3 xl:mt-10">
        <button
          type="submit"
          disabled={isPending}
          className="h-11 min-w-[105px] rounded-full bg-[#003D33] px-6 text-[12px] font-semibold text-white disabled:opacity-50 xl:h-12 xl:min-w-[120px] xl:text-[13px]"
        >
          {isPending ? '접수 중...' : '작성완료'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/community/customer-voice')}
          className="h-11 min-w-[78px] rounded-full bg-[#AEB6C0] px-6 text-[12px] font-semibold text-white xl:h-12 xl:min-w-[95px] xl:text-[13px]"
        >
          취소
        </button>
      </div>
    </form>
  );
}
