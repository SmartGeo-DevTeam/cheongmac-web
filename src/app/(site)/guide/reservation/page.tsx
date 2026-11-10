import PageHeader from '@/app/_components/common/page-header';
import ReservationMethods from '@/app/_ui/guide/reservation/methods';
import ReservationNotices from '@/app/_ui/guide/reservation/notices';

export default function GuideReservationPage() {
  return (
    <>
      <PageHeader title="진료예약" />
      <ReservationMethods />
      <ReservationNotices />
    </>
  );
}
