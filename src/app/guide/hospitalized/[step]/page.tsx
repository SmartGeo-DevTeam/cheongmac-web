import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HospitalizedContent from '../_components/hospitalized-content';

const HOSPITALIZED_STEPS = {
  preparation: { number: 1, title: '입원준비' },
  living: { number: 2, title: '입원생활' },
  discharge: { number: 3, title: '퇴원절차' },
} as const;

type StepSlug = keyof typeof HOSPITALIZED_STEPS;

type PageProps = {
  params: Promise<{ step: string }>;
};

function isStepSlug(step: string): step is StepSlug {
  return Object.prototype.hasOwnProperty.call(HOSPITALIZED_STEPS, step);
}

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

  return <HospitalizedContent currentStep={HOSPITALIZED_STEPS[step].number} />;
}
