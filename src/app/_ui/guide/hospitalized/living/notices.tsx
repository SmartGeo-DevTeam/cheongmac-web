import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import HospitalizedNoticeList from '@/app/_ui/guide/hospitalized/notice-list';
import { livingNotices } from '@/app/_data/guide/hospitalized/living/notices';

export default function HospitalizedLivingNotices() {
  return (
    <section id="guide-hospitalized-living-notices">
      <Inner>
        <SectionBlock title="입원 중 생활수칙" variant="side">
          <HospitalizedNoticeList items={livingNotices} />
        </SectionBlock>
      </Inner>
    </section>
  );
}
