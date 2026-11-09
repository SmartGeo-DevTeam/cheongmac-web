import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import type { ReactNode } from 'react';

export default function GuideVeteransLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Breadcrumb />

      <PageHeader
        title="보훈위탁병원"
        desc={`보훈병원 전문위탁병원으로 지정되어 \n국가보훈대상자에 대한 위탁진료를 실시하고 있습니다.`}
      />

      {children}
    </>
  );
}
