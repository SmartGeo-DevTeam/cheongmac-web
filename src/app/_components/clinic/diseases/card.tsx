import type { ClinicDiseaseCard } from '@/app/_types/clinic/disease-card';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ClinicDiseaseCardItem({
  item,
}: {
  item: ClinicDiseaseCard;
}) {
  return (
    <Link
      href={item.href}
      className="flex items-center gap-5
              xl:flex-col xl:items-start"
    >
      <div
        className="relative size-30 rounded-xl overflow-clip
                xl:size-auto xl:w-full xl:aspect-4/3"
      >
        <Image src={item.image} alt="" fill className="object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3
            className="font-bold text-[20px]
                    xl:text-pc-heading-1"
          >
            {item.title}
          </h3>
          <ChevronRight
            className="size-5
                    xl:hidden"
          />
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
      </div>
    </Link>
  );
}
