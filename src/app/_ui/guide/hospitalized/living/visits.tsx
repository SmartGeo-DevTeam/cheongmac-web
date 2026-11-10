import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import HospitalizedBulletNotices from '@/app/_ui/guide/hospitalized/bullet-notices';
import { visitNotices } from '@/app/_data/guide/hospitalized/living/visits';

export default function HospitalizedLivingVisits() {
  return (
    <section id="guide-hospitalized-visits">
      <Inner>
        <SectionBlock title="면회·외출 안내" variant="side">
          <HospitalizedBulletNotices notices={visitNotices} />
        </SectionBlock>
      </Inner>
    </section>
  );
}
