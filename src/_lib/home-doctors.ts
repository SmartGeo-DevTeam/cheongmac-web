export type HomeDoctor = {
  id: string;
  slug: string;
  name: string;
  position: string;
  department: string;
  homeQuote: string;
  motionImageUrl: string | null;
  profileImageUrl: string | null;
  reservationHref: string;
  detailHref: string;
  histories: string[];
};

export const DEFAULT_HOME_DOCTORS: HomeDoctor[] = [
  {
    id: 'fallback-park-yong-beom',
    slug: 'park-yong-beom',
    name: '박용범',
    position: '원장',
    department: '혈관외과',
    homeQuote: '끊임없는 연구를 통해 환자분들의 치유에 앞장서겠습니다',
    motionImageUrl: '/assets/doctors/bak-motion.gif',
    profileImageUrl: '/assets/doctors/bak-home.png',
    reservationHref: '/reservation',
    detailHref: '/',
    histories: [
      '부산대학교 의과대학 졸업',
      '양산부산대학교병원 혈관외과',
      '부산 메리놀병원 외과 및 혈관외과',
      '국군 수도병원 혈관외과',
    ],
  },
  {
    id: 'fallback-jeon-jin-won',
    slug: 'jeon-jin-won',
    name: '전진원',
    position: '원장',
    department: '혈관외과',
    homeQuote: '정확한 진단과 섬세한 치료로 혈관 건강을 지키겠습니다',
    motionImageUrl: '/assets/doctors/jeon-motion.gif',
    profileImageUrl: '/assets/doctors/jeon-home.png',
    reservationHref: '/reservation',
    detailHref: '/',
    histories: [
      '혈관외과 전문의',
      '하지정맥류 및 말초혈관질환 진료',
      '대한혈관외과학회 정회원',
      '대한정맥학회 정회원',
    ],
  },
  {
    id: 'fallback-jang-ji-ran',
    slug: 'jang-ji-ran',
    name: '장지란',
    position: '원장',
    department: '영상의학과',
    homeQuote: '영상 진단의 정확도를 높여 치료의 방향을 세우겠습니다',
    motionImageUrl: '/assets/doctors/jang-motion.gif',
    profileImageUrl: '/assets/doctors/jang-home.png',
    reservationHref: '/reservation',
    detailHref: '/',
    histories: [
      '영상의학과 전문의',
      '초음파 및 혈관 영상 진단',
      '대한영상의학회 정회원',
      '대한초음파의학회 정회원',
    ],
  },
  {
    id: 'fallback-byeon-seung-jae',
    slug: 'byeon-seung-jae',
    name: '변승재',
    position: '원장',
    department: '마취통증의학과',
    homeQuote: '환자분의 통증과 회복 과정을 세심하게 살피겠습니다',
    motionImageUrl: '/assets/doctors/byun-motion.gif',
    profileImageUrl: '/assets/doctors/byun-home.png',
    reservationHref: '/reservation',
    detailHref: '/',
    histories: [
      '마취통증의학과 전문의',
      '통증 관리 및 시술 마취',
      '대한마취통증의학회 정회원',
      '대한통증학회 정회원',
    ],
  },
  {
    id: 'fallback-bae-byeong-ho',
    slug: 'bae-byeong-ho',
    name: '배병호',
    position: '원장',
    department: '혈관외과',
    homeQuote: '환자에게 꼭 필요한 치료만 정직하게 제안하겠습니다',
    motionImageUrl: '/assets/doctors/bae-motion.gif',
    profileImageUrl: '/assets/doctors/bae-home.png',
    reservationHref: '/reservation',
    detailHref: '/',
    histories: [
      '혈관외과 전문의',
      '동맥경화 및 투석혈관 진료',
      '대한혈관외과학회 정회원',
      '대한외과학회 정회원',
    ],
  },
  {
    id: 'fallback-kim-byeong-ju',
    slug: 'kim-byeong-ju',
    name: '김병주',
    position: '원장',
    department: '영상의학과',
    homeQuote: '작은 이상도 놓치지 않는 진단으로 함께하겠습니다',
    motionImageUrl: '/assets/doctors/kim-motion.gif',
    profileImageUrl: '/assets/doctors/kim-home.png',
    reservationHref: '/reservation',
    detailHref: '/',
    histories: [
      '영상의학과 전문의',
      '혈관 초음파 및 정밀 영상 판독',
      '대한영상의학회 정회원',
      '대한인터벤션영상의학회 정회원',
    ],
  },
];
