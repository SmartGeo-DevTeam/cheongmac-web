import ClinicSpecialistsSection from '@/app/_components/clinic/specialists/section';
import {
  doctors,
  fields,
  getDoctorDetailHref,
} from '@/app/_data/about/doctors/doctors';
import { venousSpecialistsContent } from '@/app/_data/vascular/venous/specialists/content';
import { toClinicSpecialistData } from '@/app/_utils/clinic/specialists';

/** 정맥질환 전용 의료진 ID의 표시 순서를 지키면서 공통 UI를 사용합니다. */
export default function VenousSpecialists() {
  const selectedDoctors = venousSpecialistsContent.doctorIds.flatMap((id) => {
    const doctor = doctors.find((item) => item.id === id);
    return doctor
      ? [toClinicSpecialistData(doctor, fields, getDoctorDetailHref(doctor))]
      : [];
  });

  return (
    <ClinicSpecialistsSection
      id="vascular-venous-specialists"
      content={venousSpecialistsContent}
      doctors={selectedDoctors}
    />
  );
}
