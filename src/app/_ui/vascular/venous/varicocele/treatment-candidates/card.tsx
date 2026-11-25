import type { VaricoceleInformationItem } from '@/app/_types/vascular/venous/varicocele/information-item';
import Image from 'next/image';

type VaricoceleTreatmentCandidateCardProps = {
  item: VaricoceleInformationItem;
  number: number;
};

export default function VaricoceleTreatmentCandidateCard({
  item,
  number,
}: VaricoceleTreatmentCandidateCardProps) {
  return (
    <>
      <div
        className={`relative w-full aspect-820/500 rounded-2xl overflow-hidden bg-gray-100`}
      >
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className={`object-cover`}
        />
      </div>

      <div
        className={`mt-5 px-2
        xl:mt-6`}
      >
        <div
          className={`flex items-start gap-2
            xl:gap-3`}
        >
          <span
            className={`shrink-0 size-8 flex justify-center items-center rounded-full bg-primary font-extrabold text-[15px] text-inverse
              xl:size-10 xl:text-[18px]`}
          >
            {String(number).padStart(2, '0')}
          </span>

          <h4
            className={`relative top-px text-mo-heading-1
            xl:text-pc-heading-1`}
          >
            {item.title}
          </h4>
        </div>

        <p
          className={`mt-3 break-keep text-mo-body-2
          xl:text-pc-body-2`}
        >
          {item.description}
        </p>
      </div>
    </>
  );
}
