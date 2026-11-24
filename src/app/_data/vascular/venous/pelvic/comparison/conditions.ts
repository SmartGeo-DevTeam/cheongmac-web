import type { ClinicSymptomComparisonCondition } from '@/app/_types/vascular/symptom-comparison';

export const menstrualPainCondition: ClinicSymptomComparisonCondition = {
  title: '일반 생리통',
  image: '/vascular/venous/pelvic/comparison/menstrual-pain.png',
  imageAlt: '아랫배를 감싸고 있는 여성과 자궁 구조 일러스트',
  symptoms: [
    { label: '언제', value: '생리 직전·초반 며칠' },
    { label: '느낌', value: '쥐어짜는 듯한 통증' },
    { label: '범위', value: '아랫배' },
  ],
};

export const pelvicVaricesCondition: ClinicSymptomComparisonCondition = {
  title: '골반정맥류',
  alternateTitle: '골반울혈증후군',
  image: '/vascular/venous/pelvic/comparison/pelvic-varices-ct.png',
  imageAlt: '골반 혈관의 3차원 CT 영상 예시',
  symptoms: [
    { label: '언제', value: '생리 기간이 아닐 때도 통증이 느껴짐' },
    { label: '느낌', value: '묵직·뻐근하고 밑이 빠지는 듯함' },
    { label: '범위', value: '허리·엉덩이·허벅지 안쪽' },
  ],
};
