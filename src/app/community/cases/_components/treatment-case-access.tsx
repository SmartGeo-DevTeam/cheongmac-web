'use client';

import {
  P as TypographyP,
} from '@/app/_components/ui/typography';
import { LockKeyhole } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

type ImageLockProps = {
  compact?: boolean;
  message?: string;
};

const LOGIN_REQUIRED_MESSAGE = '로그인 후 확인 가능합니다.';

function useLoginRequired() {
  const pathname = usePathname();
  const router = useRouter();

  return () => {
    toast.info(LOGIN_REQUIRED_MESSAGE);
    router.push(`/signin?callbackURL=${encodeURIComponent(pathname)}`);
  };
}

export function TreatmentCaseImageLock({
  compact = false,
  message = '로그인 후 자세한 내용을 확인하세요',
}: ImageLockProps) {
  const goToSignIn = useLoginRequired();

  if (compact) {
    return (
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          goToSignIn();
        }}
        className="absolute inset-y-0 right-0 z-20 flex w-1/2 cursor-pointer items-center justify-center overflow-hidden text-left"
        aria-label={LOGIN_REQUIRED_MESSAGE}
      >
        <span className="absolute inset-0 bg-white/5 backdrop-blur-[9px]" />
        <span className="relative z-10 rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#272C31] shadow-[0_2px_8px_rgba(0,0,0,0.10)] transition hover:bg-[#F7F8F8] xl:text-base">
          로그인
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        goToSignIn();
      }}
      className="absolute inset-y-0 right-0 z-20 flex w-1/2 cursor-pointer items-center justify-center overflow-hidden"
      aria-label={LOGIN_REQUIRED_MESSAGE}
    >
      <span className="absolute inset-0 bg-white/5 backdrop-blur-[10px]" />
      <span className="relative z-10 flex max-w-[90%] flex-col items-center gap-2 text-center">
        <LockKeyhole
          className="size-7 text-[#72CBB8] xl:size-8"
          strokeWidth={2}
        />
        <span className="break-keep text-sm font-medium text-[#252A30] xl:text-xl">
          {message}
        </span>
      </span>
    </button>
  );
}

export function TreatmentCaseContentLock() {
  const goToSignIn = useLoginRequired();

  return (
    <div className="mt-5 flex min-h-[150px] flex-col items-center justify-center rounded-xl bg-[#369D88] px-5 py-7 text-center text-white xl:mt-7 xl:min-h-[190px]">
      <LockKeyhole
        className="size-7 text-[#85D7C5] xl:size-9"
        strokeWidth={2}
      />
      <TypographyP className="mt-3 text-base font-medium xl:text-xl">
        로그인 후 자세한 내용을 확인하세요
      </TypographyP>
      <button
        type="button"
        onClick={goToSignIn}
        className="mt-4 inline-flex h-10 min-w-[92px] items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-[#33383D] transition hover:bg-[#F4F6F5] xl:h-11 xl:min-w-[108px] xl:text-base"
      >
        로그인하기
      </button>
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
