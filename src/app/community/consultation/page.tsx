import ConsultationBoard from '@/app/community/consultation/_components/consultation-board';
import ConsultationPageHeader from '@/app/community/consultation/_components/consultation-page-header';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '의학상담 | 청맥병원',
  description: '혈관질환과 관련한 궁금증을 청맥병원 의료진에게 문의해보세요.',
};

export default function ConsultationPage() {
  return (
    <div>
      <ConsultationPageHeader />
      <div className="mt-7 xl:mt-8">
        <Suspense
          fallback={<div className="mx-auto min-h-[900px] max-w-7xl px-4" />}
        >
          <ConsultationBoard />
        </Suspense>
      </div>
    </div>
  );
}
