import { ArrowRight, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import type { ClinicDiseaseCardData } from '@/app/_types/vascular/disease-card';
import DiseaseLink from './link';

type Props = {
  id: string;
  item: ClinicDiseaseCardData;
  isAvailable: boolean;
  /** 기존 정맥질환 카드의 PC '자세히보기' 안내 표시 여부. */
  showMoreLink?: boolean;
};

/** 동맥질환·정맥질환 개요 페이지에서 공통으로 사용하는 질환 카드. */
export default function ClinicDiseaseCard({
  id,
  item,
  isAvailable,
  showMoreLink = false,
}: Props) {
  return (
    <DiseaseLink
      id={id}
      href={isAvailable ? item.href : undefined}
      ariaLabel={`${item.title} 상세 페이지로 이동`}
      className="flex items-center gap-5
        xl:flex-col xl:items-start"
    >
      <div
        className="relative size-30 shrink-0 rounded-xl overflow-clip
          xl:size-auto xl:w-full xl:aspect-4/3"
      >
        <Image
          src={item.image}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 25vw, 120px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between items-center">
          <h3
            className="font-bold text-[20px]
              xl:text-pc-heading-1"
          >
            {item.title}
          </h3>
          {isAvailable && <ChevronRight className="size-5 xl:hidden" aria-hidden="true" />}
        </div>
        <ul
          className="mt-2 flex flex-wrap gap-1
            xl:gap-3"
        >
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="px-2 py-1 rounded-full border border-default font-medium text-[12px] text-tertiary
                xl:p-0 xl:border-0 xl:text-[16px] xl:text-gray-400"
            >
              {tag}
            </li>
          ))}
        </ul>
        {isAvailable && showMoreLink && (
          <div
            className="hidden
            xl:mt-5 xl:flex xl:items-center xl:gap-2"
          >
            <span className="text-pc-label text-accent">자세히보기</span>
            <ArrowRight aria-hidden="true" className="size-4 text-accent" />
          </div>
        )}
      </div>
    </DiseaseLink>
  );
}
