import IntroductionSocialActivities from '@/app/_ui/about/introduction/social/activities';
import IntroductionSocialMessage from '@/app/_ui/about/introduction/social/message';
import IntroductionSocialRecentActivities from '@/app/_ui/about/introduction/social/recent-activities';

export default function AboutIntroductionSocialPage() {
  return (
    <>
      <IntroductionSocialRecentActivities />
      <IntroductionSocialMessage />
      <IntroductionSocialActivities />
    </>
  );
}
