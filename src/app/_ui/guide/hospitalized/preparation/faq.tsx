import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import HospitalizedFaqList from '@/app/_ui/guide/hospitalized/faq-list';
import { admissionFaqs } from '@/app/_data/guide/hospitalized/preparation/faq';

export default function HospitalizedPreparationFaq() {
  return (
    <section id="guide-hospitalized-admission-faq">
      <Inner>
        <SectionBlock
          title="자주 묻는 질문"
          variant="side"
          className="xl:mt-40"
        >
          <HospitalizedFaqList items={admissionFaqs} />
        </SectionBlock>
      </Inner>
    </section>
  );
}
