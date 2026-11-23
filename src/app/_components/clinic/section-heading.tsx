import type { ReactNode } from 'react';

type mtVariant = 'none' | 'base' | 'lg' | 'xl';

type LabelVariant = 'disabled' | 'accent' | 'green';

type SectionHeadingProps = {
  label: string;
  labelVariant?: LabelVariant;
  /** 특정 섹션에서만 필요한 반응형 label 색상 등. 지정 시 labelVariant 대신 사용합니다. */
  labelClassName?: string;
  mtVariant?: mtVariant;
  title: ReactNode;
  description?: ReactNode;
};

const mtSizes: Record<mtVariant, string> = {
  none: '',
  base: 'pt-10 xl:pt-30',
  lg: 'pt-20 xl:pt-40',
  xl: 'pt-30 xl:pt-50',
};

const labelColors: Record<LabelVariant, string> = {
  disabled: 'text-disabled',
  accent: 'text-accent',
  green: 'text-green-500',
};

export default function SectionHeading({
  mtVariant = 'base',
  label,
  labelVariant = 'disabled',
  labelClassName,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div
      className={`
        break-keep
        ${mtSizes[mtVariant]}
        `}
    >
      <div className={`text-center`}>
        <span
          className={`font-semibold text-[15px]
            xl:font-medium xl:text-[24px]
            ${labelClassName ?? labelColors[labelVariant]}
            `}
        >
          {label}
        </span>
        <h2
          className={`mt-2 text-[28px] leading-[140%]
            xl:text-[56px]`}
        >
          {title}
        </h2>
        {description && (
          <p
            className="mt-5 text-mo-body-1 text-secondary
            xl:mx-auto xl:w-4/5 xl:text-pc-body-1"
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
