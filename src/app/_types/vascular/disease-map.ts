/** 동맥·정맥 공통 인체 이미지 좌표계: 612×1438 논리 좌표. */
export type DiseaseBodyPoint = { x: number; y: number };

export type DiseaseMapLabel = {
  labelX: number;
  labelY: number;
  elbowX: number;
  side: 'left' | 'right';
};

/** 추가 표시점은 하지동맥폐색증처럼 한 질환을 복수 부위에 연결할 때만 사용합니다. */
export type DiseaseMapPoint = {
  id: string;
  title: string;
  href: string;
  body: DiseaseBodyPoint;
  mobile: DiseaseMapLabel;
  desktop?: DiseaseMapLabel;
  additionalPoint?: {
    body: DiseaseBodyPoint;
    mobile: { elbowX: number };
    desktop?: { elbowX: number };
  };
};
