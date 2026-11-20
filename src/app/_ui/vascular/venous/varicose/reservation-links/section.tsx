import ClinicReservationLinks from '@/app/_components/clinic/reservation-links/section';
import { vascularReservationLinks } from '@/app/_data/vascular/reservation-links/links';

export default function VaricoseReservationLinks() {
  return (
    <ClinicReservationLinks
      id="vascular-venous-varicose-reservation-links"
      links={vascularReservationLinks}
    />
  );
}
