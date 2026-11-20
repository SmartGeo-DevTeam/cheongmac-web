import ClinicExpertiseSection from '@/app/_components/clinic/expertise/section';
import { venousExpertiseItems } from '@/app/_data/vascular/venous/expertise/items';

export default function VenousExpertise() {
  return (
    <ClinicExpertiseSection
      id="vascular-venous-expertise"
      items={venousExpertiseItems}
    />
  );
}
