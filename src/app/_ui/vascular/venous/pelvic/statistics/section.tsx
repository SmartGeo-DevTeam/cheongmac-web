import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import { pelvicStatisticsHeading } from '@/app/_data/vascular/venous/pelvic/statistics/content';
import { pelvicStatisticsItems } from '@/app/_data/vascular/venous/pelvic/statistics/items';
import PelvicStatisticsItem from './item';

type PelvicStatisticsProps = {
  id: string;
};

export default function PelvicStatistics({ id }: PelvicStatisticsProps) {
  return (
    <section id={id}>
      <Inner>
        <SectionHeading
          mtVariant="lg"
          label={pelvicStatisticsHeading.label}
          labelVariant="accent"
          title={
            <>
              <b>{pelvicStatisticsHeading.titleEmphasis}</b>
              <br />
              {pelvicStatisticsHeading.titleSuffix}
            </>
          }
          description={pelvicStatisticsHeading.description}
        />
      </Inner>

      <Inner usePaddingHorizontalInMobile={false}>
        <ul
          className={`mt-15 grid
            xl:mx-auto xl:mt-25 xl:max-w-7xl xl:grid xl:grid-cols-3 xl:gap-1 xl:rounded-[20px] xl:overflow-clip`}
        >
          {pelvicStatisticsItems.map((item, index) => (
            <PelvicStatisticsItem
              key={item.id}
              id={`${id}-${item.id}`}
              item={item}
              isImageFirst={index % 2 === 0}
            />
          ))}
        </ul>
      </Inner>
    </section>
  );
}
