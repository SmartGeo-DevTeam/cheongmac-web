import type { AdditionalTreatmentsContent } from '@/app/_types/vascular/treatment-method';
import TreatmentAdditionalItem from './additional-item';

type TreatmentAdditionalProps = {
  id: string;
  content: AdditionalTreatmentsContent;
};

/** 치료 탭 아래에 필요할 때만 노출하는 보조 치료 영역. */
export default function TreatmentAdditional({
  id,
  content,
}: TreatmentAdditionalProps) {
  if (content.items.length === 0) return null;

  return (
    <div
      id={id}
      className={`mt-8
        xl:mt-15`}
    >
      <span
        aria-hidden="true"
        className={`block font-semibold text-[28px] leading-none text-center text-disabled
          xl:hidden`}
      >
        +
      </span>
      <div
        className={`mt-5 flex flex-col gap-7
          xl:mt-0 xl:flex-row xl:items-center xl:gap-8`}
      >
        <ul
          aria-label="함께 고려할 수 있는 치료"
          className={`min-w-0 w-full grid grid-cols-3 gap-2
            xl:flex-[3] xl:gap-4`}
        >
          {content.items.map((item) => (
            <TreatmentAdditionalItem
              key={item.id}
              id={`${id}-${item.id}`}
              item={item}
            />
          ))}
        </ul>
        {content.description && (
          <p
            className={`break-keep font-semibold text-[17px] leading-[150%] text-center text-secondary
              xl:flex-[2] xl:text-[20px] xl:text-left`}
          >
            {content.description}
          </p>
        )}
      </div>
    </div>
  );
}
