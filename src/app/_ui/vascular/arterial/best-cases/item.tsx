import { doctors } from '@/app/_data/about/doctors/doctors';
import type { ArterialBestCase } from '@/app/_types/vascular/arterial/best-cases';
import Image from 'next/image';

export default function ArterialBestCaseItem({
  item,
}: {
  item: ArterialBestCase;
}) {
  // 현재 하드코딩 의료진 데이터를 참조. 나중에 DB 관계 조회 결과로 교체 가능.
  const doctor = doctors.find((person) => person.id === item.doctorId);

  return (
    <article
      className="h-full rounded-xl border border-default px-5 pt-9 pb-5
      xl:rounded-[20px] xl:px-8 xl:pt-11 xl:pb-6"
    >
      <h3
        className="font-bold text-[24px]
        xl:text-[29px]"
      >
        {item.title}
      </h3>
      <div
        className="relative mt-5 aspect-295/170 overflow-clip rounded-lg
        xl:mt-3"
      >
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1280px) 375px, calc(100vw - 80px)"
          className="object-cover"
        />
      </div>
      <div
        className="mt-5 grid grid-cols-[max-content_1fr] items-center gap-x-3 gap-y-2
        xl:mt-6"
      >
        <span
          className="rounded-full bg-[#EFEFEF] px-4 py-1.5 text-mo-label text-[#394559]
          xl:font-bold xl:text-[19px]"
        >
          치료정보
        </span>
        <p
          className="text-mo-body-1
          xl:font-medium xl:text-[19px]"
        >
          {item.treatment}
        </p>
        <span
          className="rounded-full bg-[#EFEFEF] px-4 py-1.5 text-mo-label text-[#394559]
          xl:font-bold xl:text-[19px]"
        >
          담당의사
        </span>
        <div className="flex min-w-0 items-center gap-2">
          {doctor ? (
            <>
              <p
                className="text-mo-body-1
                xl:font-medium xl:text-[19px]"
              >
                {doctor.name} 원장
              </p>
              <div
                className="relative size-12 shrink-0 overflow-clip rounded-full
                xl:size-15"
              >
                <Image
                  src={doctor.mobileImgSrc}
                  alt={`${doctor.name} 원장`}
                  fill
                  sizes="(min-width: 1280px) 60px, 48px"
                  className="object-cover"
                />
              </div>
            </>
          ) : (
            <p className="text-mo-body-1 text-secondary">담당의사 확인 중</p>
          )}
        </div>
      </div>
    </article>
  );
}
