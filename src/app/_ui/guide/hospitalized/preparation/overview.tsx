import Inner from '@/app/_components/common/inner';
import HospitalizedIntroOverview from '@/app/_ui/guide/hospitalized/intro-overview';
import HospitalizedIntroTitle from '@/app/_ui/guide/hospitalized/intro-title';
import { intro } from '@/app/_data/guide/hospitalized/preparation/overview';

export default function HospitalizedPreparationOverview() {
  return (
    <section id="guide-hospitalized-preparation-intro">
      <Inner>
        <div
          className="mt-10
          xl:mt-20"
        >
          <HospitalizedIntroTitle title="입원 준비" />
          <HospitalizedIntroOverview data={intro} />
        </div>
      </Inner>
    </section>
  );
}
