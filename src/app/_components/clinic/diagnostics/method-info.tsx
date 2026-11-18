import DotHeading from '@/app/_components/common/dot-heading';
import type { DiagnosticMethod } from '@/app/_types/clinic/diagnostics';
import { Info } from 'lucide-react';
import Image from 'next/image';
import InfoBullet from './info-bullet';

type MethodInfoProps = Pick<DiagnosticMethod, 'image' | 'notice' | 'infoGroups'>;

export default function MethodInfo({ image, notice, infoGroups }: MethodInfoProps) {
  return (
    <div className="mt-10">
      <div className="grid xl:grid-cols-2 xl:gap-6">
        <div className={`relative aspect-628/465 rounded-t-xl overflow-clip xl:aspect-auto xl:h-full xl:rounded-xl ${notice ? 'flex items-end p-2' : ''}`}>
          <Image src={image} alt="" fill className="object-cover" />
          {notice && (
            <div className="relative z-1 w-full p-1.5 flex justify-center items-center gap-x-1.5 rounded-sm bg-black/70">
              <Info className="shrink-0 size-3.5 stroke-accent" />
              <p className="text-mo-caption text-inverse">{notice}</p>
            </div>
          )}
        </div>
        <div className="px-5 pt-6 pb-8 rounded-b-xl bg-gray-50 xl:p-0 xl:bg-transparent">
          <DotHeading title="검사 정보" as="h4" />
          <div className="mt-3 space-y-3 xl:mt-5">
            {infoGroups.map((group, groupIndex) => (
              <div className="xl:px-8 xl:py-5 xl:space-y-1 xl:rounded-xl xl:bg-subtle" key={`${group.label}-${groupIndex}`}>
                <span className="inline-block font-bold text-[14px] text-green-500 xl:text-[20px]">
                  {group.label}
                </span>
                {group.items.map((item, itemIndex) => (
                  <InfoBullet key={`${group.label}-${itemIndex}`}>{item}</InfoBullet>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
