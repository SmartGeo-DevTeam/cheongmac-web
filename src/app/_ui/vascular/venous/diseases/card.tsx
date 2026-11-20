import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import type { VenousDiseaseCard as VenousDiseaseCardData } from '@/app/_data/vascular/venous/diseases/cards';

/** 카드 사진은 확정 전이므로 이미지 영역만 확보합니다. */
export default function VenousDiseaseCard({ item }: { item: VenousDiseaseCardData }) {
  return (
    <Link
      href={item.href}
      className="flex items-center gap-5 xl:flex-col xl:items-start"
      aria-label={`${item.title} 상세 페이지로 이동`}
    >
      <div className="relative size-30 shrink-0 overflow-hidden rounded-xl bg-gray-100 xl:aspect-4/3 xl:size-auto xl:w-full">
        {item.image ? (
          <Image src={item.image} alt="" fill className="object-cover" sizes="(min-width: 1280px) 25vw, 120px" />
        ) : (
          <div className="flex size-full items-center justify-center text-center text-[12px] text-tertiary">
            {/* TODO: 확정된 질환별 사진으로 교체 */}
            이미지 준비 중
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[20px] xl:text-pc-heading-1">{item.title}</h3>
          <ChevronRight className="size-5 xl:hidden" aria-hidden="true" />
        </div>
        <ul className="mt-2 flex flex-wrap gap-1 xl:gap-3">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-default px-2 py-1 font-medium text-[12px] text-tertiary xl:border-0 xl:p-0 xl:text-[16px] xl:text-gray-400"
            >
              {tag}
            </li>
          ))}
        </ul>
        <span className="mt-3 hidden items-center gap-1 text-[14px] text-orange-500 xl:inline-flex">
          자세히보기 <ChevronRight aria-hidden="true" className="size-4" />
        </span>
      </div>
    </Link>
  );
}
