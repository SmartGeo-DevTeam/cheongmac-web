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
      className={`
        mt-5
        xl:mt-20 xl:mb-10
        `}
    >
      <span
        aria-hidden="true"
        className={`inline-block w-full text-center text-mo-title-2 text-disabled
          xl:hidden`}
      >
        +
      </span>
      <div
        className={`mt-5 flex flex-col gap-5
          xl:flex-row xl:gap-10`}
      >
        <ul
          aria-label="함께 고려할 수 있는 치료"
          className={`w-full grid grid-cols-3 gap-2
            xl:flex-3 xl:gap-6`}
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
            className={`mt-5 break-keep text-mo-heading-2 text-center text-secondary
              xl:flex-2 xl:text-left xl:text-pc-heading-2`}
          >
            {content.description}
          </p>
        )}
      </div>
    </div>
  );
}
