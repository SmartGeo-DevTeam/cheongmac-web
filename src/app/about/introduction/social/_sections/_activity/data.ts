export type ActivityType = {
  id: string;
  title: string;
  desc: string;
  items: {
    id: string;
    imgUrl: string;
    title: string;
  }[];
};

export const activities: ActivityType[] = [
  {
    id: 'volunteer',
    title: '의료봉사',
    desc: '의료 사각지대를 찾아가는 무료 진료',
    items: [
      {
        id: '1',
        imgUrl: '/introduction/social/volunteer-1.png',
        title: '탄자니아 의료봉사',
      },
      {
        id: '2',
        imgUrl: '/introduction/social/volunteer-2.png',
        title: '카자흐스탄 의료봉사',
      },
      {
        id: '3',
        imgUrl: '/introduction/social/volunteer-3.png',
        title: '녹산 이주민 무료진료사업',
      },
      {
        id: '4',
        imgUrl: '/introduction/social/volunteer-4.png',
        title: '박람회 무료 검진 및 상담 제공',
      },
    ],
  },
  {
    id: 'sponsorship',
    title: '후원 사업',
    desc: '취약계층 의료비 지원 및 장학금 기부',
    items: [
      {
        id: '1',
        imgUrl: '/introduction/social/sponsorship-1.png',
        title: '지역 취약계층 정기 후원',
      },
      {
        id: '2',
        imgUrl: '/introduction/social/sponsorship-2.png',
        title: '전직원 참여 부산진구 사회취약계층 1천만원 기부',
      },
      {
        id: '3',
        imgUrl: '/introduction/social/sponsorship-3.png',
        title: '지역청년 성장지원 프로그램 ‘청춘맥락’ 후원',
      },
      {
        id: '4',
        imgUrl: '/introduction/social/sponsorship-4.png',
        title: '사랑의열매 기부',
      },
      {
        id: '5',
        imgUrl: '/introduction/social/sponsorship-5.png',
        title: '부산시 동물사랑천사기업 명패 수상',
      },
    ],
  },
  {
    id: 'community',
    title: '지역상생',
    desc: '지역민과 함께하는 건강 강좌 및 문화 행사 지원 활동',
    items: [
      {
        id: '1',
        imgUrl: '/introduction/social/community-1.png',
        title: '반려해변 입양 및 해양환경 정화활동 캠페인',
      },
      {
        id: '2',
        imgUrl: '/introduction/social/community-2.png',
        title: '연탄봉사활동',
      },
      {
        id: '3',
        imgUrl: '/introduction/social/community-3.png',
        title: '아동 복지시설 직업체험 멘토링',
      },
      {
        id: '4',
        imgUrl: '/introduction/social/community-4.png',
        title: '부산 아너소사이어티 보육원 봉사',
      },
    ],
  },
];
