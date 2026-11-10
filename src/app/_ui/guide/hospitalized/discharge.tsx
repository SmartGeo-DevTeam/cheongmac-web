import Intro from './discharge/overview';
import Procedure from './discharge/procedure';
import Notices from './discharge/notices';
import Faq from './discharge/faq';

export default function HospitalizedDischarge() {
  return (
    <>
      <Intro />
      <Procedure />
      <Notices />
      <Faq />
    </>
  );
}
