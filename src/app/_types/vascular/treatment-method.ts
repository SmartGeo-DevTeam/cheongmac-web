/** 치료법 상세 정보의 표시 방식. 데이터 순서대로 렌더링합니다. */
export type TreatmentDetailSection = {
  id: string;
  title: string;
} & (
  | { type: 'tags'; items: readonly string[] }
  | { type: 'numbered-list'; items: readonly string[] }
  | {
      type: 'description-list';
      items: readonly { label: string; description: string }[];
    }
);

export type TreatmentDisplayMode = 'tabs' | 'standalone';

/** 여러 혈관질환 상세 페이지에서 사용하는 공통 치료법 데이터. */
export type TreatmentMethod = {
  id: string;
  category: string;
  title: string;
  englishTitle: string;
  description: string;
  image: { src: string; alt: string };
} & (
  | {
      /** 기존 데이터와 호출부의 호환성을 유지합니다. */
      candidates: readonly string[];
      features: readonly { label: string; description: string }[];
      sections?: never;
    }
  | {
      /** 제목·표시 방식·순서를 데이터로 정의합니다. */
      sections: readonly TreatmentDetailSection[];
      candidates?: never;
      features?: never;
    }
);

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
