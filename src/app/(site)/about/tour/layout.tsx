import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import type { ReactNode } from 'react';
import TourTabs from '@/app/_ui/about/tour/tabs';

export default function AboutTourLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Breadcrumb />
      <PageHeader
        title="병원 둘러보기"
        desc={`좋은 의료는 편안하고 쾌적한 공간에서 시작됩니다.\n 오직 치료와 회복에 집중할 수 있는 최적의 환경을 제공합니다.`}
      />
      <TourTabs />
      {children}
    </>
  );
}
