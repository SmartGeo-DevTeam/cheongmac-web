import Inner from '@/app/_components/common/inner';
import { occlusionReservationLinks } from '@/app/_data/vascular/arterial/occlusion/reservation-links/links';
import ReservationLinkItem from './item';

export default function OcclusionReservationLinks() {
  return (
    <section id="vascular-arterial-occlusion-reservation-links">
      <div className="mt-15 xl:mt-18">
        <Inner>
          <div className="grid gap-3 xl:grid-cols-2 xl:gap-6">
            {occlusionReservationLinks.map((item) => <ReservationLinkItem key={item.id} item={item} />)}
          </div>
        </Inner>
      </div>
    </section>
  );
}
