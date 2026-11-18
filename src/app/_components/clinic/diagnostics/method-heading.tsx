import type { DiagnosticMethod } from '@/app/_types/clinic/diagnostics';

type MethodHeadingProps = Pick<DiagnosticMethod, 'eyebrow' | 'title' | 'description'>;

export default function MethodHeading({ eyebrow, title, description }: MethodHeadingProps) {
  return (
    <div>
      <span className="text-mo-caption text-disabled xl:text-pc-heading-2">
        {eyebrow}
      </span>
      <h3 className="mt-2 leading-[135%] font-bold text-[24px] text-gray-900 xl:mt-3 xl:text-pc-title-1">
        {title}
      </h3>
      <p className="mt-2 text-mo-body-2 text-gray-900 xl:text-pc-body-1">
        {description}
      </p>
    </div>
  );
}
