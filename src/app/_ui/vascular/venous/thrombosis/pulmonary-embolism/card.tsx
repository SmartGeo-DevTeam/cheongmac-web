import type { PulmonaryEmbolismSymptom } from '@/app/_types/vascular/venous/thrombosis/pulmonary-embolism';
import Image from 'next/image';

type PulmonaryEmbolismCardProps = {
  item: PulmonaryEmbolismSymptom;
  number: number;
};

export default function PulmonaryEmbolismCard({
  item,
  number,
}: PulmonaryEmbolismCardProps) {
  return (
    <>
      <div
        className={`relative aspect-236/220 rounded-[20px] overflow-clip bg-subtle`}
      >
        {item.image && (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="25vw"
            className={`object-cover`}
          />
        )}
      </div>

      <div className={`mt-5 px-2 flex gap-2`}>
        <span
          className={`size-8 shrink-0 flex justify-center items-center rounded-full bg-primary font-extrabold text-[15px] text-inverse`}
        >
          {String(number).padStart(2, '0')}
        </span>

        <p className={`relative top-px text-mo-heading-1`}>{item.title}</p>
      </div>
    </>
  );
}
