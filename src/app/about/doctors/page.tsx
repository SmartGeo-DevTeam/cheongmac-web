import CTA from './_sections/_cta';
import Doctors from './_sections/_doctors';
import Message from './_sections/_message';
import Recommend from './_sections/_recommend';

export default function AboutDoctorsPage() {
  return (
    <>
      <Doctors />
      <Recommend />
      <Message />
      <CTA />
    </>
  );
}
