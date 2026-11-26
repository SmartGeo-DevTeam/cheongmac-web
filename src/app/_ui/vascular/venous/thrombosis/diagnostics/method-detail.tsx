import CriteriaGrid from '@/app/_components/clinic/diagnostics/criteria-grid';
import MethodPanel from '@/app/_components/clinic/diagnostics/method-panel';
import {
  thrombosisBloodTestCriteriaTable,
  thrombosisDiagnosticCriteria,
} from '@/app/_data/vascular/venous/thrombosis/diagnostics/criteria';
import type { DiagnosticMethod } from '@/app/_types/clinic/diagnostics';

type MethodDetailProps = { method: DiagnosticMethod };

export default function MethodDetail({ method }: MethodDetailProps) {
  if (method.id === 'blood-test') {
    return (
      <MethodPanel
        method={method}
        criteriaTable={thrombosisBloodTestCriteriaTable}
      />
    );
  }

  const criteria = thrombosisDiagnosticCriteria[method.id];
  if (!criteria) return null;

  return <MethodPanel method={method} criteria={<CriteriaGrid {...criteria} />} />;
}
