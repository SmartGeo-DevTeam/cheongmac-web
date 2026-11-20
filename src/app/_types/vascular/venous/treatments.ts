/** 정맥질환 맞춤 치료 슬라이드 데이터. */
export type VenousTreatmentMethod = {
  id: string;
  title: string;
  image: string;
  description: string;
  procedures: readonly string[];
};
