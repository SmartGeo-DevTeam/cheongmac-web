import Image from 'next/image';
import { ActivityType } from '../data';

export default function ActivityItem({
  activities,
}: {
  activities: ActivityType;
}) {
  return (
    <li className="xl:grid xl:grid-cols-[2fr_3fr] xl:gap-6">
      <div
        className="space-y-3
        xl:space-y-2"
      >
        <h3
          className="relative pl-6 text-mo-title-2
          before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:size-4 before:rounded-full before:bg-accent-ai
          after:absolute after:left-1.25 after:top-1/2 after:-translate-y-1/2 after:size-2 after:rounded-full after:bg-white
          xl:pl-8 xl:text-pc-title-2
          xl:before:size-5
          xl:after:size-2.5
          "
        >
          {activities.title}
        </h3>
        <p className="xl:text-pc-body-2">{activities.desc}</p>
      </div>

      <ul
        className="mt-6 grid grid-cols-1 gap-10
        xl:grid-cols-2 xl:gap-x-6 xl:gap-y-15"
      >
        {activities.items.map((activity) => (
          <li key={activity.id}>
            <div
              className="relative w-full aspect-video rounded-xl overflow-clip
            xl:"
            >
              <Image src={activity.imgUrl} alt={activity.title} fill />
            </div>
            <p
              className="mt-3 text-mo-body-1
              xl:text-pc-body-1"
            >
              {activity.title}
            </p>
          </li>
        ))}
      </ul>
    </li>
  );
}
