import Image from 'next/image';
import type { HistoryYearType } from '@/app/_data/about/introduction/history/history';

export default function IntroductionHistoryHistoryItem({ item }: { item: HistoryYearType }) {
  return (
    <li
      className={`relative px-2.5 bg-white first:pt-2.5
      xl:pl-20 xl:first:pt-20 xl:w-1/2`}
    >
      {/* 연도별 이미지 */}
      <div
        className={`relative w-full aspect-video rounded-xl overflow-clip
        xl:max-w-152`}
      >
        <Image
          src={`/introduction/history/${item.year}.png`}
          alt={`${item.year}`}
          fill
          className={`object-cover`}
        />
      </div>

      {/* 타임라인 */}
      <div
        className={`relative pt-4 pb-16
        before:absolute before:left-4 before:top-0 before:h-full before:w-0.5 before:-translate-x-1/2 before:bg-[#E9E9E9]
        xl:pt-8 xl:pb-20
        `}
      >
        {/* 연도 */}
        <h3
          className={`relative pl-9 font-bold text-[27px]
          before:absolute before:left-4 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:size-5 before:rounded-full before:bg-orange-500/30
          after:absolute after:left-4 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:size-2.5 after:rounded-full after:bg-accent
          xl:text-[42px]
          xl:before:size-6
          xl:after:size-3
          `}
        >
          {item.year}
        </h3>

        {/* 연혁 */}
        <ul
          className={`mt-1 ml-9 pl-5 list-disc space-y-1
          xl:mt-3 xl:pl-6 xl:space-y-2 xl:text-pc-body-2`}
        >
          {item.events.map((event, index) => (
            <li key={`${item.year}-${index}`}>{event}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}
