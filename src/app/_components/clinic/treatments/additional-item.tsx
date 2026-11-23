import type { AdditionalTreatmentItem } from '@/app/_types/vascular/treatment-method';
import Image from 'next/image';

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
      className={`shrink-0 p-5 flex flex-col justify-center items-center gap-1 rounded-[20px] bg-base
        xl:px-10 xl:py-2 xl:flex-row xl:gap-2`}
    >
      <Image
        src={item.image.src}
        alt={item.image.alt}
        width={64}
        height={64}
        className={`size-16 shrink-0 object-cover
          xl:size-18`}
      />
      <span
        className={`shrink-0 inline-block font-bold text-mo-body-1
          xl:text-mo-title-2`}
      >
        {item.title}
      </span>
    </li>
  );
}
