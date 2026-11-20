import type { ClinicReservationLink } from '@/app/_types/vascular/reservation-link';
import Inner from '@/app/_components/common/inner';
import ClinicReservationLinkItem from './item';

type Props = {
  id: string;
  links: readonly ClinicReservationLink[];
};

export default function ClinicReservationLinks({ id, links }: Props) {
  return (
    <section id={id}>
      <div className="mt-15 xl:mt-18">
        <Inner>
          <div className="grid gap-3 xl:grid-cols-2 xl:gap-6">
            {links.map((item) => (
              <ClinicReservationLinkItem key={item.id} item={item} />
            ))}
          </div>
        </Inner>
      </div>
    </section>
  );
}
