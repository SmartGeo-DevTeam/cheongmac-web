import type { VaricoceleInformationItem } from '@/app/_types/vascular/venous/varicocele/information-item';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

type VaricoceleCharacteristicAccordionItemProps = {
  id: string;
  item: VaricoceleInformationItem;
  number: number;
};

export default function VaricoceleCharacteristicAccordionItem({
  id,
  item,
  number,
}: VaricoceleCharacteristicAccordionItemProps) {
  return (
    <li id={id}>
      <details
        className={`group rounded-xl bg-subtle
          open:bg-green-50`}
      >
        <summary
          className={`p-5 flex justify-between items-center gap-3 list-none cursor-pointer
            [&::-webkit-details-marker]:hidden`}
        >
          <div className={`flex items-center gap-2`}>
            <span className={`text-mo-label text-accent-ai-strong`}>
              {String(number).padStart(2, '0')}
            </span>

            <h3 className={`font-bold text-[15px] text-gray-900`}>
              {item.title}
            </h3>
          </div>

          <ChevronDown
            className={`shrink-0 size-5.5 transition-transform
              group-open:rotate-180`}
          />
        </summary>

        <div className={`px-5 pb-5`}>
          <div
            className={`relative w-full aspect-410/250 rounded-xl overflow-hidden`}
          >
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 1279px) calc(100vw - 80px), 1px"
              className={`object-cover`}
            />
          </div>
          <p className={`mt-5 break-keep text-mo-body-2`}>
            {item.description}
          </p>
        </div>
      </details>
    </li>
  );
}
