import CTA from './_sections/_cta';
import Message from './_sections/_message';
import People from './_sections/_people';
import Principle from './_sections/_principle';
import Promise from './_sections/_promise';
import Reason from './_sections/_reason';
import Summary from './_sections/_summary';

export default function AboutintroductionIntroPage() {
  return (
    <>
      <Message />
      <Principle />
      <People />
      <Reason />
      <Promise />
      <CTA />
      <Summary />
    </>
  );
}
