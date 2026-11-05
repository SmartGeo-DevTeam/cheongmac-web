import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import InformationNotices from '@/app/guide/hospitalized/_components/information-notices';
import InformationTable from '@/app/guide/hospitalized/_components/information-table';
import { mealNotices, mealRows } from './data';

export default function LivingMeals() {
  return (
    <section id="guide-hospitalized-meals">
      <Inner>
        <SectionBlock title="식사 제공 시간" variant="side">
          <InformationTable headers={['구분', '시간']} rows={mealRows} />
          <InformationNotices notices={mealNotices} />
        </SectionBlock>
      </Inner>
    </section>
  );
}
