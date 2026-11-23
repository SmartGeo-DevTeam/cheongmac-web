import type { ReactNode } from 'react';

type ClinicSplitHeadingProps = {
  isDesktopSticky?: boolean;
  theme?: 'light' | 'dark';
  labelVariant?: LabelVariant;
  label?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
};

type LabelVariant = 'green-300' | 'accent' | 'disabled';

const labelColors: Record<LabelVariant, string> = {
  'green-300': 'text-green-300',
  accent: 'text-accent',
  disabled: 'text-disabled',
};

/** ClinicSplitLayout leading 영역의 독립적인 제목 UI. */
export default function ClinicSplitHeading({
  isDesktopSticky = false,
  theme = 'dark',
  labelVariant = 'accent',
  label,
  title,
  description,
}: ClinicSplitHeadingProps) {
  return (
    <div
      className={`
        px-5
        ${isDesktopSticky ? `xl:sticky xl:top-28` : ``}
        ${theme === 'light' ? `text-inverse` : ``}
        `}
    >
      {label && (
        <span
          className={`font-medium text-[20px]
            xl:text-[26px]
            ${labelColors[labelVariant]}
            `}
        >
          {label}
        </span>
      )}
      <h2
        className="mt-2 text-[36px] leading-[130%]
        xl:mt-6 xl:text-[60px] xl:leading-[125%]"
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-5 text-mo-body-1 text-[#767C88]
          xl:text-pc-body-2 xl:text-secondary"
        >
          {description}
        </p>
      )}
    </div>
  );
}
