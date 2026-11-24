/** 부위별 질환 카드 공통 데이터. href는 실제 상세 라우트입니다. */
export type ClinicDiseaseCardData = {
  id: string;
  title: string;
  href: string;
  image: string;
  tags: readonly string[];
};
