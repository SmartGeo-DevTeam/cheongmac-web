import type { ProcedureItem } from '@/app/_components/guide/types';

// 디자인 시안 기준. 단계별 실제 운영 흐름은 병원 안내와 대조해 주세요.
export const procedureDescription =
  '보훈병원에서 치료가 불가능하다고 판단한 경우 병원장의 승인을 득한 경우에만 전문병원으로 위탁진료가 가능합니다.';

export const veteransProcedure: ProcedureItem[] = [
  {
    title: '소속 보훈병원에서 진료 및 담당의의 전문위탁 진료 신청서 발급',
    description: '',
  },
  { title: '보훈병원 위탁팀에서 준수사항 안내', description: '' },
  { title: '청맥병원 예약 후 투석혈관 진료', description: '' },
  { title: '보훈공단에 진료비 청구', description: '' },
  { title: '심사 확정 후 진료비 입금', description: '' },
];

export const procedureNote =
  '당일진료는 오후 4시 이전에 접수를 해야 진료 가능합니다.';
