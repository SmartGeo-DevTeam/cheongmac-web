import Inner from '@/app/_components/common/inner';
import ActivityItem from './_components/activity-item';
import { activities } from './data';

export default function Activity() {
  return (
    <section id="introduction-social-activity">
      <div
        className="mt-15
        xl:mt-50"
      >
        <Inner>
          <ul
            className="pb-20 space-y-20
          xl:pb-30 xl:space-y-50"
          >
            {activities.map((items) => (
              <ActivityItem key={items.id} activities={items} />
            ))}
          </ul>
        </Inner>
      </div>
    </section>
  );
}
