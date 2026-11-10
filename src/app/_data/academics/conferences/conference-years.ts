export type ConferenceItemType = {
  id: string;
  date: string;
  title: string;
  speaker: string;
  description: string;
  award?: string;
  image?: {
    src: string;
    alt: string;
  };
};

export type ConferenceYearType = {
  year: number;
  items: ConferenceItemType[];
};

export const conferenceYears: ConferenceYearType[] = [
  {
    year: 2026,
    items: [
      {
        id: '2026-09-11-1',
        date: '2026.09.11',
        title: '대한혈관외과학회 제86차 추계학술대회',
        speaker: '변승재 원장 발표',
        award: '우수구연상 수상',
        description:
          '장골-대퇴부 협착·폐쇄성 정맥병변에서 총대퇴정맥까지 연장한 정맥 스텐트 삽입술의 유효성 및 개통성 (Efficacy and Patency of Venous Stenting into the Common Femoral Vein for Iliofemoral Steno-occlusive Venous Lesions)',
        image: {
          src: '/conferences/temp-1.png',
          alt: '대한혈관외과학회 학술대회 발표 사진',
        },
      },
      {
        id: '2026-09-11-2',
        date: '2026.09.11',
        title: '대한혈관외과학회 제86차 추계학술대회',
        speaker: '변승재 원장 발표',
        description:
          '장골-대퇴부 협착·폐쇄성 정맥병변에서 총대퇴정맥까지 연장한 정맥 스텐트 삽입술의 유효성 및 개통성 (Efficacy and Patency of Venous Stenting into the Common Femoral Vein for Iliofemoral Steno-occlusive Venous Lesions)',
      },
    ],
  },
  {
    year: 2025,
    items: [],
  },
];
