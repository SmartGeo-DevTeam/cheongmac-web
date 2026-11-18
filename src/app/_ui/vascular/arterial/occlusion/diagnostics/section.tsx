import Inner from '@/app/_components/common/inner';
import MethodSelector from '@/app/_components/clinic/diagnostics/method-selector';
import { occlusionDiagnosticMethods } from '@/app/_data/vascular/arterial/occlusion/diagnostics/methods';
import DiagnosticsIntroduction from './introduction';
import MethodDetail from './method-detail';

export default function OcclusionDiagnostics() {
  return (
    <section id="vascular-arterial-occlusion-diagnostics">
      <DiagnosticsIntroduction />
      <Inner>
        <MethodSelector
          tabs={occlusionDiagnosticMethods.map(({ id, tabLabel }) => ({
            id: `vascular-arterial-occlusion-diagnostics-${id}`,
            label: tabLabel,
          }))}
          panels={occlusionDiagnosticMethods.map((method) => (
            <MethodDetail key={method.id} method={method} />
          ))}
        />
      </Inner>
    </section>
  );
}
