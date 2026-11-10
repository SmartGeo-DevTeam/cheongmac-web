import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import type { ReactNode } from 'react';

export default function GuideOutpatientLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Breadcrumb />

      <PageHeader title="OOOO" />

      {children}
    </>
  );
}
