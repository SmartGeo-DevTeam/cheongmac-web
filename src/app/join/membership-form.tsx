'use client';

import { completeMembership, type JoinState } from './actions';
import Link from 'next/link';
import { useActionState, useState } from 'react';

const initialState: JoinState = {};

type Props = {
  callbackURL: string;
  defaultName: string;
  email: string;
};

function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;

  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export default function MembershipForm({ callbackURL, defaultName, email }: Props) {
  const [state, formAction, pending] = useActionState(completeMembership, initialState);
  const [phone, setPhone] = useState('');

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <input type="hidden" name="callbackURL" value={callbackURL} />

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-[#444444]">본명</span>
        <input
          name="name"
          type="text"
          defaultValue={defaultName}
          autoComplete="name"
          required
          className="h-13 w-full rounded-xl border border-[#DEDFE1] px-4 text-[15px] focus:border-cm-orange"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-[#444444]">이메일</span>
        <input
          type="email"
          value={email}
          readOnly
          className="h-13 w-full rounded-xl border border-[#E7E8E9] bg-[#F7F7F7] px-4 text-[15px] text-[#777777]"
        />
        <span className="mt-1.5 block text-xs text-[#999999]">
          소셜 로그인 계정에서 확인된 이메일입니다.
        </span>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-[#444444]">연락처</span>
        <input
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="010-1234-5678"
          value={phone}
          onChange={(event) => setPhone(formatPhoneNumber(event.target.value))}
          maxLength={13}
          required
          className="h-13 w-full rounded-xl border border-[#DEDFE1] px-4 text-[15px] focus:border-cm-orange"
        />
      </label>

      <div className="space-y-3 rounded-2xl bg-[#F8F8F8] p-4 text-sm text-[#555555]">
        <label className="flex items-start gap-3">
          <input
            name="termsAccepted"
            type="checkbox"
            required
            className="mt-1 size-4 accent-[#FA6805]"
          />
          <span className="flex-1">[필수] 홈페이지 이용약관에 동의합니다.</span>
          <Link href="/terms" target="_blank" className="text-xs underline underline-offset-2">
            보기
          </Link>
        </label>

        <div className="border-t border-[#E7E7E7] pt-3">
          <label className="flex items-start gap-3">
            <input
              name="privacyAccepted"
              type="checkbox"
              required
              className="mt-1 size-4 accent-[#FA6805]"
            />
            <span className="flex-1">[필수] 개인정보 수집·이용에 동의합니다.</span>
            <Link
              href="/privacy-policy"
              target="_blank"
              className="text-xs underline underline-offset-2"
            >
              보기
            </Link>
          </label>

          <div className="ml-7 mt-3 space-y-1 rounded-xl border border-[#E7E7E7] bg-white px-3 py-3 text-xs leading-5 text-[#777777]">
            <p>
              <strong className="font-semibold text-[#555555]">수집 목적</strong> · 홈페이지 회원가입 및 관리,
              소셜 로그인 계정 식별·인증
            </p>
            <p>
              <strong className="font-semibold text-[#555555]">필수 항목</strong> · 본명, 이메일,
              휴대전화번호
            </p>
            <p>
              <strong className="font-semibold text-[#555555]">소셜 연동 정보</strong> · 로그인 제공자,
              소셜 계정 식별자, 프로필 이름·이미지(제공 및 동의 시)
            </p>
            <p>
              <strong className="font-semibold text-[#555555]">보유 기간</strong> · 회원 탈퇴 시까지
              (관계 법령상 보존 의무가 있는 경우 해당 기간)
            </p>
          </div>
        </div>
      </div>

      {state.error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="h-14 w-full rounded-xl bg-cm-orange text-base font-bold text-white transition hover:brightness-95 disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? '회원 전환 중...' : '청맥병원 회원가입 완료'}
      </button>
    </form>
  );
}
