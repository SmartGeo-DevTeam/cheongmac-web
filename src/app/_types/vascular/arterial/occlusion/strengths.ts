/** 하지동맥폐색증 페이지의 진료 강점 카드 데이터 형태. */
export type OcclusionStrengthVisual =
  | { kind: 'image'; src: string }
  | { kind: 'icon'; src: string };

export type OcclusionStrengthTitleLine = {
  text: string;
  emphasis?: boolean;
  suffix?: string;
};

export type OcclusionStrength = {
  id: string;
  titleLines: readonly OcclusionStrengthTitleLine[];
  description: string;
  visual: OcclusionStrengthVisual;
  titleSize?: 'regular' | 'large';
  descriptionNarrow?: boolean;
  extraBottomPadding?: boolean;
  note?: string;
};
