export type SymptomCarouselItem = {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
  symptoms: readonly string[];
  caution: {
    lead: string;
    emphasis: string;
    tail: string;
  } | null;
};
