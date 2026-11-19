/** 하지동맥폐색증 치료법 섹션의 정적 데이터 타입. */
export type OcclusionTreatmentMethod = {
  id: string;
  category: string;
  title: string;
  englishTitle: string;
  description: string;
  image: { src: string; alt: string };
  candidates: readonly string[];
  features: readonly { label: string; description: string }[];
};
