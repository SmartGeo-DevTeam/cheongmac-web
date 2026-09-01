export type HospitalTourTab = 'floor' | 'facility';

export type FacilityCategory =
  | 'all'
  | 'outpatient'
  | 'exam'
  | 'inpatient'
  | 'amenity';

export type FloorGuide = {
  floor: string;
  title: string;
  details: string[];
};

export type FacilityItem = {
  id: string;
  floor: string;
  title: string;
  category: Exclude<FacilityCategory, 'all'>;
  images: string[];
  description?: string;
  bulletDetails?: string[];
  infoRows?: Array<{
    label: string;
    lines: string[];
  }>;
};

export const FLOOR_GUIDES: FloorGuide[] = [
  {
    floor: '6F',
    title: '청맥홀',
    details: ['청맥홀 / 영양실'],
  },
  {
    floor: '5F',
    title: '검사실·영상의학과',
    details: [
      '영상의학과 / CT·X-ray 검사실 / 초음파검사실',
      '동맥경화검사실(ABI) / 심전도검사실 / 골밀도검사실',
      '고압산소치료실 / 회복실',
    ],
  },
  {
    floor: '4F',
    title: '입원병동 (4병동)',
    details: [
      '입원실 (401~408호) / VIP실 / 휴게실 / 샤워실',
      '간호사실 / 검진상담실',
    ],
  },
  {
    floor: '3F',
    title: '입원병동 (3병동)',
    details: [
      '입원실 (301~306호) / 휴게실 / 샤워실',
      '간호사실 / 약국 (조제실)',
    ],
  },
  {
    floor: '2F',
    title: '외래진료실 / 수술실',
    details: ['진료실 / 처치실 / 간호사실', '수술실 / 회복실'],
  },
  {
    floor: '1F',
    title: '원무과 / 외래진료실',
    details: [
      '원무과 (접수/수납·입퇴원 수속)',
      '진료실 / 주사실 / 수술상담실',
    ],
  },
  {
    floor: 'B1',
    title: '주차장',
    details: ['지하주차장'],
  },
];

export const FACILITY_CATEGORY_OPTIONS: Array<{
  value: FacilityCategory;
  label: string;
}> = [
  { value: 'all', label: '전체' },
  { value: 'outpatient', label: '외래진료' },
  { value: 'exam', label: '검사' },
  { value: 'inpatient', label: '입원' },
  { value: 'amenity', label: '편의시설' },
];

export const FACILITY_ITEMS: FacilityItem[] = [
  {
    id: 'parking',
    floor: '지하1층',
    title: '지하주차장',
    category: 'amenity',
    images: ['/assets/images/hospital-tour/parking.jpg'],
    description:
      '병원을 이용하시는 분들의 편의를 위해 무료 발렛파킹 서비스를 제공하고 있습니다.',
    infoRows: [
      {
        label: '운영시간',
        lines: [
          '평일 08:30 ~ 18:30 (18:20까지 출차)',
          '토요일 08:30 ~ 13:30 (13:20까지 출차)',
        ],
      },
      {
        label: '비고',
        lines: ['제한높이 2.1m'],
      },
    ],
  },
  {
    id: 'reception',
    floor: '1층',
    title: '원무과 (접수/수납)',
    category: 'outpatient',
    images: ['/assets/images/hospital-tour/reception.jpg'],
    description: '접수와 수납, 입·퇴원 관련 안내를 받을 수 있는 원무 공간입니다.',
  },
  {
    id: 'waiting-room',
    floor: '1층',
    title: '진료 대기실',
    category: 'outpatient',
    images: ['/assets/images/hospital-tour/waiting-room.jpg'],
    description: '진료 전 편안하게 대기하실 수 있도록 마련한 공간입니다.',
  },
  {
    id: 'consulting-room-1',
    floor: '1층',
    title: '진료실',
    category: 'outpatient',
    images: [
      '/assets/images/hospital-tour/consulting-room.jpg',
      '/assets/images/hospital-tour/consulting-room-2.jpg',
    ],
    bulletDetails: ['변승재 원장', '전진원 원장'],
  },
  {
    id: 'consulting-room-2',
    floor: '2층',
    title: '진료실',
    category: 'outpatient',
    images: [
      '/assets/images/hospital-tour/consulting-room-2.jpg',
      '/assets/images/hospital-tour/consulting-room.jpg',
    ],
    description: '환자 상태를 확인하고 진료 상담을 진행하는 공간입니다.',
  },
  {
    id: 'hybrid-or',
    floor: '2층',
    title: '인터벤션 수술실',
    category: 'exam',
    images: ['/assets/images/hospital-tour/hybrid-or.jpg'],
    description: '검사와 시술을 위한 장비가 마련된 치료 공간입니다.',
  },
  {
    id: 'hyperbaric-2',
    floor: '2층',
    title: '고압산소치료실',
    category: 'exam',
    images: ['/assets/images/hospital-tour/hyperbaric.jpg'],
    description: '고압산소치료 장비를 갖춘 전용 치료 공간입니다.',
  },
  {
    id: 'ward-3',
    floor: '3층',
    title: '입원실',
    category: 'inpatient',
    images: ['/assets/images/hospital-tour/ward.jpg'],
    description: '입원 환자분들의 안정적인 회복을 위한 입원 공간입니다.',
  },
  {
    id: 'hyperbaric-5',
    floor: '5층',
    title: '고압산소치료실',
    category: 'exam',
    images: ['/assets/images/hospital-tour/hyperbaric.jpg'],
    description: '고압산소치료 장비를 갖춘 전용 치료 공간입니다.',
  },
  {
    id: 'vip-4',
    floor: '4층',
    title: 'VIP 입원실',
    category: 'inpatient',
    images: ['/assets/images/hospital-tour/vip-room.jpg'],
    description: '환자분의 휴식과 회복을 고려해 구성한 입원 공간입니다.',
  },
];
