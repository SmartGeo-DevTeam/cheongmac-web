import Inner from '@/app/_components/common/inner';
import { varicoceleTreatmentCandidates } from '@/app/_data/vascular/venous/varicocele/treatment-candidates/items';
import VaricoceleTreatmentCandidatesCarousel from './carousel';

type VaricoceleTreatmentCandidatesProps = {
  id: string;
};

export default function VaricoceleTreatmentCandidates({
  id,
}: VaricoceleTreatmentCandidatesProps) {
  return (
    <div
      id={id}
      className={`mt-20
        xl:mt-45`}
    >
      <Inner>
        <h3
          className={`text-mo-title-1
            xl:text-pc-title-1`}
        >
          이런 경우라면
          <br />
          치료를 권해드립니다
        </h3>
      </Inner>

      <VaricoceleTreatmentCandidatesCarousel
        id={`${id}-carousel`}
        items={varicoceleTreatmentCandidates}
      />
    </div>
  );
}
