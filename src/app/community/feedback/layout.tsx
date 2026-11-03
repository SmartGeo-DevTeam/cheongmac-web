import Breadcrumb from '@/app/_components/common/breadcrumb';
import type { ReactNode } from 'react';

export default function CommunityFeedbackLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Breadcrumb />

      {children}
    </>
  );
}
