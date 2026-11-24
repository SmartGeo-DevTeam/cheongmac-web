import { doctors, fields, getDoctorDetailHref } from '@/app/_data/about/doctors/doctors';
import type { ClinicSpecialistData } from '@/app/_types/clinic/specialists';
import { toClinicSpecialistData } from '@/app/_utils/clinic/specialists';

/** 의료진 ID의 지정 순서를 유지하고, 존재하지 않는 의료진은 제외합니다. */
export function getClinicSpecialists(
  doctorIds: readonly string[],
): ClinicSpecialistData[] {
  return doctorIds.flatMap((id) => {
    const doctor = doctors.find((item) => item.id === id);
    return doctor
      ? [toClinicSpecialistData(doctor, fields, getDoctorDetailHref(doctor))]
      : [];
  });
}
