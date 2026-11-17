import ClinicLinkButton from '@/app/_components/clinic/link-button';
import Inner from '@/app/_components/common/inner';
import SectionHeading from '@/app/_components/clinic/section-heading';
import ArterialBestCasesCarousel from './carousel';

export default function ArterialBestCases() {
  return (
    <section id="vascular-arterial-best-cases">
      <Inner>
        <SectionHeading
          mtVariant="xl"
          label="압도적인 임상 경험으로 증명합니다"
          labelVariant="accent"
          title={<b>BEST 치료사례</b>}
        />
      </Inner>

      <ArterialBestCasesCarousel />

      <Inner>
        <div
          className="mt-10 flex items-center justify-center
          xl:mt-20"
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
