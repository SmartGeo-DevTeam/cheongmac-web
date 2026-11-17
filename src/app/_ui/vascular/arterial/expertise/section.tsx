import ClinicSplitHeading from '@/app/_components/clinic/split-heading';
import ClinicSplitLayout from '@/app/_components/clinic/split-layout';
import Inner from '@/app/_components/common/inner';
import { arterialExpertiseItems } from '@/app/_data/vascular/arterial/expertise/items';
import ArterialExpertiseItem from './item';

export default function ArterialExpertise() {
  return (
    <section id="vascular-arterial-expertise">
      <div
        className="relative mt-20 py-20 bg-green-700
        xl:mt-30 xl:py-30"
      >
        <Inner>
          <ClinicSplitLayout
            className="xl:items-start"
            leading={
              <ClinicSplitHeading
                isDesktopSticky
                theme="light"
                labelVariant="green-300"
                label="청맥병원의 남다른 전문성"
                title={
                  <>
                    혈관만 봅니다
                    <br />
                    <strong>그래서 다릅니다</strong>
                  </>
                }
              />
            }
          >
            <div
              className="grid grid-cols-1 gap-16
              xl:gap-20"
            >
              {arterialExpertiseItems.map((item) => (
                <ArterialExpertiseItem key={item.id} item={item} />
              ))}
            </div>
          </ClinicSplitLayout>
        </Inner>
      </div>
    </section>
  );
}
