import Inner from '@/app/_components/common/inner';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Step from '../_components/step';
import DischargeSections from '../_sections/discharge';
import LivingSections from '../_sections/living';
import PreparationSections from '../_sections/preparation';
import Related from '../_sections/related';

const HOSPITALIZED_STEPS = {
  preparation: {
    number: 1,
    title: '입원준비',
    Sections: PreparationSections,
  },
  living: {
    number: 2,
    title: '입원생활',
    Sections: LivingSections,
  },
  discharge: {
    number: 3,
    title: '퇴원절차',
    Sections: DischargeSections,
  },
} as const;

type StepSlug = keyof typeof HOSPITALIZED_STEPS;

type PageProps = {
  params: Promise<{ step: string }>;
};

function isStepSlug(step: string): step is StepSlug {
  return Object.prototype.hasOwnProperty.call(HOSPITALIZED_STEPS, step);
}

// 고정된 세 단계의 경로를 미리 생성합니다.
export function generateStaticParams() {
  return (Object.keys(HOSPITALIZED_STEPS) as StepSlug[]).map((step) => ({
    step,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { step } = await params;

  if (!isStepSlug(step)) {
    return { title: '입·퇴원안내' };
  }

  return { title: `${HOSPITALIZED_STEPS[step].title} | 입·퇴원안내` };
}

export default async function GuideHospitalizedStepPage({ params }: PageProps) {
  const { step } = await params;

  if (!isStepSlug(step)) {
    notFound();
  }

  const { number, Sections } = HOSPITALIZED_STEPS[step];

  return (
    <>
      {/* 공통 단계 선택: 입원준비 / 입원생활 / 퇴원절차 */}
      <section id="guide-hospitalized-steps">
        <Inner>
          <Step currentStep={number} />
        </Inner>
      </section>

      {/* URL에 대응하는 단계의 섹션만 렌더링 */}
      <Sections />

      {/* 모든 단계 공통 · 안내 공유 / 관련 페이지 바로가기 */}
      <Related />
    </>
  );
}
