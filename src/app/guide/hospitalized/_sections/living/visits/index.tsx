import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import BulletNotices from '../../../_components/bullet-notices';
import { visitNotices } from './data';

export default function LivingVisits() {
  return (
    <section id="guide-hospitalized-visits">
      <Inner>
        <SectionBlock title="면회·외출 안내" variant="side">
          <BulletNotices notices={visitNotices} />
        </SectionBlock>
      </Inner>
    </section>
  );
}
