import CriteriaGrid from '@/app/_components/clinic/diagnostics/criteria-grid';
import MethodPanel from '@/app/_components/clinic/diagnostics/method-panel';
import { pelvicDiagnosticCriteria } from '@/app/_data/vascular/venous/pelvic/diagnostics/criteria';
import type { DiagnosticMethod } from '@/app/_types/clinic/diagnostics';

type MethodDetailProps = { method: DiagnosticMethod };

/** 공통 탭 패널이 검사별 DOM ID를 소유하므로 별도 래퍼를 추가하지 않습니다. */
export default function MethodDetail({ method }: MethodDetailProps) {
  const criteria = pelvicDiagnosticCriteria[method.id];

  if (!criteria) return null;

  return (
    <MethodPanel
      method={method}
      criteria={<CriteriaGrid {...criteria} />}
    />
  );
}
