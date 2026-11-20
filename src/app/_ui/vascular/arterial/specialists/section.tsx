import ClinicSpecialistsSection from '@/app/_components/clinic/specialists/section';
import {
  doctors,
  fields,
  getDoctorDetailHref,
} from '@/app/_data/about/doctors/doctors';
import { arterialSpecialistsContent } from '@/app/_data/vascular/arterial/specialists/content';
import { toClinicSpecialistData } from '@/app/_utils/clinic/specialists';

/** 동맥질환은 기존 의료진 1명과 콘텐츠를 그대로 사용합니다. */
export default function ArterialSpecialists() {
  const doctor = doctors.find(
    (item) => item.id === arterialSpecialistsContent.doctorId,
  );
  const selectedDoctors = doctor
    ? [toClinicSpecialistData(doctor, fields, getDoctorDetailHref(doctor))]
    : [];

  return (
    <ClinicSpecialistsSection
      id="vascular-arterial-specialists"
      content={arterialSpecialistsContent}
      doctors={selectedDoctors}
    />
  );
}
