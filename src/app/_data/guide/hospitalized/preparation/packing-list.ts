import type { TableRow } from '@/app/_types/guide/hospitalized';

export const preparationRows: TableRow[] = [
  { label: '(필수) 신분증', value: '주민등록증, 운전면허증 등 본인 확인용' },
  { label: '(필수) 복용약', value: '평소 드시는 약 또는 처방전' },
  { label: '세면도구', value: '치약, 칫솔, 수건, 샴푸, 바디워시 등' },
  {
    label: '개인 생활용품',
    value: '물컵, 실내화, 속옷, 양말, 화장지 등 개인물품',
  },
  { label: '복용중인 약', value: '현재 복용 중인 약 또는 처방전' },
  {
    label: '반입금지물품',
    value: '전기장판 등 전열기구 및 인화성·가연성 물질 반입금지',
  },
];

export const preparationCards = [
  {
    id: 'identity',
    type: 'item',
    title: '신분증',
    image: '/guide/identity.png',
    order: 1,
  },
  {
    id: 'medication',
    type: 'item',
    title: '복용중인 약',
    image: '/guide/medication.png',
    order: 2,
  },
  {
    id: 'toiletries',
    type: 'item',
    title: '개인 세면도구',
    image: '/guide/toiletries.png',
    order: 3,
  },
  {
    id: 'slippers',
    type: 'item',
    title: '실내화',
    image: '/guide/slippers.png',
    order: 4,
  },
  {
    id: 'clothing',
    type: 'item',
    title: '수건·속옷·양말',
    image: '/guide/clothing.png',
    order: 5,
  },
  {
    id: 'cup',
    type: 'item',
    title: '개인 물컵',
    image: '/guide/cup.png',
    order: 6,
  },
  {
    id: 'notice-1',
    type: 'notice',
    title: `전기장판 등 전열기구 및 \n인화성·가열성 물질 반입금지`,
    image: '/guide/prohibition.png',
    order: 7,
  },
];
