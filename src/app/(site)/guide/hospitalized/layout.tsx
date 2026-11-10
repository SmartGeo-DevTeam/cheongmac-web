import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import type { ReactNode } from 'react';

export default function GuideHospitalizedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Breadcrumb />

      <PageHeader
        title="입·퇴원안내"
        desc={`치료의 시작부터 일상 복귀까지, \n환자분의 치유를 위한 모든 여정을 함께하겠습니다.`}
      />

      {children}
    </>
  );
}
