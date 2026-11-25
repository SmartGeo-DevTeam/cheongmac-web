import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import { varicoceleCharacteristicsHeading } from '@/app/_data/vascular/venous/varicocele/characteristics/content';
import { varicoceleCharacteristics } from '@/app/_data/vascular/venous/varicocele/characteristics/items';
import VaricoceleTreatmentCandidates from '../treatment-candidates/section';
import VaricoceleCharacteristicAccordionItem from './accordion-item';
import VaricoceleCharacteristicCard from './card';

type VaricoceleCharacteristicsProps = {
  id: string;
  treatmentCandidatesId: string;
};

export default function VaricoceleCharacteristics({
  id,
  treatmentCandidatesId,
}: VaricoceleCharacteristicsProps) {
  return (
    <section id={id}>
      <Inner>
        <SectionHeading
          mtVariant="lg"
          label={varicoceleCharacteristicsHeading.label}
          labelVariant="accent"
          title={
            <>
              <b>{varicoceleCharacteristicsHeading.firstLine}</b>
              <br />
              {varicoceleCharacteristicsHeading.secondLine}
            </>
          }
          description={
            <>
              {varicoceleCharacteristicsHeading.descriptionFirstLine}
              <br className={`hidden xl:block`} />
              {varicoceleCharacteristicsHeading.descriptionSecondLine}
            </>
          }
        />

        {/* 모바일 - 질환 특징 아코디언 */}
        <ul
          className={`mt-10 space-y-2
            xl:hidden`}
        >
          {varicoceleCharacteristics.map((item, index) => (
            <VaricoceleCharacteristicAccordionItem
              key={item.id}
              id={`${id}-accordion-${item.id}`}
              item={item}
              number={index + 1}
            />
          ))}
        </ul>

        {/* 데스크탑 - 질환 특징 카드 */}
        <ul
          className={`hidden
            xl:mt-25 xl:grid xl:grid-cols-3 xl:gap-8`}
        >
          {varicoceleCharacteristics.map((item) => (
            <VaricoceleCharacteristicCard
              key={item.id}
              id={`${id}-card-${item.id}`}
              item={item}
            />
          ))}
        </ul>
      </Inner>

      <VaricoceleTreatmentCandidates id={treatmentCandidatesId} />
    </section>
  );
}
