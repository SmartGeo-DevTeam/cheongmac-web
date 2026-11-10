import Inner from '@/app/_components/common/inner';
import HospitalizedIntroOverview from '../intro-overview';
import HospitalizedIntroTitle from '../intro-title';
import { intro } from '@/app/_data/guide/hospitalized/discharge/overview';

export default function HospitalizedDischargeOverview() {
  return (
    <section id="guide-hospitalized-discharge-intro">
      <Inner>
        <div
          className="mt-10
          xl:mt-20"
        >
          <HospitalizedIntroTitle title="퇴원 절차" />
          <HospitalizedIntroOverview data={intro} variant="banner" />
        </div>
      </Inner>
    </section>
  );
}
