import CriteriaGrid from '@/app/_components/clinic/diagnostics/criteria-grid';
import MethodPanel from '@/app/_components/clinic/diagnostics/method-panel';
import type { DiagnosticMethod } from '@/app/_types/clinic/diagnostics';
import { varicoseDiagnosticCriteria } from '@/app/_data/vascular/venous/varicose/diagnostics/criteria';
import PhysicalExamination from './physical-examination';

type MethodDetailProps = { method: DiagnosticMethod };

/** 항목별 단독 앵커를 유지해 PC 목차와 개발자 도구에서 바로 찾을 수 있습니다. */
export default function MethodDetail({ method }: MethodDetailProps) {
  return (
    <section
      id={`vascular-venous-varicose-diagnostics-${method.id}`}
      aria-label={method.title}
      className={`scroll-mt-32`}
    >
      {method.id === 'physical' ? (
        <PhysicalExamination method={method} />
      ) : (
        <MethodPanel
          method={method}
          criteria={
            <CriteriaGrid
              {...varicoseDiagnosticCriteria[method.id as keyof typeof varicoseDiagnosticCriteria]}
            />
          }
          criteriaTitle={method.id === 'doppler' ? '진단 방법' : '진단 기준'}
        />
      )}
    </section>
  );
}
