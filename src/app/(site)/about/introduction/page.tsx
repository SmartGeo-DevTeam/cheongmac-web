import IntroductionIntroQuickLinks from '@/app/_ui/about/introduction/intro/quick-links';
import IntroductionIntroMessage from '@/app/_ui/about/introduction/intro/message';
import IntroductionIntroPeople from '@/app/_ui/about/introduction/intro/people';
import IntroductionIntroPrinciples from '@/app/_ui/about/introduction/intro/principles';
import IntroductionIntroPromises from '@/app/_ui/about/introduction/intro/promises';
import IntroductionIntroReasons from '@/app/_ui/about/introduction/intro/reasons';
import IntroductionIntroSummary from '@/app/_ui/about/introduction/intro/summary';

export default function AboutIntroductionPage() {
  return (
    <>
      <IntroductionIntroMessage />
      <IntroductionIntroPrinciples />
      <IntroductionIntroPeople />
      <IntroductionIntroReasons />
      <IntroductionIntroPromises />
      <IntroductionIntroQuickLinks />
      <IntroductionIntroSummary />
    </>
  );
}
