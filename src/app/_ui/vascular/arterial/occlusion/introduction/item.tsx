import { occlusionIntroductionSymptoms } from '@/app/_data/vascular/arterial/occlusion/introduction/symptoms';
import type { OcclusionIntroductionSymptom } from '@/app/_types/vascular/arterial/occlusion/introduction';
import { Check } from 'lucide-react';
import Image from 'next/image';

type Props = {
  item: OcclusionIntroductionSymptom;
  activeIndex: number;
  desktopTabHeight: number;
};

export default function OcclusionIntroductionItem({
  item,
  activeIndex,
  desktopTabHeight,
}: Props) {
  return (
    <div
      className="w-full flex-1 pb-10
      xl:mx-auto xl:pb-20 xl:max-w-7xl xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] xl:grid-rows-[auto_1fr_auto] xl:gap-x-20 xl:gap-y-6"
    >
      {/* 고정된 탭이 차지하는 높이를 PC Grid 첫 번째 행에 반영 */}
      <div
        aria-hidden="true"
        className="hidden xl:col-start-2 xl:row-start-1 xl:block"
        style={{ height: desktopTabHeight }}
      />

      {/* 이미지 */}
      <div
        className="mt-5 px-5
        xl:col-start-1 xl:row-start-1 xl:row-span-3
        xl:m-0 xl:p-0"
      >
        <div
          className="relative aspect-4/3 rounded-xl overflow-clip
          xl:h-full xl:aspect-auto xl:rounded-[20px]"
        >
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            draggable={false}
            className="object-cover"
          />

          <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex justify-center items-center gap-2">
            {occlusionIntroductionSymptoms.map((tab, index) => (
              <span
                key={tab.id}
                className={
                  activeIndex === index
                    ? `w-6 h-2 rounded-full bg-accent-ai
                       xl:h-2.5`
                    : `size-2 rounded-full bg-white
                       xl:size-2.5`
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* 증상 */}
      <ul
        className="mt-5 px-6 space-y-2
        xl:col-start-2 xl:row-start-2 xl:mt-10 xl:px-0 xl:flex xl:flex-wrap xl:gap-3 xl:space-y-0"
      >
        {item.symptoms.map((symptom) => (
          <li key={symptom} className="flex items-center gap-1">
            <div
              className="size-5 flex justify-center items-center rounded-full bg-accent
              xl:hidden"
            >
              <Check className="size-3 stroke-white" />
            </div>
            <p className="xl:px-6 xl:py-2 xl:rounded-full xl:border xl:border-strong xl:bg-white xl:text-[22px]">
              {symptom}
            </p>
          </li>
        ))}
      </ul>

      {/* 주의하세요 */}
      <div
        className="mt-7 px-5
        xl:col-start-2 xl:row-start-3 xl:mt-15 xl:px-0 xl:self-end"
      >
        <div
          className="flex items-center gap-3
          xl:gap-5"
        >
          <div
            className="flex-1 h-px bg-accent
            xl:hidden"
          />
          <h3
            className="text-mo-heading-2 text-accent
            xl:font-bold xl:text-[30px]"
          >
            주의하세요 !
          </h3>
          <div className="flex-1 h-px bg-accent" />
        </div>
        <p
          className="mt-3 text-[18px]
          xl:text-[26px]"
        >
          {item.caution ? (
            <>
              {item.caution.lead}
              <br />
              <strong>{item.caution.emphasis}</strong>
              {item.caution.tail}
            </>
          ) : (
            // TODO(신규): 나머지 탭의 주의 문구는 의료진 검수 후 입력하세요.
            '해당 증상의 상세 안내를 준비 중입니다.'
          )}
        </p>
      </div>
    </div>
  );
}
