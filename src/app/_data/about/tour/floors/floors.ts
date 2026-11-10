export type FloorType = {
  id: string;
  floor: string;
  title: string;
  descriptions: string[];
};

export const floors: FloorType[] = [
  {
    id: '6f',
    floor: '6F',
    title: '청맥홀',
    descriptions: ['청맥홀 / 영양실'],
  },
  {
    id: '5f',
    floor: '5F',
    title: '검사실·영상의학과',
    descriptions: [
      '영상의학과 / CT 촬영실 / 초음파검사실',
      '동맥경화검사실 / 심전도검사실',
      '고압산소치료실 / 회복실',
    ],
  },
  {
    id: '4f',
    floor: '4F',
    title: '입원병동 (4병동)',
    descriptions: [
      '입원실 (401~408호) / VIP실 / 휴게실 / 샤워실',
      '간호사실 / 검진상담실',
    ],
  },
  {
    id: '3f',
    floor: '3F',
    title: '입원병동 (3병동)',
    descriptions: [
      '입원실 (301~306호) / 휴게실 / 샤워실',
      '간호사실 / 약국 (조제실)',
    ],
  },
  {
    id: '2f',
    floor: '2F',
    title: '외래진료실 / 수술실',
    descriptions: ['진료실 / 처치실 / 간호사실', '수술실 / 회복실'],
  },
  {
    id: '1f',
    floor: '1F',
    title: '원무과 / 외래진료실',
    descriptions: [
      '원무과 (접수/수납·입퇴원 수속)',
      '진료실 / 주사실 / 수술상담실',
    ],
  },
  {
    id: 'b1',
    floor: 'B1',
    title: '주차장',
    descriptions: ['지하주차장'],
  },
];
