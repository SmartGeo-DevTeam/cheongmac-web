import Faq from './preparation/faq';
import Intro from './preparation/overview';
import Items from './preparation/packing-list';
import Notices from './preparation/notices';
import Procedure from './preparation/procedure';

export default function HospitalizedPreparation() {
  return (
    <>
      <Intro />
      <Items />
      <Procedure />
      <Notices />
      <Faq />
    </>
  );
}
