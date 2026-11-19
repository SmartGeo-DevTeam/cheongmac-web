/** 실제 병원 치료 결과가 아닌 UI 데이터에도 사용할 수 있는 공통 카드 타입. */
export type ClinicBestCase = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  treatment: string;
  doctorId?: string;
};
