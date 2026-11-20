/** 여러 혈관질환 페이지가 공유하는 진료 강점 카드 데이터 형식. */
export type ClinicStrengthVisual =
  | { kind: 'image'; src: string }
  | { kind: 'icon'; src: string };

export type ClinicStrengthTitleLine = {
  text: string;
  emphasis?: boolean;
  suffix?: string;
};

export type ClinicStrength = {
  id: string;
  titleLines: readonly ClinicStrengthTitleLine[];
  description: string;
  visual: ClinicStrengthVisual;
  descriptionNarrow?: boolean;
  extraBottomPadding?: boolean;
  note?: string;
};
