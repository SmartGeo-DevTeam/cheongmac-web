import Inner from '@/app/_components/common/inner';
import { doctors } from '@/app/about/doctors/_sections/_doctors/data';
import Title from '../../_components/title';
import { getOffs } from '../../data';
import OffItem from './_components/off-item';
import { getTodayInKorea, getUpcomingOffs } from './_lib/offs';

export default async function Off() {
  const offs = await getOffs();
  const today = getTodayInKorea();
  const upcoming = getUpcomingOffs(offs, doctors, today);

  if (!upcoming.hospitalOffs.length && !upcoming.doctorGroups.length) {
    return null;
  }

  return (
    <section id="community-notice-off">
      <Inner>
        <div className="mt-10">
          <Title text="휴진 안내" />

          <ul
            className="mt-5 grid grid-cols-1 gap-3
            xl:grid-cols-2 xl:gap-4"
          >
            {upcoming.hospitalOffs.map((off) => (
              <OffItem
                key={off.id}
                variant="hospital"
                off={off}
                today={today}
              />
            ))}

            {upcoming.doctorGroups.map(({ doctor, schedules }) => (
              <OffItem
                key={doctor.id}
                variant="doctor"
                doctor={doctor}
                schedules={schedules}
                today={today}
              />
            ))}
          </ul>
        </div>
      </Inner>
    </section>
  );
}
