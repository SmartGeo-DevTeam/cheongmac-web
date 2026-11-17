import { Check } from 'lucide-react';

export default function ArterialSelfDiagnosisItem({
  label,
}: {
  label: string;
}) {
  return (
    <button
      className="w-full py-3.5 flex items-center gap-3
      xl:px-7 xl:py-6 xl:gap-4 xl:rounded-[20px] xl:border xl:border-default"
    >
      <div
        className="shrink-0 size-6 flex justify-center items-center rounded-full bg-gray
        xl:size-8.5"
      >
        <Check
          className="size-4 text-white
          xl:size-6"
        />
      </div>
      <p
        className="text-left font-medium text-[14px] leading-[140%]
        xl:text-[20px]"
      >
        {label}
      </p>
    </button>
  );
}
