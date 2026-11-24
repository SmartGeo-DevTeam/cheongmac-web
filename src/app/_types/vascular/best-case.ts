/** 치료사례 UI에서 사용하는 표시 데이터. doctorId는 공통 의료진 ID를 참조합니다. */
export type BestCase = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  treatment: string;
  doctorId: string;
};

/** 클라이언트 캐러셀에 필요한 의료진 표시 정보만 전달합니다. */
export type ClinicBestCaseData = BestCase & {
  doctor: { name: string; mobileImgSrc: string } | null;
};
