import type { PelvicRelatedDisease } from '@/app/_types/vascular/venous/pelvic/related';
import { Check } from 'lucide-react';
import PelvicRelatedCard from './card';

type PelvicRelatedSlideContentProps = {
  cardId: string;
  disease: PelvicRelatedDisease;
  isActive: boolean;
  onSelect: () => void;
};

export default function PelvicRelatedSlideContent({
  cardId,
  disease,
  isActive,
  onSelect,
}: PelvicRelatedSlideContentProps) {
  return (
    <>
      {/* 증상 말풍선 */}
      <button
        type="button"
        onClick={onSelect}
        className={`
          relative px-5 py-4 flex justify-center items-center rounded-xl bg-brand break-keep whitespace-pre-line font-bold text-[16px] leading-[140%] text-center text-white shadow-[0_1px_4px_0_#00000012]
          after:absolute after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:size-4 after:rotate-45 after:bg-brand after:shadow-[2px_2px_3px_0_#0000000A]
          xl:px-7 xl:py-6 xl:font-bold xl:text-[26px]
          `}
      >
        {disease.question}
      </button>

      {/* PC 연결선 및 체크 아이콘 */}
      <div
        aria-hidden="true"
        className={`hidden
          xl:relative xl:mt-6 xl:h-11 xl:flex xl:justify-center xl:items-center`}
      >
        <span
          className={`absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2
            ${isActive ? 'bg-action-secondary-hover' : 'bg-gray'}
            `}
        />
        <span
          className={`relative size-11 flex justify-center items-center rounded-full
            ${isActive ? 'bg-action-secondary-hover' : 'bg-gray'}
            `}
        >
          <Check className={`size-7 text-inverse`} />
        </span>
      </div>

      {/* PC 질환 유형 배지 */}
      <div
        className={`hidden
          xl:mt-6 xl:flex xl:justify-center`}
      >
        <span
          className={`px-3 py-1.5 rounded-md bg-action-secondary-hover text-pc-label text-inverse`}
        >
          {disease.category}
        </span>
      </div>

      {/* 질환 설명 카드 */}
      <div
        className={`flex-1 flex flex-col
          xl:px-5`}
      >
        <PelvicRelatedCard id={cardId} disease={disease} />
      </div>
    </>
  );
}
