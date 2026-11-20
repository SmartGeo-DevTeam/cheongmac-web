import type { ClinicStrength } from '@/app/_types/vascular/strength';
import Image from 'next/image';
import { Fragment } from 'react';

type Props = {
  item: ClinicStrength;
  className?: string;
};

/** 배경 사진과 장식용 아이콘을 명시적으로 구분하는 진료 강점 카드. */
export default function ClinicStrengthItem({ item, className = '' }: Props) {
  const isImage = item.visual.kind === 'image';

  return (
    <li
      className={`relative p-10 rounded-[20px] overflow-clip xl:col-span-2
        ${isImage ? '' : 'bg-subtle'}
        ${item.extraBottomPadding ? 'xl:pb-30' : ''}
        ${className}`}
    >
      <div className="relative z-1 break-keep">
        <h3
          className={`text-mo-title-1
            xl:text-pc-title-2
            ${isImage ? 'text-inverse' : ''}`}
        >
          {item.titleLines.map((line, index) => (
            <Fragment key={`${item.id}-title-${index}`}>
              {index > 0 && <br />}
              <span>
                {line.emphasis ? (
                  <strong className="font-extrabold text-[36px]">
                    {line.text}
                  </strong>
                ) : (
                  line.text
                )}
                {line.suffix}
              </span>
            </Fragment>
          ))}
          {item.note && (
            <>
              <br />
              <span className="relative -top-2 leading-[160%] font-bold text-[12px] text-tertiary">
                {item.note}
              </span>
            </>
          )}
        </h3>
        <p
          className={`mt-3 text-mo-body-1
            xl:mt-5 xl:text-pc-body-1
            ${item.descriptionNarrow ? 'w-7/10' : ''}
            ${isImage ? 'text-inverse' : ''}`}
        >
          {item.description}
        </p>
      </div>

      {item.visual.kind === 'image' ? (
        <Image
          src={item.visual.src}
          alt=""
          fill
          sizes="(min-width: 1280px) 33vw, 100vw"
          className="object-cover"
        />
      ) : (
        <Image
          src={item.visual.src}
          alt=""
          width={100}
          height={100}
          className="absolute right-6 top-6 object-cover xl:top-auto xl:bottom-6"
        />
      )}
    </li>
  );
}
