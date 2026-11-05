import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import NoticeList from '@/app/guide/hospitalized/_components/notice-list';
import { dischargeNotices } from './data';

export default function DischargeNotices() {
  return (
    <section id="guide-hospitalized-discharge-notices">
      <Inner>
        <SectionBlock title="퇴원 시 주의사항" variant="side">
          <NoticeList items={dischargeNotices} />
        </SectionBlock>
      </Inner>
    </section>
  );
}
