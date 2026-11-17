import type { ArterialProgressionStepType } from '@/app/_data/vascular/arterial/progression/steps';
import Image from 'next/image';

const backgrounds = ['bg-gray-50', 'bg-gray-100', 'bg-gray-150', 'bg-gray-200'] as const;
const badges = ['bg-[#FAA385]', 'bg-[#F58861]', 'bg-[#E04C36]', 'bg-[#A81321]'] as const;

export default function ArterialProgressionItem({
  item,
  index,
}: {
  item: ArterialProgressionStepType;
  index: number;
}) {
  return (
    <li
      className={`w-full px-7 py-5 flex flex-col items-center rounded-lg overflow-clip ${backgrounds[index]} text-center
    xl:py-7 xl:rounded-[20px]`}
    >
      <div className="relative size-50 rounded-full overflow-clip">
        <Image src={item.image} alt="" fill />
      </div>
      <div className="mt-5 font-bold">
        <span
          className={`px-3 py-1.5 rounded-full ${badges[index]} text-[14px] text-inverse
        xl:px-5 xl:font-bold xl:text-[16px]`}
        >
          {item.stage}
        </span>
        <h3
          className="mt-2 text-[16px]
        xl:font-bold xl:text-[24px]"
        >
          {item.title}
        </h3>
        <p
          className="text-mo-body-2
        xl:mt-2 xl:mx-auto xl:w-4/5 xl:text-pc-body-2"
        >
          {item.description}
        </p>
      </div>
    </li>
  );
}
