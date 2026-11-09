import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import NoticeList from '@/app/guide/hospitalized/_components/_notice-list';
import { admissionNotices } from './data';

export default function PreparationNotices() {
  return (
    <section id="guide-hospitalized-admission-notices">
      <Inner>
        <SectionBlock title="입원 전 주의사항" variant="side">
          <NoticeList items={admissionNotices} />
        </SectionBlock>
      </Inner>
    </section>
  );
}
