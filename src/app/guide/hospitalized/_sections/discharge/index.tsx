import Intro from './intro';
import Procedure from './procedure';
import Notices from './notices';
import Faq from './faq';

export default function DischargeSections() {
  return (
    <>
      <Intro />
      <Procedure />
      <Notices />
      <Faq />
    </>
  );
}
