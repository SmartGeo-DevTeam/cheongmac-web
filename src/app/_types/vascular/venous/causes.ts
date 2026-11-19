/** 원인 비교 카드에서 UI와 정적 데이터가 공유하는 타입. */
export type VenousCauseDetail = {
  label: string;
  value: string;
  badge?: {
    label: string;
    hidden?: boolean;
  };
};

export type VenousCauseCard = {
  id: string;
  title: string;
  description: string;
  image: string;
  details: readonly VenousCauseDetail[];
};
