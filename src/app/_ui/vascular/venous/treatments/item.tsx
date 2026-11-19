import DotHeading from '@/app/_components/common/dot-heading';
import type { venousTreatments } from '@/app/_data/vascular/venous/treatments/methods';
import Image from 'next/image';
type TreatmentItem = (typeof venousTreatments)[number];
/** 페이지 전용 치료 상세 정보. 탭과 필터링은 공유 MethodSelector가 담당합니다. */
export default function VenousTreatmentDetail({ item }: { item: TreatmentItem }) {
  return <article className="break-keep">
    <div className="text-center"><h3 className="text-mo-heading-1 xl:text-pc-title-2">{item.title}</h3><p className="mt-4 text-mo-body-1 text-secondary xl:text-pc-body-1">{item.description}</p></div>
    <div className="mt-10 grid gap-8 xl:grid-cols-2 xl:items-center xl:gap-14">
      <div className="relative aspect-335/240 overflow-hidden rounded-xl"><Image src={item.image} alt="진료 상담 장면(시안용)" fill className="object-cover" /></div>
      <div><DotHeading title="치료 안내" as="h4" /><ul className="mt-5 space-y-4">{item.details.map((detail)=><li key={detail} className="flex gap-3 text-mo-body-1 xl:text-pc-body-1"><span aria-hidden="true" className="mt-3 size-2 shrink-0 rounded-full bg-accent-ai" />{detail}</li>)}</ul></div>
    </div>
  </article>;
}
