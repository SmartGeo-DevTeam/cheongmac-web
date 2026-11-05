import Faq from './faq';
import Intro from './intro';
import Items from './items';
import Notices from './notices';
import Procedure from './procedure';

export default function PreparationSections() {
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
