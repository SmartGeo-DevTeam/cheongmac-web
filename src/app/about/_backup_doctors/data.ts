export type DoctorScheduleStatus = '진료' | '휴진' | '문의';

export type DoctorScheduleRow = {
  label: '오전' | '오후';
  mon: DoctorScheduleStatus;
  tue: DoctorScheduleStatus;
  wed: DoctorScheduleStatus;
  thu: DoctorScheduleStatus;
  fri: DoctorScheduleStatus;
  sat: DoctorScheduleStatus;
};

export type Doctor = {
  id: number;
  slug: string;
  name: string;
  position: string;
  department: string;
  specialties: string[];
  detailSpecialties: string[];
  educations: string[];
  mobileImageSrc: string;
  desktopImageSrc: string;
  commonProfileImageSrc: string;
  movingProfileImageSrc: string;
  reservationHref: string;
  schedule: DoctorScheduleRow[];
};

export const DOCTORS: Doctor[] = [
  {
    id: 1,
    slug: 'bak-yongbeom',
    name: '박용범',
    position: '원장',
    department: '혈관외과 전문의',
    specialties: ['하지정맥류', '정계정맥류', '골반정맥류'],
    detailSpecialties: [
      '하지정맥류',
      '정계정맥류',
      '골반정맥류',
      '하지정맥류',
      '정계정맥류',
      '골반정맥류',
    ],
    educations: [
      '부산대학교 의과대학 졸업',
      '양산부산대학교병원 혈관외과',
      '메리놀병원 외과 및 혈관외과',
      '국군 수도병원 혈관외과',
      '대한혈관외과학회 상임이사',
      '대한혈관외과학회 학술위원/기획위원',
      '대한정맥학회 상임이사',
      '대한외과학회 상임이사/평생회원',
      '미국정맥학회 정회원',
    ],
    mobileImageSrc: '/assets/doctors/bak-headshot-mobile.png',
    desktopImageSrc: '/assets/doctors/bak-profile-desktop.png',
    commonProfileImageSrc: '/assets/doctors/bak-profile-transparent.png',
    movingProfileImageSrc: '/assets/doctors/bak-motion.gif',
    reservationHref: '/',
    schedule: [
      {
        label: '오전',
        mon: '진료',
        tue: '진료',
        wed: '진료',
        thu: '진료',
        fri: '진료',
        sat: '문의',
      },
      {
        label: '오후',
        mon: '진료',
        tue: '진료',
        wed: '휴진',
        thu: '진료',
        fri: '진료',
        sat: '문의',
      },
    ],
  },
  {
    id: 2,
    slug: 'jeon-jinwon',
    name: '전진원',
    position: '원장',
    department: '혈관외과 전문의',
    specialties: ['하지정맥류', '정계정맥류', '골반정맥류'],
    detailSpecialties: ['하지정맥류', '정계정맥류', '골반정맥류'],
    educations: [
      '부산대학교 의과대학 졸업',
      '부산대학교병원 외과 전공의 수료',
      '양산부산대학교병원 혈관외과',
      '대한혈관외과학회 정회원',
      '대한정맥학회 정회원',
    ],
    mobileImageSrc: '/assets/doctors/jeon-headshot-mobile.png',
    desktopImageSrc: '/assets/doctors/jeon-profile-desktop.png',
    commonProfileImageSrc: '/assets/doctors/jeon-profile-transparent.png',
    movingProfileImageSrc: '/assets/doctors/jeon-motion.gif',
    reservationHref: '/',
    schedule: [
      {
        label: '오전',
        mon: '진료',
        tue: '진료',
        wed: '진료',
        thu: '진료',
        fri: '진료',
        sat: '문의',
      },
      {
        label: '오후',
        mon: '진료',
        tue: '진료',
        wed: '휴진',
        thu: '진료',
        fri: '진료',
        sat: '문의',
      },
    ],
  },
  {
    id: 3,
    slug: 'jang-jiran',
    name: '장지란',
    position: '원장',
    department: '혈관외과 전문의',
    specialties: ['하지정맥류', '정계정맥류', '골반정맥류'],
    detailSpecialties: ['하지정맥류', '정계정맥류', '골반정맥류'],
    educations: [
      '부산대학교 의과대학 졸업',
      '부산대학교병원 외과 전문의',
      '혈관외과 전임의 수료',
      '대한혈관외과학회 정회원',
      '대한정맥학회 정회원',
    ],
    mobileImageSrc: '/assets/doctors/jang-headshot-mobile.png',
    desktopImageSrc: '/assets/doctors/jang-profile-desktop.png',
    commonProfileImageSrc: '/assets/doctors/jang-profile-transparent.png',
    movingProfileImageSrc: '/assets/doctors/jang-motion.gif',
    reservationHref: '/',
    schedule: [
      {
        label: '오전',
        mon: '진료',
        tue: '진료',
        wed: '진료',
        thu: '진료',
        fri: '진료',
        sat: '문의',
      },
      {
        label: '오후',
        mon: '진료',
        tue: '진료',
        wed: '휴진',
        thu: '진료',
        fri: '진료',
        sat: '문의',
      },
    ],
  },
  {
    id: 4,
    slug: 'byun-seungjae',
    name: '변승재',
    position: '원장',
    department: '혈관외과 전문의',
    specialties: ['하지정맥류', '정계정맥류', '골반정맥류'],
    detailSpecialties: ['하지정맥류', '정계정맥류', '골반정맥류'],
    educations: [
      '부산대학교 의과대학 졸업',
      '부산대학교병원 외과 전문의',
      '혈관외과 전임의 수료',
      '대한혈관외과학회 정회원',
      '대한정맥학회 정회원',
    ],
    mobileImageSrc: '/assets/doctors/byun-headshot-mobile.png',
    desktopImageSrc: '/assets/doctors/byun-profile-desktop.png',
    commonProfileImageSrc: '/assets/doctors/byun-profile-transparent.png',
    movingProfileImageSrc: '/assets/doctors/byun-motion.gif',
    reservationHref: '/',
    schedule: [
      {
        label: '오전',
        mon: '진료',
        tue: '진료',
        wed: '진료',
        thu: '진료',
        fri: '진료',
        sat: '문의',
      },
      {
        label: '오후',
        mon: '진료',
        tue: '진료',
        wed: '휴진',
        thu: '진료',
        fri: '진료',
        sat: '문의',
      },
    ],
  },
  {
    id: 5,
    slug: 'bae-byeongho',
    name: '배병호',
    position: '원장',
    department: '영상의학과 전문의',
    specialties: ['하지정맥류', '정계정맥류', '골반정맥류'],
    detailSpecialties: ['하지정맥류', '정계정맥류', '골반정맥류'],
    educations: [
      '부산대학교 의과대학 졸업',
      '영상의학과 전문의',
      '대한영상의학회 정회원',
      '대한초음파의학회 정회원',
    ],
    mobileImageSrc: '/assets/doctors/bae-headshot-mobile.png',
    desktopImageSrc: '/assets/doctors/bae-profile-desktop.png',
    commonProfileImageSrc: '/assets/doctors/bae-profile-transparent.png',
    movingProfileImageSrc: '/assets/doctors/bae-motion.gif',
    reservationHref: '/',
    schedule: [
      {
        label: '오전',
        mon: '진료',
        tue: '진료',
        wed: '진료',
        thu: '진료',
        fri: '진료',
        sat: '문의',
      },
      {
        label: '오후',
        mon: '진료',
        tue: '진료',
        wed: '휴진',
        thu: '진료',
        fri: '진료',
        sat: '문의',
      },
    ],
  },
  {
    id: 6,
    slug: 'kim-byeongju',
    name: '김병주',
    position: '원장',
    department: '마취통증의학과 전문의',
    specialties: ['하지정맥류', '정계정맥류', '골반정맥류'],
    detailSpecialties: ['하지정맥류', '정계정맥류', '골반정맥류'],
    educations: [
      '부산대학교 의과대학 졸업',
      '마취통증의학과 전문의',
      '대한마취통증의학회 정회원',
      '대한통증학회 정회원',
    ],
    mobileImageSrc: '/assets/doctors/kim-headshot-mobile.png',
    desktopImageSrc: '/assets/doctors/kim-profile-desktop.png',
    commonProfileImageSrc: '/assets/doctors/kim-profile-transparent.png',
    movingProfileImageSrc: '/assets/doctors/kim-motion.gif',
    reservationHref: '/',
    schedule: [
      {
        label: '오전',
        mon: '진료',
        tue: '진료',
        wed: '진료',
        thu: '진료',
        fri: '진료',
        sat: '문의',
      },
      {
        label: '오후',
        mon: '진료',
        tue: '진료',
        wed: '휴진',
        thu: '진료',
        fri: '진료',
        sat: '문의',
      },
    ],
  },
];

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return DOCTORS.find((doctor) => doctor.slug === slug);
}
