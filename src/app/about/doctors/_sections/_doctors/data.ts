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
  slug: string;
  name: string;
  mobileImgSrc: string;
  desktopImgSrc: string;
  pathImgSrc: string;
  fieldIds: FieldId[];
  expertise: string[];
  educations: string[];
  reservationHref: string;
};

export const doctors: DoctorType[] = [
  {
    id: 'bak-yong-beom',
    slug: 'bak',
    name: '박용범',
    mobileImgSrc: '/doctors/bak-m.png',
    desktopImgSrc: '/doctors/bak-pc.png',
    pathImgSrc: '/doctors/bak-path.png',
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
    reservationHref: '/',
  },
  {
    id: 'jeon-jin-won',
    slug: 'jeon',
    name: '전진원',
    mobileImgSrc: '/doctors/jeon-m.png',
    desktopImgSrc: '/doctors/jeon-pc.png',
    pathImgSrc: '/doctors/jeon-path.png',
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
    reservationHref: '/',
  },
  {
    id: 'jang-ji-ran',
    slug: 'jang',
    name: '장지란',
    mobileImgSrc: '/doctors/jang-m.png',
    desktopImgSrc: '/doctors/jang-pc.png',
    pathImgSrc: '/doctors/jang-path.png',
    fieldIds: ['vascular-surgery'],
    expertise: ['하지정맥류', '정계정맥류', '골반정맥류'],
    educations: [
      '부산대학교 의과대학 졸업',
      '부산대학교병원 외과 전문의',
      '혈관외과 전임의 수료',
      '대한혈관외과학회 정회원',
      '대한정맥학회 정회원',
    ],
    reservationHref: '/',
  },
  {
    id: 'byun-seungjae',
    slug: 'byun',
    name: '변승재',
    mobileImgSrc: '/doctors/byun-m.png',
    desktopImgSrc: '/doctors/byun-pc.png',
    pathImgSrc: '/doctors/byun-path.png',
    fieldIds: ['vascular-surgery'],
    expertise: ['하지정맥류', '정계정맥류', '골반정맥류'],
    educations: [
      '부산대학교 의과대학 졸업',
      '부산대학교병원 외과 전문의',
      '혈관외과 전임의 수료',
      '대한혈관외과학회 정회원',
      '대한정맥학회 정회원',
    ],
    reservationHref: '/',
  },
  {
    id: 'bae-byeongho',
    slug: 'bae',
    name: '배병호',
    mobileImgSrc: '/doctors/bae-m.png',
    desktopImgSrc: '/doctors/bae-pc.png',
    pathImgSrc: '/doctors/bae-path.png',
    fieldIds: ['radiology'],
    expertise: ['하지정맥류', '정계정맥류', '골반정맥류'],
    educations: [
      '부산대학교 의과대학 졸업',
      '영상의학과 전문의',
      '대한영상의학회 정회원',
      '대한초음파의학회 정회원',
    ],
    reservationHref: '/',
  },
  {
    id: 'kim-byeongju',
    slug: 'kim',
    name: '김병주',
    mobileImgSrc: '/doctors/kim-m.png',
    desktopImgSrc: '/doctors/kim-pc.png',
    pathImgSrc: '/doctors/kim-path.png',
    fieldIds: ['anesthesiology'],
    expertise: ['하지정맥류', '정계정맥류', '골반정맥류'],
    educations: [
      '부산대학교 의과대학 졸업',
      '마취통증의학과 전문의',
      '대한마취통증의학회 정회원',
      '대한통증학회 정회원',
    ],
    reservationHref: '/',
  },
];

// 상세 URL을 생성하는 유일한 함수: 목록 카드 등에서 재사용
export function getDoctorDetailHref(doctor: Pick<DoctorType, 'slug'>) {
  return `/about/doctors/${doctor.slug}`;
}

// 향후 DB로 옮길 때는 이 조회 함수의 내부만 변경하면 됩니다.
export function getDoctorBySlug(slug: string): DoctorType | undefined {
  return doctors.find((doctor) => doctor.slug === slug);
}
