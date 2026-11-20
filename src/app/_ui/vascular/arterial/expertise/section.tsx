import ClinicExpertiseSection from '@/app/_components/clinic/expertise/section';
import { arterialExpertiseItems } from '@/app/_data/vascular/arterial/expertise/items';

export default function ArterialExpertise() {
  return (
    <ClinicExpertiseSection
      id="vascular-arterial-expertise"
      items={arterialExpertiseItems}
    />
  );
}
