import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import FaqList from '@/app/guide/hospitalized/_components/faq-list';
import { dischargeFaqs } from './data';

export default function DischargeFaq() {
  return (
    <section id="guide-hospitalized-discharge-faq">
      <Inner>
        <SectionBlock title="자주 묻는 질문" variant="side">
          <FaqList items={dischargeFaqs} />
        </SectionBlock>
      </Inner>
    </section>
  );
}
