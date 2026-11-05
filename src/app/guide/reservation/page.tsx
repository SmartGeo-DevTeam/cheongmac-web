import PageHeader from '@/app/_components/common/page-header';
import Methods from './_sections/methods';
import Notice from './_sections/notice';

export default function GuideReservationPage() {
  return (
    <>
      <PageHeader title="진료예약" />
      <Methods />
      <Notice />
    </>
  );
}
