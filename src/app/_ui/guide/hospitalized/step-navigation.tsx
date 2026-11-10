import Link from 'next/link';

type HospitalizedStep = 1 | 2 | 3;

const steps: { id: HospitalizedStep; label: string; slug: string }[] = [
  { id: 1, label: '입원준비', slug: 'preparation' },
  { id: 2, label: '입원생활', slug: 'living' },
  { id: 3, label: '퇴원절차', slug: 'discharge' },
];

export default function HospitalizedStepNavigation({
  currentStep,
}: {
  currentStep: HospitalizedStep;
}) {
  return (
    <div
      aria-label="입·퇴원안내 단계"
      className="mt-10 grid grid-cols-3 gap-1
      xl:mt-20 xl:px-50 xl:gap-2"
    >
      {steps.map((step) => {
        const isActive = currentStep === step.id;

        return (
          <Link
            key={step.id}
            href={step.id === 1 ? '/guide/hospitalized' : `/guide/hospitalized/${step.slug}`}
            aria-current={isActive ? 'step' : undefined}
            data-active={isActive}
          >
            <div
              className={`relative flex flex-col items-center
                before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-full before:h-1
                xl:before:h-1.5
                ${isActive ? 'before:bg-action-secondary-hover' : 'before:bg-gray'}
                ${step.id === 1 ? 'before:rounded-l-full' : ''}
                ${step.id === 3 ? 'before:rounded-r-full' : ''}
              `}
            >
              <span
                className={`relative size-7 flex justify-center items-center rounded-full font-extrabold text-[16px]
                  xl:size-9 xl:text-[18px]
                  ${
                    isActive
                      ? 'bg-action-secondary-hover text-inverse'
                      : 'bg-gray text-secondary'
                  }
                `}
              >
                {step.id}
              </span>
            </div>

            <p
              className={`mt-3 text-center text-[16px]
                xl:mt-4 xl:text-[20px]
                ${
                  isActive
                    ? 'font-bold text-action-secondary-hover'
                    : 'font-medium text-secondary'
                }`}
            >
              {step.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
