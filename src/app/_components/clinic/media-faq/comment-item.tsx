import type { FaqItem } from '@/app/_types/common/faq';
import { ChevronDown, ThumbsDown, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

type CommentItemProps = {
  id: string;
  item: FaqItem;
  avatar?: string | null;
};

/** 댓글형 FAQ: 공통 details 동작은 유지하고 표시만 구분합니다. */
export default function ClinicMediaFaqCommentItem({ id, item, avatar }: CommentItemProps) {
  return (
    <li id={id}>
      <details className={`group`}>
        <summary
          className={`list-none cursor-pointer outline-none
            focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600
            [&::-webkit-details-marker]:hidden`}
        >
          <div className={`grid grid-cols-[30px_minmax(0,1fr)_20px] items-start gap-3`}>
            {avatar ? (
              <Image
                src={avatar}
                alt=""
                width={30}
                height={30}
                className={`size-7.5 shrink-0 rounded-full object-cover`}
              />
            ) : (
              <span aria-hidden="true" className={`size-7.5`} />
            )}
            <span className={`min-w-0`}>
              <span className={`block break-keep font-medium text-[15px] leading-[150%] text-primary
                xl:font-semibold xl:text-[18px]`}>
                {item.question}
              </span>
              <span aria-hidden="true" className={`mt-1 flex items-center gap-2 text-[#dce1e7]`}>
                <ThumbsUp className={`size-3.5`} />
                <ThumbsDown className={`size-3.5`} />
              </span>
            </span>
            <ChevronDown
              aria-hidden="true"
              className={`mt-1 size-5 shrink-0 text-gray-400 transition-transform
                group-open:rotate-180`}
            />
          </div>
        </summary>
        <div className={`mt-3 ml-[42px] break-keep text-[14px] leading-[165%] text-secondary
          xl:text-[16px]`}>
          {item.answer}
        </div>
      </details>
    </li>
  );
}
