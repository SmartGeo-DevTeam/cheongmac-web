import ClinicDiagnosticMethodContent from '@/app/_components/clinic/diagnostics/method-content';
import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import { pelvicDiagnosticMethods } from '@/app/_data/vascular/venous/pelvic/diagnostics/methods';
import MethodDetail from './method-detail';

/** 골반정맥류 진단 섹션: 기존 공통 검사 탭 및 패널 UI를 조립합니다. */
export default function PelvicDiagnostics({ id }: { id: string }) {
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
              <b className={`hidden xl:inline`}>골반정맥류 진단 방법</b>
            </>
          }
        />
        <p
          className={`hidden break-keep text-center text-secondary
            xl:mx-auto xl:mt-5 xl:block xl:max-w-4xl xl:text-pc-body-1`}
        >
          혈관이 도드라져 보이는 경우뿐 아니라 겉으로 드러나지 않아도 정맥에서
          역류가 진행 중일 수 있습니다.
          <br />
          치료가 필요한지, 어느 혈관을 치료해야 하는지는 혈류를 직접 확인해야 알
          수 있습니다.
        </p>
        <ClinicDiagnosticMethodContent
          idPrefix={id}
          methods={pelvicDiagnosticMethods}
          DetailComponent={MethodDetail}
        />
      </Inner>
    </section>
  );
}
