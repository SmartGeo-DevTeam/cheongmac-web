import Inner from '@/app/_components/common/inner';
import { arterialDiseaseCards } from '@/app/_data/vascular/arterial/diseases/cards';
import { Info } from 'lucide-react';
import SectionHeading from '@/app/_components/clinic/section-heading';
import ClinicDiseaseCard from '@/app/_components/clinic/diseases/disease-card';
import ArterialDiseaseMap from './map';

export default function ArterialDiseases() {
  return (
    <section id="vascular-arterial-diseases">
      <Inner>
        <SectionHeading
          mtVariant="xl"
          label="Common Arterial Diseases"
          labelVariant="disabled"
          title={<b>부위별 동맥질환</b>}
          description={
            <>
              팔·다리 혈관이 막히는 말초동맥질환부터 생명을 위협하는 대동맥질환,
              그외 당뇨발을 비롯해 버거씨병·레이노증후군 같은 희귀 동맥질환까지
              동맥질환 전 범위를 폭넓게 진료합니다.
            </>
          }
        />

        {/* 이미지 좌표 */}
        <div>
          <div
            className="mt-10 flex items-center justify-center gap-1
          xl:mt-20 xl:gap-2"
          >
            <Info
              className="size-5 [&_circle]:fill-tertiary [&_circle]:stroke-tertiary [&_path]:stroke-white"
              strokeWidth={2.5}
            />
            <p
              className="text-[13px] text-tertiary
            xl:text-[16px]"
            >
              질환명 클릭 시 해당 페이지로 이동합니다
            </p>
          </div>

          <div
            className="mt-8
          xl:mt-10 xl:px-50"
          >
            <ArterialDiseaseMap />
          </div>
        </div>

        {/* 아이템 */}
        <div
          className="mt-10 grid gap-6
          xl:grid-cols-3 xl:gap-10"
        >
          {arterialDiseaseCards.map((item) => (
            <ClinicDiseaseCard key={item.title} item={item} />
          ))}
        </div>
      </Inner>
    </section>
  );
}
