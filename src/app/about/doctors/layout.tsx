import Breadcrumb from '@/app/_components/common/breadcrumb';
import Inner from '@/app/_components/common/inner';
import PageTitle from '@/app/_components/common/page-title';
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

      <PageTitle title="의료진/진료과" />
      {/* 여기까지 하면서 doctor로 넘어가려다가 연혁, 사회공헌 데스크탑 안 한 거 생각나서 돌아감 - 10/22(목) 10:17  */}

      {children}
    </>
  );
}
