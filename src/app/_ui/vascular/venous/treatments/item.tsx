import ClinicMethodCard from '@/app/_components/clinic/method-carousel/card';
import type { VenousTreatmentMethod } from '@/app/_types/vascular/venous/treatments';

/** 치료법별 설명·시술 목록은 정맥질환 페이지 전용 콘텐츠입니다. */
export default function VenousTreatmentItem({
  item,
}: {
  item: VenousTreatmentMethod;
}) {
  return (
    <ClinicMethodCard title={item.title} image={item.image}>
      <p
        className="mt-3 text-mo-body-2
        xl:mt-4 xl:text-[20px]"
      >
        {item.description}
      </p>
      <ul
        className="mt-6 flex flex-wrap gap-x-2 gap-y-1 font-semibold text-mo-body-2
        xl:mt-7 xl:text-[20px]"
      >
        {item.procedures.map((procedure, index) => (
          <li key={procedure}>
            {index > 0 && <span aria-hidden="true">· </span>}
            {procedure}
          </li>
        ))}
      </ul>
    </ClinicMethodCard>
  );
}
