import {
  fields,
  getDoctorDetailHref,
  type DoctorType,
} from '@/app/_data/about/doctors/doctors';
import Link from 'next/link';

export default function ClinicSpecialistProfile({
  doctor,
}: {
  doctor: DoctorType;
}) {
  const specialistTitle = fields
    .filter((field) => doctor.fieldIds.includes(field.id))
    .map((field) => field.specialistTitle)
    .join(' · ');
  const detailHref = getDoctorDetailHref(doctor);

  return (
    <figure>
      <Link
        href={detailHref}
        aria-label={`${doctor.name} 원장 상세보기`}
        className="flex justify-center
        xl:h-full"
      >
        <img
          src={doctor.pathImgSrc}
          alt={`${doctor.name} 원장`}
          className="object-cover
          xl:w-2/3"
        />
      </Link>
      <figcaption
        className="mt-5 flex justify-center items-end gap-2
        xl:mt-6 xl:flex-row-reverse"
      >
        <Link
          href={detailHref}
          className="text-pc-heading-2
          xl:text-pc-heading-1"
        >
          <strong>{doctor.name} 원장</strong>
        </Link>
        <span className="font-semibold text-[16px] text-[#C8AFA4]">
          {specialistTitle}
        </span>
      </figcaption>
    </figure>
  );
}
