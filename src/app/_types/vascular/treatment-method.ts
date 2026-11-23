/** 여러 혈관질환 상세 페이지의 치료법 선택 UI에서 사용하는 공통 데이터. */
export type TreatmentMethod = {
  id: string;
  category: string;
  title: string;
  englishTitle: string;
  description: string;
  image: { src: string; alt: string };
  candidates: readonly string[];
  features: readonly { label: string; description: string }[];
};

/** 탭 치료법과 별개로 섹션 하단에 표시하는 선택적 보조 치료 정보. */
export type AdditionalTreatmentItem = {
  id: string;
  title: string;
  image: { src: string; alt: string };
};

export type AdditionalTreatmentsContent = {
  items: readonly AdditionalTreatmentItem[];
  description?: string;
};
