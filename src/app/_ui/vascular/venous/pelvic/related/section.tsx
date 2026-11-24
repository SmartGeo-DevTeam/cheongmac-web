import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import { pelvicRelatedHeading } from '@/app/_data/vascular/venous/pelvic/related/content';
import { pelvicRelatedDiseases } from '@/app/_data/vascular/venous/pelvic/related/items';
import PelvicRelatedCarousel from './carousel';

type PelvicRelatedProps = {
  id: string;
};

export default function PelvicRelated({ id }: PelvicRelatedProps) {
  return (
    <section id={id}>
      <Inner>
        <SectionHeading
          mtVariant="lg"
          label={pelvicRelatedHeading.label}
          labelVariant="disabled"
          title={
            <>
              {pelvicRelatedHeading.firstLine}
              <br />
              <b>{pelvicRelatedHeading.secondLine}</b>
            </>
          }
          description={pelvicRelatedHeading.description}
        />
      </Inner>
      <PelvicRelatedCarousel
        id={`${id}-carousel`}
        cardIdPrefix={id}
        items={pelvicRelatedDiseases}
      />
    </section>
  );
}
