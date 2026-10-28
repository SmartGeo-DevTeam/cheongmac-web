'use client';

import PageTabs from '@/app/_components/page-tabs';
import { usePathname } from 'next/navigation';
import { tabs } from './data';

export default function AbouteEuipmentTabs() {
  const pathname = usePathname();
  const activeCategory = pathname.split('/')[3] ?? 'all';

  const pageTabs = tabs.map((tab) => ({
    ...tab,
    href:
      tab.id === 'all'
        ? '/about/equipment'
        : `/about/equipment/${tab.id}`,
  }));

  return (
    <PageTabs
      id="about-euipment-tabs"
      ariaLabel="첨단의료장비 분류"
      tabs={pageTabs}
      activeId={activeCategory}
    />
  );
}
