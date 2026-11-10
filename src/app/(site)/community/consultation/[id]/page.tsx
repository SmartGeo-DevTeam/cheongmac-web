import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ConsultationDetail from '@/app/_ui/community/consultation/[id]/consultation-detail';
import { getConsultationItem } from '@/app/_data/community/consultation/consultations';

export const metadata: Metadata = {
  title: '의학상담 상세 | 청맥병원',
};

export default async function ConsultationDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string | string[] }>;
}) {
  const { id } = await params;
  const { from } = await searchParams;
  const numberId = Number(id);
  if (!Number.isSafeInteger(numberId) || numberId < 1) notFound();
  const item = getConsultationItem(numberId);
  if (!item) notFound();

  // 상세에서 목록으로 돌아갈 때 필터/검색/페이지 상태를 복원합니다.
  const listHref =
    typeof from === 'string' &&
    (from === '/community/consultation' || from.startsWith('/community/consultation?'))
      ? from
      : '/community/consultation';

  return <ConsultationDetail item={item} listHref={listHref} />;
}
