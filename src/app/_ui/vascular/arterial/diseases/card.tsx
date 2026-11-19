import ClinicDiseaseCardItem from '@/app/_components/clinic/diseases/card';
import type { ArterialDiseaseCardType } from '@/app/_data/vascular/arterial/diseases/cards';
export default function ArterialDiseaseCard({ item }: { item: ArterialDiseaseCardType }) {
  return <ClinicDiseaseCardItem item={item} />;
}
