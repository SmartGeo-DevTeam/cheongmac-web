import type { OcclusionMechanismTipAction } from '@/app/_types/vascular/arterial/occlusion/mechanism';

/** 기존 버튼은 링크/클릭 동작이 없으므로 텍스트만 옮기고 기능은 변경하지 않습니다. */
export const occlusionMechanismTipActions: OcclusionMechanismTipAction[] = [
  { id: 'exercise', label: '운동 확인하기' },
  { id: 'nutrition', label: '식단 확인하기' },
];
