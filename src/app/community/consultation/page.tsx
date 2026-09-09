import ConsultationBoard from '@/app/community/consultation/_components/consultation-board';
import ConsultationPageHeader from '@/app/community/consultation/_components/consultation-page-header';
import { getPublicConsultations } from '@/_lib/consultations';
import { Skeleton } from '@/_shadcn/ui/skeleton';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '의학상담 | 청맥병원',
  description: '혈관질환과 관련한 궁금증을 청맥병원 의료진에게 문의해보세요.',
};

async function ConsultationBoardData() {
  const items = await getPublicConsultations();
  return <ConsultationBoard items={items} />;
}

function ConsultationBoardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-14 xl:px-0 xl:pb-24">
      <Skeleton className="h-44 rounded-xl" />
      <div className="mt-7 flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-11 w-60 rounded-full" />
      </div>
      <div className="mt-3 space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-24 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function ConsultationPage() {
  return (
    <div>
      <ConsultationPageHeader />
      <Suspense fallback={<ConsultationBoardSkeleton />}>
        <ConsultationBoardData />
      </Suspense>
    </div>
  );
}
