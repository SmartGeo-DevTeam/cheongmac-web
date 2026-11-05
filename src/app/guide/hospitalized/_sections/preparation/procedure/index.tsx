import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import ProcedureList from '@/app/guide/hospitalized/_components/procedure-list';
import { admissionProcedure } from './data';

export default function PreparationProcedure() {
  return (
    <section id="guide-hospitalized-admission-procedure">
      <Inner>
        <SectionBlock title="입원 절차" variant="side">
          <ProcedureList items={admissionProcedure} />
        </SectionBlock>
      </Inner>
    </section>
  );
}
