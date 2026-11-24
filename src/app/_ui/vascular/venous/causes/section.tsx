import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import { venousCauseCards } from '@/app/_data/vascular/venous/causes/cards';
import { venousCausesContent } from '@/app/_data/vascular/venous/causes/content';
import { ChevronDown } from 'lucide-react';
import { Fragment } from 'react';
import VenousCauseItem from './item';

/** 정맥질환 원인: 섹션 조립만 담당하며, 카드 UI와 정적 데이터는 분리합니다. */
export default function VenousCauses({ id }: { id: string }) {
  return (
    <section id={id}>
      <div>
        <Inner>
          <SectionHeading
            label={venousCausesContent.label}
            labelVariant="disabled"
            title={<b>{venousCausesContent.title}</b>}
            description={venousCausesContent.description}
          />

          <ul
            className="mt-15 flex flex-col gap-1
            xl:mt-20 xl:flex-row xl:gap-3"
          >
            {venousCauseCards.map((item, index) => (
              <Fragment key={item.id}>
                {index > 0 && (
                  <li aria-hidden="true" className="relative z-1">
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-13.5 flex justify-center items-center rounded-full bg-base shadow-[0_0_10px_0_#0000001a]
                      xl:size-22.5"
                    >
                      <ChevronDown
                        className="size-7 text-gray-200
                        xl:size-12 xl:-rotate-90"
                      />
                    </div>
                  </li>
                )}
                <VenousCauseItem
                  id={`vascular-venous-causes-${item.id}`}
                  item={item}
                />
              </Fragment>
            ))}
          </ul>
        </Inner>
      </div>
    </section>
  );
}
