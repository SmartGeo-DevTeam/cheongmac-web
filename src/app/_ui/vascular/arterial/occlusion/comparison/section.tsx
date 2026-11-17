import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import Image from 'next/image';

export default function OcclusionComparison() {
  return (
    <section id="vascular-arterial-occlusion-comparison">
      <Inner>
        <SectionHeading
          label="Diagnosis · 진단"
          labelVariant="disabled"
          title={
            <>
              <b>하지동맥폐색증 진단 방법</b>
            </>
          }
        />
      </Inner>

      <div
        className="mt-10 relative aspect-1280/480
        xl:mx-auto xl:mt-25 xl:max-w-4xl xl:rounded-[20px] xl:overflow-clip"
      >
        <Image src={`/_____________temp/temp.png`} alt="" fill />
      </div>

      <div
        className="mt-5 px-5 break-keep text-center
        xl:mx-auto xl:mt-15 xl:max-w-7xl"
      >
        <h3
          className="leading-[145%] font-medium text-[18px] text-secondary
          xl:mx-auto xl:w-4/5 xl:text-[34px]"
        >
          말초동맥폐쇄증 진단은
          <br />
          <strong className="font-extrabold text-primary">
            직접 맥박을 확인하는 촉진
          </strong>
          에서 시작됩니다.
        </h3>

        <p
          className="mt-5 text-[14px] text-[#666666]
          xl:mx-auto xl:mt-10 xl:w-4/5 xl:text-pc-body-1 xl:text-primary"
        >
          발등, 발목 안쪽, 무릎 뒤, 허벅지 안쪽의 맥박을 짚어 맥박이 약하거나
          만져지지 않으면 혈관 협착을 의심할 수 있으며,{' '}
          <br
            className="hidden
            xl:block"
          />
          하지냉감·피부 변색·상처 유무를 함께 육안으로 진찰합니다. 이후 협착이
          의심되는 경우 아래의 정밀 검사를 시행합니다.
        </p>
      </div>
    </section>
  );
}
