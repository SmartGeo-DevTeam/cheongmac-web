import Breadcrumb from '@/app/_components/common/breadcrumb';
import Inner from '@/app/_components/common/inner';
import PageHeader from '@/app/_components/common/page-header';
import Spacer from '@/app/_components/common/spacer';
import type { ReactNode } from 'react';

export default function AboutDoctorsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Spacer type="content-header" />

      <Inner>
        <Breadcrumb />
      </Inner>

      <PageHeader
        title="의료진/진료과"
        desc="대한민국 혈관치료의 표준을 만들어가는 청맥 의료진을 소개합니다."
      />

      {children}
    </>
  );
}
