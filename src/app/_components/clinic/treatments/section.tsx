import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import type {
  AdditionalTreatmentsContent,
  TreatmentMethod,
} from '@/app/_types/vascular/treatment-method';
import type { ReactNode } from 'react';
import TreatmentAdditional from './additional';
import TreatmentSelector from './selector';

type ClinicTreatmentsProps = {
  id: string;
  ariaLabel: string;
  title: ReactNode;
  methods: readonly TreatmentMethod[];
  additionalTreatments?: AdditionalTreatmentsContent;
  className?: string;
};

/** 치료법 섹션의 반응형 제목·탭·상세정보 공통 조립. */
export default function ClinicTreatments({
  id,
  ariaLabel,
  title,
  methods,
  additionalTreatments,
  className = '',
}: ClinicTreatmentsProps) {
  return (
    <section id={id} className={`${className}`}>
      <div className={`mt-15 pb-15 bg-[#F2F2F2]`}>
        <Inner>
          <SectionHeading
            mtVariant="lg"
            label="Treatment · 치료법"
            labelVariant="disabled"
            title={title}
          />
          <TreatmentSelector id={id} ariaLabel={ariaLabel} methods={methods} />
          {additionalTreatments && additionalTreatments.items.length > 0 && (
            <TreatmentAdditional
              id={`${id}-additional`}
              content={additionalTreatments}
            />
          )}
        </Inner>
      </div>
    </section>
  );
}
