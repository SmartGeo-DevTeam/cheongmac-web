import Inner from '@/app/_components/common/inner';
import MethodContent from '@/app/_components/clinic/diagnostics/method-content';
import { occlusionDiagnosticMethods } from '@/app/_data/vascular/arterial/occlusion/diagnostics/methods';
import DiagnosticsIntroduction from './introduction';
import MethodDetail from './method-detail';

export default function OcclusionDiagnostics() {
  return (
    <section id="vascular-arterial-occlusion-diagnostics">
      <DiagnosticsIntroduction />
      <Inner>
        <MethodContent
          idPrefix="vascular-arterial-occlusion-diagnostics"
          methods={occlusionDiagnosticMethods}
          DetailComponent={MethodDetail}
        />
      </Inner>
    </section>
  );
}
