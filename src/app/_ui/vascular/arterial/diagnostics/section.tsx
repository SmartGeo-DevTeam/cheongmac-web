import Inner from '@/app/_components/common/inner';
import SectionHeading from '@/app/_components/clinic/section-heading';
import ArterialDiagnosticCarousel from './carousel';

export default function ArterialDiagnostics() {
  return (
    <section id="vascular-arterial-diagnostics">
      <Inner>
        <SectionHeading
          mtVariant="xl"
          label="동맥질환 진단방법"
          labelVariant="accent"
          title={
            <>
              간단한 검사만으로도
              <br />
              <b>끔찍한 결과를 막을 수 있습니다</b>
            </>
          }
          description={<>정확한 진단은 올바른 치료의 첫걸음입니다.</>}
        />
      </Inner>

      <ArterialDiagnosticCarousel />
    </section>
  );
}
