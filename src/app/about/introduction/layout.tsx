import Breadcrumb from '@/app/_components/common/breadcrumb';
import Inner from '@/app/_components/common/inner';
import PageHeader from '@/app/_components/common/page-header';
import Spacer from '@/app/_components/common/spacer';
import type { ReactNode } from 'react';
import AboutIntroductionNav from './_components/_nav';

export default function AboutIntroductionLayout({
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

      <PageHeader title="청맥병원 소개" />

      <AboutIntroductionNav />

      {children}
    </>
  );
}
