import type { TableRow } from '@/app/guide/hospitalized/_components/types';

export const mealRows: TableRow[] = [
  { label: '아침 (조식)', value: '오전 07:30' },
  { label: '점심 (중식)', value: '오후 12:20' },
  { label: '저녁 (석식)', value: '오후 17:00' },
];

export const mealNotices = [
  '※ 수술·검사 일정에 따라 식사 시간이 조정될 수 있습니다.',
  '※ 식사 취소·변경을 원하시는 경우 사전에 담당 간호사에게 알려주시기 바랍니다.',
];
