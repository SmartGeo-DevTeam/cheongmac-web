/** 진료분야 공통 진단 UI의 데이터 계약. 특정 질환의 내용은 포함하지 않습니다. */
export type DiagnosticTab = {
  id: string;
  label: string;
};

export type DiagnosticInfoGroup = {
  label: string;
  items: readonly string[];
};

export type DiagnosticMethod = {
  id: string;
  tabLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  notice?: string;
  infoGroups: readonly DiagnosticInfoGroup[];
};

export type DiagnosticCriteriaCard = {
  image: string;
  label: string;
  tone: 'normal' | 'warning' | 'danger' | 'neutral';
  items: readonly string[];
};

/** PC에서 컬럼 수를 3개로 유지하며 1~3개의 카드만 채웁니다. */
export type DiagnosticCriteriaItems =
  | readonly [DiagnosticCriteriaCard]
  | readonly [DiagnosticCriteriaCard, DiagnosticCriteriaCard]
  | readonly [DiagnosticCriteriaCard, DiagnosticCriteriaCard, DiagnosticCriteriaCard];

export type DiagnosticCriteriaSet = {
  description?: string;
  cards: DiagnosticCriteriaItems;
};

/** 선택형 진단 기준 표: 2열의 항목·판단 구조를 공유합니다. */
export type DiagnosticCriteriaTableColumn = {
  label: string;
  mobileLabel?: string;
};

export type DiagnosticCriteriaTable = {
  columns: readonly [DiagnosticCriteriaTableColumn, DiagnosticCriteriaTableColumn];
  rows: readonly {
    id: string;
    cells: readonly [string, string];
  }[];
  note?: string;
};
