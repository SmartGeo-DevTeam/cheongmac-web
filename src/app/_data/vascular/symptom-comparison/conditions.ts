import type { ClinicSymptomComparisonCondition } from '@/app/_types/vascular/symptom-comparison';

export const spinalStenosisCondition: ClinicSymptomComparisonCondition = {
  title: '척추디스크',
  alternateTitle: '요추관협착증',
  image: '/vascular/arterial/symptom-comparison/spinal-stenosis.png',
  symptoms: [
    { label: '통증 부위', value: '허리·엉덩이·다리 바깥쪽' },
    { label: '휴식 시', value: '쉬어도 지속되는 통증' },
    { label: '발등 맥박', value: '정상' },
  ],
};

export const arterialOcclusionCondition: ClinicSymptomComparisonCondition = {
  title: '하지동맥폐색증',
  alternateTitle: '말초동맥폐쇄증',
  image: '/vascular/arterial/symptom-comparison/arterial-occlusion.png',
  symptoms: [
    { label: '통증 부위', value: '종아리·허벅지 근육' },
    { label: '휴식 시', value: '쉬면 완화되는 통증' },
    { label: '발등 맥박', value: '약하거나 느껴지지 않음' },
  ],
};
