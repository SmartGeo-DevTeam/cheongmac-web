import Image from 'next/image';
import { Fragment } from 'react';
import { occlusionAbiCriteria as content } from '@/app/_data/vascular/arterial/occlusion/diagnostics/criteria';

const rangeClasses = {
  danger: 'bg-legacy-red',
  warning: 'bg-legacy-yellow',
  normal: 'bg-legacy-green',
  dark: 'bg-[#3A4442]',
} as const;

/** ABI만 사용하는 수치 판정식과 검사 결과 레이아웃. */
export default function AbiCriteria() {
  return (
    <div className="mt-5 flex flex-col-reverse gap-3 xl:grid xl:grid-cols-2">
      <div className="space-y-3 xl:space-y-5">
        <div className="px-5 py-4 flex justify-center items-center gap-3 rounded-xl bg-gray-50 xl:px-22.5 xl:py-6 xl:gap-6">
          <div className="flex flex-col justify-center items-center leading-[160%] text-gray-900 xl:pt-3">
            <h3 className="font-extrabold text-[26px] xl:text-[30px]">ABI</h3>
            <p className="font-medium text-[12px]">Ankle-Brachial Index</p>
          </div>
          <span className="font-bold text-[22px] xl:text-pc-heading-1">=</span>
          <div className="flex-1 relative ml-3 flex flex-col justify-center items-center font-medium text-[15px] xl:text-[20px] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-full before:h-px before:bg-primary">
            <span>발목 수축기 혈압</span>
            <span>상완(팔) 수축기 혈압</span>
          </div>
        </div>
        <div className="px-5 py-7 rounded-xl bg-gray-50 xl:px-10 xl:py-8">
          <div className="relative aspect-344/114">
            <Image src={content.indexImage} alt="" fill />
          </div>
          <div className="mt-5 grid grid-cols-[max-content_1fr] items-center gap-x-3 gap-y-2 xl:gap-y-3">
            {content.ranges.map((item) => (
              <Fragment key={item.range}>
                <span className={`inline-block px-3 py-1 rounded-full text-center font-bold text-[14px] text-inverse xl:px-5 xl:text-[18px] ${rangeClasses[item.tone]}`}>
                  {item.range}
                </span>
                <p className="text-[14px] text-gray-900 xl:text-pc-body-1">{item.description}</p>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="p-2 rounded-xl bg-black xl:p-5 xl:flex xl:flex-col xl:justify-center xl:items-center">
        <div className="relative w-full aspect-950/695 rounded-lg overflow-clip">
          <Image src={content.resultImage} alt="" fill className="object-cover" />
        </div>
        <p className="mt-2 text-center font-semibold text-[14px] text-inverse xl:text-[16px]">
          {content.resultCaption}
        </p>
      </div>
    </div>
  );
}
