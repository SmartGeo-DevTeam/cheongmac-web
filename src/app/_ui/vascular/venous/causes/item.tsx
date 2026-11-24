import Image from 'next/image';
import type { VenousCauseCard } from '@/app/_types/vascular/venous/causes';

type VenousCauseItemProps = {
  id: string;
  item: VenousCauseCard;
};

/** 원인 비교 카드: 이미지·설명·행 단위 진단 정보를 동일한 UI로 렌더링합니다. */
export default function VenousCauseItem({ id, item }: VenousCauseItemProps) {
  return (
    <li
      id={id}
      className="rounded-lg overflow-clip border border-default
      xl:flex-1 xl:rounded-[20px]"
    >
      <div className="relative aspect-517/420">
        <Image src={item.image} alt="" fill />
      </div>
      <div
        className="px-6 pt-5 pb-7
        xl:px-15 xl:py-10"
      >
        <h3
          className="text-center text-mo-heading-1
          xl:font-bold xl:text-[34px]"
        >
          {item.title}
        </h3>
        <p
          className="mt-5 text-mo-body-1
          xl:mt-8 xl:text-[22px]"
        >
          {item.description}
        </p>
        <div
          className="mt-5 grid grid-cols-[max-content_minmax(0,1fr)] text-mo-body-1
          xl:mt-6"
        >
          {item.details.map((detail, index) => {
            const isLast = index === item.details.length - 1;

            return (
              <div
                key={detail.label}
                className={`col-span-2 grid grid-cols-subgrid items-center gap-2
                ${isLast ? 'pt-3 pb-0 xl:pt-6 xl:pb-0' : 'py-3 border-b border-default xl:py-6'}`}
              >
                <span
                  className="text-tertiary
                  xl:text-[20px]"
                >
                  {detail.label}
                </span>
                <div className="flex justify-end items-center gap-2">
                  <p
                    className="text-right
                    xl:font-semibold xl:text-[22px]"
                  >
                    {detail.value}
                  </p>
                  {detail.badge && (
                    <span
                      className={`${detail.badge.hidden ? 'hidden ' : ''}px-2.5 py-1.5 rounded-full bg-gray font-bold text-[14px] text-secondary
                      xl:px-3 xl:py-2 xl:text-[16px]`}
                    >
                      {detail.badge.label}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </li>
  );
}
