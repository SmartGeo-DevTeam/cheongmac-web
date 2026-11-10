import type { TableRow } from '@/app/_types/guide/hospitalized';

export const paymentRows: TableRow[] = [
  { label: '직접 납부', value: '본원 1층 입·퇴원 통합 창구에서 중간납입' },
  {
    label: '계좌이체',
    value: '계좌번호 및 입금 확인 방법은 운영 정보 확정 후 입력해 주세요.',
  },
];

export const paymentNotices = [
  '장기 입원 시, 진료비 중간계산이 있을 수 있습니다.',
  '중간진료비 조회 및 납부는 수납/입퇴원 수속 창구와 문의해 주세요.',
  '진료비/수납 문의: 원무팀 (051-804-1119)',
];
