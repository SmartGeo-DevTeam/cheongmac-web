import type { FaqItem } from '@/app/_types/common/faq';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

type Props = { id: string; item: FaqItem; avatar?: string | null };

/** 기존 입퇴원안내 FAQ와 같은 native details/summary 패턴. */
export default function ClinicMediaFaqItem({
  id,
  item,
  avatar,
}: Props) {
  return (
    <li id={id}>
      <details className="group border-b border-default xl:border xl:rounded-[20px]">
        <summary className="[&::-webkit-details-marker]:hidden outline-none py-4 flex justify-between items-start gap-4 leading-[150%] break-keep font-medium text-[16px] cursor-pointer xl:p-6 xl:pl-7 xl:font-semibold xl:text-[20px]">
          <div className="flex items-start gap-3">
            {avatar && (
              <Image
                src={avatar}
                alt=""
                width={30}
                height={30}
                className="size-7.5 object-cover shrink-0 rounded-full"
              />
            )}
            <span className="relative top-1">{item.question}</span>
          </div>
          <ChevronDown
            aria-hidden="true"
            className="relative top-0.75 size-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
          />
        </summary>
        <div
          className={`pb-4 pr-4
          xl:px-14 xl:pb-6
          ${avatar ? 'pl-11' : 'pl-4'}`}
        >
          <p className="text-[14px] text-secondary xl:pt-3 xl:border-t xl:border-default xl:text-[18px]">
            {item.answer}
          </p>
        </div>
      </details>
    </li>
  );
}
