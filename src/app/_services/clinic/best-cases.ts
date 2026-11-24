import { doctors } from '@/app/_data/about/doctors/doctors';
import type { BestCase, ClinicBestCaseData } from '@/app/_types/vascular/best-case';

/** 기존 의료진 원본에서 표시 정보만 결합하며 사례 순서와 누락 처리 정책을 유지합니다. */
export function getClinicBestCases(cases: readonly BestCase[]): ClinicBestCaseData[] {
  return cases.map((item) => {
    const doctor = doctors.find((person) => person.id === item.doctorId);
    return {
      ...item,
      doctor: doctor ? { name: doctor.name, mobileImgSrc: doctor.mobileImgSrc } : null,
    };
  });
}
