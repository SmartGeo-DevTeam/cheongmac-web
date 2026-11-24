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

/** 동맥질환과 하지동맥폐색증에서 공통으로 사용하는 비교 제목 데이터입니다. */
export const arterialComparisonHeading = {
  label: '비슷한 증상, 다른 전혀 질환',
  titlePrefix: '혹시 ',
  titleEmphasis: '척추디스크',
  titleSuffix: '로',
  titleSecondLine: '오해하고 계신가요?',
  description:
    '말초동맥폐쇄증은 증상이 척추디스크와 매우 비슷해 혼동되는 경우가 많습니다.',
} as const;
