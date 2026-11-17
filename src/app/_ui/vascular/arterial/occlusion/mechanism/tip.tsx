import { occlusionMechanismTipActions } from '@/app/_data/vascular/arterial/occlusion/mechanism/tips';
import { ChevronRight } from 'lucide-react';

export default function OcclusionMechanismTip() {
  return (
    <div
      className="my-5 p-5 rounded-lg bg-green-50
      xl:mt-25 xl:mb-15 xl:px-10 xl:py-6 xl:flex xl:justify-between xl:items-end"
    >
      <div
        className="flex items-center gap-2
        xl:block"
      >
        <span
          className="text-mo-label text-accent-ai-strong
          xl:text-pc-label"
        >
          Tip!
        </span>
        <p
          className="text-mo-heading-2
          xl:text-pc-heading-1"
        >
          수술 없이 관리하는 방법
        </p>
      </div>
      <div
        className="mt-3 grid grid-cols-2 gap-2
        xl:flex xl:items-center xl:gap-3"
      >
        {occlusionMechanismTipActions.map((action) => (
          <button
            key={action.id}
            type="button"
            className="px-6 py-2 flex justify-between items-center rounded-full bg-white
            xl:px-7 xl:py-3 xl:gap-8"
          >
            <p
              className="font-bold text-mo-body-1
              xl:font-bold xl:text-[17px]"
            >
              {action.label}
            </p>
            <ChevronRight
              className="size-5
              xl:size-6"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
