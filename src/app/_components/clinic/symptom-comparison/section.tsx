import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import type { ClinicSymptomComparisonCondition } from '@/app/_types/vascular/symptom-comparison';
import type { ComponentProps, ReactNode } from 'react';
import ClinicSymptomComparisonCard from './card';

type ClinicSymptomComparisonProps = {
  id: string;
  heading: ComponentProps<typeof SectionHeading>;
  children?: ReactNode;
  leftCondition: ClinicSymptomComparisonCondition;
  rightCondition: ClinicSymptomComparisonCondition;
};

export default function ClinicSymptomComparison({
  id,
  heading,
  children,
  leftCondition,
  rightCondition,
}: ClinicSymptomComparisonProps) {
  return (
    <section id={id}>
      <div
        className="mt-20 py-15 bg-[#F0F0F0]
        xl:mt-30 xl:py-30"
      >
        <Inner>
          <SectionHeading mtVariant="none" labelVariant="accent" {...heading} />

          <ul
            className="relative mt-10 grid gap-1
            xl:mt-20 xl:grid-cols-[1fr_auto_1fr] xl:gap-3"
          >
            <ClinicSymptomComparisonCard id={`${id}-left`} condition={leftCondition} variant="base" />

            <li className="relative z-1" aria-hidden="true">
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-16 flex justify-center items-center rounded-full bg-orange-700 font-black text-[20px] text-inverse
                xl:size-22.5 xl:text-[40px]"
              >
                VS
              </div>
            </li>

            <ClinicSymptomComparisonCard id={`${id}-right`} condition={rightCondition} variant="brand" />
          </ul>

          {children}
        </Inner>
      </div>
    </section>
  );
}
