import MethodSelector from './method-selector';
import type { DiagnosticMethod } from '@/app/_types/clinic/diagnostics';
import type { ComponentType } from 'react';

type MethodContentProps = {
  idPrefix: string;
  methods: readonly DiagnosticMethod[];
  DetailComponent: ComponentType<{ method: DiagnosticMethod }>;
  panelIdSuffix?: string;
};

/** 페이지별 검사 데이터와 상세 UI를 공통 탭/패널 구조에 연결합니다. */
export default function MethodContent({
  idPrefix,
  methods,
  DetailComponent,
  panelIdSuffix = '',
}: MethodContentProps) {
  return (
    <MethodSelector
      tabs={methods.map(({ id, tabLabel }) => ({
        id: `${idPrefix}-${id}${panelIdSuffix}`,
        label: tabLabel,
      }))}
      panels={methods.map((method) => (
        <DetailComponent key={method.id} method={method} />
      ))}
    />
  );
}
