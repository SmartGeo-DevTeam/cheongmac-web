import CustomerVoicePageHeader from '@/app/community/customer-voice/_components/customer-voice-page-header';
import CustomerVoiceForm from '@/app/community/customer-voice/write/_components/customer-voice-form';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '고객의 소리 작성 | 청맥병원',
  description: '청맥병원에 칭찬, 감사, 건의사항, 불만과 고충을 전달합니다.',
};

export default function CustomerVoiceWritePage() {
  return (
    <div>
      <CustomerVoicePageHeader />
      <div className="mt-7 xl:mt-8">
        <Suspense
          fallback={<div className="mx-auto min-h-[760px] max-w-7xl px-4" />}
        >
          <CustomerVoiceForm />
        </Suspense>
      </div>
    </div>
  );
}
