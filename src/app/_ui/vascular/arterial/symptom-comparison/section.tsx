import Inner from '@/app/_components/common/inner';
import {
  arterialOcclusionCondition,
  spinalStenosisCondition,
} from '@/app/_data/vascular/arterial/symptom-comparison/conditions';
import SectionHeading from '@/app/_components/clinic/section-heading';
import ArterialOcclusionCard from './arterial-card';
import SpinalStenosisCard from './spinal-card';

export default function ArterialSymptomComparison() {
  return (
    <section id="vascular-arterial-symptom-comparison">
      <div
        className="mt-20 py-15 bg-[#F0F0F0]
        xl:mt-30 xl:py-30"
      >
        <Inner>
          <SectionHeading
            mtVariant="none"
            label="비슷한 증상, 다른 전혀 질환"
            labelVariant="accent"
            title={
              <>
                혹시 <b>척추디스크</b>로
                <br />
                오해하고 계신가요?
              </>
            }
            description={
              <>
                말초동맥폐쇄증은 증상이 척추디스크와 매우 비슷해 혼동되는
                경우가 많습니다.
              </>
            }
          />

          <ul
            className="relative mt-10 grid gap-1
            xl:mt-20 xl:grid-cols-[1fr_auto_1fr] xl:gap-3"
          >
            <SpinalStenosisCard condition={spinalStenosisCondition} />

            <li className="relative z-1">
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-16 flex justify-center items-center rounded-full bg-orange-700 font-black text-[20px] text-inverse
                xl:size-22.5 xl:text-[40px]"
              >
                VS
              </div>
            </li>

            <ArterialOcclusionCard condition={arterialOcclusionCondition} />
          </ul>
        </Inner>
      </div>
    </section>
  );
}
