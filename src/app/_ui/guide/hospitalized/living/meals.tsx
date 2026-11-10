import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import HospitalizedInformationNotices from '@/app/_ui/guide/hospitalized/information-notices';
import HospitalizedInformationTable from '@/app/_ui/guide/hospitalized/information-table';
import { mealNotices, mealRows } from '@/app/_data/guide/hospitalized/living/meals';

export default function HospitalizedLivingMeals() {
  return (
    <section id="guide-hospitalized-meals">
      <Inner>
        <SectionBlock title="식사 제공 시간" variant="side">
          <HospitalizedInformationTable headers={['구분', '시간']} rows={mealRows} />
          <HospitalizedInformationNotices notices={mealNotices} />
        </SectionBlock>
      </Inner>
    </section>
  );
}
