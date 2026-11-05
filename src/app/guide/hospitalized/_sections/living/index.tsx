import Intro from './intro';
import Meals from './meals';
import Rounds from './rounds';
import Visits from './visits';
import Notices from './notices';
import Payment from './payment';
import Faq from './faq';

export default function LivingSections() {
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
