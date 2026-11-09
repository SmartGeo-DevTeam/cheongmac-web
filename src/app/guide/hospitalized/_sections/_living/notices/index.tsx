import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import NoticeList from '@/app/guide/hospitalized/_components/_notice-list';
import { livingNotices } from './data';

export default function LivingNotices() {
  return (
    <section id="guide-hospitalized-living-notices">
      <Inner>
        <SectionBlock title="입원 중 생활수칙" variant="side">
          <NoticeList items={livingNotices} />
        </SectionBlock>
      </Inner>
    </section>
  );
}
