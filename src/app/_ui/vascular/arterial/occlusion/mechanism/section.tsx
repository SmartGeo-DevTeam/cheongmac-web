import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import { occlusionMechanismStages } from '@/app/_data/vascular/arterial/occlusion/mechanism/stages';
import Image from 'next/image';
import OcclusionMechanismItem from './item';
import OcclusionMechanismTip from './tip';

export default function OcclusionMechanism() {
  return (
    <section id="vascular-arterial-occlusion-mechanism">
      <div className="mt-15">
        <Inner>
          <SectionHeading
            label="생명을 위협하는 하지동맥폐색증"
            labelVariant="accent"
            title={
              <>
                <b>
                  통증이 사라졌다고
                  <br />
                  나은 게 아닙니다
                </b>
              </>
            }
            description={
              <>
                통증이 사라졌다고 해서 안심해선 안됩니다.{' '}
                <br
                  className="hidden
                  xl:block"
                />
                혈관이 막혀 감각이 없어졌다는 것은 더욱 심각한 증상입니다.
              </>
            }
          />

          <div
            className="mt-9 relative aspect-654/288
            xl:mx-auto xl:mt-20 xl:w-3/5"
          >
            <Image
              src="/vascular/arterial/occlusion/mechanism/arterial-narrowing.png"
              alt=""
              fill
            />
          </div>

          <ul
            className="mt-8 px-5 space-y-3
            xl:mx-auto xl:w-4/5 xl:grid xl:grid-cols-4 xl:gap-3 xl:space-y-0"
          >
            {occlusionMechanismStages.map((stage, index) => (
              <OcclusionMechanismItem
                key={stage.id}
                stage={stage}
                index={index}
              />
            ))}
          </ul>

          <OcclusionMechanismTip />
        </Inner>
      </div>
    </section>
  );
}
