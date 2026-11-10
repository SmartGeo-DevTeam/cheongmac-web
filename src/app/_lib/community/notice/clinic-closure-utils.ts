import type { DoctorType } from '@/app/_data/about/doctors/doctors';
import type {
  DoctorOff,
  HospitalOff,
  Off,
  OffDate,
  OffSession,
} from '@/app/_data/community/notice/clinic-closures';

export type DoctorOffGroup = {
  doctor: DoctorType;
  schedules: DoctorOff[];
};

export type UpcomingOffs = {
  hospitalOffs: HospitalOff[];
  doctorGroups: DoctorOffGroup[];
};

/** 배포 서버가 UTC로 실행되어도 '오늘'은 항상 한국 날짜로 판단합니다. */
export function getTodayInKorea(now: Date = new Date()): OffDate {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);

  const year = parts.find(({ type }) => type === 'year')?.value;
  const month = parts.find(({ type }) => type === 'month')?.value;
  const day = parts.find(({ type }) => type === 'day')?.value;
  return `${year}-${month}-${day}` as OffDate;
}

/** 잘못된 날짜가 들어온 경우 카드가 만들어지지 않도록 검사합니다. */
function isValidDate(value: string): value is OffDate {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/** 날짜가 올바르고 종료일이 오늘 이상이면 노출 (오늘 포함). */
export function isUpcomingOff(off: Off, today: OffDate): boolean {
  return (
    isValidDate(off.startDate) &&
    isValidDate(off.endDate) &&
    off.startDate <= off.endDate &&
    off.endDate >= today
  );
}

/** 미래/진행 중 일정만 남기고, 동일한 의료진 ID별로 여러 일정을 모읍니다. */
export function getUpcomingOffs(
  records: readonly Off[],
  doctors: readonly DoctorType[],
  today: OffDate = getTodayInKorea(),
): UpcomingOffs {
  const upcoming = records
    .filter((off) => isUpcomingOff(off, today))
    .sort(
      (a, b) =>
        a.startDate.localeCompare(b.startDate) ||
        a.endDate.localeCompare(b.endDate) ||
        a.id.localeCompare(b.id),
    );

  const hospitalOffs: HospitalOff[] = [];
  const doctorSchedules = new Map<string, DoctorOff[]>();

  for (const off of upcoming) {
    if (off.type === 'hospital') {
      hospitalOffs.push(off);
      continue;
    }

    const current = doctorSchedules.get(off.doctorId) ?? [];
    current.push(off);
    doctorSchedules.set(off.doctorId, current);
  }

  // 기존 의료진 배열의 표시 순서를 유지합니다. 존재하지 않는 doctorId는 표시하지 않습니다.
  const doctorGroups = doctors.flatMap((doctor) => {
    const schedules = doctorSchedules.get(doctor.id);
    return schedules?.length ? [{ doctor, schedules }] : [];
  });

  return { hospitalOffs, doctorGroups };
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

/** UTC 기준으로 달력 날짜만 사용하여 서버 시간대와 무관하게 요일을 구합니다. */
function formatDay(date: OffDate, showYear: boolean): string {
  const [year, month, day] = date.split('-').map(Number);
  const weekDay =
    WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return `${showYear ? `${year}년 ` : ''}${month}월 ${day}일(${weekDay})`;
}

export function formatOffPeriod(
  startDate: OffDate,
  endDate: OffDate,
  today: OffDate,
): string {
  const year = today.slice(0, 4);
  const showYear =
    startDate.slice(0, 4) !== year || endDate.slice(0, 4) !== year;

  const start = formatDay(startDate, showYear);
  if (startDate === endDate) return start;

  return `${start} ~ ${formatDay(endDate, showYear)}`;
}

export function getOffSessionLabel(session: OffSession = 'all-day') {
  if (session === 'morning') return '오전 휴진';
  if (session === 'afternoon') return '오후 휴진';
  return '휴진';
}
