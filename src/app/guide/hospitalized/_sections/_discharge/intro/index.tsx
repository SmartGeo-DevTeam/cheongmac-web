import Inner from '@/app/_components/common/inner';
import IntroOverview from '../../../_components/_intro-overview';
import IntroTitle from '../../../_components/_intro-title';
import { intro } from './data';

export default function DischargeIntro() {
  return (
    <section id="guide-hospitalized-discharge-intro">
      <Inner>
        <div
          className="mt-10
          xl:mt-20"
        >
          <IntroTitle title="퇴원 절차" />
          <IntroOverview data={intro} variant="banner" />
        </div>
      </Inner>
    </section>
  );
}
