import { doctors } from '@/app/_data/about/doctors/doctors';
import type { BestCase } from '@/app/_types/vascular/best-case';
import Image from 'next/image';

type BestCaseItemProps = {
  id: string;
  item: BestCase;
};

export default function BestCaseItem({ id, item }: BestCaseItemProps) {
  // 향후 DB 연결 시에는 doctorId 관계로 조회한 의료진 정보를 전달할 수 있습니다.
  const doctor = doctors.find((person) => person.id === item.doctorId);

  return (
    <article
      id={id}
      className={`h-full px-5 pt-9 pb-5 rounded-xl border border-default
        xl:px-7 xl:pt-11 xl:pb-6 xl:rounded-[20px]`}
    >
      <h3
        className={`font-bold text-[24px]
          xl:text-[29px]`}
      >
        {item.title}
      </h3>
      <div
        className={`relative mt-5 aspect-295/170 rounded-lg overflow-clip
          xl:mt-3 xl:aspect-1062/516`}
      >
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className={`object-cover`}
        />
      </div>
      <div
        className={`mt-5 grid grid-cols-[max-content_1fr] items-center gap-x-3 gap-y-2
          xl:mt-6`}
      >
        <span
          className={`px-4 py-1.5 rounded-full bg-[#EFEFEF] text-mo-label text-[#394559]
            xl:font-bold xl:text-[19px]`}
        >
          치료정보
        </span>
        <p
          className={`text-mo-body-1
            xl:font-medium xl:text-[19px]`}
        >
          {item.treatment}
        </p>
        <span
          className={`px-4 py-1.5 rounded-full bg-[#EFEFEF] text-mo-label text-[#394559]
            xl:font-bold xl:text-[19px]`}
        >
          담당의사
        </span>
        <div className={`flex min-w-0 items-center gap-2`}>
          {doctor ? (
            <>
              <p
                className={`text-mo-body-1
                  xl:font-medium xl:text-[19px]`}
              >
                {doctor.name} 원장
              </p>
              <div
                className={`relative size-12 shrink-0 rounded-full overflow-clip
                  xl:size-15`}
              >
                <Image
                  src={doctor.mobileImgSrc}
                  alt={`${doctor.name} 원장`}
                  fill
                  sizes="(min-width: 1280px) 60px, 48px"
                  className={`object-cover`}
                />
              </div>
            </>
          ) : (
            <p className={`text-mo-body-1 text-secondary`}>담당의사 확인 중</p>
          )}
        </div>
      </div>
    </article>
  );
}
