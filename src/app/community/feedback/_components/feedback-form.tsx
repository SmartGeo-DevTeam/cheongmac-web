'use client';

import {
  FormAttachment,
  FormField,
  FormPhoneInputs,
  FormSectionHeading,
  FormTextarea,
  FormTextInput,
} from '@/app/community/_components/form-fields';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState, type FormEvent } from 'react';
import NumericCaptcha from './numeric-captcha';

export const feedbackCategories = [
  { value: 'praise', label: '칭찬/감사' },
  { value: 'suggestion', label: '건의사항' },
  { value: 'complaint', label: '불만/고충' },
] as const;

export type FeedbackCategory = (typeof feedbackCategories)[number]['value'];

export default function FeedbackForm({
  initialCategory,
}: {
  initialCategory: FeedbackCategory;
}) {
  const router = useRouter();
  const [category, setCategory] = useState<FeedbackCategory>(initialCategory);
  const [content, setContent] = useState('');
  const [attachmentError, setAttachmentError] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaVersion, setCaptchaVersion] = useState(0);
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const changeCaptchaToken = useCallback(
    (token: string) => setCaptchaToken(token),
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('');
    if (attachmentError) {
      setNotice(attachmentError);
      return;
    }
    if (!captchaToken) {
      setNotice('자동입력방지 숫자를 먼저 확인해 주세요.');
      return;
    }

    const body = new FormData(event.currentTarget);
    body.set('category', category);
    body.set('captchaToken', captchaToken);
    setSubmitting(true);

    try {
      const response = await fetch('/api/community/feedback', {
        method: 'POST',
        body,
      });
      const result = (await response.json()) as {
        success?: boolean;
        saved?: boolean;
        message?: string;
      };
      if (response.ok && result.saved === true) {
        router.push('/community/feedback');
        return;
      }
      setNotice(result.message ?? '요청을 처리하지 못했습니다.');
    } catch {
      setNotice('서버 연결을 확인해 주세요. 작성 내용은 저장되지 않았습니다.');
    } finally {
      setSubmitting(false);
      // 응답과 무관하게 재사용하지 않고 새 CAPTCHA를 발급받습니다.
      setCaptchaVersion((version) => version + 1);
    }
  }

  return (
    <form
      id="community-feedback-write-form"
      onSubmit={handleSubmit}
      className="mx-auto mt-5 mb-20 w-full
      xl:mt-10 xl:mb-25 xl:px-50"
    >
      <div className="rounded-xl bg-subtle px-5 py-5 text-[12px] leading-[170%] text-gray-700 xl:rounded-[20px] xl:px-15 xl:py-9 xl:text-[15px]">
        <ul className="list-disc space-y-1 pl-4">
          <li>
            병원 이용 중 느끼신 불편 사항이나 좋았던 경험을 공유해 주세요.
          </li>
          <li>
            인적사항이 불분명하거나 비방·욕설·광고글은 접수가 제한되며, 임의
            삭제될 수 있습니다.
          </li>
          <li>최대 2주 이내 회신드리기 위해 노력하고 있습니다.</li>
        </ul>
      </div>

      <section className="mt-7 xl:mt-10">
        <FormSectionHeading title="작성하기" showRequiredNotice />

        <div className="mt-5 space-y-5 xl:mt-6 xl:space-y-8">
          <FormField label="분류" required>
            <div
              role="group"
              aria-label="글 분류"
              className="flex flex-wrap gap-2"
            >
              {feedbackCategories.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={category === item.value}
                  onClick={() => setCategory(item.value)}
                  className={`shrink-0 rounded-full border px-5 py-2 font-semibold text-[14px] transition-colors xl:px-7 xl:text-[15px] ${
                    category === item.value
                      ? 'border-accent bg-accent text-white'
                      : 'border-default bg-base text-gray-400 hover:border-accent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <input type="hidden" name="category" value={category} />
            </div>
          </FormField>

          <FormField label="제목" htmlFor="feedback-title" required>
            <FormTextInput
              id="feedback-title"
              name="title"
              type="text"
              required
              maxLength={120}
              placeholder="제목을 입력하세요"
            />
          </FormField>

          <FormField
            label="내용"
            htmlFor="feedback-content"
            required
            alignStart
          >
            <FormTextarea
              id="feedback-content"
              name="content"
              required
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="내용을 입력하세요"
            />
          </FormField>

          <FormField label="파일 첨부" htmlFor="feedback-attachment" alignStart>
            <FormAttachment
              id="feedback-attachment"
              onErrorChange={setAttachmentError}
            />
          </FormField>

          <FormField label="이름" htmlFor="feedback-name" required>
            <FormTextInput
              id="feedback-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={80}
              placeholder="이름을 입력하세요"
              className="xl:max-w-[320px]"
            />
          </FormField>

          <FormField label="연락처" htmlFor="feedback-phone-middle" required>
            <FormPhoneInputs idPrefix="feedback" className="xl:max-w-[520px]" />
          </FormField>

          <FormField label="자동입력방지" required alignStart>
            <NumericCaptcha
              key={captchaVersion}
              version={captchaVersion}
              onTokenChange={changeCaptchaToken}
            />
          </FormField>
        </div>
      </section>

      {notice ? (
        <p
          role="alert"
          aria-live="polite"
          className="mt-6 text-center text-[13px] text-danger"
        >
          {notice}
        </p>
      ) : null}

      <div
        className="mt-10 flex justify-center items-center gap-3
        xl:mt-20 xl:gap-6"
      >
        <button
          type="submit"
          disabled={submitting}
          className="px-7 py-3 rounded-full bg-green-900 font-bold text-inverse text-[14px]
          xl:px-10 xl:text-[16px]"
        >
          {submitting ? '확인 중...' : '작성완료'}
        </button>
        <Link
          href="/community/feedback"
          className="px-7 py-3 rounded-full bg-gray-400  font-bold text-inverse text-[14px]
          xl:px-10 xl:text-[16px]"
        >
          취소
        </Link>
      </div>
    </form>
  );
}
