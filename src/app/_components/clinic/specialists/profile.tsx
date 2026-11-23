import type { ClinicSpecialistData } from '@/app/_types/clinic/specialists';
import Link from 'next/link';

type ClinicSpecialistProfileProps = {
  id: string;
  doctor: ClinicSpecialistData;
  isCarousel?: boolean;
};

/** 의료진 한 명의 사진·전문분야·상세 링크를 공통 표현합니다. */
export default function ClinicSpecialistProfile({
  id,
  doctor,
  isCarousel = false,
}: ClinicSpecialistProfileProps) {
  return (
    <figure id={id}>
      <Link
        href={doctor.detailHref}
        aria-label={`${doctor.name} 원장 상세보기`}
        className={`flex justify-center
          xl:h-full`}
      >
        <img
          src={doctor.imageSrc}
          alt={`${doctor.name} 원장`}
          className={`object-cover
            ${isCarousel ? 'w-[100%]' : 'w-[100%]'}`}
        />
      </Link>
      <figcaption
        className={`mt-5 flex justify-center items-end gap-2
          xl:mt-6 xl:flex-row-reverse`}
      >
        <Link
          href={doctor.detailHref}
          className={`text-pc-heading-2
            xl:text-pc-heading-1`}
        >
          <strong>{doctor.name} 원장</strong>
        </Link>
        <span className="font-semibold text-[16px] text-[#C8AFA4]">
          {doctor.specialistTitle}
        </span>
      </figcaption>
    </figure>
  );
}
