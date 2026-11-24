import Image from 'next/image';
import type { PelvicStatistic } from '@/app/_types/vascular/venous/pelvic/statistics';

type PelvicStatisticsItemProps = {
  id: string;
  item: PelvicStatistic;
  isImageFirst: boolean;
};

export default function PelvicStatisticsItem({
  id,
  item,
  isImageFirst,
}: PelvicStatisticsItemProps) {
  const image = (
    <div className={`relative w-full h-full`}>
      <Image
        src={item.image}
        alt=""
        fill
        sizes="(min-width: 1280px) 427px, 50vw"
        className={`object-cover`}
      />
    </div>
  );

  const content = (
    <div
      className={`px-5 py-8 bg-gray-50
        xl:px-12 xl:pt-30 xl:pb-10`}
    >
      <h3
        className={`font-extrabold text-[26px] text-cm-orange-700
          xl:text-pc-title-1`}
      >
        {item.value}
      </h3>
      <p
        className={`break-keep font-medium text-[15px]
          xl:mt-1 xl:text-pc-heading-1`}
      >
        {item.description}
      </p>
    </div>
  );

  return (
    <li
      id={id}
      className={`grid grid-cols-2
        xl:grid-cols-1 xl:grid-rows-2`}
    >
      {isImageFirst ? (
        <>
          {image}
          {content}
        </>
      ) : (
        <>
          {content}
          {image}
        </>
      )}
    </li>
  );
}
