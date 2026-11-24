import { ChevronDown, Minus, Plus } from 'lucide-react';
import type { FaqItem } from '@/app/_types/common/faq';

type FaqListProps = {
  items: readonly FaqItem[];
  idPrefix?: string;
  iconVariant?: 'chevron' | 'plus-minus';
};

/** 모든 페이지에서 공유하는 FAQ 아코디언. 기본 모드는 기존 입퇴원안내 UI를 유지합니다. */
export default function FaqList({
  items,
  iconVariant = 'chevron',
  idPrefix,
}: FaqListProps) {
  return (
    <div
      className="mt-2
      xl:mt-0 xl:space-y-3"
    >
      {items.map((item) => (
        <details
          key={item.id}
          id={idPrefix ? `${idPrefix}-${item.id}` : undefined}
          className="group border-b border-default
          xl:border xl:rounded-[20px]"
        >
          <summary
            className="[&::-webkit-details-marker]:hidden outline-none
              py-4 flex justify-between items-center gap-5 leading-[150%] break-keep font-medium text-[16px] cursor-pointer
              xl:p-6 xl:pl-7 xl:font-semibold xl:text-[20px]"
          >
            <div className="flex items-start gap-1">
              <span className="text-accent">Q.</span>
              <p>{item.question}</p>
            </div>

            {iconVariant === 'plus-minus' ? (
              <>
                <Plus
                  aria-hidden="true"
                  className="size-5 shrink-0 text-primary group-open:hidden"
                />
                <Minus
                  aria-hidden="true"
                  className="hidden size-5 shrink-0 text-primary group-open:block"
                />
              </>
            ) : (
              <ChevronDown
                aria-hidden="true"
                className="size-5 text-primary
                  group-open:rotate-180"
              />
            )}
          </summary>

          <div
            className="pb-4
              xl:px-14 xl:pb-6"
          >
            <p
              className="text-[14px] text-secondary
                xl:-mt-3 xl:pt-3 xl:border-t xl:border-default xl:text-[18px]"
            >
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
