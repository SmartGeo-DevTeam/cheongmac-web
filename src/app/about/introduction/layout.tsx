import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import type { ReactNode } from 'react';
import AboutIntroductionNav from './_components/_nav';

export default function AboutIntroductionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Breadcrumb />
      <PageHeader title="청맥병원 소개" />

      <AboutIntroductionNav />

      {children}
    </>
  );
}
