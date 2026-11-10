import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import HospitalizedNoticeList from '@/app/_ui/guide/hospitalized/notice-list';
import { admissionNotices } from '@/app/_data/guide/hospitalized/preparation/notices';

export default function HospitalizedPreparationNotices() {
  return (
    <section id="guide-hospitalized-admission-notices">
      <Inner>
        <SectionBlock title="입원 전 주의사항" variant="side">
          <HospitalizedNoticeList items={admissionNotices} />
        </SectionBlock>
      </Inner>
    </section>
  );
}
