import Inner from '@/app/_components/common/inner';
import HospitalizedIntroOverview from '@/app/_ui/guide/hospitalized/intro-overview';
import HospitalizedIntroTitle from '@/app/_ui/guide/hospitalized/intro-title';
import { intro } from '@/app/_data/guide/hospitalized/living/overview';

export default function HospitalizedLivingOverview() {
  return (
    <section id="guide-hospitalized-living-intro">
      <Inner>
        <div
          className="mt-10
          xl:mt-20"
        >
          <HospitalizedIntroTitle title="입원 생활" />
          <HospitalizedIntroOverview data={intro} />
        </div>
      </Inner>
    </section>
  );
}
