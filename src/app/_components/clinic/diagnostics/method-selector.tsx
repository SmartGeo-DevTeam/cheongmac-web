'use client';

import type { DiagnosticTab } from '@/app/_types/clinic/diagnostics';
import type { ReactNode } from 'react';
import { useState } from 'react';
import MethodTabs from './method-tabs';

type MethodSelectorProps = {
  tabs: readonly DiagnosticTab[];
  panels: readonly ReactNode[];
  ariaLabel?: string;
};

/** 다른 진료 페이지도 자신의 탭·패널 데이터를 전달하면 동일 필터 UI를 사용합니다. */
export default function MethodSelector({ tabs, panels, ariaLabel }: MethodSelectorProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? '');
  const activeIndex = tabs.findIndex((tab) => tab.id === activeId);
  const index = activeIndex >= 0 ? activeIndex : 0;
  const tab = tabs[index];

  if (!tab || panels.length !== tabs.length) return null;

  return (
    <>
      <MethodTabs tabs={tabs} activeId={tab.id} onSelect={setActiveId} ariaLabel={ariaLabel} />
      <div className="mt-10 xl:mt-20" role="tabpanel" id={tab.id} aria-labelledby={`${tab.id}-tab`} tabIndex={0} key={tab.id}>
        {panels[index]}
      </div>
    </>
  );
}
