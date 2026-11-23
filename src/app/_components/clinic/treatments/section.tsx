import type { ReactNode } from 'react';
import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import type { TreatmentMethod } from '@/app/_types/vascular/treatment-method';
import TreatmentSelector from './selector';

type ClinicTreatmentsProps = {
  id: string;
  ariaLabel: string;
  title: ReactNode;
  methods: readonly TreatmentMethod[];
};

/** 치료법 섹션의 반응형 제목·탭·상세정보 공통 조립. */
export default function ClinicTreatments({
  id,
  ariaLabel,
  title,
  methods,
}: ClinicTreatmentsProps) {
  return (
    <section id={id}>
      <div className={`mt-15 pb-15 bg-[#F2F2F2]`}>
        <Inner>
          <SectionHeading
            mtVariant="lg"
            label="Treatment · 치료법"
            labelVariant="disabled"
            title={title}
          />
          <TreatmentSelector id={id} ariaLabel={ariaLabel} methods={methods} />
        </Inner>
      </div>
    </section>
  );
}
