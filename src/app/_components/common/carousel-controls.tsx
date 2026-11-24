'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type CarouselControlsProps = {
  id: string;
  variant?: 'compact' | 'responsive';
  items: readonly { id: string; ariaLabel: string }[];
  activeIndex: number;
  previousAriaLabel: string;
  nextAriaLabel: string;
  paginationAriaLabel: string;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
};

/** 캐러셀의 이동 방식과 무관한 공통 이전·다음 버튼 및 페이지네이션. */
export default function CarouselControls({
  id,
  variant = 'responsive',
  items,
  activeIndex,
  previousAriaLabel,
  nextAriaLabel,
  paginationAriaLabel,
  onPrevious,
  onNext,
  onSelect,
}: CarouselControlsProps) {
  const isCompact = variant === 'compact';
  const buttonClassName = isCompact
    ? `size-9 flex justify-center items-center rounded-full bg-base shadow-[0_0_10px_0_#0000000F]`
    : `size-9 flex justify-center items-center rounded-full shadow-[0_0_10px_0_rgba(0,0,0,0.06)]
      xl:size-15`;
  const iconClassName = isCompact ? 'size-5' : `size-5
    xl:size-8`;

  return (
    <div
      id={id}
      className={isCompact ? `mt-10 flex justify-center items-center gap-5` : `mt-10 flex justify-center items-center gap-5
        xl:mt-15 xl:gap-15`}
    >
      <button
        type="button"
        aria-label={previousAriaLabel}
        onClick={onPrevious}
        className={buttonClassName}
      >
        <ChevronLeft className={iconClassName} aria-hidden="true" />
      </button>
      <div role="group" aria-label={paginationAriaLabel} className={`flex items-center gap-2`}>
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          const dotClassName = isCompact
            ? `h-2 rounded-full transition-[width,background-color] duration-300 ${isActive ? 'w-6 bg-accent-ai' : 'w-2 bg-gray-150'}`
            : `h-2 rounded-full
              xl:h-2.5
              ${isActive ? `w-6 bg-accent-ai
                xl:w-8` : `w-2 bg-gray-150
                xl:w-2.5`}`;

          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.ariaLabel}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => onSelect(index)}
              className={dotClassName}
            />
          );
        })}
      </div>
      <button
        type="button"
        aria-label={nextAriaLabel}
        onClick={onNext}
        className={buttonClassName}
      >
        <ChevronRight className={iconClassName} aria-hidden="true" />
      </button>
    </div>
  );
}
