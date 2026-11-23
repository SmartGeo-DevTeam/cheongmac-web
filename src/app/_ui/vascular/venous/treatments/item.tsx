import ClinicMethodCard from '@/app/_components/clinic/method-carousel/card';
import type { VenousTreatmentMethod } from '@/app/_types/vascular/venous/treatments';
import { Fragment } from 'react/jsx-runtime';

/** 치료법별 설명·시술 목록은 정맥질환 페이지 전용 콘텐츠입니다. */
export default function VenousTreatmentItem({
  item,
}: {
  item: VenousTreatmentMethod;
}) {
  return (
    <ClinicMethodCard title={item.title} image={item.image}>
      {/* 
      <p
        className="mt-3 min-h-[2lh] text-mo-body-2
        xl:mt-4 xl:text-[20px]"
      >
      */}
      <p
        className="mt-3 text-mo-body-2
        xl:mt-4 xl:text-[20px]"
      >
        {item.description}
      </p>
      <ul
        className="mt-5 flex flex-wrap items-center gap-x-1 gap-y-1 text-mo-label
        xl:mt-6 xl:font-bold xl:text-pc-body-2"
      >
        {item.procedures.map((procedure, index) => (
          <Fragment key={procedure}>
            {index > 0 && <span aria-hidden="true">·</span>}
            <li>{procedure}</li>
          </Fragment>
        ))}
      </ul>
    </ClinicMethodCard>
  );
}
