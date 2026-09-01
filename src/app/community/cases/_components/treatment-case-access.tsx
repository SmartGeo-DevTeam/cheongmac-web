'use client';

import { LockKeyhole } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { KeyboardEvent, MouseEvent } from 'react';

type ImageLockProps = {
  compact?: boolean;
  message?: string;
};

export function TreatmentCaseImageLock({
  compact = false,
  message = '로그인 후 자세한 내용을 확인하세요',
}: ImageLockProps) {
  const router = useRouter();

  const moveToSignIn = (
    event:
      | MouseEvent<HTMLSpanElement>
      | KeyboardEvent<HTMLSpanElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    router.push('/signin');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    moveToSignIn(event);
  };

  if (compact) {
    return (
      <div className="absolute inset-y-0 right-0 z-20 flex w-1/2 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[9px]" />

        {/*
          카드 바깥이 Link였던 이전 버전에서도 <a> 중첩이 발생하지 않도록
          compact 로그인 컨트롤은 anchor를 사용하지 않습니다.
          클릭/키보드 입력은 router.push('/signin')으로 처리합니다.
        */}
        <span
          role="link"
          tabIndex={0}
          onClick={moveToSignIn}
          onKeyDown={handleKeyDown}
          className="relative z-30 cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#272C31] shadow-[0_2px_8px_rgba(0,0,0,0.10)] outline-none transition hover:bg-[#F7F8F8] focus-visible:ring-2 focus-visible:ring-cm-green/50 xl:text-base"
        >
          로그인
        </span>
      </div>
    );
  }

  return (
    <div className="absolute inset-y-0 right-0 z-20 flex w-1/2 items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[10px]" />
      <div className="relative z-10 flex max-w-[90%] flex-col items-center gap-2 text-center">
        <LockKeyhole
          className="size-7 text-[#72CBB8] xl:size-8"
          strokeWidth={2}
        />
        <p className="break-keep text-sm font-medium text-[#252A30] xl:text-xl">
          {message}
        </p>
      </div>
    </div>
  );
}

export function TreatmentCaseContentLock() {
  return (
    <div className="mt-5 flex min-h-[150px] flex-col items-center justify-center rounded-xl bg-[#369D88] px-5 py-7 text-center text-white xl:mt-7 xl:min-h-[190px]">
      <LockKeyhole
        className="size-7 text-[#85D7C5] xl:size-9"
        strokeWidth={2}
      />
      <p className="mt-3 text-base font-medium xl:text-xl">
        로그인 후 자세한 내용을 확인하세요
      </p>
      <Link
        href="/signin"
        className="mt-4 inline-flex h-10 min-w-[92px] items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-[#33383D] transition hover:bg-[#F4F6F5] xl:h-11 xl:min-w-[108px] xl:text-base"
      >
        로그인하기
      </Link>
    </div>
  );
}

export function TreatmentCaseBlurredText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      aria-hidden="true"
      className="block select-none text-transparent blur-[5px] [text-shadow:0_0_7px_rgba(70,75,80,0.38)]"
    >
      {children}
    </span>
  );
}
