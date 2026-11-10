import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import HospitalizedInformationNotices from '@/app/_ui/guide/hospitalized/information-notices';
import HospitalizedInformationTable from '@/app/_ui/guide/hospitalized/information-table';
import { roundsNotice, roundsRows } from '@/app/_data/guide/hospitalized/living/rounds';

export default function HospitalizedLivingRounds() {
  return (
    <section id="guide-hospitalized-rounds">
      <Inner>
        <SectionBlock title="회진 안내" variant="side">
          <HospitalizedInformationTable headers={['구분', '시간']} rows={roundsRows} />
          <HospitalizedInformationNotices notices={roundsNotice} />
        </SectionBlock>
      </Inner>
    </section>
  );
}
