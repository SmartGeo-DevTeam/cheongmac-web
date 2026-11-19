import Inner from '@/app/_components/common/inner';
import SectionHeading from '@/app/_components/clinic/section-heading';
import ClinicDiseaseCardItem from '@/app/_components/clinic/diseases/card';
import { venousDiseaseCards } from '@/app/_data/vascular/venous/diseases/cards';
import { MapPin } from 'lucide-react';

export default function VenousDiseases() {
  return <section id="vascular-venous-diseases"><Inner>
    <SectionHeading mtVariant="xl" label="Common Venous Diseases" labelVariant="disabled" title={<b>부위별 정맥질환</b>} description={<>다리부터 골반까지, 증상과 위치에 따라 다양한 정맥질환을 진료합니다.</>} />
    <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-[#F6FAFB] px-6 py-12 xl:mt-20">
      <div className="flex flex-col items-center gap-4 text-center">
        <MapPin className="size-10 text-accent" aria-hidden="true" />
        <p className="text-mo-heading-1">정맥질환은 발생 부위에 따라 살펴봐야 합니다</p>
        <p className="text-mo-body-2 text-secondary">인체 위치별 정맥 도해는 전용 검수 이미지를 받으면 연결할 예정입니다.</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">{venousDiseaseCards.map((item)=><span key={item.title} className="rounded-full border border-[#B7D8DE] bg-white px-4 py-2 font-semibold">{item.title}</span>)}</div>
      </div>
    </div>
    <div className="mt-10 grid gap-6 xl:grid-cols-4 xl:gap-7">
      {venousDiseaseCards.map((item)=><ClinicDiseaseCardItem key={item.title} item={item} />)}
    </div>
  </Inner></section>;
}
