import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import { arterialProgressionSteps } from '@/app/_data/vascular/arterial/progression/steps';
import ArterialProgressionItem from './item';

export default function ArterialProgression({ id }: { id: string }) {
  return (
    <section id={id}>
      <Inner>
        <SectionHeading
          mtVariant="xl"
          label="증상이 없다고 안심하면 안 되는 이유"
          labelVariant="accent"
          title={
            <>
              동맥은 막히는 동안
              <br />
              <b>어떤 신호도 보내지 않습니다</b>
            </>
          }
          description={
            <>
              동맥질환의 가장 무서운 점은 혈관이 70~80% 막혀도 통증이 없다는
              것입니다. 증상을 느꼈을 때는 이미 상당히 진행된 상태인 경우가
              많습니다. 방치할수록 치료는 어려워지고, 결과는 돌이킬 수
              없어집니다.
            </>
          }
        />
      </Inner>

      <ul
        className="mt-6 pl-5 pr-10 grid grid-cols-[max-content_max-content_max-content_max-content] gap-5 overflow-x-scroll break-keep
        xl:mx-auto xl:mt-15 xl:px-5 xl:max-w-7xl xl:w-full xl:grid-cols-4 xl:gap-6"
      >
        {arterialProgressionSteps.map((item, index) => (
          <ArterialProgressionItem key={item.title} item={item} index={index} />
        ))}
      </ul>
    </section>
  );
}
