'use client';

import {
  FormField as Field,
  FormHint as FieldHint,
  FormAttachment,
  FormPhoneInputs,
  FormTextarea,
  FormTextInput,
  FormOptions as Options,
  FormSectionHeading as SectionHeading,
  FormSelect as SelectField,
} from '@/app/community/_components/form-fields';
import { useState, type FormEvent } from 'react';
import { consultationCategories } from '../data';
import TurnstileCaptcha from './turnstile-captcha';

/** CAPTCHA는 서버에서 실제 검증합니다. 상담 DB 저장은 추후 연결해야 합니다. */
export default function ConsultationForm() {
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
          <Field label="게시글 공개 여부" required alignStart>
            <Options
              name="isPublic"
              yesLabel="공개"
              noLabel="비공개"
              defaultValue="yes"
            />
          </Field>

          <Field
            label="상담 분야"
            required
            alignStart
            htmlFor="consultation-field"
          >
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

          <Field label="제목" htmlFor="consultation-title" required alignStart>
            <FormTextInput
              id="consultation-title"
              name="title"
              required
              maxLength={120}
              placeholder="제목을 입력하세요"
            />
          </Field>

          <Field
            label="내용"
            htmlFor="consultation-content"
            required
            alignStart
          >
            <FormTextarea
              id="consultation-content"
              name="content"
              required
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="문의 내용을 입력하세요"
            />
          </Field>

          <Field label="파일 첨부" htmlFor="consultation-attachment" alignStart>
            <FormAttachment
              id="consultation-attachment"
              onErrorChange={setAttachmentError}
            />
          </Field>

          <Field label="유선 상담 희망 여부" required alignStart>
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
          <Field label="이름" htmlFor="consultation-name" required alignStart>
            <FormTextInput
              id="consultation-name"
              name="name"
              required
              autoComplete="name"
              placeholder="이름을 입력하세요"
              className="xl:max-w-[320px]"
            />
          </Field>

          <Field
            label="연락처"
            required
            htmlFor="consultation-phone-middle"
            alignStart
          >
            <FormPhoneInputs idPrefix="consultation" className="xl:w-2/3" />
          </Field>

          <Field
            label="생년월일 6자리"
            required
            htmlFor="consultation-birth"
            alignStart
          >
            <FormTextInput
              id="consultation-birth"
              name="birth"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              placeholder="예) 1985년 3월 12일 → 850312"
              className="xl:max-w-[320px]"
            />
          </Field>

          <Field label="자동입력방지" required alignStart>
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

          <Field
            label="비밀번호 설정"
            required
            alignStart
            htmlFor="consultation-password"
          >
            <FormTextInput
              id="consultation-password"
              type="password"
              autoComplete="new-password"
              name="password"
              minLength={4}
              maxLength={20}
              required
              placeholder="4자리 이상 입력하세요"
              className="xl:max-w-[320px]"
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
