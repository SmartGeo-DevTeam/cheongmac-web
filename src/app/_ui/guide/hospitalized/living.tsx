import Intro from './living/overview';
import Meals from './living/meals';
import Rounds from './living/rounds';
import Visits from './living/visits';
import Notices from './living/notices';
import Payment from './living/payment';
import Faq from './living/faq';

export default function HospitalizedLiving() {
  return (
    <>
      <Intro />
      <Meals />
      <Rounds />
      <Visits />
      <Notices />
      <Payment />
      <Faq />
    </>
  );
}
