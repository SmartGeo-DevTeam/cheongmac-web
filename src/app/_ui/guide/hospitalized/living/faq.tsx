import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import FaqList from '@/app/_components/common/faq-list';
import { livingFaqs } from '@/app/_data/guide/hospitalized/living/faq';

export default function HospitalizedLivingFaq() {
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
