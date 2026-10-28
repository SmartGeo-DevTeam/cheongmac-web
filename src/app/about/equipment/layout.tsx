import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import type { ReactNode } from 'react';
import AbouteEuipmentTabs from './_components/tabs';

export default function AboutEquipmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Breadcrumb />
      <PageHeader
        title="첨단의료장비"
        desc={`대학병원급 고해상도 진단 장비와 첨단 치료 시스템을 통해\n보이지 않는 혈관 속 미세한 병변까지 놓치지 않고 찾아냅니다.`}
        desktopLineBreak
      />
      <AbouteEuipmentTabs />
      {children}
    </>
  );
}
