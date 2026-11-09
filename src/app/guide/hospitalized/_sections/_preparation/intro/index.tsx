import Inner from '@/app/_components/common/inner';
import IntroOverview from '@/app/guide/hospitalized/_components/_intro-overview';
import IntroTitle from '@/app/guide/hospitalized/_components/_intro-title';
import { intro } from './data';

export default function PreparationIntro() {
  return (
    <section id="guide-hospitalized-preparation-intro">
      <Inner>
        <div
          className="mt-10
          xl:mt-20"
        >
          <IntroTitle title="입원 준비" />
          <IntroOverview data={intro} />
        </div>
      </Inner>
    </section>
  );
}
