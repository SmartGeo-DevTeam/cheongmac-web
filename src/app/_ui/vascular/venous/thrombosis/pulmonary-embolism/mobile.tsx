import {
  pulmonaryEmbolismChevronImage,
  pulmonaryEmbolismMobileImages,
} from '@/app/_data/vascular/venous/thrombosis/pulmonary-embolism/items';
import type { PulmonaryEmbolismSymptom } from '@/app/_types/vascular/venous/thrombosis/pulmonary-embolism';
import Image from 'next/image';

type PulmonaryEmbolismMobileProps = {
  id: string;
  items: readonly PulmonaryEmbolismSymptom[];
};

const IMAGE_MARGIN_CLASSES = ['mt-22', 'mt-11', ''] as const;

export default function PulmonaryEmbolismMobile({
  id,
  items,
}: PulmonaryEmbolismMobileProps) {
  return (
    <div id={id} className={`xl:hidden`}>
      <ul className={`mt-1 grid grid-cols-3 gap-4`}>
        {pulmonaryEmbolismMobileImages.map((image, index) => (
          <li
            key={image.id}
            className={`relative ${IMAGE_MARGIN_CLASSES[index]} aspect-1/2 rounded-xl overflow-clip`}
          >
            <Image src={image.src} alt="" fill />
          </li>
        ))}
      </ul>

      <ul className={`mt-10 space-y-2`}>
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`p-2.5 flex items-center gap-3 rounded-full bg-base leading-[145%]`}
          >
            <span
              className={`size-7 flex justify-center items-center rounded-full bg-primary font-extrabold text-[12px] text-inverse`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            <p className={`font-semibold text-[16px]`}>{item.title}</p>
          </li>
        ))}
      </ul>

      {/* 모바일 - 하단 화살표 */}
      <div className={`relative mt-7 flex justify-center items-center`}>
        <Image src={pulmonaryEmbolismChevronImage} alt="" width={40} height={56} />
      </div>
    </div>
  );
}
