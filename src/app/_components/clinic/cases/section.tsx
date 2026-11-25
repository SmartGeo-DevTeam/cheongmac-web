import ClinicLinkButton from '@/app/_components/clinic/link-button';
import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import type { ClinicCasePreview } from '@/app/_types/vascular/clinic-case';
import type { ReactNode } from 'react';
import ClinicCasesCarousel from './carousel';

type ClinicCasesProps = {
  id: string;
  items: readonly ClinicCasePreview[];
  categoryLabel: string;
  title: ReactNode;
  description?: ReactNode;
  moreHref: string;
};

/** 동맥·정맥 상세 페이지가 공유하는 치료사례 섹션. */
export default function ClinicCases({
  id,
  items,
  categoryLabel,
  title,
  description,
  moreHref,
}: ClinicCasesProps) {
  return (
    <section id={id}>
      <Inner>
        <SectionHeading
          mtVariant="lg"
          label="Cases · 실제 치료 사례"
          labelVariant="disabled"
          title={title}
          description={description}
        />
      </Inner>

      <ClinicCasesCarousel
        id={id}
        items={items}
        categoryLabel={categoryLabel}
      />

      <Inner>
        <div
          className={`mt-10 flex justify-center items-center
            xl:mt-20`}
        >
          <ClinicLinkButton href={moreHref} title="치료사례 더보기" />
        </div>
      </Inner>
    </section>
  );
}
