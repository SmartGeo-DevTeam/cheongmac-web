import Inner from '@/app/_components/common/inner';
import SectionTitle from '@/app/_components/common/section-title';
import { doctors } from '@/app/_data/about/doctors/doctors';
import { getOffs } from '@/app/_data/community/notice/clinic-closures';
import NoticeClosureItem from './closure-item';
import { getTodayInKorea, getUpcomingOffs } from '@/app/_lib/community/notice/clinic-closure-utils';

export default async function NoticeClinicClosures() {
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
          <SectionTitle text="휴진 안내" />

          <ul
            className="mt-5 grid grid-cols-1 gap-3
            xl:grid-cols-2 xl:gap-4"
          >
            {upcoming.hospitalOffs.map((off) => (
              <NoticeClosureItem
                key={off.id}
                variant="hospital"
                off={off}
                today={today}
              />
            ))}

            {upcoming.doctorGroups.map(({ doctor, schedules }) => (
              <NoticeClosureItem
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
