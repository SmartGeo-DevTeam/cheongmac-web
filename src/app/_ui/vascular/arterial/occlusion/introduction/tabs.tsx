'use client';

import { occlusionIntroductionSymptoms } from '@/app/_data/vascular/arterial/occlusion/introduction/symptoms';
import { useEffect, useRef } from 'react';

type Props = {
  activeIndex: number;
  onTabChange: (index: number) => void;
  onHeightChange: (height: number) => void;
};

export default function OcclusionIntroductionTabs({
  activeIndex,
  onTabChange,
  onHeightChange,
}: Props) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // PC에서 고정 탭의 실제 높이를 측정해 이미지가 첫 행부터 시작하도록 유지합니다.
  useEffect(() => {
    const tabs = tabsRef.current;
    if (!tabs) return;

    const measure = () => {
      onHeightChange(Math.ceil(tabs.getBoundingClientRect().height));
    };

    measure();
    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(measure);
    observer.observe(tabs);
    return () => observer.disconnect();
  }, [onHeightChange]);

  // 모바일에서 활성 탭이 화면 밖에 있으면 탭 목록만 좌우로 스크롤합니다.
  useEffect(() => {
    const scroller = tabsRef.current;
    const tab = activeTabRef.current;
    if (!scroller || !tab) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    const left =
      scroller.scrollLeft +
      (tabRect.left - scrollerRect.left) -
      (scroller.clientWidth - tab.clientWidth) / 2;

    scroller.scrollTo({ left, behavior: 'smooth' });
  }, [activeIndex]);

  return (
      <div
        ref={tabsRef}
        className="mt-10 pl-5 pr-10 flex flex-nowrap items-center gap-3 overflow-x-scroll
        xl:col-start-2 xl:row-start-1 xl:m-0 xl:p-0 xl:gap-6 xl:pointer-events-auto"
        role="tablist"
        aria-label="하지동맥폐색증 증상 선택"
      >
        {occlusionIntroductionSymptoms.map((tab, index) => (
          <button
            key={tab.id}
            ref={activeIndex === index ? activeTabRef : undefined}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            onClick={() => onTabChange(index)}
            className={
              activeIndex === index
                ? `font-bold text-nowrap text-[18px] underline underline-offset-7
                   xl:text-[26px]`
                : `font-bold text-nowrap text-[18px] text-tertiary
                   xl:text-[26px]`
            }
          >
            {tab.label}
          </button>
        ))}
      </div>
  );
}
