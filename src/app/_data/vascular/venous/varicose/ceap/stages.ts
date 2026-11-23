export const CEAP_STAGES = [
  {
    code: 'C1',
    description: '모세혈관 확장, 망상정맥류 등 잔핏줄이 보임',
  },
  {
    code: 'C2',
    description: '거미양정맥류, 초음파상 복재정맥 역류 존재',
  },
  {
    code: 'C3',
    description: '다리 부종이 동반되는 정맥류',
  },
  {
    code: 'C4',
    description: '색소 침착·습진·피부경화증 등 피부 변화',
  },
  {
    code: 'C5',
    description: '치유성 피부 궤양 발병',
  },
  {
    code: 'C6',
    description: '진행성 피부 궤양',
  },
] as const;

export type CeapStageCode = (typeof CEAP_STAGES)[number]['code'];
