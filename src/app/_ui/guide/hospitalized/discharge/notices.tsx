import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import HospitalizedNoticeList from '@/app/_ui/guide/hospitalized/notice-list';
import { dischargeNotices } from '@/app/_data/guide/hospitalized/discharge/notices';

export default function HospitalizedDischargeNotices() {
  return (
    <section id="guide-hospitalized-discharge-notices">
      <Inner>
        <SectionBlock title="퇴원 시 주의사항" variant="side">
          <HospitalizedNoticeList items={dischargeNotices} />
        </SectionBlock>
      </Inner>
    </section>
  );
}
