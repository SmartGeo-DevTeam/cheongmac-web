import Inner from '@/app/_components/common/inner';
import HospitalizedDischarge from './discharge';
import HospitalizedLiving from './living';
import HospitalizedPreparation from './preparation';
import HospitalizedRelatedLinks from './related-links';
import HospitalizedStepNavigation from './step-navigation';

export type HospitalizedStep = 1 | 2 | 3;

const sections = {
  1: HospitalizedPreparation,
  2: HospitalizedLiving,
  3: HospitalizedDischarge,
} as const;

export default function HospitalizedContent({
  currentStep,
}: {
  currentStep: HospitalizedStep;
}) {
  const Sections = sections[currentStep];

  return (
    <>
      {/* 공통 단계 선택: 입원준비 / 입원생활 / 퇴원절차 */}
      <section id="guide-hospitalized-steps">
        <Inner>
          <HospitalizedStepNavigation currentStep={currentStep} />
        </Inner>
      </section>

      {/* 현재 단계에 해당하는 섹션만 렌더링 */}
      <Sections />

      {/* 모든 단계 공통 · 공유 / 관련 페이지 */}
      <HospitalizedRelatedLinks />
    </>
  );
}
