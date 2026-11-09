import Inner from '@/app/_components/common/inner';
import DischargeSections from '../../_sections/_discharge';
import LivingSections from '../../_sections/_living';
import PreparationSections from '../../_sections/_preparation';
import Related from '../../_sections/_related';
import Step from '../_step';

export type HospitalizedStep = 1 | 2 | 3;

const sections = {
  1: PreparationSections,
  2: LivingSections,
  3: DischargeSections,
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
          <Step currentStep={currentStep} />
        </Inner>
      </section>

      {/* 현재 단계에 해당하는 섹션만 렌더링 */}
      <Sections />

      {/* 모든 단계 공통 · 공유 / 관련 페이지 */}
      <Related />
    </>
  );
}
