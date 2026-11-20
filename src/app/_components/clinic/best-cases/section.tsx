import Inner from '@/app/_components/common/inner';
import ClinicLinkButton from '../link-button';
import SectionHeading from '../section-heading';
import type { BestCase } from '@/app/_types/vascular/best-case';
import BestCasesCarousel from './carousel';

type BestCasesSectionProps = {
  id: string;
  cases: readonly BestCase[];
};

export default function BestCasesSection({ id, cases }: BestCasesSectionProps) {
  return (
    <section id={id}>
      <Inner>
        <SectionHeading
          mtVariant="xl"
          label="압도적인 임상 경험으로 증명합니다"
          labelVariant="accent"
          title={<b>BEST 치료사례</b>}
        />
      </Inner>

      <BestCasesCarousel id={id} cases={cases} />

      <Inner>
        <div
          className={`mt-10 flex justify-center items-center
            xl:mt-20`}
        >
          <ClinicLinkButton
            href="/community/cases"
            title="치료사례 바로가기"
            backgroundColor="green-900"
          />
        </div>
      </Inner>
    </section>
  );
}
