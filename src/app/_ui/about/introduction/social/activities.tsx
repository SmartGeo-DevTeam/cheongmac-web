import Inner from '@/app/_components/common/inner';
import { activities } from '@/app/_data/about/introduction/social/activities';
import IntroductionSocialActivityCard from './activity-card';

export default function IntroductionSocialActivities() {
  return (
    <section id="about-social-activity">
      <div
        className="mt-15
        xl:mt-50"
      >
        <Inner>
          <ul
            className="space-y-20
            xl:space-y-50"
          >
            {activities.map((items) => (
              <IntroductionSocialActivityCard
                key={items.id}
                activities={items}
              />
            ))}
          </ul>
        </Inner>
      </div>
    </section>
  );
}
