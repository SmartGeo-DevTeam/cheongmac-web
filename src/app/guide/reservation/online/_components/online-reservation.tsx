'use client';

import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import {
  FormField,
  FormPhoneInputs,
  FormSelect,
  FormTextInput,
  FormTextarea,
} from '@/app/_components/form-fields';
import { Check, CheckCircle, CircleAlert } from 'lucide-react';
import Link from 'next/link';
import { useState, type SubmitEvent } from 'react';
import { reservationFields, type ReservationRequest } from '../data';

/**
 * 현재는 서버 전송/저장 없는 화면 시안입니다.
 * 실제 예약 API를 연동할 때는 handleSubmit에서 응답의 성공 여부를 확인한 후
 * setResult()를 호출하고, 서버에서 예약번호 등을 반환하도록 확장하세요.
 */
export default function OnlineReservation() {
  const [memo, setMemo] = useState('');
  const [result, setResult] = useState<ReservationRequest | null>(null);
  /* 
  const [result, setResult] = useState<ReservationRequest | null>({
    name: '홍길동',
    phone: '010-1234-5678',
    birthDate: '941204',
    field: reservationFields[0].value,
    memo: '다리가 붓고 저녁에 무거움',
    privacyAgreed: true,
  });
   */
  const [error, setError] = useState('');
  const step = result ? 2 : 1;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const birthDate = String(form.get('birthDate') ?? '').trim();
    const phonePrefix = String(form.get('phonePrefix') ?? '');
    const phoneMiddle = String(form.get('phoneMiddle') ?? '');
    const phoneLast = String(form.get('phoneLast') ?? '');
    const fieldValue = String(form.get('field') ?? '');
    const field = reservationFields.find((item) => item.value === fieldValue);
    const privacyAgreed = form.get('privacyAgreed') === 'on';

    // 기본 HTML required/pattern 검사 외에 공백·선택지 유효성도 확인합니다.
    if (
      !name ||
      !/^[0-9]{6}$/.test(birthDate) ||
      !/^0[0-9]{2}$/.test(phonePrefix) ||
      !/^[0-9]{3,4}$/.test(phoneMiddle) ||
      !/^[0-9]{4}$/.test(phoneLast) ||
      !field ||
      !privacyAgreed
    ) {
      setError('필수 입력 항목과 개인정보 수집·이용 동의를 확인해 주세요.');
      return;
    }

    // DB가 없으므로 민감정보는 현재 화면의 React state에만 보관합니다.
    setResult({
      name,
      phone: `${phonePrefix}-${phoneMiddle}-${phoneLast}`,
      birthDate,
      field: field.value,
      memo: memo.trim(),
      privacyAgreed,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="guide-online-reservation">
      <Inner>
        <div className="mt-8">
          <div
            aria-label={`온라인 예약 ${step}단계 / 2단계`}
            className="grid grid-cols-2 gap-2"
          >
            {[1, 2].map((index) => (
              <span
                key={index}
                aria-current={step === index ? 'step' : undefined}
                className={`
                  h-1
                  xl:h-1.5
                  ${index <= step ? 'bg-action-secondary' : 'bg-strong'}
                  `}
              />
            ))}
          </div>

          <div className="mt-3">
            <span className="text-mo-heading-1 text-action-secondary">
              STEP {step}
            </span>
            <div className="flex items-end gap-2">
              <h2
                className="text-mo-heading-1 text-gray-900
                xl:text-pc-heading-1"
              >
                {step === 1 ? '환자 정보 입력' : '예약 접수 완료'}
              </h2>
              {step === 1 && (
                <p
                  className="font-medium text-gray-600 text-[12px]
                  xl:text-[14px]"
                >
                  <span className="text-accent">*</span> 은 필수 항목입니다.
                </p>
              )}
            </div>
          </div>

          {result ? (
            <div
              className="mt-15
              xl:mt-20"
              role="status"
              aria-live="polite"
            >
              <div
                className="p-6 rounded-lg bg-subtle text-center
                xl:p-10 xl:rounded-xl"
              >
                <CheckCircle
                  aria-hidden="true"
                  className="mx-auto size-8 text-accent
                  xl:size-15"
                />
                <div
                  className="mt-2 leading-[140%] font-bold text-[20px]
                xl:text-[24px]"
                >
                  <p>진료예약 접수가</p>
                  <p>
                    <strong className="font-bold text-accent">
                      정상적으로 완료
                    </strong>
                    되었습니다.
                  </p>
                </div>
              </div>

              <section id="guide-reservation-summary">
                <div
                  className="mt-10
                  xl:mt-20"
                >
                  <SectionBlock title="예약 정보" variant="side">
                    <dl
                      className="mt-5 grid grid-cols-[max-content_minmax(0,1fr)] border-y-[1.5px] border-y-gray-900 divide-y divide-strong
                      xl:mt-0"
                    >
                      {[
                        { label: '이름', value: result.name },
                        { label: '생년월일', value: result.birthDate },
                        { label: '연락처', value: result.phone },
                        {
                          label: '희망 진료 분야',
                          value:
                            reservationFields.find(
                              (item) => item.value === result.field,
                            )?.label ?? '',
                        },
                        { label: '증상 메모', value: result.memo || '-' },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="col-span-2 grid grid-cols-subgrid text-mo-body-1
                          xl:text-pc-body-1"
                        >
                          <dt
                            className="p-4 border-r border-strong bg-subtle font-bold
                          xl:p-5"
                          >
                            {row.label}
                          </dt>
                          <dd
                            className="min-w-0 p-4
                          xl:p-5"
                          >
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </SectionBlock>
                </div>
              </section>

              <div
                className="mt-15 mb-20 flex justify-center
                xl:mt-20 xl:mb-36"
              >
                <Link
                  href="/"
                  className="px-7 py-3 rounded-full bg-green-900 font-bold text-inverse text-[14px]
                  xl:px-10 xl:text-[16px]"
                >
                  홈으로
                </Link>
              </div>
            </div>
          ) : (
            <form
              className="mt-5
              xl:mt-20"
              onSubmit={handleSubmit}
            >
              <div
                className="space-y-6
                xl:space-y-10"
              >
                <FormField label="이름" htmlFor="reservation-name" required>
                  <FormTextInput
                    id="reservation-name"
                    name="name"
                    autoComplete="name"
                    placeholder="이름을 입력하세요"
                    maxLength={80}
                    required
                  />
                </FormField>

                <FormField
                  label="연락처"
                  htmlFor="reservation-phone-middle"
                  required
                >
                  <FormPhoneInputs idPrefix="reservation" />
                </FormField>

                <FormField
                  label="생년월일 6자리"
                  htmlFor="reservation-birth"
                  required
                >
                  <FormTextInput
                    id="reservation-birth"
                    name="birthDate"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    placeholder="예) 1985년 3월 12일 → 850312"
                    required
                  />
                </FormField>

                <FormField
                  label="희망 진료 분야"
                  htmlFor="reservation-field"
                  required
                >
                  <FormSelect
                    id="reservation-field"
                    name="field"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      진료 분야를 선택해 주세요.
                    </option>
                    {reservationFields.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </FormSelect>
                </FormField>

                <FormField
                  label="증상 메모"
                  htmlFor="reservation-memo"
                  alignStart
                >
                  <FormTextarea
                    id="reservation-memo"
                    name="memo"
                    maxLength={500}
                    value={memo}
                    onChange={(event) => setMemo(event.target.value)}
                    placeholder="증상이나 희망 의료진을 남겨주세요."
                  />
                </FormField>
              </div>

              <div
                className="mt-6 flex justify-between items-center
                xl:mt-10 xl:justify-start xl:gap-5"
              >
                {/* 개인정보 동의 텍스트 */}
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="reservation-privacy"
                    className="flex items-end gap-1 text-mo-body-2
                    xl:text-pc-body-2"
                  >
                    <strong className="text-accent">[필수]</strong>
                    <span>개인정보 수집·이용 동의</span>
                  </label>

                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-bold text-gray-500 text-[12px]
                    xl:text-[14px]"
                  >
                    자세히 보기
                  </Link>
                </div>

                {/* 체크박스 */}
                <label
                  htmlFor="reservation-privacy"
                  className="relative flex justify-center items-center size-6"
                >
                  <input
                    id="reservation-privacy"
                    name="privacyAgreed"
                    type="checkbox"
                    required
                    className="peer absolute inset-0 m-0 size-full opacity-0 cursor-pointer z-10"
                  />

                  <span
                    className="pointer-events-none size-full rounded-sm border border-gray-300 bg-white
                    peer-checked:border-[#FF773C] peer-checked:bg-[#FF773C]
                    peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent"
                  />

                  <Check
                    aria-hidden="true"
                    className="pointer-events-none absolute size-4 stroke-4 text-white opacity-0
                    peer-checked:opacity-100
                    xl:size-5"
                  />
                </label>
              </div>

              <ul
                className="mt-10 p-5 space-y-3 rounded-lg bg-[#F9FAFB] break-keep
                xl:p-7 xl:space-y-4 xl:rounded-xl"
              >
                <li className="flex items-start gap-2">
                  <CircleAlert
                    aria-hidden="true"
                    className="relative top-0.75 shrink-0 size-5 text-accent
                    xl:top-0.5 xl:size-7"
                  />
                  <span
                    className="text-[14px]
                  xl:text-[17px]"
                  >
                    실시간 예약이 아니며 담당자 전화 확인 후 확정됩니다.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CircleAlert
                    aria-hidden="true"
                    className="relative top-0.75 shrink-0 size-5 text-accent
                    xl:top-0.5 xl:size-7"
                  />
                  <span
                    className="text-[14px]
                  xl:text-[17px]"
                  >
                    예약 환자 우선이나 당일 진료 상황에 따라 대기 시간이 발생할
                    수 있습니다.
                  </span>
                </li>
              </ul>

              {error && (
                <p role="alert" className="mt-4 text-[13px] text-danger">
                  {error}
                </p>
              )}

              <div
                className="mt-15 mb-20 flex justify-center
                xl:mt-20 xl:mb-36"
              >
                <button
                  type="submit"
                  className="px-7 py-3 rounded-full bg-green-900 font-bold text-inverse text-[14px]
                  xl:px-10 xl:text-[16px]"
                >
                  예약 접수하기
                </button>
              </div>
            </form>
          )}
        </div>
      </Inner>
    </section>
  );
}
