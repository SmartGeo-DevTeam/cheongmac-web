/** 하지동맥폐색증 상세 페이지의 정적 콘텐츠용 공통 타입. */
export type OcclusionImage = {
  src: string;
  alt: string;
};

export type OcclusionContentItem = {
  id: string;
  title: string;
  description?: string;
  image?: OcclusionImage;
};

/** 추후 DB 관계형 전환 시 doctorId를 의료진 FK로 매핑할 수 있습니다. */
export type OcclusionCaseItem = OcclusionContentItem & {
  doctorId?: string;
  beforeImage?: OcclusionImage;
  afterImage?: OcclusionImage;
};

export type OcclusionProcedureTab = {
  id: string;
  label: string;
  description?: string;
  image?: OcclusionImage;
};
