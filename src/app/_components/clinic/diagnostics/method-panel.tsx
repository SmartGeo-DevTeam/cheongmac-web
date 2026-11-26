import DotHeading from '@/app/_components/common/dot-heading';
import type { DiagnosticCriteriaTable, DiagnosticMethod } from '@/app/_types/clinic/diagnostics';
import type { ReactNode } from 'react';
import CriteriaTable from './criteria-table';
import MethodHeading from './method-heading';
import MethodInfo from './method-info';

type MethodPanelProps = {
  method: DiagnosticMethod;
  criteria?: ReactNode;
  criteriaTable?: DiagnosticCriteriaTable;
  criteriaTitle?: string;
};

/** 검사 항목의 공통 레이아웃. 질환별 특수 기준은 criteria 슬롯으로 전달합니다. */
export default function MethodPanel({
  method,
  criteria,
  criteriaTable,
  criteriaTitle = '진단 기준',
}: MethodPanelProps) {
  return (
    <>
      <MethodHeading eyebrow={method.eyebrow} title={method.title} description={method.description} />
      <MethodInfo image={method.image} notice={method.notice} infoGroups={method.infoGroups} />
      <div className="mt-10">
        <DotHeading title={criteriaTitle} as="h4" />
        {criteria}
        {criteriaTable && (
          <CriteriaTable table={criteriaTable} title={criteriaTitle} />
        )}
      </div>
    </>
  );
}
