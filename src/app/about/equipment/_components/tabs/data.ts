export const tabs = [
  { id: 'all', label: '전체' },
  { id: 'imaging', label: '영상진단' },
  { id: 'functional', label: '기능생체검사' },
  { id: 'procedure', label: '시술·수술' },
  { id: 'special', label: '특수치료' },
] as const;

export type EquipmentTabId = (typeof tabs)[number]['id'];
