import Image from 'next/image';
import type { AdditionalTreatmentItem } from '@/app/_types/vascular/treatment-method';

type TreatmentAdditionalItemProps = {
  id: string;
  item: AdditionalTreatmentItem;
};

/** 선택적 보조 치료 카드. */
export default function TreatmentAdditionalItem({
  id,
  item,
}: TreatmentAdditionalItemProps) {
  return (
    <li
      id={id}
      className={`min-w-0 min-h-34 px-2 py-4 flex flex-col justify-center items-center gap-2 rounded-[24px] bg-base
        xl:min-h-24 xl:px-4 xl:py-3 xl:flex-row xl:gap-3 xl:rounded-[20px]`}
    >
      <Image
        src={item.image.src}
        alt={item.image.alt}
        width={128}
        height={128}
        className={`size-16 shrink-0 object-contain
          xl:size-18`}
      />
      <span
        className={`break-keep font-bold text-[15px] leading-[130%] text-center text-primary
          xl:text-[18px] xl:text-left`}
      >
        {item.title}
      </span>
    </li>
  );
}
