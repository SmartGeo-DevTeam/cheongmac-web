import ClinicReservationLinks from '@/app/_components/clinic/reservation-links/section';
import { vascularReservationLinks } from '@/app/_data/vascular/reservation-links/links';

export default function OcclusionReservationLinks() {
  return (
    <ClinicReservationLinks
      id="vascular-arterial-occlusion-reservation-links"
      links={vascularReservationLinks}
    />
  );
}
