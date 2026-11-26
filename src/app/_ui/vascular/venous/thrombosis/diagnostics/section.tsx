import ClinicDiagnosticMethodContent from '@/app/_components/clinic/diagnostics/method-content';
import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import { thrombosisDiagnosticMethods } from '@/app/_data/vascular/venous/thrombosis/diagnostics/methods';
import MethodDetail from './method-detail';

export default function ThrombosisDiagnostics({ id }: { id: string }) {
  return (
    <section id={id}>
      <Inner>
        <SectionHeading
          label="Diagnosis · 진단"
          labelVariant="disabled"
          mtVariant="lg"
          title={
            <>
              <b className={`xl:hidden`}>
                정확한 검사를 통해
                <br />
                적절한 치료를 결정합니다
              </b>
              <b className={`hidden xl:inline`}>심부정맥혈전증 진단 방법</b>
            </>
          }
        />
        <ClinicDiagnosticMethodContent
          idPrefix={id}
          methods={thrombosisDiagnosticMethods}
          DetailComponent={MethodDetail}
        />
      </Inner>
    </section>
  );
}
