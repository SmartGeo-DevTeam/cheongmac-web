import ClinicExpertiseItem from '@/app/_components/clinic/expertise/item';
import type { ClinicExpertiseItem as ClinicExpertiseItemData } from '@/app/_types/clinic/expertise';
export default function ArterialExpertiseItem({ item }: { item: ClinicExpertiseItemData }) {
  return <ClinicExpertiseItem item={item} />;
}
