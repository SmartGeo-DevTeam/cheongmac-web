export const facilityCategories = [
  { id: 'all', label: '전체' },
  { id: 'outpatient', label: '외래진료' },
  { id: 'examination', label: '검사' },
  { id: 'hospitalized', label: '입원' },
  { id: 'convenience', label: '편의시설' },
] as const;

export type FacilityCategoryId = (typeof facilityCategories)[number]['id'];

export type FacilityType = {
  id: string;
  category: Exclude<FacilityCategoryId, 'all'>;
  name: string;
  floor: {
    code: string;
    label: string;
  };
  thumbnail: string;
  searchKeywords?: string[];
  detail?: {
    title: string;
    images: string[];
    description?: string;
    info?: {
      label: string;
      values: string[];
    }[];
  };
};

export const facilities: FacilityType[] = [
  {
    id: '1',
    category: 'convenience',
    name: '지하주차장',
    floor: {
      code: 'B1',
      label: '지하1층',
    },
    thumbnail: '/tour/facilities-1.png',
    searchKeywords: ['주차장', '주차', '발렛파킹'],
    detail: {
      title: '주차장',
      images: ['/tour/facilities-1.png'],
      description:
        '병원을 이용하시는 분들의 편의를 위해 무료 발렛파킹 서비스를 제공하고 있습니다.',
      info: [
        {
          label: '운영시간',
          values: [
            '평일 08:30 ~ 18:30 (18:20까지 출차)',
            '토요일 08:30 ~ 13:30 (13:20까지 출차)',
          ],
        },
        {
          label: '비고',
          values: ['제한높이 2.1m'],
        },
      ],
    },
  },
  {
    id: '2',
    category: 'outpatient',
    name: '원무과 (접수/수납)',
    floor: {
      code: '1F',
      label: '1층',
    },
    thumbnail: '/tour/facilities-2.png',
    searchKeywords: ['원무과', '접수', '수납'],
    detail: {
      title: '원무과 (접수/수납)',
      images: ['/tour/facilities-2.png'],
    },
  },
  {
    id: '3',
    category: 'outpatient',
    name: '진료 대기실',
    floor: {
      code: '1F',
      label: '1층',
    },
    thumbnail: '/tour/facilities-3.png',
    searchKeywords: ['대기실', '진료대기'],
    detail: {
      title: '진료 대기실',
      images: ['/tour/facilities-3.png'],
    },
  },
  {
    id: '4',
    category: 'outpatient',
    name: '진료실',
    floor: {
      code: '1F',
      label: '1층',
    },
    thumbnail: '/tour/facilities-4.png',
    searchKeywords: ['진료실', '외래진료'],
    detail: {
      title: '진료실',
      images: ['/tour/facilities-4.png'],
    },
  },
  {
    id: '5',
    category: 'outpatient',
    name: '진료실',
    floor: {
      code: '2F',
      label: '2층',
    },
    thumbnail: '/tour/facilities-5.png',
    searchKeywords: ['진료실', '외래진료'],
    detail: {
      title: '진료실',
      images: ['/tour/facilities-5.png'],
    },
  },
  {
    id: '6',
    category: 'outpatient',
    name: '하이브리드 수술실',
    floor: {
      code: '2F',
      label: '2층',
    },
    thumbnail: '/tour/facilities-6.png',
    searchKeywords: ['하이브리드', '수술실', '수술'],
    detail: {
      title: '하이브리드 수술실',
      images: ['/tour/facilities-6.png'],
    },
  },
  {
    id: '7',
    category: 'outpatient',
    name: '수술실',
    floor: {
      code: '2F',
      label: '2층',
    },
    thumbnail: '/tour/facilities-7.png',
    searchKeywords: ['수술', '수술실'],
    detail: {
      title: '수술실',
      images: ['/tour/facilities-7.png'],
    },
  },
  {
    id: '8',
    category: 'examination',
    name: '고압산소치료실',
    floor: {
      code: '2F',
      label: '2층',
    },
    thumbnail: '/tour/facilities-8.png',
    searchKeywords: ['고압산소', '산소치료', '치료실'],
    detail: {
      title: '고압산소치료실',
      images: ['/tour/facilities-8.png'],
    },
  },
  {
    id: '9',
    category: 'hospitalized',
    name: '입원실',
    floor: {
      code: '3F',
      label: '3층',
    },
    thumbnail: '/tour/facilities-9.png',
    searchKeywords: ['입원실', '입원병동', '병실'],
    detail: {
      title: '입원실',
      images: ['/tour/facilities-9.png'],
    },
  },
  {
    id: '10',
    category: 'hospitalized',
    name: '입원실 (1인실)',
    floor: {
      code: '4F',
      label: '4층',
    },
    thumbnail: '/tour/facilities-10.png',
    searchKeywords: ['입원실', '1인실', '병실'],
    detail: {
      title: '입원실 (1인실)',
      images: ['/tour/facilities-10.png'],
    },
  },
  {
    id: '11',
    category: 'examination',
    name: '고압산소치료실',
    floor: {
      code: '5F',
      label: '5층',
    },
    thumbnail: '/tour/facilities-11.png',
    searchKeywords: ['고압산소', '산소치료', '치료실'],
    detail: {
      title: '고압산소치료실',
      images: ['/tour/facilities-11.png'],
    },
  },
  {
    id: '12',
    category: 'examination',
    name: '영상의학과',
    floor: {
      code: '5F',
      label: '5층',
    },
    thumbnail: '/tour/facilities-12.png',
    searchKeywords: ['영상의학과', '영상검사', 'CT'],
    detail: {
      title: '영상의학과',
      images: ['/tour/facilities-12.png'],
    },
  },
  {
    id: '13',
    category: 'examination',
    name: '영상의학과',
    floor: {
      code: '5F',
      label: '5층',
    },
    thumbnail: '/tour/facilities-13.png',
    searchKeywords: ['영상의학과', '영상검사'],
    detail: {
      title: '영상의학과',
      images: ['/tour/facilities-13.png'],
    },
  },
  {
    id: '14',
    category: 'examination',
    name: '초음파검사실',
    floor: {
      code: '5F',
      label: '5층',
    },
    thumbnail: '/tour/facilities-14.png',
    searchKeywords: ['초음파', '초음파검사', '검사실'],
    detail: {
      title: '초음파검사실',
      images: ['/tour/facilities-14.png'],
    },
  },
];
