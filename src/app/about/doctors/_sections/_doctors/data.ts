export const fields = [
  {
    id: 'vascular-surgery',
    name: '혈관외과',
    specialistTitle: '혈관외과 전문의',
  },
  {
    id: 'radiology',
    name: '영상의학과',
    specialistTitle: '영상의학과 전문의',
  },
  {
    id: 'anesthesiology',
    name: '마취통증의학과',
    specialistTitle: '마취통증의학과 전문의',
  },
] as const;

export type FieldId = (typeof fields)[number]['id'];

export type DoctorType = {
  id: string;
  name: string;
  mobileImgSrc: string;
  desktopImgSrc: string;
  profileImgSrc: string;
  fieldIds: FieldId[];
  expertise: string[];
  educations: string[];
  detailHref: string;
  reservationHref: string;
};

export const doctors: DoctorType[] = [
  {
    id: 'bak-yong-beom',
    name: '박용범',
    mobileImgSrc: '/doctors/bak-m.png',
    desktopImgSrc: '/doctors/bak-pc.png',
    profileImgSrc: '/doctors/bak-profile.png',
    fieldIds: ['vascular-surgery'],
    expertise: [
      '하지정맥류',
      '정계정맥류',
      '골반정맥류',
      '자궁근종',
      '메이터너증후군',
      'KT증후군',
      '호두까기증후군',
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
    detailHref: '/',
    reservationHref: '/',
  },
  {
    id: 'jeon-jin-won',
    name: '전진원',
    mobileImgSrc: '/doctors/jeon-m.png',
    desktopImgSrc: '/doctors/jeon-pc.png',
    profileImgSrc: '/doctors/jeon-profile.png',
    fieldIds: ['vascular-surgery'],
    expertise: [
      '하지정맥류',
      '정계정맥류',
      '골반정맥류',
      '자궁근종',
      '메이터너증후군',
      'KT증후군',
      '호두까기증후군',
    ],
    educations: [
      '부산대학교 의과대학 졸업',
      '부산대학교병원 외과 전공의 수료',
      '양산부산대학교병원 혈관외과',
      '대한혈관외과학회 정회원',
      '대한정맥학회 정회원',
    ],
    detailHref: '/',
    reservationHref: '/',
  },
  {
    id: 'jang-ji-ran',
    name: '장지란',
    mobileImgSrc: '/doctors/jang-m.png',
    desktopImgSrc: '/doctors/jang-pc.png',
    profileImgSrc: '/doctors/jang-profile.png',
    fieldIds: ['vascular-surgery'],
    expertise: ['하지정맥류', '정계정맥류', '골반정맥류'],
    educations: [
      '부산대학교 의과대학 졸업',
      '부산대학교병원 외과 전문의',
      '혈관외과 전임의 수료',
      '대한혈관외과학회 정회원',
      '대한정맥학회 정회원',
    ],
    detailHref: '/',
    reservationHref: '/',
  },
  {
    id: 'byun-seungjae',
    name: '변승재',
    mobileImgSrc: '/doctors/byun-m.png',
    desktopImgSrc: '/doctors/byun-pc.png',
    profileImgSrc: '/doctors/byun-profile.png',
    fieldIds: ['vascular-surgery'],
    expertise: ['하지정맥류', '정계정맥류', '골반정맥류'],
    educations: [
      '부산대학교 의과대학 졸업',
      '부산대학교병원 외과 전문의',
      '혈관외과 전임의 수료',
      '대한혈관외과학회 정회원',
      '대한정맥학회 정회원',
    ],
    detailHref: '/',
    reservationHref: '/',
  },
  {
    id: 'bae-byeongho',
    name: '배병호',
    mobileImgSrc: '/doctors/bae-m.png',
    desktopImgSrc: '/doctors/bae-pc.png',
    profileImgSrc: '/doctors/bae-profile.png',
    fieldIds: ['radiology'],
    expertise: ['하지정맥류', '정계정맥류', '골반정맥류'],
    educations: [
      '부산대학교 의과대학 졸업',
      '영상의학과 전문의',
      '대한영상의학회 정회원',
      '대한초음파의학회 정회원',
    ],
    detailHref: '/',
    reservationHref: '/',
  },
  {
    id: 'kim-byeongju',
    name: '김병주',
    mobileImgSrc: '/doctors/kim-m.png',
    desktopImgSrc: '/doctors/kim-pc.png',
    profileImgSrc: '/doctors/kim-profile.png',
    fieldIds: ['anesthesiology'],
    expertise: ['하지정맥류', '정계정맥류', '골반정맥류'],
    educations: [
      '부산대학교 의과대학 졸업',
      '마취통증의학과 전문의',
      '대한마취통증의학회 정회원',
      '대한통증학회 정회원',
    ],
    detailHref: '/',
    reservationHref: '/',
  },
];
