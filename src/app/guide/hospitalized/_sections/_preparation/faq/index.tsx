import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import FaqList from '@/app/guide/hospitalized/_components/_faq-list';
import { admissionFaqs } from './data';

export default function PreparationFaq() {
  return (
    <section id="guide-hospitalized-admission-faq">
      <Inner>
        <SectionBlock
          title="자주 묻는 질문"
          variant="side"
          className="xl:mt-40"
        >
          <FaqList items={admissionFaqs} />
        </SectionBlock>
      </Inner>
    </section>
  );
}
