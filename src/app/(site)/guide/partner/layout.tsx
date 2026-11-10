import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import type { ReactNode } from 'react';

export default function GuidePartnerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Breadcrumb />

      <PageHeader
        title="의료협약병원"
        desc={`우수 의료기관 및 다양한 기관과의 긴밀한 협력으로 \n환자 중심의 통합 의료서비스를 실현합니다.`}
      />

      {children}
    </>
  );
}
