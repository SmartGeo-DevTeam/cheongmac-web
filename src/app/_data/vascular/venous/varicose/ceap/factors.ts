/** CEAP 구성 요소. 그래픽과 설명 문구가 동일한 정적 데이터를 공유합니다. */
export const CEAP_FACTORS = [
  { letter: 'C', label: 'Clinical', text: '임상소견' },
  { letter: 'E', label: 'Etiology', text: '원인' },
  { letter: 'A', label: 'Anatomy', text: '해부학적 위치' },
  { letter: 'P', label: 'Pathophysiology', text: '병태생리' },
] as const;
