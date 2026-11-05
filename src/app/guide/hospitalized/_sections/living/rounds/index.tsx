import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import InformationNotices from '@/app/guide/hospitalized/_components/information-notices';
import InformationTable from '@/app/guide/hospitalized/_components/information-table';
import { roundsNotice, roundsRows } from './data';

export default function LivingRounds() {
  return (
    <section id="guide-hospitalized-rounds">
      <Inner>
        <SectionBlock title="회진 안내" variant="side">
          <InformationTable headers={['구분', '시간']} rows={roundsRows} />
          <InformationNotices notices={roundsNotice} />
        </SectionBlock>
      </Inner>
    </section>
  );
}
