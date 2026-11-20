import type { ClinicSpecialistData } from '@/app/_types/clinic/specialists';

type SpecialistDoctorSource = {
  id: string;
  name: string;
  pathImgSrc: string;
  fieldIds: readonly string[];
};

type SpecialistFieldSource = {
  id: string;
  specialistTitle: string;
};

/** 의료진 DB/하드코딩 데이터의 표시 정보를 UI 전용 Props로 변환하는 순수 함수입니다. */
export function toClinicSpecialistData(
  doctor: SpecialistDoctorSource,
  fields: readonly SpecialistFieldSource[],
  detailHref: string,
): ClinicSpecialistData {
  return {
    id: doctor.id,
    name: doctor.name,
    imageSrc: doctor.pathImgSrc,
    specialistTitle: fields
      .filter((field) => doctor.fieldIds.includes(field.id))
      .map((field) => field.specialistTitle)
      .join(' · '),
    detailHref,
  };
}
