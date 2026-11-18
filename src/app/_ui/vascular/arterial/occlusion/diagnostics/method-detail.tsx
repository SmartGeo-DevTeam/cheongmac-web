import CriteriaGrid from '@/app/_components/clinic/diagnostics/criteria-grid';
import MethodPanel from '@/app/_components/clinic/diagnostics/method-panel';
import type { DiagnosticMethod } from '@/app/_types/clinic/diagnostics';
import { occlusionDiagnosticCriteria } from '@/app/_data/vascular/arterial/occlusion/diagnostics/criteria';
import AbiCriteria from './abi-criteria';

type MethodDetailProps = { method: DiagnosticMethod };

export default function MethodDetail({ method }: MethodDetailProps) {
  const criteria = method.id === 'abi'
    ? <AbiCriteria />
    : <CriteriaGrid {...occlusionDiagnosticCriteria[method.id as keyof typeof occlusionDiagnosticCriteria]} />;

  return <MethodPanel method={method} criteria={criteria} />;
}
