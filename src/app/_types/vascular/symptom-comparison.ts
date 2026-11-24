export type ClinicSymptomComparisonCondition = {
  title: string;
  alternateTitle?: string;
  image: string;
  imageAlt?: string;
  symptoms: { label: string; value: string }[];
};
