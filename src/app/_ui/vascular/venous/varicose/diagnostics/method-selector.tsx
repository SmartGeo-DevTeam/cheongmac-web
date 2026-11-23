'use client';

import MethodTabs from '@/app/_components/clinic/diagnostics/method-tabs';
import type { DiagnosticMethod } from '@/app/_types/clinic/diagnostics';
import type { ReactNode } from 'react';
import { useState } from 'react';

type MethodSelectorProps = {
  methods: readonly DiagnosticMethod[];
  panels: readonly ReactNode[];
};

const ID_PREFIX = 'vascular-venous-varicose-diagnostics';

/** 모바일은 탭 패널, PC는 목차 링크와 전체 검사 설명을 사용합니다. */
export default function MethodSelector({ methods, panels }: MethodSelectorProps) {
  const [activeId, setActiveId] = useState(methods[0] ? `${ID_PREFIX}-${methods[0].id}-panel` : '');

  if (methods.length !== panels.length) return null;

  const tabs = methods.map(({ id, tabLabel }) => ({
    id: `${ID_PREFIX}-${id}-panel`,
    label: tabLabel,
  }));

  return (
    <div id={`${ID_PREFIX}-method-selector`}>
      <div className={`xl:hidden`}>
        <MethodTabs tabs={tabs} activeId={activeId} onSelect={setActiveId} />
      </div>
      <nav
        aria-label="하지정맥류 진단 방법 바로가기"
        className={`hidden
          xl:mx-auto xl:mt-20 xl:w-fit xl:p-3 xl:flex xl:items-center xl:gap-2 xl:rounded-full xl:border xl:border-default`}
      >
        {methods.map((method, index) => (
          <a
            key={method.id}
            href={`#${ID_PREFIX}-${method.id}`}
            className={`px-7 py-4 rounded-full font-medium text-[22px] text-secondary transition-colors
              hover:bg-gray-50
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600
              ${index === 0 ? 'bg-green-600 font-semibold text-inverse hover:bg-green-700' : ''}`}
          >
            {method.tabLabel}
          </a>
        ))}
      </nav>
      <div className={`mt-10 xl:mt-25`}>
        {methods.map((method, index) => (
          <div
            key={method.id}
            id={`${ID_PREFIX}-${method.id}-panel`}
            className={`${`${ID_PREFIX}-${method.id}-panel` === activeId ? 'block' : 'hidden'}
              xl:block ${index === 0 ? '' : 'xl:mt-70'}`}
            role="tabpanel"
            aria-labelledby={`${ID_PREFIX}-${method.id}-panel-tab`}
          >
            {panels[index]}
          </div>
        ))}
      </div>
    </div>
  );
}
