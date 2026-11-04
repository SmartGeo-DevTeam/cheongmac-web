/**
 * 휴진 등록 1건 = 일정 1건.
 * 추후 관리자의 날짜 선택기에서 선택한 값을 YYYY-MM-DD로 저장하세요.
 * doctorId는 doctors/data.ts의 DoctorType.id와 연결합니다. (이름/성/slug 사용 X)
 */
export type OffDate = `${number}-${number}-${number}`;

export type OffSession = 'all-day' | 'morning' | 'afternoon';

type OffBase = {
  id: string; // 휴진 일정 자체의 고유 키 (DB 연동 시 PK)
  startDate: OffDate; // 포함하는 시작일
  endDate: OffDate; // 포함하는 종료일
  note?: string;
};

export type HospitalOff = OffBase & {
  type: 'hospital';
  title: string;
  doctorId?: never;
  session?: never;
};

export type DoctorOff = OffBase & {
  type: 'doctor';
  doctorId: string; // 의료진 고유 ID (DB 연동 시 doctors.id 외래 키)
  session?: OffSession;
  title?: never;
};

export type Off = HospitalOff | DoctorOff;

/**
 * 화면 확인을 위한 가상 일정입니다. 실제 병원의 휴진 정보가 아닙니다.
 * 개발 모드에서만 표시되며 운영 환경에서는 빈 목록을 반환합니다.
 * 실제 데이터 연결 후 아래 예시와 getOffs()의 본문을 DB 조회로 교체하세요.
 */
const demoOffs: Off[] = [
  {
    id: 'demo-hospital-2026-12-25',
    type: 'hospital',
    title: '휴진 안내',
    startDate: '2026-12-25',
    endDate: '2026-12-25',
  },
  {
    id: 'demo-bak-2026-11-12',
    type: 'doctor',
    doctorId: 'bak-yong-beom',
    startDate: '2026-11-12',
    endDate: '2026-11-14',
  },
  {
    id: 'demo-bak-2026-11-19',
    type: 'doctor',
    doctorId: 'bak-yong-beom',
    startDate: '2026-11-19',
    endDate: '2026-11-19',
    session: 'afternoon',
  },
  {
    id: 'demo-jeon-2026-11-10',
    type: 'doctor',
    doctorId: 'jeon-jin-won',
    startDate: '2026-11-10',
    endDate: '2026-11-10',
  },
  {
    id: 'demo-jang-2026-11-24',
    type: 'doctor',
    doctorId: 'jang-ji-ran',
    startDate: '2026-11-24',
    endDate: '2026-11-27',
  },
  {
    id: 'demo-byun-2026-12-02',
    type: 'doctor',
    doctorId: 'byun-seungjae',
    startDate: '2026-12-02',
    endDate: '2026-12-02',
    session: 'morning',
  },
  {
    id: 'demo-expired-2026-10-20',
    type: 'doctor',
    doctorId: 'bak-yong-beom',
    startDate: '2026-10-20',
    endDate: '2026-10-21',
  },
];

/** DB 연결 지점: 운영에서는 실제 휴진 레코드를 조회하여 반환하세요. */
export async function getOffs(): Promise<Off[]> {
  if (process.env.NODE_ENV === 'production') {
    return [];
  }

  return demoOffs;
}
