import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import type {
  AdditionalTreatmentsContent,
  TreatmentMethod,
} from '@/app/_types/vascular/treatment-method';
import type { ReactNode } from 'react';
import TreatmentAdditional from './additional';
import TreatmentDetail from './detail';
import TreatmentSelector from './selector';

type ClinicTreatmentsProps = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  additionalTreatments?: AdditionalTreatmentsContent;
  className?: string;
} & (
  | {
      mode?: 'tabs';
      ariaLabel: string;
      methods: readonly TreatmentMethod[];
      method?: never;
    }
  | {
      mode: 'standalone';
      method: TreatmentMethod;
      ariaLabel?: never;
      methods?: never;
    }
);

/** 치료법 섹션의 반응형 제목·선택 방식·상세정보 공통 조립. */
export default function ClinicTreatments(props: ClinicTreatmentsProps) {
  const { id, title, description, additionalTreatments, className = '' } = props;

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
          {description && (
            <p
              className={`mt-5 break-keep text-mo-body-1 text-secondary
                xl:mx-auto xl:text-pc-body-1 xl:text-center xl:text-primary`}
            >
              {description}
            </p>
          )}
          {props.mode === 'standalone' ? (
            <TreatmentDetail id={id} method={props.method} mode="standalone" />
          ) : (
            <TreatmentSelector id={id} ariaLabel={props.ariaLabel} methods={props.methods} />
          )}
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
