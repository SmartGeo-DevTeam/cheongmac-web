import type { ClinicSymptomComparisonCondition } from '@/app/_types/vascular/symptom-comparison';
import Image from 'next/image';

export default function ClinicSymptomComparisonCard({
  id,
  condition,
  variant,
}: {
  id: string;
  condition: ClinicSymptomComparisonCondition;
  variant: 'base' | 'brand';
}) {
  const isBrand = variant === 'brand';

  return (
    <li
      id={id}
      className={`rounded-lg overflow-clip ${isBrand ? 'bg-brand' : 'bg-base'} xl:rounded-[20px]`}
    >
      <div className="relative aspect-520/300">
        <Image
          src={condition.image}
          alt={condition.imageAlt ?? ''}
          fill
          sizes="(min-width: 1280px) 50vw, 100vw"
        />
      </div>
      <div
        className={`mt-5 flex justify-center gap-1 ${isBrand ? 'text-white' : ''} xl:mt-10 xl:flex-col xl:items-center xl:gap-0`}
      >
        <span
          className="hidden
          xl:flex xl:min-h-[30px] xl:font-medium xl:text-[20px]"
        >
          {condition.alternateTitle}
        </span>
        <div>
          <h3
            className="flex flex-wrap justify-center items-center gap-1 text-mo-heading-1
            xl:font-bold xl:text-[34px]"
          >
            <span>{condition.title}</span>
            {condition.alternateTitle && (
              <span className="xl:hidden">({condition.alternateTitle})</span>
            )}
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
            className="py-3 grid grid-cols-[auto_minmax(0,1fr)] justify-between gap-2
            xl:py-6"
          >
            <span
              className={`${isBrand ? 'text-green-300' : 'text-[#767C88]'} xl:text-[20px]`}
            >
              {symptom.label}
            </span>
            <p
              className={`text-mo-body-1 ${isBrand ? 'text-white' : ''} text-right xl:font-semibold xl:text-[22px]`}
            >
              {symptom.value}
            </p>
          </div>
        ))}
      </div>
    </li>
  );
}
