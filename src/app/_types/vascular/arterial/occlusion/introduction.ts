export type OcclusionIntroductionSymptom = {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
  symptoms: string[];
  caution: {
    lead: string;
    emphasis: string;
    tail: string;
  } | null;
};
