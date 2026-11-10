import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import type { ReactNode } from 'react';

/** 목록 · 작성 · 상세 페이지가 동일한 헤더와 경로 안내를 사용합니다. */
export default function CommunityConsultationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Breadcrumb />
      <PageHeader
        title="의학상담"
        desc={'청맥병원은 환자분의 고민을 가볍게 넘기지 않습니다.\n올바른 의학 정보 제공을 위해 최선을 다해 답변해 드립니다.'}
      />
      {children}
    </>
  );
}
