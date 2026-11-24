import type { PelvicRelatedDisease } from '@/app/_types/vascular/venous/pelvic/related';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

type PelvicRelatedCardProps = {
  id: string;
  disease: PelvicRelatedDisease;
};

export default function PelvicRelatedCard({
  id,
  disease,
}: PelvicRelatedCardProps) {
  return (
    <article
      id={id}
      className={`flex-1 mt-6 p-6 flex flex-col rounded-xl border border-brand
      xl:px-10 xl:py-8`}
    >
      <div className={`flex justify-between items-center`}>
        <h3
          className={`text-mo-heading-1
          xl:text-pc-heading-1`}
        >
          {disease.title}
        </h3>
        {/* 모바일 질환 유형 배지 */}
        <span
          className={`px-2 py-1 shrink-0 rounded-md bg-action-secondary-hover font-semibold text-[12px] text-inverse
          xl:hidden`}
        >
          {disease.category}
        </span>
      </div>
      <p
        className={`mt-3 break-keep text-mo-body-2
        xl:text-pc-body-2`}
      >
        {disease.description}
      </p>
      <Link
        href={disease.href}
        className={`mt-3 flex items-center gap-1
        xl:mt-8`}
      >
        <span
          className={`inline-block font-semibold text-[12px] text-disabled
              xl:text-pc-label`}
        >
          자세히 보기
        </span>
        <ChevronRight
          className={`size-3 text-disabled
          xl:size-4`}
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
