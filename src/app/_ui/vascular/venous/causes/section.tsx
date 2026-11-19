import Inner from '@/app/_components/common/inner';
import SectionHeading from '@/app/_components/clinic/section-heading';
import { venousCauses } from '@/app/_data/vascular/venous/causes/items';
import { ArrowDown, Activity } from 'lucide-react';

/** 실제 초음파 영상이 아니라 UI 구조 확인용 도식입니다. */
export default function VenousCauses() {
  return <section id="vascular-venous-causes"><Inner>
    <SectionHeading mtVariant="base" label="Causes · 원인" title={<>거꾸로 흐르고 고이는 혈류<br /><b>정맥질환의 시작</b></>} description={<>정맥 순환에 변화가 생기는 과정을 이해하고, 개인의 혈관 상태에 맞는 진료를 받는 것이 중요합니다.</>} />
    <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 xl:mt-20 xl:grid-cols-2 xl:gap-8">
      {venousCauses.map((item) => <article key={item.id} className="overflow-hidden rounded-2xl border border-default bg-white">
        <div className={`relative flex aspect-335/270 items-center justify-center gap-5 overflow-hidden ${item.tone === 'normal' ? 'bg-[#E8F4F7]' : 'bg-[#FCEBE9]'}`}>
          <div aria-hidden="true" className="relative h-4/5 w-20 rounded-full border-[16px] border-[#678BA5] bg-[#CBE4ED]">
            <div className="absolute inset-0 flex flex-col justify-evenly items-center text-[#D95A54]">
              <ArrowDown className="size-7 rotate-180" /><ArrowDown className={item.tone === 'normal' ? 'size-7 rotate-180' : 'size-7'} />
            </div>
          </div>
          <Activity aria-hidden="true" className="size-12 text-[#A4545C]" />
          <span className="absolute bottom-4 left-5 rounded-full bg-white px-4 py-2 text-sm font-bold">{item.label}</span>
        </div>
        <div className="p-6 text-center xl:p-8"><h3 className="text-mo-heading-1 xl:text-pc-heading-1">{item.title}</h3><p className="mt-3 text-mo-body-2 text-secondary xl:text-pc-body-1">{item.description}</p></div>
      </article>)}
    </div>
    <p className="mt-4 text-center text-sm text-tertiary">※ 혈류 이미지는 이해를 돕는 도식이며 실제 검사 결과가 아닙니다.</p>
  </Inner></section>;
}
