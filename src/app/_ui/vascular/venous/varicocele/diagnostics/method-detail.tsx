import CriteriaGrid from '@/app/_components/clinic/diagnostics/criteria-grid';
import MethodPanel from '@/app/_components/clinic/diagnostics/method-panel';
import {
  varicoceleDiagnosticCriteria,
  varicocelePhysicalCriteriaDescription,
} from '@/app/_data/vascular/venous/varicocele/diagnostics/criteria';
import type { DiagnosticMethod } from '@/app/_types/clinic/diagnostics';

type MethodDetailProps = { method: DiagnosticMethod };

export default function MethodDetail({ method }: MethodDetailProps) {
  if (method.id === 'physical') {
    return (
      <MethodPanel
        method={method}
        criteria={
          <p className={`mt-3 whitespace-break-spaces break-keep text-mo-body-1 text-gray-900`}>
            {varicocelePhysicalCriteriaDescription}
          </p>
        }
      />
    );
  }

  const criteria = varicoceleDiagnosticCriteria[method.id];
  if (!criteria) return null;

  return <MethodPanel method={method} criteria={<CriteriaGrid {...criteria} />} />;
}
