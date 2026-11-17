import type { ArterialSymptomComparisonCondition } from '@/app/_data/vascular/arterial/symptom-comparison/conditions';
import Image from 'next/image';

export default function SpinalStenosisCard({
  condition,
}: {
  condition: ArterialSymptomComparisonCondition;
}) {
  return (
    <li
      className="rounded-lg overflow-clip bg-base
      xl:rounded-[20px]"
    >
      <div className="relative aspect-520/300">
        <Image src={condition.image} alt="" fill />
      </div>
      <div
        className="mt-5 flex justify-center gap-1
        xl:mt-10 xl:flex-col xl:items-center xl:gap-0"
      >
        <span
          className="hidden
          xl:flex xl:font-medium xl:text-[20px]"
        >
          {condition.alternateTitle}
        </span>
        <div>
          <h3
            className="flex items-center gap-1 text-mo-heading-1
            xl:font-bold xl:text-[34px]"
          >
            <span>{condition.title}</span>
            <span className="xl:hidden">({condition.alternateTitle})</span>
          </h3>
        </div>
      </div>

      <div
        className="mt-5 px-6 pb-5 divide-y divide-default
        xl:mt-10 xl:px-15"
      >
        {condition.symptoms.map((symptom) => (
          <div
            key={symptom.label}
            className="py-3 grid grid-cols-[auto_auto] justify-between
            xl:py-6"
          >
            <span
              className="text-[#767C88]
              xl:text-[20px]"
            >
              {symptom.label}
            </span>
            <p
              className="text-mo-body-1
              xl:font-semibold text-[22px]"
            >
              {symptom.value}
            </p>
          </div>
        ))}
      </div>
    </li>
  );
}
