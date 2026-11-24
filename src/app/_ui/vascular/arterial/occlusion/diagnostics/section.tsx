import ClinicDiagnosticMethodContent from '@/app/_components/clinic/diagnostics/method-content';
import Inner from '@/app/_components/common/inner';
import { occlusionDiagnosticMethods } from '@/app/_data/vascular/arterial/occlusion/diagnostics/methods';
import DiagnosticsIntroduction from './introduction';
import MethodDetail from './method-detail';

export default function OcclusionDiagnostics({ id }: { id: string }) {
  return (
    <section id={id}>
      <DiagnosticsIntroduction />
      <Inner>
        <ClinicDiagnosticMethodContent
          idPrefix="vascular-arterial-occlusion-diagnostics"
          methods={occlusionDiagnosticMethods}
          DetailComponent={MethodDetail}
        />
      </Inner>
    </section>
  );
}
