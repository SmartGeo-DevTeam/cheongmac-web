import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import { occlusionDiagnosticsIntroduction as content } from '@/app/_data/vascular/arterial/occlusion/diagnostics/introduction';
import Image from 'next/image';

/** 기존 진단 섹션의 도입 이미지와 문구. */
export default function DiagnosticsIntroduction() {
  return (
    <>
      <Inner>
        <SectionHeading
          label="Diagnosis · 진단"
          labelVariant="disabled"
          title={<b>하지동맥폐색증 진단 방법</b>}
        />
      </Inner>
      <div className="mt-10 relative aspect-1280/480 xl:mx-auto xl:mt-25 xl:max-w-4xl xl:rounded-[20px] xl:overflow-clip">
        <Image src={content.image} alt="" fill className="object-cover" />
      </div>
      <div className="mt-5 px-5 break-keep text-center xl:mx-auto xl:mt-15 xl:max-w-7xl">
        <h3 className="leading-[145%] font-medium text-[18px] text-secondary xl:mx-auto xl:w-4/5 xl:text-[34px]">
          {content.leadBeforeEmphasis}
          <br />
          <strong className="font-extrabold text-primary">{content.emphasis}</strong>
          {content.leadAfterEmphasis}
        </h3>
        <p className="mt-5 text-[14px] text-[#666666] xl:mx-auto xl:mt-10 xl:w-4/5 xl:text-pc-body-1 xl:text-primary">
          {content.descriptionBeforeBreak}{' '}
          <br className="hidden xl:block" />
          {content.descriptionAfterBreak}
        </p>
      </div>
    </>
  );
}
