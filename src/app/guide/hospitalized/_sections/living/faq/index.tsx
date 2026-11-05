import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import FaqList from '@/app/guide/hospitalized/_components/faq-list';
import { livingFaqs } from './data';

export default function LivingFaq() {
  return (
    <section id="guide-hospitalized-living-faq">
      <Inner>
        <SectionBlock title="자주 묻는 질문" variant="side">
          <FaqList items={livingFaqs} />
        </SectionBlock>
      </Inner>
    </section>
  );
}
