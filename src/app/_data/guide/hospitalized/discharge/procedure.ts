import type { ProcedureItem } from '@/app/_types/guide/procedure';

export const dischargeProcedure: ProcedureItem[] = [
  { title: '퇴원 결정', description: '상태 확인 후 담당의가 퇴원 결정' },
  {
    title: '서류 신청',
    description: '퇴원 하루 전 필요한 서류를 간호사실에 신청',
  },
  { title: '퇴원 심사', description: '퇴원 관련 보험심사 진행' },
  {
    title: '퇴원 안내',
    description: '퇴원약 수령, 유의사항 숙지, 외래 일정 전달',
  },
  {
    title: '수납 및 서류 수령',
    description: '원무과 수납, 사전 신청한 서류 수령 후 귀가',
  },
];
