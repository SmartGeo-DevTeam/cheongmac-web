import type { OcclusionMechanismStage } from '@/app/_types/vascular/arterial/occlusion/mechanism';

const badgeColors = [
  'bg-[#FAA385]',
  'bg-[#F58861]',
  'bg-[#E04C36]',
  'bg-[#A81321]',
] as const;

type Props = {
  stage: OcclusionMechanismStage;
  index: number;
};

export default function OcclusionMechanismItem({ stage, index }: Props) {
  return (
    <li
      className="px-3 py-2 rounded-full border border-default flex items-center gap-4
      xl:flex xl:flex-col xl:gap-0 xl:border-0"
    >
      <div
        className="hidden
        xl:block xl:size-3 xl:rounded-full xl:bg-gray-500"
      />
      <div
        className="hidden
        xl:block xl:w-px xl:h-13 xl:border-r xl:border-gray-500 xl:border-dashed"
      />
      <span
        className={`shrink-0 px-3 py-1.5 rounded-full ${badgeColors[index]} font-bold text-[14px] text-white
        xl:mt-3 xl:px-5 xl:py-1 xl:text-[16px]`}
      >
        {stage.label}
      </span>
      <p
        className="text-[14px]
        xl:mt-3 xl:text-center xl:text-pc-body-2"
      >
        {stage.description}
      </p>
    </li>
  );
}
