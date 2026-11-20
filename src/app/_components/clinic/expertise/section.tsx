import type { ReactNode } from 'react';
import ClinicSplitHeading from '@/app/_components/clinic/split-heading';
import ClinicSplitLayout from '@/app/_components/clinic/split-layout';
import Inner from '@/app/_components/common/inner';
import type { ClinicExpertiseItem as ClinicExpertiseItemType } from '@/app/_types/clinic/expertise';
import ClinicExpertiseItem from './item';

type ClinicExpertiseSectionProps = {
  id: string;
  items: readonly ClinicExpertiseItemType[];
  label?: ReactNode;
  title?: ReactNode;
};

/** 진료분야별 콘텐츠만 달라지는 동일한 전문성 섹션 UI. */
export default function ClinicExpertiseSection({
  id,
  items,
  label = '청맥병원의 남다른 전문성',
  title = (
    <>
      혈관만 봅니다
      <br />
      <strong>그래서 다릅니다</strong>
    </>
  ),
}: ClinicExpertiseSectionProps) {
  return (
    <section id={id}>
      <div
        className={`relative mt-20 py-20 bg-green-700
          xl:mt-30 xl:py-30`}
      >
        <Inner>
          <ClinicSplitLayout
            className="xl:items-start"
            leading={
              <ClinicSplitHeading
                isDesktopSticky
                theme="light"
                labelVariant="green-300"
                label={label}
                title={title}
              />
            }
          >
            <div
              className={`grid grid-cols-1 gap-16
                xl:gap-20`}
            >
              {items.map((item) => (
                <ClinicExpertiseItem key={item.id} item={item} />
              ))}
            </div>
          </ClinicSplitLayout>
        </Inner>
      </div>
    </section>
  );
}
